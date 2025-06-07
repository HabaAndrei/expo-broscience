import { SafeAreaView, KeyboardAvoidingView, Platform, Text } from 'react-native';
import AuthForm from '@/components/userDetails/AuthForm';
import { useReducer } from 'react';
import { Button } from 'tamagui';

export default function LoginIndex(){

  const [userNavigationState, dispatch] = useReducer(reducer, {
    1: {name: "Welcome", done: false},
    2: {name: "Gender", done: false, values: ["Male", "Female", "Other"], chosenIndex: null},
    3: {name: "Workouts", done: false, values: [
        {short: "0-2", long: "Workouts now and then"},
        {short: "3-5", long: "A few worksouts per week"},
        {short: "6+", long: "Dedicated athlete"}
      ], chosenIndex: null
    }
  });

  function reducer(state, action){
    console.log({state, action});
    switch (action.type) {
      case "ok":
        return {...state, ok: !state.ok};
      default:
        return {...state};
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >

          {/* <Button onPress={()=>dispatch({type: "ok"})} >press</Button>
          <Text>{JSON.stringify(userNavigationState)}</Text> */}
        <AuthForm />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}