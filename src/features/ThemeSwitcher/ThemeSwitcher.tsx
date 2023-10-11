import styles from './themeSwitcher.module.css';
import { ReactComponent as LightModeIcon } from '@/assets/light-mode-icon.svg';
import { ReactComponent as DarkModeIcon } from '@/assets/dark-mode-icon.svg';
import classNames from 'classnames';
import { useTheme } from '@/hooks/useTheme';

function ThemeSwitcher() {
	const { mode, toggleMode } = useTheme();

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
