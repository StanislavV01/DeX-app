import EtheriumIcon from '@/assets/Etherium.svg';
import PolygonIcon from '@/assets/polygon.svg';
import ArbitrumIcon from '@/assets/arbitrum.svg';

export interface blockchainInfoModel {
	name: string;
	icon: string;
	chainId: string;
	rpcUrl: string
}

export const blockchainInfo: blockchainInfoModel[] = [
	{
		name: 'etherium',
		icon: EtheriumIcon,
		chainId: '0x1',
		rpcUrl: 'https://mainnet.infura.io/v3/',
	},
	{
		name: 'polygon',
		icon: PolygonIcon,
		chainId: '0x89',
		rpcUrl: 'https://polygon-mainnet.infura.io',
	},
	{
		name: 'arbitrum',
		icon: ArbitrumIcon,
		chainId: '0xa4b1',
		rpcUrl: 'https://arbitrum-mainnet.infura.io',
	},
];