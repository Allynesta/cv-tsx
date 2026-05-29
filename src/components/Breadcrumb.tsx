import { useState } from "react";
import "../styles/breadcrumb.css";

interface BreadcrumbProps {
	setBreadcrumbStatus: (status: string) => void;
}

const FILTERS = ["All", "Frontend", "Backend", "Tools"] as const;

const Breadcrumb = ({ setBreadcrumbStatus }: BreadcrumbProps) => {
	const [activeIndex, setActiveIndex] = useState<number>(0);

	const handleFilter = (index: number, label: string) => {
		setActiveIndex(index);
		setBreadcrumbStatus(label);
	};

	return (
		<div className="filter-pills" id="myBtnContainer">
			{FILTERS.map((label, i) => (
				<button
					key={label}
					className={`filter-btn${activeIndex === i ? " active" : ""}`}
					onClick={() => handleFilter(i, label)}
				>
					{label}
				</button>
			))}
		</div>
	);
};

export default Breadcrumb;
