import { Button, H6, XStack } from "tamagui";
import PlanCard from "@/components/Cards/PlanCard";

const nutrientsLabels: any = {
  calories: {
    title: '',
    paragraph: 'Calories',
    label: 'Calories'
  },
  carbohydrate: {
    title: ' g',
    paragraph: 'carbohydrate',
    label: 'carbohydrate'
  },
  fat: {
    title: ' g',
    paragraph: 'fat',
    label: 'fat'
  },
  protein: {
    title: ' g',
    paragraph: 'Protein',
    label: 'Protein'
  },
  metric_serving_amount: {
    title: '',
    paragraph: 'Quantity',
    label: 'Quantity'
  }
}

export default function SelectedOption(props: any) {

  const editable = props?.selected?.editable ?? {};
  const { metric_serving_unit } = editable;

  // This line ensures that the 'quantity' property is the first property in the object
  let selectedValue = {metric_serving_amount: editable.metric_serving_amount, ...editable};

  /**
   * Updates the nutrient values when the quantity changes.
   * Ensures the values per gram are recalculated with up to 3 decimal places.
   * If the input quantity is invalid or < 1, it defaults to 1.
   */
  function editQuantityValue(key: string, newVal: string | number) {

    console.log({newVal, key});

    // If newVal is not a number, do nothing
    // Only process if the edited key is "quantity"
    if ((key !== 'metric_serving_amount') || isNaN(Number(newVal))) return;

    let quantity = Number(newVal);
    // Ensure the quantity is at least 1
    if (isNaN(quantity) || quantity < 1) quantity = 1;

    const exQuantity = selectedValue?.['metric_serving_amount'];
    // If there's no previous quantity or the new one is the same, do nothing
    if (!exQuantity || exQuantity === quantity) return;

    // Extract the current nutrient values
    let { calories, carbohydrate, protein, fat } = selectedValue;

    calories = Number(calories);
    carbohydrate = Number(carbohydrate);
    protein = Number(protein);
    fat = Number(fat);

    // Calculate the nutrient values per 1 gram, rounded
    const calories1g = +(calories / exQuantity).toFixed(3);
    const carbohydrate1g = +(carbohydrate / exQuantity).toFixed(3);
    const protein1g = +(protein / exQuantity).toFixed(3);
    const fats1g = +(fat / exQuantity).toFixed(3);

    // Update the selected values with the recalculated nutrients
    props.setSelected((prev: any) => ({
      ...prev,
      editable: {
        calories: +(calories1g * quantity).toFixed(3),
        carbohydrate: +(carbohydrate1g * quantity).toFixed(3),
        protein: +(protein1g * quantity).toFixed(3),
        fat: +(fats1g * quantity).toFixed(3),
        metric_serving_amount: quantity,
        metric_serving_unit: metric_serving_unit
      }
    }));
  }

  /**
   * Filters out the 'metric_serving_unit' property from the list of keys
   * (because 'metric_serving_unit' is not a nutrient or editable value).
   */
  function filterKeys(keys: string[]) {
    let newKeys = keys.filter((key) => {
      if (key != 'metric_serving_unit') {
        return true;
      }
    })
    return newKeys;
  }

  return (
    <>
      <XStack gap="$2" mt="$3" style={{ justifyContent: "center" }}>
        <H6>{props.selected.name}</H6>
      </XStack>
      <XStack style={{marginTop: 30, justifyContent: "center", alignItems: "center"}} flexWrap="wrap" gap={6} >
        {filterKeys(Object?.keys(selectedValue)).map((key, index) => (
          <PlanCard
            key={index}
            title={selectedValue?.[key] + nutrientsLabels?.[key]?.title}
            paragraph={nutrientsLabels?.[key]?.paragraph}
            button={key === 'quantity' ? "Edit" : null}
            // If the field is "metric_serving_amount", add an edit form inside the PlanCard
            edit={
              key === 'metric_serving_amount'
                ? {
                    inputValue: `${selectedValue?.[key]}`,
                    func: (newVal: string) => editQuantityValue(key, newVal),
                    title: nutrientsLabels?.[key]?.paragraph,
                    description: "Edit value",
                    label: nutrientsLabels?.[key]?.label,
                    buttonComponent: (
                      <Button style={{ alignSelf: "center" }} size="$2">
                        Edit
                      </Button>
                    )
                  }
                : null
            }
          />
        ))}
      </XStack>
    </>
  )
}