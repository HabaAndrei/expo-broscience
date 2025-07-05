import { View } from 'react-native';
import PlanCard from '@/components/Cards/PlanCard';
import { Button, H5, Text, XStack, YStack } from 'tamagui';
import { ingredientsLabels } from '@/helpers/diverse';

export default function TotalsFoodAnalysis(props: any) {
  let existsTotals = false;
  if (
    props?.analysis?.totals &&
    typeof props?.analysis?.totals === 'object' &&
    Object?.keys(props?.analysis?.totals)?.length
  ) {
    existsTotals = true;
  }

  const totals = props?.analysis?.totals;

  function editTotalValues(key: string, value: string) {
    props.setAnalysis((prev: any) => {
      return {
        ...prev,
        totals: { ...prev.totals, [key]: value }
      };
    });
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
                  func: (newValsss: string) => editTotalValues(key, newValsss),
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
