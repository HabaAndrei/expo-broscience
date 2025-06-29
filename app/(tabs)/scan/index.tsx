import { View, ScrollView, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import CameraUploader from '@/components/Scan/CameraUploader';
import { useState } from 'react';
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import { base64Image } from '@/helpers/diverse';
import CardFoodImage from '@/components/Scan/CardFoodImage';

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
        <CameraUploader
          setUri={setUri}
          uri={uri}
        />
        <CardFoodImage
          uri={uri}
          isLoading={isLoading}
          analyzeImage={analyzeImage}
        />
      </ScrollView>
    </>
  );
}
