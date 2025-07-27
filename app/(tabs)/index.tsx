import { StyleSheet, View } from 'react-native';
import { Button } from 'tamagui';
import { Firebase } from '@/providers/Firebase';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image } from 'expo-image';
import ColorPalette from '@/components/ColorPalette';


const index = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#A1CEDC' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <View>
        <ColorPalette/>
        <Button onPress={()=>{new Firebase()._signOut()}} >Log out</Button>
      </View>
    </ParallaxScrollView>
  )
}

export default index

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});