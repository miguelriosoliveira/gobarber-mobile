import React from 'react';
import { View, Text, StatusBar } from 'react-native';

const App: React.FC = () => {
	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor="#312e38" />
			<View style={{ backgroundColor: '#312e38', flex: 1 }}>
				<Text>meu app</Text>
			</View>
		</>
	);
};

export default App;
