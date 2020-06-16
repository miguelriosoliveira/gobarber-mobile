import React, { useEffect, useRef, useCallback, useImperativeHandle, forwardRef } from 'react';
import { TextInputProps } from 'react-native';

import { useField } from '@unform/core';

import { Container, Icon, TextInput } from './styles';

interface Props extends TextInputProps {
	name: string;
	icon: string;
}

interface InputValueReference {
	value: string;
}

interface InputRef {
	focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, Props> = ({ name, icon, ...rest }, ref) => {
	const { registerField, defaultValue = '', fieldName, error } = useField(name);
	const inputValueRef = useRef<InputValueReference>({ value: defaultValue });
	const inputElementRef = useRef<any>(null);

	useImperativeHandle(ref, () => ({
		focus() {
			inputElementRef.current.focus();
		},
	}));

	useEffect(() => {
		registerField<string>({
			name: fieldName,
			ref: inputValueRef.current,
			path: 'value',
			setValue(_ref, value) {
				inputValueRef.current.value = value;
				inputElementRef.current.setNativeProps({ text: value });
			},
			clearValue() {
				inputValueRef.current.value = '';
				inputElementRef.current.clear();
			},
		});
	}, [registerField, fieldName]);

	const handleOnChangeText = useCallback(text => {
		inputValueRef.current.value = text;
	}, []);

	return (
		<Container>
			<Icon name={icon} size={20} color="#666360" />
			<TextInput
				ref={inputElementRef}
				keyboardAppearance="dark"
				placeholderTextColor="#666360"
				defaultValue={defaultValue}
				onChangeText={handleOnChangeText}
				{...rest}
			/>
		</Container>
	);
};

export default forwardRef(Input);
