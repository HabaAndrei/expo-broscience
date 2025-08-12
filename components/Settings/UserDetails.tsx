import { Button, View } from "tamagui";
import AccordionDemo from '@/components/General/AccordionDemo';
import { Firebase } from '@/providers/Firebase';
import { useEffect, useRef, useState } from 'react';
import { useToastNotification } from '@/contexts/ToastNotificationContext';
import { UserDetails as userDetailsType } from '@/types/user';
import GeneralDetails from '@/components/Settings/GeneralDetails';
import BornDate from '@/components/UserDetails/BornDate';
import { clientGoalValues } from '@/app/login';
import ClientGoal from '@/components/UserDetails/ClientGoal';
import HeightWeight from '@/components/UserDetails/HeightWeight';
import { Plan } from '@/types/food';
import PlanDetailsCards from '@/components/UserDetails/PlanDetailsCards';

export default function UserDetails(){

  const [userDetails, setUserDetails] = useState<null | userDetailsType>(null);
  const [userPlan, setUserPlan] = useState<null | Plan>(null);
  const newBornDate = useRef('');
  const newHeightWeight = useRef<{height: string | number, weight: string | number}>({height: '', weight: ''});

  const firebase = new Firebase();
  const { addNotification } = useToastNotification()

  useEffect(()=>{
    getUserDetails_();
    getUserPlan_();
  }, []);

  function success(){
    addNotification({ type: 'success', title: 'Success!', description: 'The action has completed successfully.' })
  }

  function error(){
    addNotification({ type: 'error', title: 'Error!', description: 'Please try again.' })
  }

  async function getUserPlan_(){
    const result = await firebase.getUserPlan();
    if (!result.isResolved || !result.data) {
      error();
      return;
    }
    console.log(result.data);
    setUserPlan(result.data);
  }

  async function getUserDetails_(){
    const result = await firebase.getUserDetails();
    if (!result.isResolved || !result.data) {
      error();
      return;
    }
    setUserDetails(result.data);
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

  function updateHeightWeight(){
    if ( newHeightWeight.current?.height && newHeightWeight.current?.weight) {
      setUserDetails((prev: userDetailsType | null)=>{
        if (prev) {
          const newDetails = {...prev,
            height: newHeightWeight.current?.height,
            weight: newHeightWeight.current?.weight,
          }
          updateUserDetails(newDetails);
          return newDetails
        }
        return prev;
      })
    }
  }

  async function updateUserPlan_(plan: Plan){
    const resultUpdate = await firebase.updateUserPlan(plan);
    if (resultUpdate.isResolved) success();
    else error();
  }

  function editPlan({key, value}: {key: string, value: string}){
    setUserPlan((prev)=>{
      if (prev) {
        return {...prev, [key]: value};
      }
      return prev;
    })
  }

  const details = [
    {
      title: "General Details",
      component: <GeneralDetails userDetails={userDetails} />
    },
    {
      title: "Born Date",
      component: <View p="$3" >
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
      <View p="$3" >
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
    },
    {
      title: "Height and Weight",
      component:
      <View p="$3" >
        <HeightWeight
          height={userDetails?.height}
          weight={userDetails?.weight}
          setHeightWeight={(val:{height: number, weight: number})=>newHeightWeight.current = val}
        />
        <Button
          style={{alignSelf: "center"}} width={200} size="$3" variant="outlined"
          onPress={updateHeightWeight}
        >
          Update
        </Button>
      </View>
    },
    {
      title: "Plan",
      component:
        <View>
          {userPlan && Object?.keys(userPlan)?.length ?
            <>
              <PlanDetailsCards
                plan={userPlan}
                editPlan={({key, value})=>editPlan({key, value})}
              />
              <Button
                style={{alignSelf: "center"}} width={200} size="$3" variant="outlined"
                onPress={()=>updateUserPlan_(userPlan)}
              >
                Update
              </Button>
            </>: null
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