import { View, StyleSheet } from 'react-native';
import { Button, Card, Text, Spinner } from 'tamagui';
import { Image } from "expo-image";

export default function CardFoodImage(props: any){
  return (
  <Card elevate bordered margin="$2">
    <View style={styles.cardRow}>
      {/* left content */}
      <View style={styles.imageContainer}>
        <Image
          source={props.uri ? {uri: props.uri} : require('@/assets/images/no-image.png')}
          contentFit="cover"
          style={styles.imagePreview}
        />
      </View>

      {/* right content */}
      <View style={styles.rightContent}>
        <View >

          {props.analysisError.isError ?
            <Text style={styles.textInstruction}>{props.analysisError.message}</Text> :
            <>
              <Text  style={styles.textInstruction} >
                { props.uri ? 'The image was successfully uploaded.' : 'Please upload an image to proceed.'}
              </Text>
              <Text style={styles.textInstruction} >
                { props.uri ? 'Press the button if you want to receive the analysis.' : ''}
              </Text>
            </>
          }
        </View>

        {props.uri && <View style={styles.buttonContainer}>
          <Button
            width={80}
            size="$3"
            themeInverse
            onPress={props.analyzeImage}
          >
            Analyze
            {props.isLoading ? <Spinner color="grey" /> : null}
          </Button>
        </View>
        }
      </View>
    </View>
  </Card>
  )
}

const styles = StyleSheet.create({
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    paddingRight: 10,
  },
  imagePreview: {
    width: '100%',
    height: 160,
    borderRadius: 10,
  },
  rightContent: {
    flex: 1,
    paddingHorizontal: 5,
    justifyContent: 'center',
  },
  textInstruction: {
    fontSize: 13,
    marginBottom: 5
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 10,
  },
})