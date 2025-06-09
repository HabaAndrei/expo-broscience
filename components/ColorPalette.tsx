import { XStack, Button } from 'tamagui';
import { useContext } from 'react';
import { ThemeColorContext } from '@/contexts/ThemeColorContext';
import * as Haptics from 'expo-haptics';

export default function ColorPalette() {
  const { setThemeColor } = useContext(ThemeColorContext);

  const colors = [
    { name: 'red', value: '$red5' },
    { name: 'green', value: '$green5' },
    { name: 'yellow', value: '$yellow5' },
    { name: 'blue', value: '$blue5' },
    { name: 'grey', value: 'grey' },
  ];

  return (
    <XStack space="$2" alignItems="center">
      {colors.map((color) => (
        <Button
          key={color.name}
          backgroundColor={color.value}
          size="$3"
          width={32}
          height={32}
          borderRadius={9999}
          onPress={() => {
            setThemeColor(color.name)
            Haptics.notificationAsync(
              Haptics.NotificationFeedbackType.Success
            )
          }}
        />
      ))}
    </XStack>
  );
}
