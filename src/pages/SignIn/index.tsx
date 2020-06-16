import React, { useCallback, useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';

import {
	Container,
	Title,
	ForgotPassword,
	ForgotPasswordText,
	CreateAccountButton,
	CreateAccountButtonText,
} from './styles';

interface FormData {
	email: string;
	password: string;
}

const SignIn: React.FC = () => {
	const navigation = useNavigation();

	const formRef = useRef<FormHandles>(null);
	const passwordInputRef = useRef<TextInput>(null);

	const handleSignIn = useCallback((formData: FormData) => {
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
							<Title>Faça seu logon</Title>
						</View>

						<Form ref={formRef} onSubmit={handleSignIn}>
							<Input
								name="email"
								icon="mail"
								placeholder="E-mail"
								autoCorrect={false}
								autoCapitalize="none"
								keyboardType="email-address"
								returnKeyType="next"
								onSubmitEditing={passwordInputRef.current?.focus}
							/>
							<Input
								ref={passwordInputRef}
								name="password"
								icon="lock"
								placeholder="Senha"
								secureTextEntry
								returnKeyType="send"
								onSubmitEditing={formRef.current?.submitForm}
							/>

							<Button onPress={formRef.current?.submitForm}>Entrar</Button>
						</Form>

						<ForgotPassword onPress={() => console.log('click esqueci minha senha')}>
							<ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
						</ForgotPassword>
					</Container>
				</ScrollView>
			</KeyboardAvoidingView>

			<CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
				<Icon name="log-in" size={20} color="#ff9000" />
				<CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
			</CreateAccountButton>
		</>
	);
};

export default SignIn;
