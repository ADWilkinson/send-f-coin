require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABI = require('../contract-abi.json');
const contractABIAvax = require('../contract-avax-abi.json');
const contractAddress = '0x065902d124b823BC237890be37832d1790DFfc32';
const contractAddressAvax = '0x7345aFD16539fE88Daa8feB61d1B3BF4531b572a';
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [{ chainId: '0x89' }],
      });

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x89' }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: '0x89',
                  chainName: 'Polygon Network',
                  rpcUrls: ['https://rpc-mainnet.matic.network'],
                  nativeCurrency: {
                    name: 'Matic',
                    symbol: 'Matic',
                    decimals: 18,
                  },
                  blockExplorerUrls: ['https://polygonscan.com'],
                },
              ],
            });
          } catch (error) {
            alert(error.message);
          }
        }
      }

      const obj = {
        status: '',
        address: addressArray[0],
        success: true,
      };
      return obj;
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message,
      };
    }
  } else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const changeToPolygon = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x89' }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x89',
                chainName: 'Polygon Network',
                rpcUrls: ['https://rpc-mainnet.matic.network'],
                nativeCurrency: {
                  name: 'Matic',
                  symbol: 'Matic',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://polygonscan.com'],
              },
            ],
          });
        } catch (error) {
          alert(error.message);
        }
      }
    }

    const addressArray = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [{ chainId: '0x89' }],
    });

    return {
      status: '',
      address: addressArray[0],
      success: true,
    };
  } else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const changeToAvax = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa86a' }],
      });
    } catch (error) {
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0xa86a',
                chainName: 'Avalanche Network',
                rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
                nativeCurrency: {
                  name: 'AVAX',
                  symbol: 'AVAX',
                  decimals: 18,
                },
                blockExplorerUrls: ['https://snowtrace.io'],
              },
            ],
          });
        } catch (error) {
          alert(error.message);
        }
      }
    }

    const addressArray = await window.ethereum.request({
      method: 'eth_requestAccounts',
      params: [{ chainId: '0x89' }],
    });

    return {
      status: '',
      address: addressArray[0],
      success: true,
    };
  } else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const addToken = async () => {
  if (window.ethereum) {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: '0x065902d124b823bc237890be37832d1790dffc32', // The address that the token is at.
          symbol: 'F', // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
          image: '', // A string url of the token logo
        },
      },
    });
  } else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const addTokenAvax = async () => {
  if (window.ethereum) {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: '0x7345aFD16539fE88Daa8feB61d1B3BF4531b572a', // The address that the token is at.
          symbol: 'F', // A ticker symbol or shorthand, up to 5 chars.
          decimals: 18, // The number of decimals in the token
          image: '', // A string url of the token logo
        },
      },
    });
  } else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_accounts',
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: '',
        };
      } else {
        return {
          address: '',
          status: '🦊 Connect to Metamask using the top right button.',
        };
      }
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message,
      };
    }
  } else {
    return {
      address: '',
      status: (
        <span>
          <p>
            {' '}
            🦊{' '}
            <a target="_blank" href={`https://metamask.io/download.html`}>
              You must install Metamask, a virtual Ethereum wallet, in your browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const mintNFT = async (url, name, description) => {
  window.contract = await new web3.eth.Contract(contractABI, contractAddress);

  const transactionParameters = {
    to: contractAddress, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.claim().encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    return {
      success: true,
      status: '✅ Check out your transaction on Polygonscan: https://polygonscan.com/tx/' + txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};

export const mintNFTAvax = async (url, name, description) => {
  window.contract = await new web3.eth.Contract(contractABIAvax, contractAddressAvax);

  const transactionParameters = {
    to: contractAddressAvax, // Required except during contract publications.
    from: window.ethereum.selectedAddress, // must match user's active address.
    data: window.contract.methods.claim().encodeABI(),
  };

  try {
    const txHash = await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [transactionParameters],
    });
    return {
      success: true,
      status: '✅ Check out your transaction on Snowtrace: https://snowtrace.io/tx/' + txHash,
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};
