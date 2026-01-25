import { load, save } from './storage';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

const USER_KEY = 'daago_user';
const CLAIMS_KEY = 'daago_claims';

export async function signup(user: { name: string; email: string; password: string }) {
	// naive: save user locally
	await save(USER_KEY, { ...user, id: generateId() });
	return { ok: true };
}

export async function login({ email, password }: { email: string; password: string }) {
	const user = await load(USER_KEY);
	if (!user) return { ok: false, message: 'Usuário não encontrado' };
	if (user.email !== email || user.password !== password) return { ok: false, message: 'Credenciais inválidas' };
	return { ok: true, user };
}

export async function getClaims() {
	const claims = (await load(CLAIMS_KEY)) || [];
	return claims;
}

export async function submitClaim(payload: any) {
	const claims = (await load(CLAIMS_KEY)) || [];
	const newClaim = { id: generateId(), status: 'aberto', createdAt: new Date().toISOString(), ...payload };
	claims.unshift(newClaim);
	await save(CLAIMS_KEY, claims);
	return newClaim;
}

export async function clearData() {
	await save(CLAIMS_KEY, []);
	await save(USER_KEY, null);
}

// emergency contacts
export async function getEmergencyContacts() {
	const contacts = (await load('daago_contacts')) || [];
	return contacts;
}

export async function addEmergencyContact(payload: { name: string; phone: string }) {
	const contacts = (await load('daago_contacts')) || [];
	contacts.unshift({ id: generateId(), ...payload });
	await save('daago_contacts', contacts);
	return contacts;
}

// documents
export async function getDocuments() {
	const docs = (await load('daago_docs')) || [];
	return docs;
}

export async function addDocument(payload: { name: string; uri: string }) {
	const docs = (await load('daago_docs')) || [];
	const doc = { id: generateId(), ...payload };
	docs.unshift(doc);
	await save('daago_docs', docs);
	return doc;
}

// notifications
export async function getNotifications() {
	const notes = (await load('daago_notifications')) || [];
	return notes;
}

export async function addNotification(note: { title: string; body: string }) {
	const notes = (await load('daago_notifications')) || [];
	const n = { id: generateId(), ...note };
	notes.unshift(n);
	await save('daago_notifications', notes);
	return n;
}
