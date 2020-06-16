import React, { useRef, useCallback } from 'react';
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	View,
	ScrollView,
	TextInput,
	Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import * as Yup from 'yup';

import logo from '../../assets/logo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Title, BackToSignInButton, BackToSignInButtonText } from './styles';

interface FormData {
	name: string;
	email: string;
	password: string;
}

const SignUp: React.FC = () => {
	const navigation = useNavigation();
	const formRef = useRef<FormHandles>(null);
	const emailInputRef = useRef<TextInput>(null);
	const passwordInputRef = useRef<TextInput>(null);

	const handleSignUp = useCallback(
		async (formData: FormData) => {
			try {
				formRef.current?.setErrors({});

				const schema = Yup.object().shape({
					name: Yup.string().required('Nome obrigatório'),
					email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
					password: Yup.string().min(6, 'No mínimo 6 dígitos'),
				});

				await schema.validate(formData, { abortEarly: false });

				// await api.post('users', formData);

				Alert.alert('Cadastro realizado!', 'Você já pode fazer seu logon no GoBarber');
				navigation.navigate('SignIn');
			} catch (err) {
				if (err instanceof Yup.ValidationError) {
					const errors = getValidationErrors(err);
					formRef.current?.setErrors(errors);
					return;
				}

				Alert.alert('Falha no cadastro', 'Ocorreu uma falha no cadastro, tente novamente.');
			}
		},
		[navigation],
	);

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
							<Input
								name="name"
								icon="user"
								placeholder="Nome"
								autoCapitalize="words"
								returnKeyType="next"
								onSubmitEditing={emailInputRef.current?.focus}
							/>
							<Input
								ref={emailInputRef}
								name="email"
								icon="mail"
								placeholder="E-mail"
								keyboardType="email-address"
								autoCorrect={false}
								autoCapitalize="none"
								returnKeyType="next"
								onSubmitEditing={passwordInputRef.current?.focus}
							/>
							<Input
								ref={passwordInputRef}
								name="password"
								icon="lock"
								placeholder="Senha"
								secureTextEntry
								textContentType="newPassword"
								returnKeyType="send"
								onSubmitEditing={formRef.current?.submitForm}
							/>

							<Button onPress={formRef.current?.submitForm}>Entrar</Button>
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
