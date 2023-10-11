import { WalletState } from "@/Context/MetaMaskContext";
import { DetailedHTMLProps, HtmlHTMLAttributes } from "react";

export interface ConnectButtonProps 
extends DetailedHTMLProps <HtmlHTMLAttributes<HTMLButtonElement>,HTMLButtonElement>{
connectMetaMask:()=>void;
wallet:WalletState;
isConnecting:boolean;
}