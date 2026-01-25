import * as React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { load, remove } from '../services/storage';
import * as mockApi from '../services/mockApi';

type User = {
	id: string;
	name: string;
	email: string;
};

type AuthContextType = {
	user: User | null;
	loading: boolean;
	signIn: (email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
	signUp: (name: string, email: string, password: string) => Promise<{ ok: boolean; message?: string }>;
	signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		(async () => {
			const u = await load('daago_user');
			if (u) {
				setUser({ id: u.id, name: u.name, email: u.email });
			}
			setLoading(false);
		})();
	}, []);

	const signIn = async (email: string, password: string) => {
		const res = await mockApi.login({ email, password });
		if (!res.ok) return { ok: false, message: res.message };
		const u = res.user;
		setUser({ id: u.id, name: u.name, email: u.email });
		return { ok: true };
	};

	const signUp = async (name: string, email: string, password: string) => {
		const res = await mockApi.signup({ name, email, password });
		if (!res.ok) return { ok: false, message: 'Erro no cadastro' };
		// auto sign in
		const loginRes = await mockApi.login({ email, password });
		if (!loginRes.ok) return { ok: false, message: loginRes.message };
		const u = loginRes.user;
		setUser({ id: u.id, name: u.name, email: u.email });
		return { ok: true };
	};

	const signOut = async () => {
		await remove('daago_user');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>{children}</AuthContext.Provider>
	);
};

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error('useAuth must be used within AuthProvider');
	return ctx;
}

