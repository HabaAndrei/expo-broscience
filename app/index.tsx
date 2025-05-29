import { supabase } from '@/utils/supabase';
import { Text, View } from "react-native";


export default function Home(){

  console.log(supabase);

  return (
    <View>
      <Text>Index tsx</Text>
    </View>
  )
}