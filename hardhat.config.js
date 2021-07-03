require('dotenv').config();
require('@nomiclabs/hardhat-ethers');
require('@nomiclabs/hardhat-waffle');
require('hardhat-deploy');

module.exports = {
	networks: {
		hardhat: {
			accounts: {
				mnemonic:
					'test test test test test test test test test test test junk',
			},
		},
		sinelnikov: {
			url: 'https://www.sinelnikov.ca/ganache',
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
		ropsten: {
			url: `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`,
			accounts: [`0x${process.env.PRIVATE_KEY}`],
		},
	},
	solidity: '0.7.6',
	ovm: {
		solcVersion: '0.7.6', // Currently, we only support 0.5.16, 0.6.12, and 0.7.6 of the Solidity compiler
		optimizer: true,
		runs: 20,
	},
	namedAccounts: {
		deployer: 0,
	},
};
