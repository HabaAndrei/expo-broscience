import { View } from 'react-native';
import { YStack, Spinner } from 'tamagui';

export default function LoadingOverlay() {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
      }}
    >
      <YStack
        backgroundColor="#e0e0e0"
        borderRadius={12}
        padding={20}
        justifyContent="center"
        alignItems="center"
      >
        <Spinner size="large" color="grey" />
      </YStack>
    </View>
  );
}
