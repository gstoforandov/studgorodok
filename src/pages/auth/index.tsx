import { useRegistrationMutation } from "../../entities/auth/api/authApi";
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
  name: string;
  surname: string;
  email: string;
  password: string;
};

const fields: FieldsConfig[] = [
  {
    name: "name",
    label: "Введите имя",
    type: InputTypes.text,
    className: style.input_field,
  },
  {
    name: "surname",
    label: "Введите отчество",
    type: InputTypes.text,
    className: style.input_field,
  },
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
// name, surname,
const validationSchema: yup.ObjectSchema<FormValues> = yup.object().shape({
  name: yup.string().required("Имя обязательно"),
  surname: yup.string().required("Отчество обязательно"),
  email: yup
    .string()
    .email("Некорректный адрес электронной почты")
    .required("Электронная почта обязательно"),
  password: yup
    .string()
    .min(8, "Минимум 8 символов")
    .required("Пароль должен быть введен"),
});

export const Auth = () => {
  const [authRegistration] = useRegistrationMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: FormValues) => {
    const { token }: { token: string } = await authRegistration(data).unwrap();
    localStorage.setItem("token", token);
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
          Регистрация
        </Typography>
        <FormFactory<FormValues>
          fields={fields}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        />
        <Box mt={2}>
          <Typography variant="body2">
            Есть аккаунт?{" "}
            <MuiLink component={Link} to={AppRoutes.LOGIN}>
              Войти
            </MuiLink>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

