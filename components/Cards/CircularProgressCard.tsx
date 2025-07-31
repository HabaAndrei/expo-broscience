import React from 'react'
import { AnimatedCircularProgress } from 'react-native-circular-progress'
import { Card, Text, YStack } from 'tamagui'

type CircularProgressCardProps = {
  size?: number
  width?: number
  fill: number
  title?: string
  subtitle?: string
}

export default function CircularProgressCard({
  size = 100,
  width = 8,
  fill = 90,
  title = '',
  subtitle = '',
}: CircularProgressCardProps) {
  return (
    <Card padded elevate bordered width={size} alignItems="center">
      <YStack style={{alignItems: "center"}} space>
        <AnimatedCircularProgress
          size={size / 1.5}
          width={width / 2}
          fill={fill}
          lineCap="round"
          rotation={0}
        >
          {() => (
            <Text fontWeight="600" fontSize="$5">
              {`${Math.round(fill)}%`}
            </Text>
          )}
        </AnimatedCircularProgress>

        {title ? (
          <Text fontSize="$1" fontWeight="700">{title}</Text>
        ) : null}

        {subtitle ? (
          <Text fontSize="$1">{subtitle}</Text>
        ) : null}

      </YStack>
    </Card>
  )
}
