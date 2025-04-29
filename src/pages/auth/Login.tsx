import { useLoginMutation } from "../../entities/auth/api/authApi";
import { InputTypes } from "../../shared/ui/form-factory/constants";
import {
  FieldsConfig,
  FormFactory,
} from "../../shared/ui/form-factory/form-factory";
import style from "./style.module.scss";
import * as yup from "yup";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router";
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
    .min(6, "Минимум 6 символов")
    .required("Пароль должен быть введен"),
});
export const Login = () => {
  const [authLogin] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (data: FormValues) => {
    authLogin(data);
    navigate({
      search: AppRoutes.ROOT,
    });
  };
  return (
    <div className={style.container}>
      <div className={style.container_auth}>
        <Typography>Вход в систему</Typography>
        <p></p>
        <FormFactory<FormValues>
          fields={fields}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};
