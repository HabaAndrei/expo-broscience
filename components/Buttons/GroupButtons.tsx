import { Button, XGroup, } from 'tamagui';

export default function GroupButtons(props: any){

  return (
    <XGroup size="$3" >

      {props.buttons.map((button: any, index: number)=>{
        return <XGroup.Item key={index} >
          <Button size="$3" icon={button.icon} onPress={()=>button.func()} >
            {button.name}
          </Button>
        </XGroup.Item>
      })}

    </XGroup>
  )
}