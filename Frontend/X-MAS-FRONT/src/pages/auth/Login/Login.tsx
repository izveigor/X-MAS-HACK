import React, {
	useContext,
	useEffect,
	useState
} from "react";
import {Link} from "react-router-dom";
import Button from "../../../components/ui/button/Button";
import Input from "../../../components/ui/input/Input";
import {AuthContext} from "../../../providers/AuthProvider/AuthProvider";
import isEmailValid from "../../../service/scripts/isEmailValid";
import {
	Accent,
	Form,
	FormTitle,
	FormWrapper
} from "../style";

const Login = () => {
	const {setToken} = useContext(AuthContext);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [emailError, setEmailError] = useState<string>("");
	const login = () => {
		if (isEmailValid(email) && password) {
		fetch("http://localhost:1337/api/v1/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
			.then((res) => res.json())
			.then((data) => {
				setToken(data.token);
			}).catch(() => {
			setEmailError("Неправильный логин или пароль");
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
	return (
		<FormWrapper>
			<FormTitle>Авторизация</FormTitle>
			<Form>
				<Input title={'Почта'} value={email} handleChange={handleEmailChange} error={emailError}/>
				<Input title={'Пароль'} value={password} type={'password'} handleChange={handlePasswordChange}/>
				<Button type={"button"} onClick={login} main={true}>Войти</Button>
				<p>Нет аккаунта? <Accent><Link to={'/registration'}>Зарегистрироваться</Link></Accent></p>
			</Form>
		</FormWrapper>
	)
}

export default Login
