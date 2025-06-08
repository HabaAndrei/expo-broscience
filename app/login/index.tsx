import { SafeAreaView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import AuthForm from '@/components/userDetails/AuthForm';
import { useReducer } from 'react';
import { Button } from 'tamagui';
import Welcome from '@/components/userDetails/Welcome';
import Gender from '@/components/userDetails/Gender';

export default function LoginIndex(){

  const [userNavigationState, dispatch] = useReducer(reducer, {
    pages: {
      "Welcome": { done: true, disabled: false },
      "Gender": {done: false, values: ["Male", "Female", "Other"], chosenIndex: null, disabled: true},
      // "Workouts": {done: false, values: [
      //     {short: "0-2", long: "Workouts now and then"},
      //     {short: "3-5", long: "A few worksouts per week"},
      //     {short: "6+", long: "Dedicated athlete"}
      //   ], chosenIndex: null, disabled: true
      // }
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
        return {...state, pages: {...state.pages, "Gender": {...state.pages.Gender, done: true, disabled: false, chosenId: action.payload}}};
      default:
        return {...state};
    }
  }

  const disabledButton = userNavigationState?.pages?.[userNavigationState?.currentPage]?.disabled;

  const renderCurrentPage = () => {
    const { currentPage } = userNavigationState;
    switch (currentPage) {
      case 'Welcome':
        return <Welcome />;
      case 'Gender':
        return <Gender value={userNavigationState} dispatch={dispatch} />;
      default:
        console.log('a venit la default!!');
        return <Text> Aici am terminat, suntem gata </Text>;
    }
  };


  function findNextPage(){
    const pages = userNavigationState.pages;
    for(let key of Object.keys(pages)){
      const page = pages[key];
      if ( page.done == false && page.disabled == true ) {
        return key
      }
    }
    return false;
  }


  function nextPage(){
    const currentPageName = userNavigationState.currentPage;
    const currentPage = userNavigationState.pages[currentPageName];
    if ( currentPage.disabled == false ){
      const nextPageName = findNextPage();
      dispatch({ type: 'setCurrentPage', payload: nextPageName });
    } else {
      console.log('nu putem sa facem next !!');
    }

  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {renderCurrentPage()}
        {/* <Button onPress={()=>dispatch({type: "ok"})} >press</Button> */}
        {/* <Text>{JSON.stringify(userNavigationState)}</Text> */}

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