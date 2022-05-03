import {expect} from './chai-setup';
import {ethers, deployments, getUnnamedAccounts} from 'hardhat';
import {setupUsers} from './utils';
import {SampleERC721a} from '../typechain/SampleERC721a';

const setup = deployments.createFixture(async () => {
  await deployments.fixture('SampleERC721a');
  const contracts = {
    SampleERC721a: <SampleERC721a>await ethers.getContract('SampleERC721a'),
  };
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
  };
});

describe('SampleERC721a', function () {
  it('can mint', async function () {
    const {users, SampleERC721a} = await setup();

    await expect(users[0].SampleERC721a.mint(users[0].address, 1))
      .to.emit(SampleERC721a, 'Transfer')
      .withArgs(
        '0x0000000000000000000000000000000000000000',
        users[0].address,
        0
      );

    console.log('Owner of tokenId 0 is: ' + (await SampleERC721a.ownerOf(0)));
  });
});
