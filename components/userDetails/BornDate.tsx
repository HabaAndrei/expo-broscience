import { View, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';

export default function BornDate({date, setBornDate}: any){
  const [spinnerDate, setSpinnerDate] = useState<Date>(new Date(date));
  return (
    <View>
      <Text>BornDate</Text>
      <DateTimePicker
        mode="date"
        display="spinner"
        value={spinnerDate}
        onChange={(event: any, selectedDate: any) => {
          if (event.timeStamp) {
            setBornDate(selectedDate.getTime());
            setSpinnerDate(selectedDate);
          }
        }}
      />
    </View>
  )
}