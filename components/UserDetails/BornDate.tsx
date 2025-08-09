import { View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { H4 } from 'tamagui';
import { formatDateToYMD } from '@/helpers/diverse';

export default function BornDate({date, setBornDate, title}: {
  date: string, setBornDate: (date: string)=>void, title?: string | undefined
}){
  const [spinnerDate, setSpinnerDate] = useState<Date>(new Date(date));
  return (
    <View style={{alignItems: 'center'}} >
      {title ? <H4>{title}</H4> : null}

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