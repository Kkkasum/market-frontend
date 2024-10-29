import { useContext } from 'react'

import { TelegramContext } from '@/types/webapp.type'

export const useTelegram = () => useContext(TelegramContext)
