import { ScrollView, SafeAreaView } from 'react-native';
import { Stack } from 'expo-router';
import HomeButton from '@/components/Buttons/Home';
import CameraUploader from '@/components/Scan/CameraUploader';
import { useState } from 'react';
import axios from 'axios';
import { EnvConfig } from '@/providers/EnvConfig';
import { base64Image } from '@/helpers/diverse';
import CardFoodImage from '@/components/Scan/CardFoodImage';
import TotalsFoodAnalysis from '@/components/Scan/TotalsFoodAnalysis';
import IngredientsFoodAnalysis from '@/components/Scan/IngredientsFoodAnalysis';
import NavigationBar from '@/components/Scan/NavigationBar';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function ScanIndex() {

  const [uri, setUri] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisError, setAnalysisError] = useState({ isError: false, message: '' });
  const [analysis, setAnalysis] = useState({});

  const tabBarHeight = useBottomTabBarHeight();

  async function analyzeImage() {
    if (!uri || isLoading) return;
    let image = await base64Image(uri);
    try {
      if (analysisError.isError) {
        setAnalysisError({ isError: false, message: '' });
      }
      setIsLoading(true);
      const resultAnalyses = await axios.post(EnvConfig.get('serverAddress') + '/analyze-image',
        { image }, { headers: { 'Content-Type': 'application/json' } }
      );
      const result = resultAnalyses.data;
      if (!result?.is_resolved) {
        setAnalysisError({ isError: true, message: 'Try again. The analyses could not be resolved.' });
      } else if (!result?.data?.is_food) {
        setAnalysisError({ isError: true, message: 'Try again with a food image this time.' });
      }
      if (result?.is_resolved && result?.data?.is_food) {
        setAnalysis(result.data);
      }
      setIsLoading(false);

    } catch (err) {
      console.log(err);
      setAnalysisError({ isError: true, message: 'We had a system error. Please try again.' });
      setIsLoading(false);
    }
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "Scan food",
          // home botton from right up corner
          // headerRight: () => <HomeButton />
        }}
      />

      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingBottom: tabBarHeight }}
        >
          <NavigationBar actualScreen="scan" />
          <CameraUploader
            setUri={setUri}
            uri={uri}
          />
          <CardFoodImage
            uri={uri}
            isLoading={isLoading}
            analyzeImage={analyzeImage}
            analysisError={analysisError}
          />
          <TotalsFoodAnalysis
            analysis={analysis}
            setAnalysis={setAnalysis}
          />
          <IngredientsFoodAnalysis
            analysis={analysis}
            setAnalysis={setAnalysis}
          />
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
