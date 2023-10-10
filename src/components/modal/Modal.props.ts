import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface ModalProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>,HTMLDivElement>{
	children:ReactNode | ReactNode[];
	title:string;
	isOpen:boolean,
	handleClose:()=>void
}