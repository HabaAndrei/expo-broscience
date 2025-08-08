import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { H4 } from 'tamagui';
import { formatDateToYMD } from '@/helpers/diverse';

export default function BornDate({date, setBornDate}: any){
  const [spinnerDate, setSpinnerDate] = useState<Date>(new Date(date));
  return (
    <View style={{alignItems: 'center'}} >
      <H4>Select your born date</H4>

      <DateTimePicker
        style={{margin: 30}}
        textColor="black"
        design="material"
        maximumDate={new Date(2014, 0, 1)}
        mode="date"
        display="spinner"
        value={spinnerDate}
        onChange={(event: any, selectedDate: any) => {
          if (event.timeStamp) {
            setBornDate(formatDateToYMD(new Date(selectedDate.getTime())));
            setSpinnerDate(selectedDate);
          }
        }}
      />
    </View>
  )
}