import React, { useRef, useCallback } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles';

interface FormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const navigation = useNavigation();
	const formRef = useRef<FormHandles>(null);

	const handleSignUp = useCallback((formData: FormData) => {
		console.log(formData);
	}, []);

	return (
		<>
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				style={{ flex: 1 }}
				enabled
			>
				<ScrollView contentContainerStyle={{ flex: 1 }} keyboardShouldPersistTaps="handled">
					<Container>
						<Image source={logo} />
						<View>
							<Title>Crie sua conta</Title>
						</View>

						<Form ref={formRef} onSubmit={handleSignUp}>
							<Input name="name" icon="user" placeholder="Nome" />
							<Input name="email" icon="mail" placeholder="E-mail" />
							<Input name="password" icon="lock" placeholder="Senha" />

							<Button onPress={() => formRef.current?.submitForm()}>Entrar</Button>
						</Form>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<BackToSignInButton onPress={navigation.goBack}>
				<Icon name="arrow-left" size={20} color="#fff" />
				<BackToSignInButtonText>Voltar para logon</BackToSignInButtonText>
			</BackToSignInButton>
		</>
	);
};

export default SignUp;
