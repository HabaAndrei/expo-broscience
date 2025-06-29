import { View, Text } from 'react-native';
import PlanCard from '@/components/Cards/PlanCard';
import { Button, H5, XStack } from 'tamagui';

const totalDetails: any = {
  calories: {
    title: '',
    paragraph: 'Calories',
    label: 'Calories'
  },
  carbs: {
    title: ' g',
    paragraph: 'Carbs',
    label: 'Carbs'
  },
  protein: {
    title: ' g',
    paragraph: 'Protein',
    label: 'Protein'
  },
  fats: {
    title: ' g',
    paragraph: 'Fats',
    label: 'Fats'
  },
  total_quantity: {
    title: ' g',
    paragraph: 'Total quantity',
    label: 'Total quantity'
  }
}


export default function ResultFoodAnalysis(props: any){

  let existsTotals = false;
  if (props?.analysis?.totals && typeof props?.analysis?.totals == 'object' && Object?.keys(props?.analysis?.totals)?.length) {
    existsTotals = true;
  }
  const totals = props?.analysis?.totals;

  function editTotalValues(key: string, value: string){
    props.setAnalysis((prev: any)=>{
      return {...prev, totals: {...prev.totals, [key]: value}}
    })
  }

  return (
    <View>

      { existsTotals ?
        <View style={{alignItems: 'center'}} >
          <H5>Food analysis</H5>

          <Text>Name: {props.analysis.name} </Text>
          <Text>Health score: {props.analysis.health_score} </Text>

          <XStack style={{marginTop: 10}} flexWrap="wrap" gap={6} justifyContent="center" alignItems="center">
            {Object?.keys(props?.analysis?.totals)?.map((key: string, index: number) => (

              <PlanCard
                key={index}
                title={totals[key] + totalDetails[key].title}
                paragraph={totalDetails[key].paragraph}
                button={"Edit"}
                edit={
                  {
                    inputValue: totals[key],
                    func: (newValsss: string)=>editTotalValues(key, newValsss),
                    title: totalDetails[key].paragraph,
                    description: "Edit value",
                    label: totalDetails[key].label,
                    buttonComponent:
                      <Button borderRadius="$10" alignSelf="center" size="$2">
                        Edit
                      </Button>
                  }
                }
              />
            ))}
          </XStack>
        </View> : null
      }

    </View>
  )

}

