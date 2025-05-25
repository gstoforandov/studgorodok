import { useLoginMutation } from "../../entities/auth/api/authApi";
import { InputTypes } from "../../shared/ui/form-factory/constants";
import {
  FieldsConfig,
  FormFactory,
} from "../../shared/ui/form-factory/form-factory";
import style from "./style.module.scss";
import * as yup from "yup";
import { Typography, Paper, Box, Link as MuiLink } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { AppRoutes } from "../../shared/lib/router";

type FormValues = {
  email: string;
  password: string;
};

const fields: FieldsConfig[] = [

  {
    name: "email",
    label: "Электронный адрес",
    type: InputTypes.email,
    className: style.input_field,
  },
  {
    name: "password",
    label: "Пароль",
    type: InputTypes.password,
    className: style.input_field,
  },
];

const validationSchema: yup.ObjectSchema<FormValues> = yup.object().shape({
  email: yup
    .string()
    .email("Некорректный адрес электронной почты")
    .required("Электронная почта обязательно"),
  password: yup
    .string()
    .min(8, "Минимум 8 символов")
    .required("Пароль должен быть введен"),
});
export const Login = () => {
  const [authLogin] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: FormValues) => {
    authLogin(data);
    navigate(AppRoutes.NEWS);
  };
  return (
    <Box
      className={style.container}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh", 
      }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 2, minWidth: 300, textAlign: 'center' }}>
        <Typography variant="h5" component="h1" gutterBottom>
          Вход в систему
        </Typography>
        <FormFactory<FormValues>
          fields={fields}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        />
        <Box mt={2}>
          <Typography variant="body2">
            Нет аккаунта?{' '}
            <MuiLink component={Link} to={AppRoutes.REGISTRATION}>
              Пройдите регистрацию
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
