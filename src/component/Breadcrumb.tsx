import { useState } from "react";
import "../styles/global.css";

interface BreadcrumbProps {
	setBreadcrumbStatus: (status: string) => void;
}

const Breadcrumb = ({ setBreadcrumbStatus }: BreadcrumbProps) => {
	const [btnPosition, setbtnPosition] = useState<number | null>(0);

	const changeStatus = (index: number, status: string) => {
		if (btnPosition === index) {
			setbtnPosition(null);
			setBreadcrumbStatus("All");
		} else {
			setbtnPosition(index);
			setBreadcrumbStatus(status);
		}
	};

	return (
		<div id="myBtnContainer">
			<button
				className={`btn ${btnPosition === 0 ? "active" : ""}`}
				onClick={() => {
					{
						changeStatus(0, "All");
					}
				}}
			>
				{" "}
				All
			</button>
			<button
				className={`btn ${btnPosition === 1 ? "active" : ""}`}
				onClick={() => changeStatus(1, "Frontend")}
			>
				{" "}
				Frontend
			</button>
			<button
				className={`btn ${btnPosition === 2 ? "active" : ""}`}
				onClick={() => changeStatus(2, "Backend")}
			>
				{" "}
				Backend
			</button>
			<button
				className={`btn ${btnPosition === 3 ? "active" : ""}`}
				onClick={() => changeStatus(3, "Tools")}
			>
				{" "}
				Tools
			</button>
		</div>
	);
};

export default Breadcrumb;
