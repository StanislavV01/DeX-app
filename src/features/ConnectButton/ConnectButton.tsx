import { ReactComponent as MetaMaskIcon } from '@/assets/metamask-icon.svg';
import styles from './ConnectButton.module.css';
import { ConnectButtonProps } from './ConnectButton.props';
import { useEffect, useState } from 'react';
import { formatAddress } from '@/helpers/formatUtills';

const ConnectButton = ({ connectMetaMask, wallet, isConnecting, ...props }: ConnectButtonProps) => {
	const [btnText, setBtnText] = useState('Metamask');

	useEffect(() => {
		if (wallet.accounts[0]) {
			setBtnText(formatAddress(wallet.accounts[0]));
		}
	}, [wallet.accounts[0]]);

	const handleClick = () => {
		connectMetaMask();
	};

	return (
		<button className={styles.walletBtn} onClick={handleClick} {...props}>
			<div className={styles.walletWrap}>
				<div className={styles.walletIcon}>
					<MetaMaskIcon />
				</div>
				<div className={styles.walletName}>
					{btnText}
				</div>
			</div>
		</button>
	);
};

export default ConnectButton;
