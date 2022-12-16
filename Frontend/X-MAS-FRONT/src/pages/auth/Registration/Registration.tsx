import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/ui/input/Input";
import isEmailValid from "../../../service/scripts/isEmailValid";
import {
	Accent,
	Form,
	FormTitle,
	FormWrapper
} from "../style";

const Registration = () => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [username, setUsername] = React.useState("");
	const [emailError, setEmailError] = React.useState<string>('');
	const registration = () => {
		if (isEmailValid(email) && password && username) {
			fetch("/api/v1/registration", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					name: username,
					email,
					password,
				})
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
				}).catch(() => {
				setEmailError("Пользователь с таким email уже есть");
				setPassword("");
			})
		}
	}

	useEffect(() => {
		if (email && !isEmailValid(email)) {
			setEmailError("Неправильный формат");
		}
		else {
			setEmailError("");
		}
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
				<Input title={'ФИО'} value={username} type={'text'} handleChange={handleUsernameChange}/>
				<Button main={true} type={'button'} onClick={registration}>Регистрация</Button>
			</Form>
			<p>Есть аккаунт?<Accent><Link to={'/login'}>Войти</Link></Accent></p>
		</FormWrapper>
	)
}

export default Registration
