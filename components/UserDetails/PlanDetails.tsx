import { View } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { XStack, YStack, Text, Card } from 'tamagui';
import { AlertTriangle } from '@tamagui/lucide-icons';
import LoadingOverlay from '@/components/LoadingOverlay';
import { EnvConfig } from '@/providers/EnvConfig';
import { calculateMacrosAndHealthScore } from '@/helpers/diverse';
import PlanDetailsCards from '@/components/UserDetails/PlanDetailsCards';
import { PlanInputType } from '@/types/food';

export default function PlanDetails(props: any){

  const [plan, setPlan] = useState<any>({});
  const [isError, setIsError] = useState(false);

  useEffect(()=>{
    if (props?.value?.pages?.PlanDetails?.plan && Object.keys(props?.value?.pages?.PlanDetails?.plan)?.length){
      setPlan(props?.value?.pages?.PlanDetails?.plan);
    }else{
      generatePlan();
    }
  }, [props?.value?.pages?.PlanDetails?.plan]);

  function generatePlanWithFormula({ gender, workouts, height, weight, goal, age }: PlanInputType){
    const resultPlan =  calculateMacrosAndHealthScore({ gender, workouts, height, weight, goal, age });
    props.setUserPlan(resultPlan);
    setPlan(resultPlan);
  }

  async function generatePlanWithAi({ gender, workouts, height, weight, goal, age }: PlanInputType){
    try {
      const plan: any = await axios.post(EnvConfig.get('serverAddress') + "/nutrition-plan",
        { gender, workouts, height, weight, goal, age }
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


  async function generatePlan(){
    const userDetails = props.getUserDetails();
    const age = new Date()?.getFullYear() - new Date(userDetails?.bornDate).getFullYear();
    const { gender, workouts, height, goal, weight } = userDetails;
    // two functions:

    // generated with ai or with a math formula

    // generatePlanWithAi({ gender, workouts, height, weight, goal, age });
    generatePlanWithFormula({ gender, workouts, height, weight, goal, age });
  }

  function editPlan(details: {key: string, value: string}){
    if (isNaN(Number(details.value))) return;
    let _plan: any = {...plan};
    _plan[details.key] = details.value
    setPlan(_plan)
    props.setUserPlan(_plan);
  }

  return (
    <View>

      {Object?.keys(plan)?.length ?
        <PlanDetailsCards
          plan={plan}
          editPlan={editPlan}
          title={"Daily plan to achieve"}
        />: null
      }

      {!isError && !Object?.keys(plan)?.length ?
        <LoadingOverlay></LoadingOverlay> : null
      }

      {isError && !Object?.keys(plan)?.length?
          <YStack style={{alignItems: "center", justifyContent: "center"}} mt="$6" px="$4">
          <Card elevate size="$4" bordered backgroundColor="$red2" borderColor="$red8" width="90%" p="$4">
            <XStack style={{alignItems: "center"}} space="$3">
              <AlertTriangle size={24} color="#B00020" />
              <YStack paddingInline={20} >
                <Text fontWeight="700" fontSize="$5" color="$red10">Something went wrong</Text>
                <Text fontSize="$3" color="$red9">We couldn't generate your plan.</Text>
              </YStack>
            </XStack>
          </Card>
        </YStack>
       : null
      }

    </View>
  )
}