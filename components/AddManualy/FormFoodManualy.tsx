import { useState, useRef, useEffect } from 'react';
import { View } from 'react-native';
import { YStack, XStack, Paragraph, Text, Input, Button, Card } from 'tamagui';
import SwitchWithLabel from '@/components/General/SwitchWithLabel';
import { PlusSquare } from '@tamagui/lucide-icons';
import { calculateCalories } from '@/helpers/diverse';
import { useToastNotification } from '@/contexts/ToastNotificationContext';
import { Firebase } from '@/providers/Firebase';
import { useRouter } from 'expo-router';

export default function FormFoodManualy() {

  const [editField, setEditField] = useState<string | null>(null);
  const calculateCaloriesAutomaticaly = useRef(false);
  const isStoring = useRef(false);

  const router = useRouter();
  const { addNotification } = useToastNotification();
  const firebaseClient = new Firebase();

  const [foodData, setFoodData] = useState({
    foodName: '',
    calories: '',
    carbohydrate: '',
    protein: '',
    fat: '',
    metricServingAmount: ''
  });

  useEffect(()=>{
    if (calculateCaloriesAutomaticaly.current) {
      addCalories();
    }
  }, [foodData]);

  const rows = [
    { key: 'foodName', label: 'Food Name' },
    { key: 'carbohydrate', label: 'Carbohydrate (g)' },
    { key: 'protein', label: 'Protein (g)' },
    { key: 'fat', label: 'Fat (g)' },
    { key: 'metricServingAmount', label: 'Serving Size (g)' },
    { key: 'calories', label: 'Calories (kcal)' },
  ];

  function addCalories(){
    const { carbohydrate, fat, protein } = foodData;
    if (Number(carbohydrate) > 0 || Number(fat) > 0 || Number(protein) > 0 ){
      const calories = calculateCalories({ carbohydrate, fat, protein });
      if (Number(calories) != Number(foodData.calories)) {
        setFoodData((prev)=>({...prev, 'calories': String(calories)}));
      }
    }
  }

  const handleChange = (key: string, value: string) => {
    setFoodData((prev) => ({ ...prev, [key]: value }));
  };

  const handleBlur = () => {
    setEditField(null);
  };

  async function storeFood() {
    isStoring.current = true;
    const { foodName, calories, carbohydrate, protein, fat, metricServingAmount } = foodData;
    if ( Number(carbohydrate) <= 0 && Number(fat) <= 0 && Number(protein) <= 0 && Number(calories) <= 0 ){
      addNotification(
        {
          type: 'error',
          title: 'Error!',
          description: 'Please fill in at least one value for calories, carbohydrates, protein, or fat.',
        }
      )
      isStoring.current = false;
      return;
    }
    const fieldsToStore = {
      calories: Number(calories) || 0,
      carbohydrate: Number(carbohydrate) || 0,
      protein: Number(protein) || 0,
      fat: Number(fat) || 0,
      metricServingAmount: Number(metricServingAmount) || 0,
      metricServingUnit: 'g',
      foodName: foodName || 'Manualy food',
      healthScore: null,
      brandName: '',
      type: "manualy"
    }
    const responseSave = await firebaseClient.storeUsersFood(fieldsToStore);
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
    <View style={{ flex: 1, alignItems: 'center', marginVertical: 10, marginHorizontal: 10 }}>
      {/* Table description */}
      <Card
        padding="$3"
        borderRadius="$4"
        marginBottom="$3"
      >
        <Text fontSize="$3" color="$color" fontStyle="italic">
          * Please add at least one value for calories, fat, carbohydrates, or protein. The serving size is optional.
        </Text>
      </Card>

      {/* Table */}
      <YStack
        borderWidth={1}
        borderColor="$borderColor"
        borderRadius="$4"
        overflow="hidden"
        marginBottom="$4"
      >
        {rows.map((row, index) => (
          <XStack
            key={row.key}
            justifyContent="space-between"
            alignItems="center"
            paddingHorizontal="$3"
            paddingVertical="$2"
            borderBottomWidth={index !== rows.length - 1 ? 1 : 0}
            backgroundColor={row.key == 'calories' ? 'white': ''}
          >
            <Paragraph>{row.label}</Paragraph>

            {editField === row.key ? (
              <Input
                value={foodData[row.key]}
                onChangeText={(text) => handleChange(row.key, text)}
                onBlur={handleBlur}
                autoFocus
                keyboardType={row.key === 'foodName' ? 'default' : 'numeric'}
                size="$4"
                width={120}
              />
            ) : (
              <Paragraph
                fontWeight="bold"
                onPress={() => setEditField(row.key)}
                style={{ minWidth: 100, textAlign: 'right' }}
              >
                {foodData?.[row.key] ? `${foodData?.[row.key]}` : 'Tap to add'}
              </Paragraph>
            )}
          </XStack>
        ))}
      </YStack>

      {/* Switch section */}
      <Card
        padding="$3"
        backgroundColor="white"
        borderRadius="$4"
        marginBottom="$4"
      >
        <YStack gap="$2">
          <SwitchWithLabel
            switcherSize="$4"
            labelSize="$4"
            labelText="Automatically calculate calories"
            onChange={(value: boolean) => {
              calculateCaloriesAutomaticaly.current = value;
            }}
          />
          <Text fontSize="$3" color="$color" fontStyle="italic">
            * Automatically calculate calories based on the values from fat, carbohydrates, and protein.
          </Text>
        </YStack>
      </Card>

      <Button size="$4" iconAfter={PlusSquare} onPress={storeFood}>
        Add to My Foods
      </Button>
    </View>
  );
}
