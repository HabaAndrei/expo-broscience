import { View } from 'react-native';
import { XStack, YStack, Text, Button, H6 } from 'tamagui';
import PlanCard from '@/components/Cards/PlanCard';
import { totalDetails } from '@/helpers/diverse';
import { Trash2 } from '@tamagui/lucide-icons'
import { useConfirmationDialog } from '@/contexts/ConfirmationDialogContext';

// Labels used to display ingredient details
const ingredientsLabels = {
  ...totalDetails,
  quantity: {
    title: ' g',
    paragraph: 'Total quantity ',
    label: 'Total quantity'
  }
};

export default function IngredientsFoodAnalysis(props: any) {
  const confirm = useConfirmationDialog();
  let ingredients = props?.analysis?.ingredients;

  // This function edits the values of an ingredient and updates the state variable
  function editValues({ key, newVal, index }: { key: string, newVal: string, index: number }) {
    ingredients[index][key] = newVal;
    props.setAnalysis((prev: any) => {
      return { ...prev, ingredients: [...ingredients] };
    });
  }


  async function deleteIngredient(index: number){
    // Ask the user for confirmation before proceeding with the delete action
    const isConfirmed = await confirm();
    if (!isConfirmed) return;

    // Remove the ingredient at the specified index from the array
    let updatedIngredients = [...ingredients]
    updatedIngredients.splice(index, 1);

    let calories = 0, protein = 0, carbs = 0, fats = 0, total_quantity = 0;

    // Recalculate the total values for each nutrient
    for(let ingredient of updatedIngredients){
      calories += ingredient.calories;
      protein += ingredient.protein;
      carbs += ingredient.carbs;
      fats += ingredient.fats;
      total_quantity += ingredient.quantity;
    }
    // Update the state variable with the new totals and ingredient list
    props.setAnalysis((prev: any) => {
      return {
        ...prev,
        totals: {calories, protein, carbs, fats, total_quantity},
        ingredients: [...updatedIngredients],
        total_quantity
      };
    });
  }

  function renderIngredientDetails(keysWithoutName: any, ingredient: any, index: number){
    return (
      <XStack
        mt="$3"
        flexWrap="wrap"
        gap="$3"
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        {keysWithoutName?.map((key: string, index_: number) => {
          return (
            <PlanCard
              key={index_}
              title={ingredient?.[key] + ingredientsLabels?.[key]?.title}
              paragraph={ingredientsLabels?.[key]?.paragraph}
              button={'Edit'}
              edit={{
                inputValue: ingredient?.[key],
                func: (newVal: string) => editValues({ key, newVal, index }),
                title: ingredientsLabels?.[key]?.paragraph,
                description: 'Edit value',
                label: ingredientsLabels?.[key]?.label,
                buttonComponent: (
                  <Button style={{alignSelf:"center"}} size="$2">
                    Edit
                  </Button>
                )
              }}
            />
          );
        })}
      </XStack>
    )
  }

  function renderIngredients(ingredients: any){
    return (
      <>
      {ingredients.map((ingredient: any, index: number) => {
        const keysWithoutName: any = [];
        Object.keys(ingredient).forEach((name) => { if (name != 'name') keysWithoutName.push(name); });

        return (
          <View style={{ marginTop: 20 }} key={index}>
            {/* ingredient name and delete button */}
            <XStack
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                marginLeft: 10,
                marginRight: 10
              }}
              borderBottomWidth={1}
              borderColor="#ccc"
            >
              <Text fontWeight="bold">{ingredient.name}</Text>
              <Button
                icon={Trash2}
                variant="outlined"
                size="$3"
                onPress={() => deleteIngredient(index)}
              >
                Delete
              </Button>
            </XStack>

            {/* Card with ingredient details */}
            {renderIngredientDetails(keysWithoutName, ingredient, index)}
          </View>
        );
      })}
      </>
    )
  }

  return (
    <View style={{ alignItems: 'center', marginVertical: 15 }}>
      {ingredients?.length ?
        <>
          <YStack gap="$2" mt="$2" mb="$2">
            <XStack gap="$2" style={{ alignItems: "center" }}>
              <H6>Ingredients</H6>
            </XStack>
          </YStack>
          {renderIngredients(ingredients)}
        </> : null
      }
    </View>
  );
}
