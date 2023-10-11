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

			const balance = web3.utils.toBigInt(result);
			return web3.utils.fromWei(balance, 'ether').toString();
		} catch (error) {
			console.error('Error getting balance', error);

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
					console.log(balances)
				}
			}
		};

		if (activeChain && activeChain.name) {
			fetchBalances();
		}
	}, [activeChain.chainId]);

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
						<div className={styles.item}>USDT balance: {balances.usdt ? formatBalance(balances.usdt) : 'loading...'}</div>
						<div className={styles.item}>USDC balance: {balances.usdc ? formatBalance(balances.usdc) : 'loading...'}</div>
						<div className={styles.item}>CRV balance: {balances.CRV ? formatBalance(balances.CRV) : 'loading...'}</div>
					</div>
				</>
			)}
		</div>
	);
}

export default Wallet;
