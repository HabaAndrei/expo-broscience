import { SafeAreaView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import AuthForm from '@/components/userDetails/AuthForm';
import { useReducer } from 'react';
import { Button } from 'tamagui';
import Welcome from '@/components/userDetails/Welcome';
import Gender from '@/components/userDetails/Gender';
import Workouts from '@/components/userDetails/Workouts';
import HeightWeight from '@/components/userDetails/HeightWeight';
import BornDate from '@/components/userDetails/BornDate';
import ClientGoal from '@/components/userDetails/ClientGoal';

export default function LoginIndex(){

  const [userNavigationState, dispatch] = useReducer(reducer, {
    pages: {
      "Welcome": { done: true, disabled: false },
      "Gender": {done: false, values: ["Male", "Female", "Other"], chosenIndex: null, disabled: true},
      "Workouts": {done: false, values: [
          {short: "0-2", long: "Workouts now and then"},
          {short: "3-5", long: "A few worksouts per week"},
          {short: "6+", long: "Dedicated athlete"},
        ], chosenIndex: null, disabled: true
      },
      "HeightWeight": {done: false, height: 160, weight: 60, disabled: true},
      "BornDate": {done: false, date: new Date(), disabled: true},
      "ClientGoal": {done: false, values: ["Lose weight", "Maintain", "Gain weight"], chosenIndex: null, disabled: true}
    },
    currentPage: "Welcome"
  });

  function reducer(state, action){
    console.log({state, action});
    switch (action.type) {
      case "ok":
        return {...state, pages: {...state.pages, "Welcome": {done: true, disabled: false}}};
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
        return <Welcome />;
      case 'Gender':
        return <Gender value={userNavigationState} dispatch={dispatch} />;
      case 'Workouts':
        return <Workouts value={userNavigationState} dispatch={dispatch} />;
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
        return <ClientGoal value={userNavigationState} dispatch={dispatch} />;
      default:
        return <Text> Aici am terminat, suntem gata </Text>;
    }
  };

  function setBornDate(date: string | number){
    dispatch({ type: 'setBornDate', payload: date});
  }

  function setHeightWeight({height, weight}: any){
    dispatch({ type: 'setHeightWeight', payload: {height, weight}});
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
      dispatch({ type: 'setCurrentPage', payload: nextPageName });
    }
  }

  function previousPage(){
    const actualIndexPage = progress.current;
    if (actualIndexPage <= 1) return;
    const previousPageName = Object?.keys(userNavigationState.pages)[actualIndexPage - 2];
    dispatch({ type: 'setCurrentPage', payload: previousPageName });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >

        <Button onPress={previousPage} >Back</Button>

        {progress.current > 0 ?
          <Text>
            {progress.current} / {progress.total}
          </Text> : null
        }

        {renderCurrentPage()}

        {disabledButton != undefined ?
          <Button
            themeInverse
            onPress={nextPage}
            disabled={disabledButton}
            opacity={disabledButton ? 0.5 : 1}
          >
            Continue
          </Button> :
          null
        }

      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}