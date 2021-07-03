# ERC-20 Demo

## What you Need

-   [Nodejs](https://nodejs.org/en/)
-   [Yarn](https://yarnpkg.com/getting-started/install/)
-   [Metamask Account](https://metamask.io/)
-   [Hardhat](https://hardhat.org/)
-   [Infura Account](https://infura.io/) - Only if deploying on the Official Testnet/Mainnet (e.g. Ropsten, Rinkeby, etc.)

## Before You Start

1. Go to `example.env` and enter your private key (**Note**: best to do this with a test account as you don't want to leave your private key lying around)
2. Rename your `example.env` to `.env`
3. In a terminal: `yarn install`

### Remote Test Node (https://www.sinelnikov.ca/ganache)

1. Navigate to https://www.sinelnikov.ca/projects/faucet
2. Paste in your address and click Send Test Ether
3. You can now interact with the application. Read the Home Page for more details regarding the functionality of the ERC-20 Token Smart Contract

4. Deploy the Contract using: `npx hardhat deploy --network sinelnikov`
5. In a separate Terminal, start the client: `yarn start`, you should see a React Page launch

### Local Server (localhost)

1. Start Hardhat: `npx hardhat node`
2. In a separate Terminal, deploy the Contract to the Hardhat node: `npx hardhat deploy --network hardhat`
3. In a separate Terminal, start the client: `yarn start`, you should see a React Page launch
4. Import a generated Hardhat Test account by the Private key into the MetaMask wallet
5. Switch the network to be `localhost:8545` (You should see the account contain about 100 Eth)
6. Send the 1 Ether to your original account
7. Switch to your original account
8. You can now interact with the application. Read the Home Page for more details regarding the functionality of the ERC-20 Token Smart Contract

### Using the Ropsten Testnet (Infura)

1. Go to the Ropsten Faucet and enter your address and click Send me test Ether
2. Add the link to your Infura project in your `.env` file
3. In a separate Terminal, deploy the Contract to the Hardhat node: `npx hardhat deploy --network hardhat`
4. In a separate Terminal, start the client: `yarn start`, you should see a React Page launch
5. You can now interact with the application. Read the Home Page for more details regarding the functionality of the ERC-20 Token Smart Contract
