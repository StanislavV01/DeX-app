import { ReactNode, createContext, useEffect, useState } from "react";

export interface ThemeContextProps {
	mode: string;
	toggleMode: (mode: string) => void;
}
type ThemeProviderProps = {
	children: ReactNode
}

const ThemeContext = createContext<ThemeContextProps | null>(null)


const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
	const [mode, setMode] = useState<string>('light');
	const toggleMode = (mode: string): void => {
		setMode(mode);
		window.localStorage.setItem('mode', mode)
	}

	useEffect(() => {
		const saveMode = window.localStorage.getItem('mode');
		if (saveMode) {
			setMode(saveMode);
		} else {

			setMode('light');
		}

	}, [])

	return (
		<ThemeContext.Provider value={{ mode, toggleMode }}>
			<div className="wrapper" data-theme={mode}>
				{children}
			</div>
		</ThemeContext.Provider>
	)
}

export { ThemeContext, ThemeProvider }