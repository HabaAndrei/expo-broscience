import { useState } from "react";
import { Text, Button, YStack, RadioGroup, XStack, Card } from "tamagui";
import { Calculator } from "@tamagui/lucide-icons";
import { calculateBodyFat } from '@/helpers/diverse';
import SimpleSlider from '@/components/General/SimpleSlider';
import RadioGroupItemWithLabel from '@/components/RadioGroupItemWithLabel';

export default function CalculateBodyFat() {
  const [gender, setGender] = useState("male");
  const [waist, setWaist] = useState(70);
  const [neck, setNeck] = useState(40);
  const [height, setHeight] = useState(170);
  const [hips, setHips] = useState(90);
  const [result, setResult] = useState<null | number>(null);

  const handleCalculate = () => {
    const bodyFat = calculateBodyFat({ gender, waist, neck, height, hips });
    setResult(bodyFat);
  };

  return (
    <YStack space="$6" p="$6">

      {/* Info Card */}
      <Card
        padding="$3"
        backgroundColor="white"
      >
        <Text fontSize="$3" color="$color" fontStyle="italic">
        * This method is used by the US Navy to estimate body fat percentage.
        The typical error margin is approximately 3–4%.
        </Text>
      </Card>

      {/* Gender Selection with RadioGroup */}
      <RadioGroup value={gender} onValueChange={setGender} orientation="horizontal">
        <XStack space="$8">
          <RadioGroupItemWithLabel size="$4" value="male" label="Male" width={140} />
          <RadioGroupItemWithLabel size="$4" value="female" label="Female" width={140} />
        </XStack>
      </RadioGroup>

      {/* Waist */}
      <YStack space="$3">
        <Text>Waist: {waist} cm</Text>
        <SimpleSlider
          value={[waist]}
          defaultValue={waist}
          width={320}
          max={150}
          onValueChange={(newVal) => setWaist(newVal[0])}
        />
      </YStack>

      {/* Neck */}
      <YStack space="$3">
        <Text>Neck: {neck} cm</Text>
        <SimpleSlider
          value={[neck]}
          defaultValue={neck}
          width={320}
          max={70}
          onValueChange={(newVal) => setNeck(newVal[0])}
        />
      </YStack>

      {/* Height */}
      <YStack space="$3">
        <Text>Height: {height} cm</Text>
        <SimpleSlider
          value={[height]}
          defaultValue={height}
          width={320}
          max={220}
          onValueChange={(newVal) => setHeight(newVal[0])}
        />
      </YStack>

      {gender === "female" && (
        <YStack space="$3">
          <Text>Hips: {hips} cm</Text>
          <SimpleSlider
            value={[hips]}
            defaultValue={hips}
            width={320}
            max={150}
            onValueChange={(newVal) => setHips(newVal[0])}
          />
        </YStack>
      )}

      <Button size="$5" onPress={handleCalculate} mt="$4" icon={Calculator}>
        Calculate
      </Button>

      {result && (
        <Text style={{alignSelf: "center"}} fontSize={20} mt="$4">
          Estimated Body Fat: {result}%
        </Text>
      )}
    </YStack>
  );
}
