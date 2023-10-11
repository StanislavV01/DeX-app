import { useEffect, useState } from 'react';
import { ReactComponent as CloseDrawer } from '@/assets/double-arrow.svg';
import { ReactComponent as SettingIcon } from '@/assets/settings-icon.svg';
import styles from './Drawer.module.css';
import Wallet from '@/features/Wallet/Wallet';
import { DrawerProps } from './Drawer.props';
import { AnimatePresence, motion } from 'framer-motion';
import WithPortal from '@/components/withPortal/WithPortal';
import Settings from '../../features/Settings/Settings';
import { animationSideBlock } from '@/helpers/animationsVariants';

function Drawer({ handleClose, open }: DrawerProps): JSX.Element {
	const [isView, setIsView] = useState<boolean>(false);

	const handleCloseView = () => setIsView(false);

	useEffect(() => {
		if (!open) {
			setIsView(false);
		}
	}, [open]);

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					className={styles.settings}
					layout
					variants={animationSideBlock}
					initial="hidden"
					animate="visible"
					exit="hidden"
				>
					<div className={styles.container}>
						<div className={styles.closeDrawer} onClick={handleClose}>
							<CloseDrawer />
						</div>
						<div className={styles.settingsBox}>
							<div className={styles.settingsHeader}>
								<div>Connect a wallet</div>
								<button className={styles.settBtn}>
									<span className={styles.btnIcon}>
										<SettingIcon onClick={() => setIsView(true)} />
									</span>
								</button>
							</div>
							<Wallet className={styles.walletBlock} />
						</div>
					</div>
					<WithPortal rootId={'settings'}>
						<Settings isView={isView} handleCloseView={handleCloseView} />
					</WithPortal>
				</motion.div>
			)}
		</AnimatePresence>
	);
}

export default Drawer;
