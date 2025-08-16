import { Slider } from 'tamagui';

export default function SimpleSlider({ children, value, defaultValue, max, width, onValueChange }:
  {children?: any, value: number[], defaultValue: number, max: number, width: number, onValueChange: (any: any)=>void}
) {
  return (
    <Slider
      defaultValue={[defaultValue]}
      max={max}
      step={1}
      width={width}
      onValueChange={(newVal: any)=>onValueChange(newVal)}
      value={value}
    >
      <Slider.Track>
        <Slider.TrackActive />
      </Slider.Track>
      <Slider.Thumb size="$2" index={0} circular />
      {children}
    </Slider>
  );
}
