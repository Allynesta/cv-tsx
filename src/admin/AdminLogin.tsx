import { useState, type FormEvent } from "react";

interface Props {
	onLogin: (password: string) => boolean;
}

const AdminLogin = ({ onLogin }: Props) => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState(false);
	const [shaking, setShaking] = useState(false);

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		const ok = onLogin(password);
		if (!ok) {
			setError(true);
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
				<p className="admin-login-sub">Enter your password to continue</p>

				<div className="admin-field">
					<label htmlFor="admin-password">Password</label>
					<input
						id="admin-password"
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
							setError(false);
						}}
						placeholder="••••••••"
						autoFocus
						autoComplete="current-password"
					/>
					{error && (
						<span className="admin-login-error">Incorrect password</span>
					)}
				</div>

				<button type="submit" className="btn btn-primary admin-login-btn">
					Sign in
				</button>
			</form>
		</div>
	);
};

export default AdminLogin;
