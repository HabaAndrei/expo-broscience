import { View, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import CameraUploader from '@/components/Scan/CameraUploader';
import { useState } from 'react';
import { Button } from 'tamagui';
import { Image } from "expo-image";
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import { base64Image } from '@/helpers/diverse';

export default function ScanIndex(){

  const [uri, setUri] = useState<string | null>(null);

  async function analyzeImage(){

    if (!uri) return;
    let image = await base64Image(uri);
    try {
      const result = await axios.post(EnvConfig.get('serverAddress') + '/analyzeImage',
        {image}, { 'headers': { 'Content-Type': 'application/json' }}
      );
      console.log(result);

    } catch(err) {
      console.log(err);
    }
  }

  const renderPicture = () => {
    return (
      <View style={styles.imagePreviewContainer}>
        {uri ?
          <Image
            source={{ uri }}
            contentFit="contain"
            style={styles.imagePreview}
          /> : null
        }
        <Button onPress={analyzeImage} size="$4" theme="active" marginTop="$4" themeInverse >
          Analyze
        </Button>
      </View>
    );
  };

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
        {uri ? <View>{renderPicture()}</View> : null}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  imagePreviewContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  imagePreview: {
    width: 300,
    height: 300,
    borderRadius: 12,
  },
})