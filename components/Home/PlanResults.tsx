import { Text, View, XStack } from "tamagui";
import { useEffect, useState } from "react";
import { Firebase } from '@/providers/Firebase';
import CircularProgressCard from '@/components/Cards/CircularProgressCard';
import { capitalized, calculatePercent } from '@/helpers/diverse';
import FoodCard from '@/components/Cards/FoodCard';
import { nutrientsIcons } from '@/helpers/diverse';
import { useIsFocused } from '@react-navigation/native';

export default function PlanResults({selectedDay}: {selectedDay: Date}){

  const [plan , setPlan] = useState<any>({});
  const [foods, setFoods] = useState<any>({});
  const isFocused = useIsFocused();
  const firebaseClient = new Firebase();

  useEffect(()=>{
    if (!isFocused) return;
    getUserPlan();
  }, [isFocused]);

  useEffect(()=>{
    if (!isFocused) return;
    getUserFood();
  }, [isFocused, selectedDay]);

  async function getUserFood(){
    const foodResult:  {isResolved: boolean, data: any[]} = await firebaseClient.getUserFoodByDay(selectedDay);
    if (!foodResult.isResolved || !foodResult.data) {
      console.log("getting user foods could not be resolved", foodResult);
      return;
    }
    const foods = foodResult.data;
    let calories = 0, carbohydrate = 0, fat = 0, protein = 0;
    foods.forEach((food)=>{
      calories += Number(food.calories ?? 0);
      carbohydrate += Number(food.carbohydrate ?? 0);
      fat += Number(food.fat ?? 0);
      protein += Number(food.protein ?? 0);
    });
    setFoods({
      totals: {calories, carbohydrate, fat, protein},
      meals: foods,
    });
  }

  async function getUserPlan(){
    const planResult = await firebaseClient.getUserPlan();
    if (!planResult.isResolved || !planResult.data) {
      console.log("getting user plan could not be resolved", planResult);
      return;
    }
    const userPlan = planResult.data;
    setPlan(userPlan);
  };

  function acceptedKeysCards(keys: string[]){
    const accepted = ['calories', 'carbohydrate', 'fat', 'protein']
    return keys.filter((key)=>accepted.includes(key))
  }

  return (
    <View>

      <XStack style={{marginTop: 5, justifyContent: "center", alignItems: "center"}} flexWrap="wrap" gap={5} >
        {acceptedKeysCards(Object.keys(plan)).map((key: string, index: number)=>{
          const targe = plan[key] ?? 0;
          const value = foods?.totals?.[key] ?? 0;
          const procent = calculatePercent(value, targe)
          return <CircularProgressCard
            key={index}
            size={90}
            width={6}
            fill={procent}
            title={capitalized(key)}
            subtitle={`${value} / ${targe}`}
            icon={nutrientsIcons?.[key] ? nutrientsIcons?.[key] : null}
          />
        })}
      </XStack>

      {foods?.meals?.map((food: any, index: number)=>{
        return <FoodCard
          key={index}
          food={food}
        />
      })}

    </View>
  )
}