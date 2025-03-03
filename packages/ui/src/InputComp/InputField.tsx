import type { InputLabelProps, InputProps } from 'ui/src/InputComp/types'
import styled from 'styled-components'
import Box from 'ui/src/Box/Box'
import Input from 'ui/src/InputComp/Input'
import { InputLabel, InputMessage } from 'ui/src/InputComp'
import { ChangeEventHandler } from 'react'

const InputField = ({
  className,
  labelProps,
  message,
  testId,
  onChange,
  ...inputProps
}: Omit<InputProps, 'onChange'> & {
  className?: string
  labelProps: InputLabelProps
  message?: string
  testId?: string
  onChange?: ChangeEventHandler<HTMLInputElement>
}) => (
  <>
    <Box className={className}>
      <InputLabel {...labelProps} testId={testId} />
      <StyledInput {...inputProps} testId={testId} onChange={onChange} />
    </Box>
    {message && <InputMessage message={message} />}
  </>
)

const StyledInput = styled(Input)`
  height: 100%;
`

InputField.displayName = 'InputField'

export default InputField
