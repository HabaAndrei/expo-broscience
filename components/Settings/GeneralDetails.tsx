import { UserDetails as userDetailsType } from '@/types/user';
import { Text, View } from 'tamagui';

export default function GeneralDetails({userDetails} : {userDetails: null | userDetailsType} ){
  return (
    <View p="$3" >
      {userDetails ? (
        <>
          <Text fontWeight="700" fontSize={14} color="$color12" mb="$1">
            First name:
            <Text fontWeight="400" fontSize={16} mb="$3" color="$color11">
              {" "}{userDetails.firstName}
            </Text>
          </Text>

          <Text fontWeight="700" fontSize={14} color="$color12" mb="$1">
            Second name:
            <Text fontWeight="400" fontSize={16} mb="$3" color="$color11">
              {" "}{userDetails.secondName}
            </Text>
          </Text>

          <Text fontWeight="700" fontSize={14} color="$color12" mb="$1">
            Gender:
            <Text fontWeight="400" fontSize={16} mb="$3" color="$color11">
              {" "}{userDetails.gender}
            </Text>
          </Text>

          <Text fontWeight="700" fontSize={14} color="$color12" mb="$1">
            Email:
            <Text fontWeight="400" fontSize={16} mb="$3" color="$color11">
              {" "}{userDetails.email}
            </Text>
          </Text>
        </>
      ) : null}
    </View>
  )
}