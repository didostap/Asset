import React from 'react';
import { ControllerRenderProps } from 'react-hook-form';

export const onChangeNumber =
  (field: ControllerRenderProps<any, any>) =>
  (e: React.ChangeEvent<HTMLInputElement>) =>
    field.onChange(
      e.target.value ? parseFloat(e.target.value) : e.target.value
    );
