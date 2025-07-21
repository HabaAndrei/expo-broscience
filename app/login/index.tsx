import { SafeAreaView, KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import AuthForm from '@/components/userDetails/AuthForm';
import { useReducer } from 'react';
import { Button, XStack } from 'tamagui';
import { CircleArrowLeft } from '@tamagui/lucide-icons'
import Welcome from '@/components/userDetails/Welcome';
import Gender from '@/components/userDetails/Gender';
import Workouts from '@/components/userDetails/Workouts';
import HeightWeight from '@/components/userDetails/HeightWeight';
import BornDate from '@/components/userDetails/BornDate';
import ClientGoal from '@/components/userDetails/ClientGoal';
import ThanksMessage from '@/components/userDetails/ThanksMessage';
import Feedbacks from '@/components/userDetails/Feedbacks';
import PlanDetails from '@/components/userDetails/PlanDetails';
import ColorPalette from '@/components/ColorPalette';
import { StorageService } from '@/providers/StorageService';

export default function LoginIndex(){

  const initialArg = {
    pages: {
      "Welcome": { done: true, disabled: false },
      "Gender": {done: false, values: ["Male", "Female", "Other"], chosenIndex: null, disabled: true},
      "Workouts": {done: false, values: [
          {short: "0-2", long: "Workouts now and then", value: 1.5},
          {short: "3-5", long: "A few worksouts per week", value: 3.5},
          {short: "6+", long: "Dedicated athlete", value: 6},
        ], chosenIndex: null, disabled: true
      },
      "HeightWeight": {done: false, height: 160, weight: 60, disabled: true},
      "BornDate": {done: true, date: new Date(2000, 0, 1), disabled: false}, // in production =>  done: false, disabled: true
      "ClientGoal": {done: false, values: ["Lose weight", "Maintain", "Gain weight"], chosenIndex: null, disabled: true},
      "ThanksMessage": { done: true, disabled: false },
      "Feedbacks": { done: true, disabled: false },
      "PlanDetails": { done: false, disabled: true, plan: undefined },
      "AuthForm": {},
    },
    currentPage: "Welcome"
  }

  const [userNavigationState, dispatch] = useReducer(reducer, initialArg);

  function reducer(state: any, action: any){
    switch (action.type) {
      case 'setCurrentPage':
        return {...state, currentPage: action.payload};
      case 'setGender':
        return {...state, pages: {...state.pages, "Gender": {...state.pages.Gender, done: true, disabled: false, chosenIndex: action.payload}}};
      case 'setWorkouts':
        return {...state, pages: {...state.pages, "Workouts": {...state.pages.Workouts, done: true, disabled: false, chosenIndex: action.payload}}};
      case 'setHeightWeight':
        return {...state, pages: {...state.pages, "HeightWeight": {...state.pages.HeightWeight, done: true, disabled: false, weight: action.payload.weight, height: action.payload.height}}};
      case 'setBornDate':
        return {...state, pages: {...state.pages, "BornDate": {...state.pages.BornDate, done: true, disabled: false, date: action.payload}}};
      case 'setGoal':
        return {...state, pages: {...state.pages, "ClientGoal": {...state.pages.ClientGoal, done: true, disabled: false, chosenIndex: action.payload}}};
      case 'setPlanDetails':
        return {...state, pages: {...state.pages, "PlanDetails": {...state.pages.PlanDetails, done: true, disabled: false, plan: action.payload}}};
      case 'resetPlan':
        return {...state, pages: {...state.pages, "PlanDetails": {done: false, disabled: true, plan: undefined}}};
      default:
        return {...state};
    }
  }

  const disabledButton = userNavigationState?.pages?.[userNavigationState?.currentPage]?.disabled;
  const progress = {
    total: Object?.values(userNavigationState?.pages)?.length,
    current: Object?.keys(userNavigationState.pages)?.indexOf(userNavigationState?.currentPage) + 1
  }

  const renderCurrentPage = () => {
    const { currentPage } = userNavigationState;
    switch (currentPage) {
      case 'Welcome':
        return <Welcome handleChangeDispatch={handleChangeDispatch} />;
      case 'Gender':
        return <Gender value={userNavigationState} handleChangeDispatch={handleChangeDispatch} />;
      case 'Workouts':
        return <Workouts value={userNavigationState} handleChangeDispatch={handleChangeDispatch} />;
      case 'HeightWeight':
        return <HeightWeight
          setHeightWeight={setHeightWeight}
          height={userNavigationState?.pages?.HeightWeight?.height}
          weight={userNavigationState?.pages?.HeightWeight?.weight}
        />
      case 'BornDate':
        return <BornDate
          setBornDate={setBornDate}
          date={userNavigationState?.pages?.BornDate?.date}
        />
      case 'ClientGoal':
        return <ClientGoal value={userNavigationState} handleChangeDispatch={handleChangeDispatch} />;
      case 'ThanksMessage':
        return <ThanksMessage />;
      case 'Feedbacks':
        return <Feedbacks />;
      case 'PlanDetails':
        return <PlanDetails value={userNavigationState} getUserDetails={getUserDetails} setUserPlan={setUserPlan} />
      case 'AuthForm':
        return <AuthForm handleChangeDispatch={handleChangeDispatch} />
      default:
        return <Text> Aici am terminat, suntem gata </Text>;
    }
  };

  function getUserDetails(){
    const gender = userNavigationState?.pages.Gender.values[userNavigationState?.pages?.Gender?.chosenIndex]
    const workouts = userNavigationState?.pages.Workouts.values[userNavigationState?.pages?.Workouts?.chosenIndex]?.value
    const {height, weight} = userNavigationState?.pages.HeightWeight;
    const bornDate = userNavigationState?.pages.BornDate.date;
    const goal = userNavigationState?.pages.ClientGoal.values[userNavigationState?.pages?.ClientGoal?.chosenIndex];
    return {gender, workouts, height, weight, bornDate, goal}
  }

  function handleChangeDispatch(dispatchObject: any){
    // this function wraps the main dispatch function from useReducer, allowing us to intercept every dispatch call.
    // i used this approach because I wanted to call the 'resetPlan' function based on the dispatched action type.
    if (dispatchObject.type) resetPlan(dispatchObject.type);
    dispatch(dispatchObject);
  }

  function resetPlan(type: string){
    const typesToReset = ["setGender", "setWorkouts", "setHeightWeight", "setBornDate", "setGoal"];
    if (!typesToReset.includes(type)) return;
    dispatch({ type: 'resetPlan' });
  }

  function setUserPlan(plan: object | undefined){
    handleChangeDispatch({ type: 'setPlanDetails', payload: plan});
    StorageService.addStorage('initialInformations', {userDetails: getUserDetails(), plan})
  }

  function setBornDate(date: string | number){
    handleChangeDispatch({ type: 'setBornDate', payload: date});
  }

  function setHeightWeight({height, weight}: any){
    handleChangeDispatch({ type: 'setHeightWeight', payload: {height, weight}});
  }

  function findNextPage(){
    const nextPageName = Object.keys(userNavigationState?.pages)[progress.current]
    return nextPageName;
  }


  function nextPage(){
    const currentPageName = userNavigationState.currentPage;
    const currentPage = userNavigationState.pages[currentPageName];
    if ( currentPage.disabled == false ){
      const nextPageName = findNextPage();
      if (!nextPageName) return;
      handleChangeDispatch({ type: 'setCurrentPage', payload: nextPageName });
    }
  }

  function previousPage(){
    const actualIndexPage = progress.current;
    if (actualIndexPage <= 1) return;
    const previousPageName = Object?.keys(userNavigationState.pages)[actualIndexPage - 2];
    handleChangeDispatch({ type: 'setCurrentPage', payload: previousPageName });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <XStack
          padding="$4"
          alignItems="center"
          justifyContent="space-between"
          backgroundColor="transparent"
          borderBottomWidth={1}
          borderBottomColor="$borderColor"
        >
          <Button
            icon={CircleArrowLeft}
            size="$3"
            onPress={previousPage}
          >
            Back
          </Button>

          <ColorPalette />

          {progress.current > 0 && (
            <Text fontSize="$5">
              {progress.current} / {progress.total}
            </Text>
          )}
        </XStack>

        {/* Main Content */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 16,
          }}
        >
          {renderCurrentPage()}
        </View>

        {/* Footer */}
        {disabledButton !== undefined && (
          <View style={{ padding: 16 }}>
            <Button
              themeInverse
              onPress={nextPage}
              disabled={disabledButton}
              opacity={disabledButton ? 0.5 : 1}
            >
              Continue
            </Button>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );

}