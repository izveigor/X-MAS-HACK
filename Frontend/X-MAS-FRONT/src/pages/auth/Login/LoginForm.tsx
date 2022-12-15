import React, {
	useEffect,
	useState
} from "react";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/ui/input/Input";
import isEmailValid from "../../../service/scripts/isEmailValid";
import { FormWrapper, Form, FormTitle, Accent } from "../style";
import { Link } from "react-router-dom";
import useForm from "react-hook-form";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState<string>("");
	const [passwordError, setPasswordError] = useState<string>("");

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}
	return(
		<FormWrapper>
			<FormTitle>Авторизация</FormTitle>
		<Form>
			<Input title={'Почта'} value={email} handleChange={handleEmailChange} error={emailError} />
			<Input title={'Пароль'} value={password} type={'password'} handleChange={handlePasswordChange}/>
			<Button main={true}>Войти</Button>
			<p>Нет аккаунта? <Accent><Link to={'/registration'}>Зарегестироваться</Link></Accent></p>
		</Form>
		</FormWrapper>
	)
}

export default LoginForm
