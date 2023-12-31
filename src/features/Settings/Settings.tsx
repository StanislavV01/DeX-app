import classNames from "classnames";
import { SettingsProps } from "./Settings.props";
import styles from './Settings.module.css'
import { AnimatePresence, motion } from "framer-motion";
import { ReactComponent as BackArrowIcon } from "@/assets/arrow-back-icon.svg";
import { animationSideBlock } from "@/helpers/animationsVariants";
import ThemeSwitcher from "@/features/ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "@/hooks/useTheme";

function Settings({ handleCloseView, isView, className, ...props }: SettingsProps) {
	const { mode } = useTheme();

	return (
		<AnimatePresence>
			{isView && (

				<motion.div

					layout
					variants={animationSideBlock}
					initial={animationSideBlock.hidden}
					animate={animationSideBlock.visible}
					exit={'hidden'}
					className={styles.wrapper}
				>
					<div className={classNames(className, styles.box, {
						[styles.dark]: mode === 'dark',
					})}
						{...props}>
						<div className={styles.container}>
							<div className={styles.header}>
								<div className={styles.close}>
									<BackArrowIcon onClick={handleCloseView} />
								</div>
								<span>
									Settings
								</span>
							</div>
							<div className={styles.title}>
								Preferences
							</div>
							<div className={styles.list}>
								<div className={styles.item}>
									<div>
										Theme
									</div>
									<div className={styles.settingsChanger}>
										<ThemeSwitcher />
									</div>
								</div>
							</div>

						</div>
					</div>
				</motion.div>)
			}
		</AnimatePresence >
	);
}

export default Settings;
