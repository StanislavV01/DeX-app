import React, { useState, useEffect, createContext, PropsWithChildren, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { formatBalance } from '../helpers/formatUtills';
import { blockchainInfo, blockchainInfoModel } from './blockChainInfo';

export interface WalletState {
	accounts: string[];
	balance: string;
	chainId: string;
}

interface MetaMaskContextData {
	activeChain: blockchainInfoModel
	wallet: WalletState;
	hasProvider: boolean | null;
	error: boolean;
	errorMessage: string;
	isConnecting: boolean;
	connectMetaMask: () => void;
	clearError: () => void;
	switchBlockchain: (chainId: string) => void;
	handleChange: (chainId: string) => void;
}

const disconnectedState: WalletState = { accounts: [], balance: '', chainId: '' };

export const MetaMaskContext = createContext<MetaMaskContextData>({
	wallet: disconnectedState,
	hasProvider: null,
	error: false,
	errorMessage: '',
	isConnecting: false,
	connectMetaMask: () => { },
	clearError: () => { },
	switchBlockchain: () => { },
	activeChain: blockchainInfo[0],
	handleChange: () => { },
});

export const MetaMaskContextProvider: React.FC<PropsWithChildren<{}>> = ({ children }) => {
	const [hasProvider, setHasProvider] = useState<boolean | null>(null);
	const [isConnecting, setIsConnecting] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');
	const [wallet, setWallet] = useState(disconnectedState);
	const [activeChain, setActiveChain] = useState<blockchainInfoModel>(blockchainInfo[0])
	const clearError = useCallback(() => setErrorMessage(''), []);



	const updateWallet = useCallback(async (providedAccounts?: string[]) => {
		try {
			const accounts = providedAccounts || (await window.ethereum.request({ method: 'eth_accounts' }));

			if (accounts.length === 0) {
				setWallet(disconnectedState);
				return;
			}

			const provider = new Web3(window.ethereum);
			provider.eth.defaultAccount = accounts[0];
			const balance = formatBalance((await provider.eth.getBalance(accounts[0])).toString());
			const chainId = await provider.eth.getChainId();

			setWallet({ accounts, balance, chainId: chainId.toString() });
		} catch (error: any) {
			setErrorMessage(error.message);
		}
	}, []);

	const switchBlockchain = async (chainId: string) => {
		console.log('ChainId:', chainId);

		try {
			if (window.ethereum) {
				await window.ethereum.request({
					method: 'wallet_switchEthereumChain',
					params: [{ chainId: chainId }],
				});
			} else {
				console.log("MetaMask is not available.");
				// Handle the case where MetaMask is not installed or not enabled.
			}
		} catch (switchError: any) {
			if (switchError.code === 4902) {
				console.log("Can't switch blockchain");
			}
		}
	};
	const handleChange = (chainId: string): void => {
		const chain = blockchainInfo.find((item) => item.chainId === chainId);

		if (chain) {
			setActiveChain(chain);
			switchBlockchain(chainId);
		}
	};


	const updateWalletAndAccounts = useCallback(() => updateWallet(), [updateWallet]);

	useEffect(() => {
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true }) as any;
			setHasProvider(Boolean(provider));

			if (provider) {
				updateWalletAndAccounts();
				window.ethereum.on('accountsChanged', updateWallet);
				window.ethereum.on('chainChanged', updateWalletAndAccounts);
			}
		};

		getProvider();

		return () => {
			window.ethereum?.removeListener('accountsChanged', updateWallet);
			window.ethereum?.removeListener('chainChanged', updateWalletAndAccounts);
		};
	}, [updateWallet, updateWalletAndAccounts]);

	const connectMetaMask = async () => {
		setIsConnecting(true);

		try {
			const provider = await detectEthereumProvider() as any;

			if (!provider) {
				throw new Error('MetaMask not detected');
			}

			await (provider as any).request({ method: 'eth_requestAccounts' });
			clearError();

			const chainId = await (provider as any).request({ method: 'eth_chainId' });

			if (!blockchainInfo[chainId]) {
				throw new Error('Unsupported chain');
			}

			await switchBlockchain(chainId);
		} catch (error: any) {
			setErrorMessage(error.message);
		}

		setIsConnecting(false);
	};

	return (
		<MetaMaskContext.Provider
			value={{
				wallet,
				hasProvider,
				error: !!errorMessage,
				errorMessage,
				isConnecting,
				connectMetaMask,
				clearError,
				switchBlockchain,
				activeChain,
				handleChange,
			}}
		>
			{children}
		</MetaMaskContext.Provider>
	);
};
