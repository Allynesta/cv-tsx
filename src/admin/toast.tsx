import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
	id: number;
	message: string;
	type: ToastType;
}

interface ToastCtx {
	toast: (message: string, type?: ToastType) => void;
}

const Ctx = createContext<ToastCtx>({ toast: () => {} });

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
	const [toasts, setToasts] = useState<Toast[]>([]);

	const toast = useCallback((message: string, type: ToastType = "success") => {
		const id = ++nextId;
		setToasts((t) => [...t, { id, message, type }]);
		setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
	}, []);

	return (
		<Ctx.Provider value={{ toast }}>
			{children}
			<div className="toaster" aria-live="polite">
				{toasts.map((t) => (
					<div key={t.id} className={`toast toast-${t.type}`}>
						<span className="toast-icon">
							{t.type === "success" ? "✓" : t.type === "error" ? "✕" : "i"}
						</span>
						{t.message}
					</div>
				))}
			</div>
		</Ctx.Provider>
	);
}

export const useToast = () => useContext(Ctx);
