import React, { FC, memo, useCallback } from 'react';
import { Box, Button, MenuItem, Theme, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { currencies, increases, textFieldProps } from './constants';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import Input from '../Common/Input';
import {
  RegularAssetFragmentDoc,
  useCreateAssetMutation,
} from '../../generated/graphql';
import { onChangeNumber } from '../../utils/input';
import { useTranslation } from 'react-i18next';

const Container = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})((args: { theme?: Theme; open: boolean }) => ({
  height: '100%',
  padding: '1.5rem',
  borderRadius: '24px',
  backgroundColor: 'white',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  marginLeft: '4rem',
  width: '30rem',
  marginRight: args.open ? '4rem' : '-30rem',
  transition: (args.theme as Theme).transitions.create('margin', {
    easing: (args.theme as Theme).transitions.easing.sharp,
    duration: (args.theme as Theme).transitions.duration.leavingScreen,
  }),
}));

interface Props {
  open: boolean;
  toggle: () => void;
}

interface FormProps {
  name: string;
  amount: string | number;
  currency: string;
  increase: string;
  interval: string | number;
  percent: string | number;
}

const AddAsset: FC<Props> = ({ open, toggle }) => {
  const { t } = useTranslation();

  const [createAsset] = useCreateAssetMutation({
    update(cache, result) {
      cache.modify({
        fields: {
          assets(exisitingAssets = []) {
            const { assets, ...restData } = exisitingAssets;
            const newAssetRef = cache.writeFragment({
              data: result.data!.createAsset,
              fragment: RegularAssetFragmentDoc,
            });

            return {
              ...restData,
              assets: [newAssetRef, ...exisitingAssets.assets],
            };
          },
        },
      });
    },
  });

  const { handleSubmit, watch, control, reset } = useForm<FormProps>({
    defaultValues: {
      name: '',
      amount: '',
      currency: '',
      increase: '',
      interval: '',
      percent: '',
    },
  });

  const watchIncrease = watch('increase');
  const enableIcreaseOptions = watchIncrease && watchIncrease !== 'none';
  const increaseRule = {
    min: enableIcreaseOptions
      ? {
          value: 1,
          message: t('min_one'),
        }
      : undefined,
  };

  const onSubmit: SubmitHandler<FormProps> = useCallback(
    async (data) => {
      const { increase, interval, percent, ...rest } = data;

      const input: Partial<FormProps> = { ...rest };
      if (interval && percent) {
        input.interval = interval;
        input.percent = percent;
      }

      if (increase !== 'none') input.increase = increase;

      // @ts-ignore: Unreachable code error
      await createAsset({ variables: { input } });
      toggle();
      reset();
    },
    [createAsset, reset, toggle]
  );

  return (
    <Container open={open}>
      <Typography variant="h6" component="div">
        {t('add_asset')}
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          name="name"
          control={control}
          render={() => (
            <Input
              name="name"
              control={control}
              textFieldProps={{
                ...textFieldProps,
                label: t('asset_name'),
              }}
              rules={{ required: t('required_field') as string }}
            />
          )}
        />
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <Input
              name="amount"
              control={control}
              textFieldProps={{
                ...textFieldProps,
                type: 'number',
                label: t('amount'),
              }}
              InputProps={{
                onChange: onChangeNumber(field),
              }}
              rules={{
                min: {
                  value: 1,
                  message: t('min_one'),
                },
              }}
            />
          )}
        />
        <Controller
          name="currency"
          control={control}
          render={() => (
            <Input
              name="currency"
              control={control}
              textFieldProps={{
                ...textFieldProps,
                select: true,
                label: t('currency'),
              }}
              rules={{ required: t('required_field') as string }}
            >
              {currencies.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Input>
          )}
        />
        <Box display="flex">
          <Controller
            name="increase"
            control={control}
            render={() => (
              <Input
                name="increase"
                control={control}
                textFieldProps={{
                  ...textFieldProps,
                  select: true,
                  label: t('increase'),
                }}
                rules={{ required: t('required_field') as string }}
              >
                {increases.map((option) => (
                  <MenuItem key={option} value={option}>
                    {t(option)}
                  </MenuItem>
                ))}
              </Input>
            )}
          ></Controller>
          <Box width="1.5rem" />
          <Controller
            name="interval"
            control={control}
            render={({ field }) => (
              <Input
                name="interval"
                control={control}
                textFieldProps={{
                  ...textFieldProps,
                  type: 'number',
                  label: t('interval'),
                  disabled: !enableIcreaseOptions,
                }}
                InputProps={{
                  onChange: onChangeNumber(field),
                }}
                rules={increaseRule}
              />
            )}
          />
        </Box>
        <Controller
          name="percent"
          control={control}
          render={({ field }) => (
            <Input
              name="percent"
              control={control}
              textFieldProps={{
                ...textFieldProps,
                type: 'number',
                label: t('percent'),
                disabled: !enableIcreaseOptions,
              }}
              InputProps={{
                onChange: onChangeNumber(field),
              }}
              rules={increaseRule}
            />
          )}
        />
        <Button sx={{ mt: '8px' }} type="submit" variant="contained">
          {t('add')}
        </Button>
      </Box>
    </Container>
  );
};

export default memo(AddAsset);
