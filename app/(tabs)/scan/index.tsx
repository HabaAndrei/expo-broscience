import { View, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import CameraUploader from '@/components/Scan/CameraUploader';
import { useState } from 'react';
import { Button, Card, Text, Spinner } from 'tamagui';
import { Image } from "expo-image";
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import { base64Image } from '@/helpers/diverse';

export default function ScanIndex(){

  const [uri, setUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function analyzeImage(){
    if (!uri || isLoading) return;
    let image = await base64Image(uri);
    try {
      setIsLoading(true);
      const result = await axios.post(EnvConfig.get('serverAddress') + '/analyzeImage',
        {image}, { 'headers': { 'Content-Type': 'application/json' }}
      );
      console.log(result);
      setIsLoading(false);
    } catch(err) {
      setIsLoading(false);
      console.log(err);
    }
  }


  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Scan food",
          headerRight: () => <HomeButton />
        }}
      />

      <ScrollView style={{ flex: 1 }}>
        <CameraUploader setUri={setUri} uri={uri} />

        <Card elevate bordered margin="$2">
          <View style={styles.cardRow}>
            {/* left content */}
            <View style={styles.imageContainer}>
              <Image
                source={uri ? {uri} : require('@/assets/images/no-image.png')}
                contentFit="cover"
                style={styles.imagePreview}
              />
            </View>

            {/* right content */}
            <View style={styles.rightContent}>
              <View >
                <Text  style={styles.textInstruction} >
                  { uri ? 'The image was successfully uploaded.' : 'Please upload an image to proceed.'}
                </Text>
                <Text style={styles.textInstruction} >
                  { uri ? 'Press the button if you want to receive the analysis.' : ''}
                </Text>
              </View>

              {uri && <View style={styles.buttonContainer}>
                <Button
                  width={80}
                  size="$3"
                  themeInverse
                  onPress={analyzeImage}
                >
                  Analyze
                  {isLoading ? <Spinner color="grey" /> : null}
                </Button>
              </View>
              }
            </View>
          </View>
        </Card>

      </ScrollView>
    </>
  );
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