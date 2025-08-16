import React, { useState } from 'react';
import { View } from 'react-native';
import { H5, XStack } from 'tamagui';
import SimpleSlider from '@/components/General/SimpleSlider';

export type HeightWeightProps = {
  setHeightWeight: ({}: any) => void;
  height: number ;
  weight: number ;
};


export default function HeightWeight({setHeightWeight, height, weight}: HeightWeightProps) {

  const [heightSlider, setHeightSlider] = useState<number>(height);
  const [weightSlider, setWeightSlider] = useState<number>(weight);

  return (
    <View style={{alignItems: 'center'}} >

      <H5>Selected your height: {heightSlider} cm</H5>
      <XStack height={50} style={{alignItems: "center"}} gap="$8">
        <SimpleSlider
          width={300}
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
          width={300}
          value={[weightSlider]}
          onValueChange={(val:any) => {
            setWeightSlider(val[0]);
            setHeightWeight({
              height: heightSlider,
              weight: val[0],
            });
          }}
          defaultValue={weightSlider}
          max={200}
        />
      </XStack>


    </View>
  );
}
