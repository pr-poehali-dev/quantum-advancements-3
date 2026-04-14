import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import psycopg2


def handler(event: dict, context) -> dict:
    """Сохранение заявки в БД и отправка письма на email"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    body = json.loads(event.get('body', '{}'))
    name = body.get('name', '').strip()
    phone = body.get('phone', '').strip()
    email = body.get('email', '').strip()
    message = body.get('message', '').strip()

    if not name or not phone:
        return {
            'statusCode': 400,
            'headers': {'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Имя и телефон обязательны'})
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    cur.execute(
        f"INSERT INTO {schema}.leads (name, phone, email, message) VALUES (%s, %s, %s, %s)",
        (name, phone, email or None, message or None)
    )
    conn.commit()
    cur.close()
    conn.close()

    smtp_host = os.environ.get('SMTP_HOST', '')
    smtp_user = os.environ.get('SMTP_USER', '')
    smtp_password = os.environ.get('SMTP_PASSWORD', '')
    to_email = 'info1@a3group.online'

    if smtp_host and smtp_user and smtp_password:
        msg = MIMEMultipart('alternative')
        msg['Subject'] = f'Новая заявка с сайта А5 Групп от {name}'
        msg['From'] = smtp_user
        msg['To'] = to_email

        html = f"""
        <html><body>
        <h2>Новая заявка с сайта А5 Групп</h2>
        <p><b>Имя:</b> {name}</p>
        <p><b>Телефон:</b> {phone}</p>
        <p><b>Email:</b> {email if email else '—'}</p>
        <p><b>Сообщение:</b> {message if message else '—'}</p>
        </body></html>
        """

        msg.attach(MIMEText(html, 'html'))

        try:
            with smtplib.SMTP_SSL(smtp_host, 465) as server:
                server.login(smtp_user, smtp_password)
                server.sendmail(smtp_user, to_email, msg.as_string())
        except Exception:
            pass

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True})
    }