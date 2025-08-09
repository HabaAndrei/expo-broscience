import { Text, View } from "tamagui";
import AccordionDemo from '@/components/General/AccordionDemo';
import { Firebase } from '@/providers/Firebase';
import { useEffect, useState } from 'react';
import { useToastNotification } from '@/contexts/ToastNotificationContext';
import { UserDetails as userDetailsType } from '@/helpers/diverse';
import GeneralDetails from '@/components/Settings/GeneralDetails';
import BornDate from '@/components/UserDetails/BornDate';

export default function UserDetails(){

  const [userDetails, setUserDetails] = useState<null | userDetailsType>(null);
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
      title: "General Details",
      component: <GeneralDetails userDetails={userDetails} />
    },
    {
      title: "Born Date",
      component: <View>
        {userDetails?.bornDate ?
          <BornDate
            date={userDetails.bornDate}
            setBornDate={(date: string)=>console.log(date)}
          /> : null
        }
      </View>
    }
  ]



  return (
    <View style={{margin: 8}} >
      <AccordionDemo accordionValues={details} ></AccordionDemo>
    </View>
  )
}