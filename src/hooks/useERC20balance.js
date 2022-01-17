import {useEffect, useState} from 'react';
import {useMoralis, useMoralisWeb3Api} from 'react-moralis';
import {useMoralisDapp} from '../providers/MoralisDappProvider/MoralisDappProvider';
const useERC20Balance = (props) => {
  const {account} = useMoralisWeb3Api();
  const {isInitialized} = useMoralis();
  const {walletAddress, chainId} = useMoralisDapp();
  console.log({account});
  console.log({chainId});
  const [assets, setAssets] = useState();

  useEffect(() => {
    if (isInitialized) {
      console.log('object');
      fetchERC20Balance()
        .then((balance) => setAssets(balance))
        .catch((e) => alert(e.message));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInitialized, chainId, walletAddress]);

  const fetchERC20Balance = async () => {
    return await account
      .getTokenBalances({
        address: walletAddress,
        chain: props?.chain || chainId,
      })
      .then((result) => {
        console.log({result});
        return result;
      })
      .catch((e) => alert(e.message));
  };

  return {fetchERC20Balance, assets};
};

export default useERC20Balance;
