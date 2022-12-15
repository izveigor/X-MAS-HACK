import React, {useEffect} from "react";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/ui/input/Input";
import isEmailValid from "../../../service/scripts/isEmailValid";
import {
	FormWrapper,
	Form,
	FormTitle,
	Accent
} from "../style";
import { Link } from "react-router-dom";

const Registration = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [emailError, setEmailError] = React.useState<string>('');
	const [passwordError, setPasswordError] = React.useState<string>('');

	useEffect(() => {
		!isEmailValid(email) ? setEmailError('Неправильный формат') : '';

	}, [email])

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	}
	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	}

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	}
	return (
		<FormWrapper>
			<FormTitle>Регистрация</FormTitle>
			<Form>
				<Input title={'Почта'} value={email} handleChange={handleEmailChange} error={emailError}/>
				<Input title={'Пароль'} value={password} type={'password'} handleChange={handlePasswordChange}/>
				<Button main={true}>Войти</Button>
			</Form>
			<p>Есть аккаунт?<Accent><Link to={'/login'}>Войти</Link></Accent></p>
		</FormWrapper>
	)
}

export default Registration
