import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Slider, XStack } from 'tamagui';

type HeightWeightProps = {
  setHeightWeight: ({}: any) => void;
  height: number | null | undefined | string;
  weight: number | null | undefined | string;
};


export default function HeightWeight({setHeightWeight, height, weight}: HeightWeightProps) {

  const [heightSlider, setHeightSlider] = useState<any>(height);
  const [weightSlider, setWeightSlider] = useState<any>(weight);

  return (
    <View>
      <Text>HeightWeight</Text>

      <Text style={{ fontSize: 18, marginVertical: 8 }}>
        Selected your height: {heightSlider} cm
      </Text>
      <XStack height={50} alignItems="center" gap="$8">
        <SimpleSlider
          width={250}
          value={[heightSlider]}
          onValueChange={(val:any) => {
            setHeightSlider(val[0]);
            setHeightWeight({
              height: val[0],
              weight: weightSlider,
            })
          }}
          defaultValue={heightSlider}
          max={250}
        />
      </XStack>


      <Text style={{ fontSize: 18, marginVertical: 8 }}>
        Selected your weight: {weightSlider} kg
      </Text>
      <XStack height={50} alignItems="center" gap="$8">
        <SimpleSlider
          width={250}
          value={[weightSlider]}
          onValueChange={(val:any) => {
            setWeightSlider(val[0]);
            setHeightWeight({
              height: heightSlider,
              weight: val[0],
            });
          }}
          defaultValue={weightSlider}
          max={120}
        />
      </XStack>


    </View>
  );
}

function SimpleSlider({ children, defaultValue, max, ...props }: any) {
  return (
    <Slider defaultValue={[defaultValue]} max={max} step={1} {...props}>
      <Slider.Track>
        <Slider.TrackActive />
      </Slider.Track>
      <Slider.Thumb size="$2" index={0} circular />
      {children}
    </Slider>
  );
}
