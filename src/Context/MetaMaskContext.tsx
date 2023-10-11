import React, { useState, useEffect, createContext, PropsWithChildren, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { formatBalance } from '../helpers/formatUtills';
import { blockchainInfo, blockchainInfoModel } from './blockChainInfo';

interface WalletState {
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
	handleChange: () => void;
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
			const balance = formatBalance(await provider.eth.getBalance(accounts[0]));
			const chainId = await provider.eth.getChainId();

			setWallet({ accounts, balance, chainId: chainId.toString() });
		} catch (error) {
			setErrorMessage(error.message);
		}
	}, []);

	const switchBlockchain = async (chainId: string) => {
		console.log('ChainId:', chainId)

		try {
			await ethereum.request({
				method: 'wallet_switchEthereumChain',
				params: [{ chainId: chainId }],
			});

		} catch (switchError) {
			if (switchError.code === 4902) {

				console.log("Can't to switch blockhain")
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

	const connectToBlockchain = async (providerUrl: string) => {
		const provider = new Web3(providerUrl);

		try {
			const accounts = await provider.eth.requestAccounts();
			clearError();

			provider.eth.defaultAccount = accounts[0];

			const balance = formatBalance(await provider.eth.getBalance(accounts[0]));

			setWallet({ accounts, balance, chainId: await provider.eth.getChainId() });
		} catch (error) {
			setErrorMessage(error.message);
		}

		setIsConnecting(false);
	};

	const updateWalletAndAccounts = useCallback(() => updateWallet(), [updateWallet]);

	useEffect(() => {
		const getProvider = async () => {
			const provider = await detectEthereumProvider({ silent: true });
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
			const provider = await detectEthereumProvider();

			if (!provider) {
				throw new Error('MetaMask not detected');
			}

			await provider.request({ method: 'eth_requestAccounts' });
			clearError();

			const chainId = await provider.request({ method: 'eth_chainId' });

			if (!blockchainInfo[chainId]) {
				throw new Error('Unsupported chain');
			}

			await switchBlockchain(chainId);
		} catch (error) {
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
