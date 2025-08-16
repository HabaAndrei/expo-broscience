import React, { useState, createContext, useContext, ReactNode } from 'react'
import { View, Text } from 'tamagui'
import { X } from '@tamagui/lucide-icons'
import { SafeAreaView } from 'react-native';

type AlertType = 'success' | 'error' | 'info'

export type AlertBoxProps = {
  type: AlertType
  title: string
  description?: string
}

type ToastNotificationContextType = {
  addNotification: (notification: AlertBoxProps) => void
}

const ToastNotificationContext = createContext<ToastNotificationContextType | undefined>(undefined)

const typeColors = {
  success: {
    background: '$green3',
    text: '$green11',
  },
  error: {
    background: '$red3',
    text: '$red11',
  },
  info: {
    background: '$blue3',
    text: '$blue11',
  },
}

export function ToastNotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<AlertBoxProps[]>([])

  const addNotification = (notification: AlertBoxProps) => {
    setNotifications((prev) => [...prev.slice(-4), notification])
  }

  const close = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <ToastNotificationContext.Provider value={{ addNotification }}>
      <SafeAreaView
        position="absolute"
        top={40}
        gap="$2"
        zIndex={100}
        style={{alignSelf: 'center'}}
      >
        {notifications.map((not, index) => (
          <View
            key={index}
            backgroundColor={typeColors[not.type].background}
            borderRadius="$10"
            padding="$4"
            minWidth={320}
            maxWidth={350}
            position="relative"
          >
            <X
              onPress={() => close(index)}
              position="absolute"
              top="$5"
              right="$2"
            />

            <Text
              fontWeight="700"
              fontSize="$5"
              color={typeColors[not.type].text}
              style={{ alignSelf: 'center' }}
            >
              {not.title}
            </Text>

            {!!not.description && (
              <Text
                fontSize="$3"
                color={typeColors[not.type].text}
                marginTop="$1"
                style={{ alignSelf: 'center' }}
              >
                {not.description}
              </Text>
            )}
          </View>
        ))}
      </SafeAreaView>

      {children}
    </ToastNotificationContext.Provider>
  )
}

export const useToastNotification = () => {
  const context = useContext(ToastNotificationContext)
  if (!context) {
    throw new Error('useToastNotification must be used within a ToastNotificationProvider')
  }
  return context
}