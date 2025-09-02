import { StyleSheet, View } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Image } from 'expo-image';
import Calendar from '@/components/Home/Calendar';
import { Card, Paragraph, XStack } from 'tamagui';
import { Activity } from '@tamagui/lucide-icons';
import { Link } from 'expo-router';

const index = () => {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{
        light: '#ffffff1b',
        dark: '#ffffff1b' ,
        // light: '#A1CEDC',
        // dark: '#A1CEDC'
      }}
      headerImage={
        <Image
          source={require('@/assets/images/icon.png')}
          style={styles.reactLogo}
        />
      }>
      <View>

        <Link href="/calculate-body-fat"  asChild>
          <Card
            elevate
            bordered
            backgroundColor="$color2"
            p="$3"
            m="$3"
            borderRadius="$6"
          >
            <XStack style={{alignSelf:"center", justifyContent: "space-between"}}  space="$3">
              <XStack  style={{alignSelf:"center"}}  space="$2">
                <Activity size={18} color="$color10"/>
                <Paragraph size="$3" fontWeight="600">
                  Check your body fat %
                </Paragraph>
              </XStack>
            </XStack>
          </Card>
        </Link>

        <Calendar></Calendar>
      </View>
    </ParallaxScrollView>
  )
}

export default index

const styles = StyleSheet.create({
  reactLogo: {
    height: 200,
    width: 200,
    bottom: 0,
    alignSelf: 'center',
    position: 'absolute',
  },
});