require('dotenv').config();
const alchemyKey = process.env.REACT_APP_ALCHEMY_KEY;
const contractABIPolygon = require('../contract-polygon-abi.json');
const contractABIAvax = require('../contract-avax-abi.json');
const contractABIEth = require('../contract-eth-abi.json');
const contractAddressPolygon = '0x065902d124b823BC237890be37832d1790DFfc32';
const contractAddressAvax = '0x7345aFD16539fE88Daa8feB61d1B3BF4531b572a';
const contractAddressEth = '0x7Be497c63f0d946963B813a2cB5B88EA51B6b135';
const { createAlchemyWeb3 } = require('@alch/alchemy-web3');
const web3 = createAlchemyWeb3(alchemyKey);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [{ chainId: '0x1' }],
      });

      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x1' }],
        });
      } catch (error) {
        console.log(error);
      }

      return {
        status: '',
        address: addressArray[0],
        success: true,
      };
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message,
        success: false,
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

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [{ chainId: '0x89' }],
      });

      return {
        status: '',
        address: addressArray[0],
        success: true,
      };
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
          return {
            status: '😥 ' + error.message,
            success: false,
          };
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
      }
      if (error.code === 4001) {
        const addressArray = await window.ethereum.request({
          method: 'eth_requestAccounts',
          params: [{ chainId: '0x89' }],
        });
        return {
          status: 'Network change rejected 😥',
          address: addressArray[0],
          success: false,
        };
      }
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

export const changeToAvax = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xa86a' }],
      });

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [{ chainId: '0x89' }],
      });

      return {
        status: '',
        address: addressArray[0],
        success: true,
      };
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

          const addressArray = await window.ethereum.request({
            method: 'eth_requestAccounts',
            params: [{ chainId: '0x89' }],
          });

          return {
            status: '',
            address: addressArray[0],
            success: true,
          };
        } catch (error) {
          return {
            status: '😥 ' + error.message,
            success: false,
          };
        }
      }
      if (error.code === 4001) {
        const addressArray = await window.ethereum.request({
          method: 'eth_requestAccounts',
          params: [{ chainId: '0x89' }],
        });

        return {
          status: 'Network change rejected 😥',
          address: addressArray[0],
          success: false,
        };
      }
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

export const changeToEth = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x1' }],
      });

      const addressArray = await window.ethereum.request({
        method: 'eth_requestAccounts',
        params: [{ chainId: '0x1' }],
      });

      return {
        status: '',
        address: addressArray[0],
        success: true,
      };
    } catch (error) {
      if (error.code === 4001) {
        const addressArray = await window.ethereum.request({
          method: 'eth_requestAccounts',
          params: [{ chainId: '0x1' }],
        });

        return {
          status: 'Network change rejected 😥',
          address: addressArray[0],
          success: false,
        };
      }
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

export const addTokenPolygon = async () => {
  if (window.ethereum) {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: contractAddressPolygon, // The address that the token is at.
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
          address: contractAddressAvax, // The address that the token is at.
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

export const addTokenEth = async () => {
  if (window.ethereum) {
    // wasAdded is a boolean. Like any RPC method, an error may be thrown.
    await window.ethereum.request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20', // Initially only supports ERC20, but eventually more!
        options: {
          address: contractAddressEth, // The address that the token is at.
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
          success: true,
        };
      } else {
        return {
          address: '',
          status: '🦊 Connect to Metamask using the button at the top.',
          success: false,
        };
      }
    } catch (err) {
      return {
        address: '',
        status: '😥 ' + err.message,
        success: false,
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

export const mintNFTPolygon = async () => {
  window.contract = await new web3.eth.Contract(contractABIPolygon, contractAddressPolygon);

  const transactionParameters = {
    to: contractAddressPolygon, // Required except during contract publications.
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
      status: (
        <span>
          <p>
            ✅ Check out your transaction on Polygonscan:{' '}
            <a target="_blank" style={{ color: '#8247e5' }} href={`https://polygonscan.com/tx/` + txHash}>
              {txHash}
            </a>
          </p>
        </span>
      ),
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};

export const mintNFTEth = async () => {
  window.contract = await new web3.eth.Contract(contractABIEth, contractAddressEth);

  const transactionParameters = {
    to: contractAddressEth, // Required except during contract publications.
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
      status: (
        <span>
          <p>
            ✅ Check out your transaction on Etherscan:{' '}
            <a target="_blank" style={{ color: '#2d3445f7' }} href={`https://etherscan.com/tx/'` + txHash}>
              {txHash}
            </a>
          </p>
        </span>
      ),
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};

export const mintNFTAvax = async () => {
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
      status: (
        <span>
          <p>
            ✅ Check out your transaction on Snowtrace:{' '}
            <a target="_blank" style={{ color: '#e84142' }} href={` https://snowtrace.io/tx/'` + txHash}>
              {txHash}
            </a>
          </p>
        </span>
      ),
    };
  } catch (error) {
    return {
      success: false,
      status: '😥 Something went wrong: ' + error.message,
    };
  }
};
