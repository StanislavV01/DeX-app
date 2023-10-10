import { DetailedHTMLProps, HtmlHTMLAttributes, ReactNode } from "react";

export interface PageContainerProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	children:ReactNode[] | ReactNode;
}