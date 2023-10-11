interface TokenContracts {
  [key: string]: {
    usdt: string;
    usdc: string;
    CRV: string;
  };
}


const TokenContractAdress:TokenContracts = {
	etherium:{
		usdt : '0xdac17f958d2ee523a2206206994597c13d831ec7',
		usdc : '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  		CRV : '0xD533a949740bb3306d119CC777fa900bA034cd52',
	},
	polygon:{
		usdt : '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
		usdc : '0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747',
  		CRV : '0x172370d5Cd63279eFa6d502DAB29171933a610AF',
	},
	arbitrum:{
		usdt : '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
		usdc : '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
  		CRV : '0x11cDb42B0EB46D95f990BeDD4695A6e3fA034978',
	}

}


function getTokenContractAdress(blockChain: string, token: string): string | undefined {
  if (TokenContractAdress[blockChain] && TokenContractAdress[blockChain][token]) {
    return TokenContractAdress[blockChain][token];
  }
  return undefined;
}

export default getTokenContractAdress;
