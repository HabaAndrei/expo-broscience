import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { Slider, XStack } from 'tamagui';
import { H4, H5 } from 'tamagui';

type HeightWeightProps = {
  setHeightWeight: ({}: any) => void;
  height: number | null | undefined | string;
  weight: number | null | undefined | string;
};


export default function HeightWeight({setHeightWeight, height, weight}: HeightWeightProps) {

  const [heightSlider, setHeightSlider] = useState<any>(height);
  const [weightSlider, setWeightSlider] = useState<any>(weight);

  return (
    <View style={{alignItems: 'center'}} >

      <H5>Selected your height: {heightSlider} cm</H5>
      <XStack height={50} style={{alignItems: "center"}} gap="$8">
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

      <View style={{margin:35}} ></View>

      <H5> Selected your weight: {weightSlider} kg </H5>
      <XStack height={50} style={{alignItems: "center"}} gap="$8">
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
