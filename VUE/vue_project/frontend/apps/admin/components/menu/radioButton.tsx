import { TooltipHover, RadioBox } from 'ui'

interface IRadioBtnProperty {
  selectedValue: string
  itemValue: string
  itemLabel: string
  tooltipMsg?: string
  handleClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export const RadioButton = ({ selectedValue, itemValue, itemLabel, tooltipMsg, handleClick, disabled }: IRadioBtnProperty) => {
  const controlProps = {
    checked: selectedValue === itemValue,
    onChange: handleClick,
    value: itemValue,
    id: itemValue,
    text: itemLabel,
    disabled: disabled,
  }

  return (
    <div className="item">
      <RadioBox {...controlProps} />
      {tooltipMsg && (
        <TooltipHover placements="top-start">
          <p>{tooltipMsg}</p>
        </TooltipHover>
      )}
    </div>
  )
}
