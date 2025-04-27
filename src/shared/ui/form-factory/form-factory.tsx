import { Controller, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { InputTypes } from "./constants";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField } from "@mui/material";

export interface FieldOption {
  label: string;
  value: string;
}

export interface FieldsConfig {
  name: string;
  label: string;
  type: InputTypes;
  defaultValue?: string;
  options?: FieldOption[];
  className?: string;
}

export type FormFactoryProps<T extends FieldValues> = {
  fields: FieldsConfig[];
  validationSchema: yup.ObjectSchema<any>;
  onSubmit: SubmitHandler<T>
}

export const FormFactory = <T extends FieldValues>({
  fields,
  validationSchema,
  onSubmit,
}: FormFactoryProps<T>) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<T>({
    resolver: yupResolver(validationSchema)
  })

  return (
    <Box 
    component="form"
     onSubmit={handleSubmit(onSubmit)}
    noValidate
    sx={{display: 'flex', flexDirection: 'column', gap: 2}}
    >
      {fields.map((field) => (
        <Controller
        key={field.name}
        name={field.name as any}
        control={control}
        render={({field: controllerField}) => {
          switch (field.type) {
            case InputTypes.email:
            case InputTypes.text:
            case InputTypes.password:
              return (
                <TextField
                {...controllerField}
                type={field.type}
                label={field.label}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message as string}
                fullWidth
                className={field.className}
                />
              )
            default:
              return (
                <div>wrong type</div>
              )
          }
        }}
        />
      ))}
      <Button type="submit" variant="contained" color="primary">
        Подтвердить
      </Button>
    </Box>
  )
}