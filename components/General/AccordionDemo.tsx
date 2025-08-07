
import { ChevronDown } from '@tamagui/lucide-icons'
import { Accordion, Paragraph, Square } from 'tamagui'

export default function AccordionDemo({accordionValues}: {
  accordionValues: { title: string, component: any }[]
}) {
  return (
    <Accordion overflow="hidden" type="multiple">

      {accordionValues.map((value, index)=>{
        return <Accordion.Item value={"a" + index + 1} key={index}>
          <Accordion.Trigger flexDirection="row" justifyContent="space-between">
            {({
              open,
            }: {
              open: boolean
            }) => (
              <>
                <Paragraph>{value.title}</Paragraph>
                <Square animation="quick" rotate={open ? '180deg' : '0deg'}>
                  <ChevronDown size="$1" />
                </Square>
              </>
            )}
          </Accordion.Trigger>
          <Accordion.HeightAnimator animation="medium">
            <Accordion.Content animation="medium" exitStyle={{ opacity: 0 }}>
              {value.component}
            </Accordion.Content>
          </Accordion.HeightAnimator>
        </Accordion.Item>
      })}

    </Accordion>
  )
}