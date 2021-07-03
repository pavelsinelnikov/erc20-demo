import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Web3 from 'web3';
import UseFormInput from '../components/UseFormInput';
import History from '../components/History';
import { contracts } from '../contracts/erc20.json';

export default function MetaMaskPage() {
	const [web3] = useState(new Web3(window.ethereum));
	const [contract, setContract] = useState(null);
	const [receiverAddress, receiverAddressInput] = UseFormInput({
		type: 'text',
		placeholder: 'Enter the receiver address',
	});
	const [receiverBalance, setReceiverBalance] = useState(0);
	const [senderAddress, senderAddressInput, setSenderAddress] = UseFormInput({
		type: 'text',
		placeholder: 'Enter the sender address',
	});
	const [senderBalance, setSenderBalance] = useState(0);
	const [amount, amountInput] = UseFormInput({
		defaultValue: 1,
		type: 'text',
		placeholder: 'Amount to send',
	});
	const [allowance, setAllowance] = useState(0);
	const [tokenName, setTokenName] = useState('');
	const [tokenSymbol, setTokenSymbol] = useState('');
	const [decimals, setDecimals] = useState(18);
	const [message, setMessage] = useState('');
	const [networkName, setNetworkName] = useState('undefined');
	const [contractAddress, contractAddressInput] = UseFormInput({
		type: 'text',
		placeholder: 'Enter the contract address',
		defaultValue: contracts.ERC20.address,
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [account] = await web3.eth.getAccounts();

				setSenderAddress(account);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [web3.eth, setSenderAddress]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (contractAddress && web3.utils.isAddress(contractAddress)) {
					const [account] = await web3.eth.getAccounts();

					const contract = new web3.eth.Contract(
						contracts.ERC20.abi,
						contractAddress
					);

					setContract(contract);
					setNetworkName(await web3.eth.net.getNetworkType());
					setTokenName(await contract.methods.name().call());
					setTokenSymbol(await contract.methods.symbol().call());
					setDecimals(await contract.methods.decimals().call());

					if (!senderAddress) {
						setSenderAddress(account);
					}

					setSenderBalance(
						(await contract.methods
							.balanceOf(senderAddress)
							.call()) / Math.pow(10, decimals)
					);

					if (receiverAddress) {
						setReceiverBalance(
							(await contract.methods
								.balanceOf(receiverAddress)
								.call()) / Math.pow(10, decimals)
						);
						setAllowance(
							(await contract.methods
								.allowance(senderAddress, receiverAddress)
								.call()) / Math.pow(10, decimals)
						);
					}
				}
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, [
		web3.eth,
		web3.utils,
		contractAddress,
		decimals,
		setSenderAddress,
		receiverAddress,
		senderAddress,
	]);

	function activateMenu() {
		window.ethereum.request({ method: 'eth_requestAccounts' });
	}

	async function checkBalance() {
		let senderBalance = 0;
		let receiverBalance = 0;
		let message = '';

		if (senderAddress) {
			if (web3.utils.isAddress(senderAddress)) {
				senderBalance = await contract.methods
					.balanceOf(senderAddress)
					.call();
			} else {
				message = 'Error: Incorrect ethereum address for the sender';
			}
		}

		if (receiverAddress) {
			if (web3.utils.isAddress(receiverAddress)) {
				receiverBalance = await contract.methods
					.balanceOf(receiverAddress)
					.call();
			} else {
				message = 'Error: Incorrect ethereum address for the receiver';
			}
		}

		setReceiverBalance(receiverBalance / Math.pow(10, decimals));
		setSenderBalance(senderBalance / Math.pow(10, decimals));
		setMessage(message);
	}

	async function checkAllowance() {
		let allowance = 0;
		let message = '';

		if (senderAddress && receiverAddress) {
			if (
				web3.utils.isAddress(senderAddress) &&
				web3.utils.isAddress(receiverAddress)
			) {
				allowance = await contract.methods
					.allowance(senderAddress, receiverAddress)
					.call();
			} else {
				message =
					'Error: Incorrect ethereum address for the sender or receiver';
			}
		}

		setAllowance(allowance / Math.pow(10, decimals));
		setMessage(message);
	}

	async function sendTransfer() {
		let start;
		let elapsedTime;
		if (senderBalance >= 0) {
			try {
				await contract.methods
					.transfer(
						receiverAddress,
						String(amount * Math.pow(10, decimals))
					)
					.send({ from: senderAddress })
					.on('transactionHash', (hash) => {
						console.log(hash);
						start = Date.now();
						setMessage('Processing Transaction Hash: ' + hash);
					})
					.on('receipt', () => {
						elapsedTime = (Date.now() - start) / 1000;
						console.log(elapsedTime);
						setMessage(`Completed in: ${elapsedTime} Seconds`);
					});
			} catch (error) {
				setMessage('Error: The transfer has failed - ' + error.message);
			}
		}
	}

	async function sendApproval() {
		let start;
		let elapsedTime;
		if (senderBalance >= 0) {
			try {
				await contract.methods
					.approve(
						receiverAddress,
						String(amount * Math.pow(10, decimals))
					)
					.send({ from: senderAddress })
					.on('transactionHash', (hash) => {
						console.log(hash);
						start = Date.now();
						setMessage('Processing Transaction Hash: ' + hash);
					})
					.on('receipt', () => {
						elapsedTime = (Date.now() - start) / 1000;
						console.log(elapsedTime);
						setMessage(`Completed in: ${elapsedTime} Seconds`);
					});
			} catch (error) {
				setMessage('Error: The approval has failed - ' + error.message);
			}
		}
	}

	async function receiveAllowance() {
		let start;
		let elapsedTime;
		try {
			await contract.methods
				.transferFrom(
					senderAddress,
					receiverAddress,
					String(amount * Math.pow(10, decimals))
				)
				.send({ from: receiverAddress })
				.on('transactionHash', (hash) => {
					console.log(hash);
					start = Date.now();
					setMessage('Processing Transaction Hash: ' + hash);
				})
				.on('receipt', () => {
					elapsedTime = (Date.now() - start) / 1000;
					console.log(elapsedTime);
					setMessage(`Completed in: ${elapsedTime} Seconds`);
				});
		} catch (error) {
			setMessage('Error: The transfer has failed - ' + error.message);
		}
	}

	return (
		<>
			<Row>
				<Col md={9}>
					<div>{networkName}</div>
					<h1>{tokenName}</h1>
				</Col>
				<Col md={3}>
					<Button variant="secondary" onClick={activateMenu} block>
						Activate MetaMask
					</Button>
				</Col>
			</Row>
			<Row>
				<Col md={8}>
					<b>{message}</b>
				</Col>
				<Col md={4} className="mb-2">
					<Form.Group controlId="formContractAddress">
						<Form.Label>Contract Address</Form.Label>
						{contractAddressInput}
					</Form.Group>
				</Col>
			</Row>

			<Form>
				<Row>
					<Col lg={6}>
						<Form.Group controlId="formSenderAddress">
							<Form.Label>Sender Address</Form.Label>
							{senderAddressInput}
						</Form.Group>
					</Col>
					<Col lg={6}>
						<Form.Group controlId="formReceiverAddress">
							<Form.Label>Receiver Address</Form.Label>
							{receiverAddressInput}
						</Form.Group>
					</Col>
				</Row>
				<Row>
					<Col md={3}>
						<Form.Label>Amount</Form.Label>
						{amountInput}
					</Col>
					<Col md={3}>
						<Form.Label>Sender Balance</Form.Label>
						<Form.Control
							plaintext
							readOnly
							value={`${senderBalance} ${tokenSymbol}`}
						/>
					</Col>
					<Col md={3}>
						<Form.Label>Receiver Balance</Form.Label>
						<Form.Control
							plaintext
							readOnly
							value={`${receiverBalance} ${tokenSymbol}`}
						/>
					</Col>
					<Col md={3}>
						<Form.Label>Allowance</Form.Label>
						<Form.Control
							plaintext
							readOnly
							value={`${allowance} ${tokenSymbol}`}
						/>
					</Col>
				</Row>
				<Row>
					<Col md={3} className="mt-4">
						<Button
							variant="secondary"
							onClick={checkBalance}
							block
						>
							Check Balance
						</Button>
					</Col>
					<Col md={3} className="mt-4">
						<Button
							variant="secondary"
							disabled={!receiverAddress}
							onClick={checkAllowance}
							block
						>
							Check Allowance
						</Button>
					</Col>
					<Col md={2} className="mt-4">
						<Button
							variant="primary"
							disabled={!receiverAddress}
							onClick={sendTransfer}
							block
						>
							Transfer
						</Button>
					</Col>
					<Col md={2} className="mt-4">
						<Button
							variant="primary"
							disabled={!receiverAddress}
							onClick={sendApproval}
							block
						>
							Approve
						</Button>
					</Col>
					<Col md={2} className="mt-4">
						<Button
							variant="primary"
							disabled={!receiverAddress}
							onClick={receiveAllowance}
							block
						>
							Withdraw
						</Button>
					</Col>
				</Row>
			</Form>
			<History contract={contract} web3={web3} decimals={decimals} />
		</>
	);
}
