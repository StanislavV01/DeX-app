import styles from './themeSwitcher.module.css';
import { ReactComponent as LightModeIcon } from '@/assets/light-mode-icon.svg';
import { ReactComponent as DarkModeIcon } from '@/assets/dark-mode-icon.svg';
import { useContext } from 'react';
import { ThemeContext } from '@/Context/ThemeContext';
import classNames from 'classnames';

function ThemeSwitcher() {
	const { mode, toggleMode } = useContext(ThemeContext);

	const renderModeIcon = (icon: React.ReactNode, modeName: string) => (
		<div
			className={classNames(styles.modeIcon, {
				[styles[`${modeName}Active`]]: mode === modeName,
			})}
			onClick={() => toggleMode(modeName)}
		>
			{icon}
		</div>
	);

	return (
		<div className={styles.wrapper}>
			{renderModeIcon(<LightModeIcon />, 'light')}
			{renderModeIcon(<DarkModeIcon />, 'dark')}
		</div>
	);
}

export default ThemeSwitcher;
