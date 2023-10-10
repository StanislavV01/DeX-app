import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface ButtonProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLButtonElement>,HTMLButtonElement>{
	theme:string
	size:'s'|'l';
}