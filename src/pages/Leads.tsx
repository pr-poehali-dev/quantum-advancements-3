import { useEffect, useState } from 'react'
import func2url from '../../backend/func2url.json'

interface Lead {
  id: number
  name: string
  phone: string
  message: string | null
  created_at: string
}

export default function Leads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(func2url['get-leads'])
      .then(r => r.json())
      .then(data => {
        setLeads(data.leads || [])
        setLoading(false)
      })
  }, [])

  const formatDate = (iso: string) => {
    return new Date(iso).toLocaleString('ru-RU', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Заявки</h1>
      {loading ? (
        <p className="text-neutral-400">Загрузка...</p>
      ) : leads.length === 0 ? (
        <p className="text-neutral-400">Заявок пока нет</p>
      ) : (
        <div className="space-y-4">
          {leads.map(lead => (
            <div key={lead.id} className="border border-neutral-800 rounded-xl p-6 bg-neutral-900">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-xl font-semibold">{lead.name}</p>
                  <p className="text-[#4A9EFF] mt-1">{lead.phone}</p>
                </div>
                <p className="text-neutral-500 text-sm">{formatDate(lead.created_at)}</p>
              </div>
              {lead.message && (
                <p className="text-neutral-400 mt-2 border-t border-neutral-800 pt-3">{lead.message}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
