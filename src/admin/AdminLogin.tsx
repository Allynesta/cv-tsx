import { useState, type FormEvent } from "react";
import type { AuthMode } from "./useAdminAuth";

interface Props {
	onLogin: (email: string, password: string) => Promise<string | null>;
	mode: AuthMode;
}

const AdminLogin = ({ onLogin, mode }: Props) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [submitting, setSubmitting] = useState(false);
	const [shaking, setShaking] = useState(false);

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setSubmitting(true);
		const err = await onLogin(email, password);
		setSubmitting(false);
		if (err) {
			setError(err);
			setShaking(true);
			setPassword("");
			setTimeout(() => setShaking(false), 500);
		}
	};

	return (
		<div className="admin-login-screen">
			<form
				className={`admin-login-card${shaking ? " shake" : ""}`}
				onSubmit={handleSubmit}
			>
				<div className="admin-login-logo">CMS</div>
				<h1 className="admin-login-title">Admin access</h1>
				<p className="admin-login-sub">
					{mode === "supabase"
						? "Sign in with your Supabase account"
						: "Enter your password to continue"}
				</p>

				{mode === "fallback" && (
					<div className="admin-login-warning">
						Local auth — configure Supabase for production security
					</div>
				)}

				{mode === "supabase" && (
					<div className="admin-field">
						<label htmlFor="admin-email">Email</label>
						<input
							id="admin-email"
							type="email"
							value={email}
							onChange={(e) => { setEmail(e.target.value); setError(null); }}
							placeholder="admin@example.com"
							autoFocus
							autoComplete="email"
							required
						/>
					</div>
				)}

				<div className="admin-field">
					<label htmlFor="admin-password">Password</label>
					<input
						id="admin-password"
						type="password"
						value={password}
						onChange={(e) => { setPassword(e.target.value); setError(null); }}
						placeholder="••••••••"
						autoFocus={mode !== "supabase"}
						autoComplete="current-password"
						required
					/>
					{error && <span className="admin-login-error">{error}</span>}
				</div>

				<button
					type="submit"
					className="btn btn-primary admin-login-btn"
					disabled={submitting}
				>
					{submitting ? "Signing in…" : "Sign in"}
				</button>
			</form>
		</div>
	);
};

export default AdminLogin;
