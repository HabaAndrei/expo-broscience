import { View } from 'react-native';
import { XStack, YStack, Text, Button, H6 } from 'tamagui';
import PlanCard from '@/components/Cards/PlanCard';
import { totalDetails } from '@/helpers/diverse';
import { Trash2 } from '@tamagui/lucide-icons'

const ingredientsLabels = {
  ...totalDetails,
  quantity: {
    title: ' g',
    paragraph: 'Total quantity ',
    label: 'Total quantity'
  }
};

export default function IngredientsFoodAnalysis(props: any) {
  let ingredients = props?.analysis?.ingredients;

  function editVlues({ key, newVal, index }: { key: string, newVal: string, index: number }) {
    ingredients[index][key] = newVal;
    props.setAnalysis((prev: any) => {
      return { ...prev, ingredients: [...ingredients] };
    });
  }

  function deleteIngredient(index: number){
    console.log('delete => ', index);
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
                func: (newVal: string) => editVlues({ key, newVal, index }),
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

  return (
    <View style={{ alignItems: 'center', marginVertical: 15 }}>
      {ingredients?.length ?
        <>
          <YStack gap="$2" mt="$2" mb="$2">
            <XStack gap="$2" style={{ alignItems: "center" }}>
              <H6>Ingredients</H6>
            </XStack>
          </YStack>

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
        </> : null
      }
    </View>
  );
}
