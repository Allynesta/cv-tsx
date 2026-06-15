import { useState } from "react";

const SESSION_KEY = "cms_admin_authed";
const EXPECTED = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

export function useAdminAuth() {
	// If no password is configured, admin is openly accessible
	const passwordRequired = Boolean(EXPECTED);

	const [authed, setAuthed] = useState<boolean>(() => {
		if (!passwordRequired) return true;
		return sessionStorage.getItem(SESSION_KEY) === "1";
	});

	const login = (password: string): boolean => {
		if (password === EXPECTED) {
			sessionStorage.setItem(SESSION_KEY, "1");
			setAuthed(true);
			return true;
		}
		return false;
	};

	const logout = () => {
		sessionStorage.removeItem(SESSION_KEY);
		setAuthed(false);
	};

	return { authed, login, logout, passwordRequired };
}
