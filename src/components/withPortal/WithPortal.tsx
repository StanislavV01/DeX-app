import { ReactNode, useEffect, useRef } from "react"
import { createPortal } from "react-dom";

export interface withPortalProps {
	rootId: string,
	children: ReactNode | ReactNode[]
}

const withPortal = ({ rootId, children }: withPortalProps) => {
	const target = useRef<HTMLElement | null>(document.getElementById(rootId));

	useEffect(() => {
		return () => {
			window.requestAnimationFrame(() => {
				if (target.current?.childNodes.length === 0) {
					target.current?.remove();
					target.current = null;
				}
			});
		};
	}, [rootId]);

	if (!target.current) {
		target.current = document.createElement("div");
		target.current.setAttribute("id", rootId);
		document.body.appendChild(target.current);
	}

	return createPortal(children, target.current);
};

export default withPortal;