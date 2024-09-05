import {expect} from './chai-setup';
import {ethers, deployments, getUnnamedAccounts} from 'hardhat';
import {setupUsers} from './utils';
import {GameItem} from '../typechain/GameItem';

const setup = deployments.createFixture(async () => {
  await deployments.fixture('GameItem');

  const gameItemContract = await deployments.get('GameItem');

  const contracts = {
    GameItem: <GameItem>(
      await ethers.getContractAt(gameItemContract.abi, gameItemContract.address)
    ),
  };
  const users = await setupUsers(await getUnnamedAccounts(), contracts);
  return {
    ...contracts,
    users,
  };
});

describe('GameItem', function () {
  it('can mint', async function () {
    const {users, GameItem} = await setup();

    await expect(
      users[0].GameItem.awardItem(
        users[0].address,
        'https://metadata.io/1.json'
      )
    )
      .to.emit(GameItem, 'Transfer')
      .withArgs(
        '0x0000000000000000000000000000000000000000',
        users[0].address,
        0
      );

    console.log('Owner of tokenId 0 is: ' + (await GameItem.ownerOf(0)));
  });
});
