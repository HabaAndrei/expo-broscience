import { Button, XStack } from "tamagui";
import PlanCard from "@/components/Cards/PlanCard";
import { ingredientsLabels  } from '@/helpers/diverse';

const newIngredientsLabels = {
  ...ingredientsLabels,
  quantity: {
    title: ' g',
    paragraph: 'Quantity',
    label: 'Quantity'
  }
}

export default function SelectedOption(props:any){

  let selectedValue = {quantity: props.selected.quantity, ...props.selected};

  function editQuantityValue(key: string, newVal: string | number) {

    if (isNaN(Number(newVal))) return;
    if (key !== 'quantity') return;

    let quantity = Number(newVal);
    if (isNaN(quantity) || quantity < 1) quantity = 1;

    const exQuantity = selectedValue?.['quantity'];
    if (!exQuantity || exQuantity === quantity) return;

    const { calories, carbs, protein, fats } = selectedValue;

    const calories1g = +(calories / exQuantity).toFixed(3);
    const carbs1g = +(carbs / exQuantity).toFixed(3);
    const protein1g = +(protein / exQuantity).toFixed(3);
    const fats1g = +(fats / exQuantity).toFixed(3);

    props.setSelected((prev: any) => ({
      ...prev,
      calories: +(calories1g * quantity).toFixed(3),
      carbs: +(carbs1g * quantity).toFixed(3),
      protein: +(protein1g * quantity).toFixed(3),
      fats: +(fats1g * quantity).toFixed(3),
      quantity: quantity
    }));
  }



  function filterKeys(keys: string[]){
    let newKeys = keys.filter((key)=>{
      if (key != 'name') {
        return true;
      }
    })
    return newKeys;
  }

  return (
    <XStack style={{marginTop: 30, justifyContent: "center", alignItems: "center"}} flexWrap="wrap" gap={6} >
      {filterKeys(Object?.keys(selectedValue)).map((key, index) => (
        <PlanCard
          key={index}
          title={selectedValue?.[key] + newIngredientsLabels?.[key]?.title}
          paragraph={newIngredientsLabels?.[key]?.paragraph}
          button={ key === 'quantity' ? "Edit" : null }
          edit={
            key === 'quantity' ?
            {
              inputValue: `${selectedValue?.[key]}`,
              func: (newVal: string)=>editQuantityValue(key, newVal),
              title: newIngredientsLabels?.[key]?.paragraph,
              description: "Edit value",
              label: newIngredientsLabels?.[key]?.label,
              buttonComponent:
                <Button style={{alignSelf: "center"}} size="$2">
                  Edit
                </Button>
            } :null
          }
        />
      ))}
    </XStack>
  )
}