import { Button, H6, XStack } from "tamagui";
import PlanCard from "@/components/Cards/PlanCard";
import { ingredientsLabels } from '@/helpers/diverse';

// Extending the ingredient labels to include a new entry for "quantity"
const newIngredientsLabels = {
  ...ingredientsLabels,
  quantity: {
    title: ' g',
    paragraph: 'Quantity',
    label: 'Quantity'
  }
}

export default function SelectedOption(props: any) {

  // This line ensures that the 'quantity' property is the first property in the object
  let selectedValue = {quantity: props.selected.quantity, ...props.selected};

  /**
   * Updates the nutrient values when the quantity changes.
   * Ensures the values per gram are recalculated with up to 3 decimal places.
   * If the input quantity is invalid or < 1, it defaults to 1.
   */
  function editQuantityValue(key: string, newVal: string | number) {

    // If newVal is not a number, do nothing
    // Only process if the edited key is "quantity"
    if ((key !== 'quantity') || isNaN(Number(newVal))) return;

    let quantity = Number(newVal);
    // Ensure the quantity is at least 1
    if (isNaN(quantity) || quantity < 1) quantity = 1;

    const exQuantity = selectedValue?.['quantity'];
    // If there's no previous quantity or the new one is the same, do nothing
    if (!exQuantity || exQuantity === quantity) return;

    // Extract the current nutrient values
    const { calories, carbs, protein, fats } = selectedValue;

    // Calculate the nutrient values per 1 gram, rounded
    const calories1g = +(calories / exQuantity).toFixed(3);
    const carbs1g = +(carbs / exQuantity).toFixed(3);
    const protein1g = +(protein / exQuantity).toFixed(3);
    const fats1g = +(fats / exQuantity).toFixed(3);

    // Update the selected values with the recalculated nutrients
    props.setSelected((prev: any) => ({
      ...prev,
      calories: +(calories1g * quantity).toFixed(3),
      carbs: +(carbs1g * quantity).toFixed(3),
      protein: +(protein1g * quantity).toFixed(3),
      fats: +(fats1g * quantity).toFixed(3),
      quantity: quantity
    }));
  }

  /**
   * Filters out the 'name' property from the list of keys
   * (because 'name' is not a nutrient or editable value).
   */
  function filterKeys(keys: string[]) {
    let newKeys = keys.filter((key) => {
      if (key != 'name') {
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
            title={selectedValue?.[key] + newIngredientsLabels?.[key]?.title}
            paragraph={newIngredientsLabels?.[key]?.paragraph}
            button={key === 'quantity' ? "Edit" : null}
            // If the field is "quantity", add an edit form inside the PlanCard
            edit={
              key === 'quantity'
                ? {
                    inputValue: `${selectedValue?.[key]}`,
                    func: (newVal: string) => editQuantityValue(key, newVal),
                    title: newIngredientsLabels?.[key]?.paragraph,
                    description: "Edit value",
                    label: newIngredientsLabels?.[key]?.label,
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