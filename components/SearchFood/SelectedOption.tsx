import { Button, H6, XStack } from "tamagui";
import PlanCard from "@/components/Cards/PlanCard";
import { PlusSquare } from '@tamagui/lucide-icons';
import { nutrientsLabels } from '@/helpers/diverse';
import { useRef } from "react";
import { Firebase } from '@/providers/Firebase';
import { useRouter } from 'expo-router';
import { useToastNotification } from '@/contexts/ToastNotificationContext';

export default function SelectedOption({ selected, setSelected }: any) {

  const isStoring = useRef(false);
  const router = useRouter();
  const firebaseClient = new Firebase();
  const { addNotification } = useToastNotification()


  const editable = selected?.editable ?? {};
  const { metric_serving_unit = '' } = editable;
  const { food_name, brand_name } = selected;

  let selectedValue = {
    ...editable,
    metric_serving_amount: Math.trunc(Number(editable.metric_serving_amount)),
  };
  // Ensure metric_serving_amount is the first property shown
  selectedValue = {metric_serving_amount: selectedValue.metric_serving_amount, ...selectedValue};

  async function storeFood(){

    if (isStoring.current) return;
    isStoring.current = true;

    const {calories, carbohydrate, fat, metric_serving_amount, metric_serving_unit, protein } = selectedValue;
    const fieldsToStore = {
      calories: Number(calories),
      carbohydrate: Number(carbohydrate),
      protein: Number(protein),
      fat: Number(fat),
      metricServingAmount: Number(metric_serving_amount),
      metricServingUnit: metric_serving_unit,
      foodName: food_name,
      healthScore: null,
      brandName: brand_name,
      type: "db"
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



  /**
   * Updates nutrient values based on quantity changes.
   */
  function editQuantityValue(key: string, newVal: string | number) {
    if (key !== 'metric_serving_amount' || isNaN(Number(newVal))) return;

    let quantity = Number(newVal);
    if (isNaN(quantity) || quantity < 1) quantity = 1;

    const exQuantity = selectedValue.metric_serving_amount;
    if (!exQuantity || exQuantity === quantity) return;

    const { calories = 0, carbohydrate = 0, protein = 0, fat = 0 } = selectedValue;

    const calories1g = +(Number(calories) / exQuantity).toFixed(3);
    const carbohydrate1g = +(Number(carbohydrate) / exQuantity).toFixed(3);
    const protein1g = +(Number(protein) / exQuantity).toFixed(3);
    const fats1g = +(Number(fat) / exQuantity).toFixed(3);

    setSelected((prev: any) => ({
      ...prev,
      editable: {
        calories: +(calories1g * quantity).toFixed(3),
        carbohydrate: +(carbohydrate1g * quantity).toFixed(3),
        protein: +(protein1g * quantity).toFixed(3),
        fat: +(fats1g * quantity).toFixed(3),
        metric_serving_amount: quantity,
        metric_serving_unit
      }
    }));
  }

  /**
   * Removes non-editable or non-nutrient fields from display.
   */
  function filterKeys(keys: string[]) {
    return keys.filter((key) => key !== 'metric_serving_unit');
  }

  return (
    <>
      <XStack gap="$2" mt="$3" style={{justifyContent: "center"}}>
        <H6>{food_name}</H6>
      </XStack>
      <XStack gap="$2" style={{alignSelf: 'center'}} >
        <Button size="$4" iconAfter={PlusSquare} onPress={storeFood} >
          Add to My Foods
        </Button>
      </XStack>
      <XStack mt="$3" style={{justifyContent: "center", alignItems: "center"}}  flexWrap="wrap" gap={6}>
        {filterKeys(Object.keys(selectedValue)).map((key, index) => {
          const value = selectedValue?.[key];
          const labelConfig = nutrientsLabels?.[key] ?? {
            title: '',
            paragraph: key,
            label: key
          };

          const unitSuffix = key === 'metric_serving_amount' && metric_serving_unit
            ? ` ${metric_serving_unit}`
            : labelConfig.title;

          return (
            <PlanCard
              key={index}
              title={`${value}${unitSuffix}`}
              paragraph={labelConfig.paragraph}
              button={key === 'metric_serving_amount' ? "Edit" : null}
              edit={
                key === 'metric_serving_amount'
                  ? {
                      inputValue: String(value),
                      func: (newVal: string) => editQuantityValue(key, newVal),
                      title: labelConfig.paragraph,
                      description: "Enter new amount",
                      label: labelConfig.label,
                      buttonComponent: (
                        <Button style={{ alignSelf: "center" }} size="$2">
                          Edit
                        </Button>
                      )
                    }
                  : null
              }
            />
          );
        })}
      </XStack>
    </>
  );
}