import { ChangeEventHandler } from "react"

export interface DropdownProps<T> {
  options: Array<{ label: string; value: T }>
  selected: T | null
  onChange: (value: T | null) => void
  defaultValue?: T
  unselectedText?: string
}

export function Dropdown<T>({
  options,
  selected,
  onChange,
  defaultValue = undefined,
  unselectedText = undefined,
}: DropdownProps<T>) {
  const handleChange: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value =
      event.target.value === "unselected"
        ? null
        : options[Number(event.target.value)].value
    onChange(value)
    console.log(value)
  }

  return (
    <select name="" id="" onChange={handleChange}>
      {unselectedText && <option value="unselected">{unselectedText}</option>}
      {options.map((e, i) => (
        <option value={i} {...(defaultValue === e && selected)}>
          {e.label}
        </option>
      ))}
    </select>
  )
}
