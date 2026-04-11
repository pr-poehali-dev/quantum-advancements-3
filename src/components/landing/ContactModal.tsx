import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import Icon from '@/components/ui/icon'
import func2url from '../../../backend/func2url.json'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(func2url['send-email'], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, email, message }),
      })
      if (res.ok) {
        setSuccess(true)
        setName('')
        setPhone('')
        setEmail('')
        setMessage('')
      } else {
        setError('Произошла ошибка. Попробуйте позже.')
      }
    } catch {
      setError('Произошла ошибка. Попробуйте позже.')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setSuccess(false)
    setError('')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
          />
          <motion.div
            className="relative bg-[#0a0f1a] border border-[#4A9EFF]/30 rounded-2xl p-8 w-full max-w-md"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {success ? (
              <div className="text-center py-8">
                <div className="text-[#4A9EFF] mb-4 flex justify-center">
                  <Icon name="CheckCircle" size={48} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Заявка отправлена!</h3>
                <p className="text-neutral-400">Мы свяжемся с вами в ближайшее время.</p>
                <Button onClick={handleClose} className="mt-6 bg-[#4A9EFF] text-black hover:bg-[#7CB9E8]">
                  Закрыть
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-white mb-2">Обсудить проект</h3>
                <p className="text-neutral-400 mb-6">Оставьте контакты — мы разберём вашу ситуацию и предложим решение.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <Input
                    placeholder="Ваше имя *"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-[#4A9EFF]"
                  />
                  <Input
                    placeholder="Телефон *"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    required
                    type="tel"
                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-[#4A9EFF]"
                  />
                  <Input
                    placeholder="Электронная почта"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    type="email"
                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-[#4A9EFF]"
                  />
                  <Textarea
                    placeholder="Расскажите о вашем производстве (необязательно)"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    rows={3}
                    className="bg-white/5 border-white/10 text-white placeholder:text-neutral-500 focus:border-[#4A9EFF] resize-none"
                  />

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#4A9EFF] text-black hover:bg-[#7CB9E8] font-semibold"
                  >
                    {loading ? 'Отправляем...' : 'Отправить заявку'}
                  </Button>
                </form>

                <div className="mt-6 pt-6 border-t border-white/10 flex gap-4 justify-center">
                  <a href="https://wa.me/79123508159" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-[#25D366] transition-colors text-sm">
                    <Icon name="MessageCircle" size={16} />
                    WhatsApp
                  </a>
                  <a href="https://t.me/+79123508159" target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 text-neutral-400 hover:text-[#2AABEE] transition-colors text-sm">
                    <Icon name="Send" size={16} />
                    Telegram
                  </a>
                  <a href="tel:+79123508159"
                    className="flex items-center gap-2 text-neutral-400 hover:text-[#4A9EFF] transition-colors text-sm">
                    <Icon name="Phone" size={16} />
                    +7 912 350-81-59
                  </a>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}