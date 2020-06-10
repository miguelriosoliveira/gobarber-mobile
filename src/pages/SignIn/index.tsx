import React from 'react';
import { Text, Image } from 'react-native';

import logo from '../../assets/logo.png';

import { Container } from './styles';

const SignIn: React.FC = () => {
	return (
		<Container>
			<Image source={logo} />
		</Container>
	);
};

export default SignIn;
