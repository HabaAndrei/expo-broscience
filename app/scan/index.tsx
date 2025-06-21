import { View, Text, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import CameraUploader from '@/components/scan/CameraUploader';
import { useState } from 'react';
import { Button } from 'tamagui';
import { Image } from "expo-image";

export default function ScanIndex(){

  const [uri, setUri] = useState<string | null>(null);

  const renderPicture = () => {
    return (
      <View style={styles.imagePreviewContainer}>
        <Image
          source={{ uri }}
          contentFit="contain"
          style={styles.imagePreview}
        />
        <Button
          size="$4"
          theme="active"
          marginTop="$4"
          themeInverse
        >
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
          headerRight: () => <HomeButton/>
        }}
      />
      <View style={{flex: 1}} >
        <CameraUploader setUri={setUri} uri={uri}/>
      </View>
      <View>
        {uri ? renderPicture() : null}
      </View>
    </>
  )
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