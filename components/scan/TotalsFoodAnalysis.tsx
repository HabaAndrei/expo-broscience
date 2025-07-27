import { View } from 'react-native';
import PlanCard from '@/components/Cards/PlanCard';
import { Button, H5, Text, XStack, YStack } from 'tamagui';
import { ingredientsLabels } from '@/helpers/diverse';
import { PlusSquare } from '@tamagui/lucide-icons';
import { Firebase } from '@/providers/Firebase';
import { useRef } from 'react';
import { useRouter } from 'expo-router';
import { useToastNotification } from '@/contexts/ToastNotificationContext';


export default function TotalsFoodAnalysis(props: any) {

  const isStoring = useRef(false);
  const router = useRouter();
  const { addNotification } = useToastNotification()

  let existsTotals = false;
  if (
    props?.analysis?.totals &&
    typeof props?.analysis?.totals === 'object' &&
    Object?.keys(props?.analysis?.totals)?.length
  ) {
    existsTotals = true;
  }

  const totals = props?.analysis?.totals;

  const firebaseClient = new Firebase();

  function editTotalValues(key: string, value: string) {
    if (isNaN(Number(value))) return;
    props.setAnalysis((prev: any) => {
      return {
        ...prev,
        totals: { ...prev.totals, [key]: value }
      };
    });
  }

  async function storeFood(){

    if (isStoring.current) return;

    isStoring.current = true;
    const { health_score, name, total_quantity } = props.analysis;
    const { calories, protein, carbs, fats } = totals;

    const fieldsToStore = {
      calories,
      carbohydrate: carbs,
      protein,
      fat: fats,
      metricServingAmount: total_quantity,
      metricServingUnit: 'g',
      foodName: name,
      healthScore: health_score,
      brandName: '',
      type: "scan"
    }
    const responseSave: any = await firebaseClient.storeUsersFood(fieldsToStore);
    isStoring.current = false;

    if (responseSave.isResolved == true) router.replace("/")
    else {
      addNotification(
        {
          type: 'error',
          title: 'Error!',
          description: 'Please try again.',
        }
      )
    }

  }

  return (
    <View>
      {existsTotals ? (
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <H5>Food Analysis</H5>

          <YStack gap="$2" mt="$2" >
            <XStack gap="$2" style={{alignItems: 'center'}}>
              <Text fontWeight="bold">Name:</Text>
              <Text>{props.analysis.name || 'N/A'}</Text>
            </XStack>
            <XStack gap="$2" style={{alignItems: 'center'}}>
              <Text fontWeight="bold">Health Score:</Text>
              <Text>{props.analysis.health_score ?? 'N/A'}</Text>
            </XStack>
            <XStack gap="$2" style={{alignSelf: 'center'}} >
              <Button size="$4" iconAfter={PlusSquare} onPress={storeFood} >
                Add to My Foods
              </Button>
            </XStack>
          </YStack>

          <XStack
            mt="$3"
            flexWrap="wrap"
            gap="$3"
            style={{justifyContent: "center", alignItems: "center"}}
          >
            {Object?.keys(totals)?.map((key: string, index: number) => (
              <PlanCard
                key={index}
                title={totals[key] + ingredientsLabels[key].title}
                paragraph={ingredientsLabels[key].paragraph}
                button={'Edit'}
                edit={{
                  inputValue: totals[key],
                  func: (newVal: string) => editTotalValues(key, newVal),
                  title: ingredientsLabels[key].paragraph,
                  description: 'Edit value',
                  label: ingredientsLabels[key].label,
                  buttonComponent: (
                    <Button style={{alignSelf: "center"}} size="$2">
                      Edit
                    </Button>
                  )
                }}
              />
            ))}
          </XStack>
        </View>
      ) : null}
    </View>
  );
}
