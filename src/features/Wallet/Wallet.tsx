import { useMetaMask } from '@/hooks/useMetamask';
import ConnectButton from '../ConnectButton/ConnectButton';
import styles from './Wallet.module.css';
import { WalletProps } from './Wallet.props';
import classNames from 'classnames';
import { Web3 } from 'web3';
import { useEffect, useState } from 'react';
import { formatBalance } from '@/helpers/formatUtills';
import getTokenContractAddress from './TokenContractAdress';

function Wallet({ className, ...props }: WalletProps): JSX.Element {
	const { wallet, isConnecting, connectMetaMask, activeChain } = useMetaMask();
	const [balances, setBalances] = useState({
		usdt: '',
		usdc: '',
		CRV: '',
	});

	const web3 = new Web3((window as any).ethereum);
	const userAddress = wallet.accounts[0];

	async function fetchContractBalance(contractAddress: string): Promise<string> {
		try {
			const data = web3.eth.abi.encodeFunctionCall({
				name: 'balanceOf',
				type: 'function',
				inputs: [{ type: 'address', name: 'account' }],
			},
				[userAddress]);

			const result = await web3.eth.call({
				to: contractAddress,
				data: data,
			});

			const balance = web3.utils.toBigInt(result).toString();
			return web3.utils.fromWei(balance, 'ether');
		} catch (error) {
			console.error('Error getting balance', error);
			return '';
		}
	}

	useEffect(() => {
		const fetchBalances = async () => {
			if (activeChain && activeChain.name) {
				const tokenAddressUsdt = getTokenContractAddress(activeChain.name, 'usdt');
				const tokenAddressUsdc = getTokenContractAddress(activeChain.name, 'usdc');
				const tokenAddressCRV = getTokenContractAddress(activeChain.name, 'CRV');

				if (tokenAddressUsdt && tokenAddressUsdc && tokenAddressCRV) {
					const usdtBalance = await fetchContractBalance(tokenAddressUsdt);
					const usdcBalance = await fetchContractBalance(tokenAddressUsdc);
					const CRVBalance = await fetchContractBalance(tokenAddressCRV);

					setBalances({
						usdt: usdtBalance,
						usdc: usdcBalance,
						CRV: CRVBalance,
					});
				}
			}
		};

		if (activeChain && activeChain.name) {
			fetchBalances();
		}
	}, [activeChain?.name]);

	return (
		<div className={classNames(styles.Wallet, className)} {...props}>
			<ConnectButton wallet={wallet} isConnecting={isConnecting} connectMetaMask={connectMetaMask} />
			{wallet.accounts[0] && (
				<>
					<div className={styles.adress}>
						<div>Address:</div>
						<div className={styles.adressText}>{wallet.accounts[0]}</div>
					</div>
					<div className={styles.list}>
						<div className={styles.item}>Eth balance: {wallet.balance}</div>
						<div className={styles.item}>USDT balance: {formatBalance(balances.usdt)}</div>
						<div className={styles.item}>USDC balance: {formatBalance(balances.usdc)}</div>
						<div className={styles.item}>CRV balance: {formatBalance(balances.CRV)}</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Wallet;
