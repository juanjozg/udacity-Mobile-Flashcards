import { AsyncStorage } from 'react-native';

export async function clearAsyncStorage() {
	await AsyncStorage.clear();
	alert('AsyncStorage cleared, reload app!');
}
