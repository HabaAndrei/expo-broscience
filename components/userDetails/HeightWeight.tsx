import React, { useState } from 'react';
import { View, Text } from 'react-native';
import type { SliderProps } from 'tamagui';
import { Slider, XStack } from 'tamagui';

export default function HeightWeight(props) {
  const [heightSlider, setHeightSlider] = useState(90);
  const [weightSlider, setWeightSlider] = useState(160);

  function setHeightWeight(){
    props.dispatch({ type: 'setHeightWeight', payload: {
      height: heightSlider,
      weight: weightSlider,
    }});
  }

  return (
    <View>
      <Text>HeightWeight</Text>

      <Text style={{ fontSize: 18, marginVertical: 8 }}>
        Selected your height: {heightSlider} kg
      </Text>
      <XStack height={50} alignItems="center" gap="$8">
        <SimpleSlider
          width={250}
          value={[heightSlider]}
          onValueChange={(val) => {
            setHeightSlider(val[0]);
            setHeightWeight();
          }}
          defaultValue={heightSlider}
          max={150}
        />
      </XStack>


      <Text style={{ fontSize: 18, marginVertical: 8 }}>
        Selected your weight: {weightSlider} cm
      </Text>
      <XStack height={50} alignItems="center" gap="$8">
        <SimpleSlider
          width={250}
          value={[weightSlider]}
          onValueChange={(val) => {
            setWeightSlider(val[0]);
            setHeightWeight();
          }}
          defaultValue={weightSlider}
          max={250}
        />
      </XStack>


    </View>
  );
}

function SimpleSlider({ children, defaultValue, max, ...props }: SliderProps) {
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
