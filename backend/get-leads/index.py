import json
import os
import psycopg2


def handler(event: dict, context) -> dict:
    """Получение списка заявок с сайта А3 Групп"""

    if event.get('httpMethod') == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }

    conn = psycopg2.connect(os.environ['DATABASE_URL'])
    cur = conn.cursor()
    schema = os.environ.get('MAIN_DB_SCHEMA', 'public')
    cur.execute(
        f"SELECT id, name, phone, message, created_at FROM {schema}.leads ORDER BY created_at DESC"
    )
    rows = cur.fetchall()
    cur.close()
    conn.close()

    leads = [
        {
            'id': row[0],
            'name': row[1],
            'phone': row[2],
            'message': row[3],
            'created_at': row[4].isoformat()
        }
        for row in rows
    ]

    return {
        'statusCode': 200,
        'headers': {'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'leads': leads})
    }
