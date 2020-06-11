import React from 'react';
import { Image } from 'react-native';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title } from './styles';

const SignIn: React.FC = () => {
	return (
		<Container>
			<Image source={logo} />
			<Title>Faça seu logon</Title>

			<Input name="email" icon="mail" placeholder="E-mail" />
			<Input name="password" icon="lock" placeholder="Senha" />

			<Button onPress={() => console.log('botao')}>Entrar</Button>
		</Container>
	);
};

export default SignIn;
