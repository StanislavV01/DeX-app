import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface SettingsProps extends DetailedHTMLProps<HtmlHTMLAttributes<HTMLDivElement>, HTMLDivElement>{
	handleCloseView:()=>void,
	isView: boolean
}