import { useState, useEffect } from "react";
import { supabase, isConfigured } from "../lib/supabase";

const SESSION_KEY = "cms_admin_authed";
const FALLBACK_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string | undefined;

export type AuthMode = "supabase" | "fallback" | "open";

const mode: AuthMode = isConfigured
	? "supabase"
	: FALLBACK_PASSWORD
	? "fallback"
	: "open";

export function useAdminAuth() {
	const [authed, setAuthed] = useState<boolean>(() => {
		if (mode === "open") return true;
		if (mode === "fallback") return sessionStorage.getItem(SESSION_KEY) === "1";
		return false;
	});
	const [loading, setLoading] = useState<boolean>(mode === "supabase");

	useEffect(() => {
		if (mode !== "supabase" || !supabase) return;

		supabase.auth.getSession().then(({ data: { session } }) => {
			setAuthed(!!session);
			setLoading(false);
		});

		const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
			setAuthed(!!session);
			setLoading(false);
		});

		return () => subscription.unsubscribe();
	}, []);

	const login = async (email: string, password: string): Promise<string | null> => {
		if (mode === "supabase" && supabase) {
			const { error } = await supabase.auth.signInWithPassword({ email, password });
			return error ? error.message : null;
		}

		if (mode === "fallback") {
			if (password === FALLBACK_PASSWORD) {
				sessionStorage.setItem(SESSION_KEY, "1");
				setAuthed(true);
				return null;
			}
			return "Incorrect password";
		}

		return null;
	};

	const logout = async () => {
		if (mode === "supabase" && supabase) {
			await supabase.auth.signOut();
		} else {
			sessionStorage.removeItem(SESSION_KEY);
			setAuthed(false);
		}
	};

	return { authed, loading, login, logout, mode };
}
