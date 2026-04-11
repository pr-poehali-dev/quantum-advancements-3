import { motion, AnimatePresence } from 'framer-motion'
import Icon from '@/components/ui/icon'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
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
            onClick={onClose}
          />
          <motion.div
            className="relative bg-[#0a0f1a] border border-[#4A9EFF]/30 rounded-2xl p-8 w-full max-w-sm"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            <h3 className="text-xl font-bold text-white mb-1">Рустам Шарафутдинов</h3>
            <p className="text-neutral-400 mb-6">Коммерческий директор</p>

            <div className="space-y-4">
              <a
                href="tel:+79123508159"
                className="flex items-center gap-3 text-white hover:text-[#4A9EFF] transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-[#4A9EFF]/10 flex items-center justify-center group-hover:bg-[#4A9EFF]/20 transition-colors">
                  <Icon name="Phone" size={18} />
                </span>
                <span className="text-lg font-medium">+7 912 350-81-59</span>
              </a>

              <a
                href="https://wa.me/79123508159"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-[#25D366] transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                  <Icon name="MessageCircle" size={18} />
                </span>
                <span className="text-lg font-medium">WhatsApp</span>
              </a>

              <a
                href="https://t.me/+79123508159"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-[#2AABEE] transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-[#2AABEE]/10 flex items-center justify-center group-hover:bg-[#2AABEE]/20 transition-colors">
                  <Icon name="Send" size={18} />
                </span>
                <span className="text-lg font-medium">Telegram</span>
              </a>

              <a
                href="mailto:info@a3group.online"
                className="flex items-center gap-3 text-white hover:text-[#4A9EFF] transition-colors group"
              >
                <span className="w-10 h-10 rounded-full bg-[#4A9EFF]/10 flex items-center justify-center group-hover:bg-[#4A9EFF]/20 transition-colors">
                  <Icon name="Mail" size={18} />
                </span>
                <span className="text-lg font-medium">info@a3group.online</span>
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}