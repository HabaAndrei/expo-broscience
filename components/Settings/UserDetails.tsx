import { Button, View } from "tamagui";
import AccordionDemo from '@/components/General/AccordionDemo';
import { Firebase } from '@/providers/Firebase';
import { useEffect, useRef, useState } from 'react';
import { useToastNotification } from '@/contexts/ToastNotificationContext';
import { UserDetails as userDetailsType } from '@/helpers/diverse';
import GeneralDetails from '@/components/Settings/GeneralDetails';
import BornDate from '@/components/UserDetails/BornDate';
import { clientGoalValues } from '@/app/login';
import ClientGoal from '@/components/UserDetails/ClientGoal';

export default function UserDetails(){

  const [userDetails, setUserDetails] = useState<null | userDetailsType>(null);
  const newBornDate = useRef('');
  const firebase = new Firebase();
  const { addNotification } = useToastNotification()

  useEffect(()=>{
    getUserDetails();
  }, []);

  function success(){
    addNotification({ type: 'success', title: 'Success!', description: 'The action has completed successfully.' })
  }

  function error(){
    addNotification({ type: 'error', title: 'Error!', description: 'Please try again.' })
  }

  async function getUserDetails(){
    const result = await firebase.getDetailsUser();
    if (!result.isResolved || !result.data) {
      error();
      return;
    }
    setUserDetails(result.data);
    console.log(result.data);
  }

  async function updateUserDetails(details: userDetailsType){
    const resultUpdate = await firebase.updateUser(details);
    if (resultUpdate.isResolved) success();
    else error();
  }

  function updateBordDate(){
    if (!newBornDate.current) return;
    if (userDetails?.bornDate == newBornDate.current){
      success()
      return;
    }
    setUserDetails((prev: userDetailsType | null)=>{
      if (prev) {
        const newDetails = {...prev, bornDate: newBornDate.current}
        updateUserDetails(newDetails);
        return newDetails
      }
      return prev;
    })
  }

  function setNewGoal(newVal: number){
    const newGoal = clientGoalValues[newVal];
    setUserDetails((prev: userDetailsType | null)=>{
      if (prev) {
        return {...prev, goal: newGoal}
      }
      return prev;
    });
  }

  function updateGoal(){
    if (userDetails) updateUserDetails(userDetails);
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
            setBornDate={(date: string)=>newBornDate.current = date}
          /> : null
        }
        <Button
          style={{alignSelf: "center"}} width={200} size="$3" variant="outlined"
          onPress={updateBordDate}
        >
          Update
        </Button>
      </View>
    },
    {
      title: "Goal",
      component:
      <View>
        <ClientGoal
          chosenIndex={clientGoalValues.indexOf(userDetails?.goal ?? '')}
          onChange={(newVal: number)=>setNewGoal(newVal)}
          values={clientGoalValues}
        />
        <Button
          style={{alignSelf: "center"}} width={200} size="$3" variant="outlined"
          onPress={updateGoal}
        >
          Update
        </Button>
      </View>
    }

  ]



  return (
    <View style={{margin: 8}} >
      <AccordionDemo accordionValues={details} ></AccordionDemo>
    </View>
  )
}