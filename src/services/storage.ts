import AsyncStorage from '@react-native-async-storage/async-storage';

export async function save(key: string, value: any) {
	try {
		const str = JSON.stringify(value);
		await AsyncStorage.setItem(key, str);
	} catch (e) {
		console.warn('storage save error', e);
	}
}

export async function load(key: string) {
	try {
		const str = await AsyncStorage.getItem(key);
		return str ? JSON.parse(str) : null;
	} catch (e) {
		console.warn('storage load error', e);
		return null;
	}
}

export async function remove(key: string) {
	try {
		await AsyncStorage.removeItem(key);
	} catch (e) {
		console.warn('storage remove error', e);
	}
}
