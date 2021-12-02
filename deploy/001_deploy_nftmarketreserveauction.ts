import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {SampleERC721} from '../typechain/SampleERC721';
// import {parseEther} from 'ethers/lib/utils';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const {deployments, getNamedAccounts, ethers} = hre;
  const {deploy} = deployments;

  const {deployer} = await getNamedAccounts();

  await deploy('SampleERC721', {
    from: deployer,
    log: true,
  });

  const erc721: SampleERC721 = await ethers.getContract('SampleERC721');
  erc721.initialize('Sample', 'SML');
};
export default func;
func.tags = ['SampleERC721'];
