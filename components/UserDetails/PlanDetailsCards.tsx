import { View } from 'react-native';
import { XStack, H5, Button } from 'tamagui';
import PlanCard from '@/components/Cards/PlanCard';
import { Plan } from '@/types/food';

type PlanNutrientLabel = {
  title: string;
  paragraph: string;
  label: string;
};

type DetailsPlanText = {
  calories: PlanNutrientLabel;
  carbohydrate: PlanNutrientLabel;
  protein: PlanNutrientLabel;
  fat: PlanNutrientLabel;
  healthScore: PlanNutrientLabel;
};

export default function PlanDetailsCards({ plan, editPlan, title }:
  {plan: Plan, editPlan: ({key, value}: {key: string, value: string})=>void, title: string}
){

  const detailsPlanText: DetailsPlanText = {
    calories: {
      title: '',
      paragraph: 'Calories per day',
      label: 'Calories'
    },
    carbohydrate: {
      title: ' g',
      paragraph: 'Carbs per day',
      label: 'Carbs'
    },
    protein: {
      title: ' g',
      paragraph: 'Protein per day',
      label: 'Protein'
    },
    fat: {
      title: ' g',
      paragraph: 'Fats per day',
      label: 'Fats'
    },
    healthScore: {
      title: ' / 10',
      paragraph: 'Healty score',
      label: 'Healty score'
    },
  };


  return (
    <View style={{alignItems: 'center'}} >
      {title ? <H5>{title}</H5> : null}
      <XStack style={{marginTop: 30, justifyContent: "center", alignItems: "center"}} flexWrap="wrap" gap={6} >
        {Object?.keys(plan).map((key, index) => (
          <PlanCard
            key={index}
            title={plan?.[key] + detailsPlanText?.[key]?.title}
            paragraph={detailsPlanText?.[key]?.paragraph}
            button={"Edit"}
            edit={
              {
                inputValue: `${plan?.[key]}`,
                func: (newVal: string)=>editPlan({key: key, value: newVal}),
                title: `${detailsPlanText?.[key]?.paragraph}`,
                description: "Edit value",
                label: `${detailsPlanText?.[key]?.label}`,
                buttonComponent:
                  <Button style={{alignSelf: "center"}} size="$2">
                    Edit
                  </Button>
              }
            }
          />
        ))}
      </XStack>
    </View>
  )

}