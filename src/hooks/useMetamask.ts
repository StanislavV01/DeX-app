import { useContext } from "react"
import {MetaMaskContext} from '../Context/MetaMaskContext';


export const useMetaMask = () => {
	const context = useContext(MetaMaskContext)
	if (context === undefined) {
		throw new Error('useMetaMask must be used within a "MetaMaskContextProvider"')
	}
	return context
}