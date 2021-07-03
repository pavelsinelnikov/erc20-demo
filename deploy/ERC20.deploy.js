// Just a standard hardhat-deploy deployment definition file!
const func = async (hre) => {
	const { deployments, getNamedAccounts } = hre;
	const { deploy } = deployments;
	const { deployer } = await getNamedAccounts();

	const address = '0x34f627978dd51a0aa5fde612180c5d50feb76c09';
	const name = 'Test Token';
	const symbol = 'TT';

	await deploy('ERC20', {
		from: deployer,
		args: [name, symbol, address],
		log: true,
	});
};

func.tags = ['ERC20'];
module.exports = func;
