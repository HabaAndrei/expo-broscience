import { Text, View } from "tamagui";
import AccordionDemo from '@/components/General/AccordionDemo';

export default function UserDetails(){



  const details = [
    {
      title: "heelooo 1",
      component: <View><Text>Coponent 1 </Text></View>
    },
    {
      title: "heelooo 2",
      component: <View><Text>Coponent 2 </Text></View>
    }
  ]


  return (
    <View>
      <AccordionDemo accordionValues={details} ></AccordionDemo>
    </View>
  )
}