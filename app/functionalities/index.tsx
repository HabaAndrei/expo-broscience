import { Image } from 'expo-image';
import { StyleSheet, Text, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import Menu from '@/components/Functionalities/Menu';

export default function FunctionalitiesIndex(){

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
        <Menu/>
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});