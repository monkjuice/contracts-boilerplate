import {expect} from './chai-setup';
import {ethers, deployments, getUnnamedAccounts} from 'hardhat';
import {setupUsers} from './utils';
import {SampleERC721} from '../typechain/SampleERC721';

const setup = deployments.createFixture(async () => {
  await deployments.fixture('SampleERC721');
  const contracts = {
    SampleERC721: <SampleERC721>await ethers.getContract('SampleERC721'),
  };
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
  };
});

describe('SampleERC721', function () {
  it('can mint', async function () {
    const {users, SampleERC721} = await setup();

    await expect(
      users[0].SampleERC721.mint(
        users[0].address,
        1
      )
    )
      .to.emit(SampleERC721, 'Transfer')
      .withArgs("0x0000000000000000000000000000000000000000", users[0].address, 1);
  });
});
