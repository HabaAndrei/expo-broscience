import { View, Text } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { XStack, H5 } from 'tamagui';
import PlanCard from '@/components/Cards/PlanCard';
import LoadingOverlay from '@/components/LoadingOveraly';

const detailsPlanText = {
  calories: {
    title: ' g',
    paragraph: 'Calories per day'
  },
  carbs: {
    title: ' g',
    paragraph: 'Carbs per day'
  },
  protein: {
    title: ' g',
    paragraph: 'Protein per day'
  },
  fats: {
    title: ' g',
    paragraph: 'Fats per day'
  },
  healthScore: {
    title: ' / 10',
    paragraph: 'Healty score'
  },
}

export default function PlanDetails(props: any){

  const [plan, setPlan] = useState({});
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    if (props?.value?.pages?.PlanDetails?.plan && Object.keys(props?.value?.pages?.PlanDetails?.plan)?.length){
      setPlan(props?.value?.pages?.PlanDetails?.plan);
    }else{
      generatePlan();
    }
  }, [props?.value?.pages?.PlanDetails?.plan]);

  async function generatePlan(){
    const userDetails = props.getUserDetails();
    const age = new Date()?.getFullYear() - userDetails?.bornDate?.getFullYear();
    try {
      const plan: any = await axios.post("http://127.0.0.1:8000/nutrition-plan",
        {
          gender: userDetails.gender,
          workouts: userDetails.workouts,
          height: userDetails.height,
          weight: userDetails.weight,
          age: age,
          goal: userDetails.goal,
        }
      );

      if (!plan.data.is_resolved){
        setIsError(true);
        console.log("i have to add an error message");
      }
      props.setUserPlan(plan.data.data);
      setPlan(plan.data.data);
    }catch(err){
      console.log(err);
      setIsError(true);
    }
  }

  return (
    <View>

      {Object?.keys(plan)?.length ?
        <View style={{alignItems: 'center'}} >
          <H5>Daily plan to achieve</H5>
          <XStack flexWrap="wrap" gap={6} justifyContent="center" alignItems="center">
            {Object?.keys(plan).map((key, index) => (
              <PlanCard
                key={index}
                title={plan?.[key] + detailsPlanText?.[key]?.title}
                paragraph={detailsPlanText?.[key]?.paragraph}
                button={"Edit"}
                func={()=>console.log("ok")}
              />
            ))}
          </XStack>
        </View> : null
      }

      {!isError && !Object?.keys(plan)?.length ?
        <LoadingOverlay></LoadingOverlay> : null
      }

      {isError && !Object?.keys(plan)?.length?
        <Text>Error message</Text> : null
      }

    </View>
  )
}