import React, { FC, memo } from 'react';
import { BaseTextFieldProps, InputProps, TextField } from '@mui/material';
import { useController, UseControllerProps } from 'react-hook-form';

interface Props extends UseControllerProps<any> {
  textFieldProps: BaseTextFieldProps;
  children?: React.ReactNode;
  InputProps?: Partial<InputProps>;
}

const Input: FC<Props> = ({
  children,
  textFieldProps,
  InputProps,
  ...control
}) => {
  const { field, fieldState } = useController(control);

  return (
    <TextField
      {...field}
      {...textFieldProps}
      InputProps={InputProps}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    >
      {children}
    </TextField>
  );
};

export default memo(Input);
