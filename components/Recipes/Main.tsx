import { useState } from "react";
import { View, Input, YStack, XStack, Paragraph } from "tamagui";
import QueryTable from '@/components/Recipes/QueryTable';

export default function Main() {
  return (
    <View>
      <QueryTable/>
    </View>
  );
}
