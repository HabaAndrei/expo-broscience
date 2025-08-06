import { Text, View } from "tamagui";
import AccordionDemo from '@/components/General/AccordionDemo';
import { Firebase } from '@/providers/Firebase';
import { useEffect, useState } from 'react';
import { useToastNotification } from '@/contexts/ToastNotificationContext';

export default function UserDetails(){

  const [userDetails, setUserDetails] = useState({});
  const firebase = new Firebase();
  const { addNotification } = useToastNotification()

  useEffect(()=>{
    getUserDetails();
  }, []);


  async function getUserDetails(){
    const result = await firebase.getDetailsUser();
    if (!result.isResolved || !result.data) {
      console.log(result);
      addNotification(
        {
          type: 'error',
          title: 'Error!',
          description: 'Please try again.',
        }
      )
      return;
    }
    setUserDetails(result.data);
    console.log(result.data);

  }



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
    <View style={{margin: 8}} >
      <AccordionDemo accordionValues={details} ></AccordionDemo>
    </View>
  )
}