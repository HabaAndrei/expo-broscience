import { Text, View } from "tamagui";
import { useEffect, useState } from "react";
import { Firebase } from '@/providers/Firebase';


export default function PlanResults({selectedDay}: {selectedDay: Date}){

  const [plan , setPlan] = useState({});
  const firebaseClient = new Firebase();

  useEffect(()=>{
    console.log(selectedDay, ' = ');
  }, [selectedDay]);

  useEffect(()=>{
    getUserPlan();
  }, []);

  async function getUserPlan(){
    const planResult = await firebaseClient.getUserPlan();
    if (!planResult.isResolved || !planResult.data) {
      console.log("getting user plan could not be resolved", planResult);
      return;
    }
    const userPlan = planResult.data;
  }

  return (
    <View>
      <Text>okokokok</Text>
    </View>
  )
}