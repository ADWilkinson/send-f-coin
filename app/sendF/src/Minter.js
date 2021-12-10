import { useEffect, useState } from 'react';
import {
  connectWallet,
  getCurrentWalletConnected,
  addTokenAvax,
  changeToPolygon,
  changeToAvax,
  mintNFT,
  mintNFTAvax,
  addToken,
} from './util/interact.js';

const Minter = (props) => {
  const [walletAddress, setWallet] = useState('');
  const [walletAddressAvax, setWalletAvax] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');
  const [network, setNetwork] = useState('');

  useEffect(() => {
    async function fetchWallet() {
      const { address, status, success } = await getCurrentWalletConnected();

      setWallet(address);
      setStatus(status);
      if (success) {
        setNetwork('polygon');
      }

      addWalletListener();
    }
    fetchWallet();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus('');
        } else {
          setWallet('');
          setStatus('🦊 Connect to Metamask using the top button.');
        }
      });
    } else {
      setStatus(
        <p>
          {' '}
          🦊{' '}
          <a target="_blank" href={`https://metamask.io/download.html`}>
            You must install Metamask, a virtual Ethereum wallet, in your browser.
          </a>
        </p>
      );
    }
  }

  const connectWalletPressed = async (e) => {
    e.preventDefault();
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    setNetwork('polygon');
  };

  const changeNetworkAvax = async (e) => {
    e.preventDefault();
    console.log('hello');
    const walletResponse = await changeToAvax();
    setStatus(walletResponse.status);
    setWalletAvax(walletResponse.address);
    if (walletResponse.success) {
      setNetwork('avax');
    }
  };

  const changeNetworkPolygon = async (e) => {
    e.preventDefault();
    const walletResponse = await changeToPolygon();
    setStatus(walletResponse.status);
    setWalletAvax(walletResponse.address);
    if (walletResponse.success) {
      setNetwork('polygon');
    }
  };

  const addTokenPressed = async (e) => {
    e.preventDefault();
    if (network === 'avax') {
      await addTokenAvax();
    }
    if (network === 'polygon') {
      await addToken();
    }
  };

  const onMintPressed = async (e) => {
    e.preventDefault();
    if (network === 'avax') {
      const { success, status } = await mintNFTAvax(url, name, description);
      setStatus(status);
      if (success) {
        setName('');
        setDescription('');
        setURL('');
      }
    }

    if (network === 'polygon') {
      const { success, status } = await mintNFT(url, name, description);
      setStatus(status);
      if (success) {
        setName('');
        setDescription('');
        setURL('');
      }
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '15px' }} className="Minter">
      <button
        className="inline-flex items-center px-4 py-2 border text-base font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        id="walletButtonAvax"
        onClick={connectWalletPressed}
      >
        {walletAddress.length > 0 ? (
          'Connected: ' + String(walletAddress).substring(0, 6) + '...' + String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <button
        className="inline-flex px-1  border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        onClick={changeNetworkPolygon}
      >
        {network === 'polygon' ? 'On Polygon' : 'Switch to Polygon'}
        <img
          style={{ width: '20px', marginLeft: '5px', paddingTop: '2px' }}
          src="https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912"
        ></img>
      </button>
      <button
        className="inline-flex px-1 ml-2  border border-transparent text-base font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        onClick={changeNetworkAvax}
      >
        {network === 'avax' ? 'On Avalanche' : 'Switch to Avalanche'}{' '}
        <img
          style={{ width: '20px', marginLeft: '5px', paddingTop: '2px' }}
          src="https://assets.coingecko.com/coins/images/12559/small/coin-round-red.png?1604021818"
        ></img>
      </button>

      <br></br>
      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">
              {network === 'polygon' ? (
                <span style={{ color: '#8247e5' }}>Polygon</span>
              ) : network === 'avax' ? (
                <span style={{ color: '#e84142' }}>Avalanche</span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 my-3 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Connect to a network
                </span>
              )}
            </h2>
            <p
              className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-4xl sm:tracking-tight lg:text-4xl"
              style={{ color: '#2d3445f7' }}
            >
              Send F Token
            </p>
            <p className="max-w-xl mt-5 mx-auto text-lg text-gray-500" style={{ color: '#2d3445f7' }}>
              Claim 100 tokens every hour.
              <br />
              Send F tokens to{' '}
              <span>
                {' '}
                {network === 'polygon' ? (
                  <span style={{ color: '#8247e5' }}>pay respects.</span>
                ) : network === 'avax' ? (
                  <span style={{ color: '#e84142' }}>pay respects.</span>
                ) : (
                  <span style={{ color: '#2d3445f7' }}>pay respects.</span>
                )}
              </span>
            </p>
          </div>
        </div>
      </div>
      <form>
        <h3 className="font-bold" style={{ color: '#2d3445f7' }}>
          Contract
        </h3>

        <a
          href="https://polygonscan.com/address/0x065902d124b823BC237890be37832d1790DFfc32"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#8247e5', overflowWrap: 'break-word' }}
        >
          {network === 'polygon' ? (
            <span>
              <span className="inline-flex items-center px-2.5 py-0.5 my-3 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                0x065902d124b823BC237890be37832d1790DFfc32{' '}
                <img
                  style={{ width: '20px', marginLeft: '5px', paddingTop: '1px' }}
                  src="https://polygonscan.com/images/svg/brands/polygon.svg?v=1.3"
                ></img>
              </span>
            </span>
          ) : network === 'avax' ? (
            <span>
              <span className="inline-flex items-center px-2.5 py-0.5 my-3 rounded-full text-xs font-medium bg-red-100 text-red-800">
                0x7345aFD16539fE88Daa8feB61d1B3BF4531b572a
                <img
                  style={{ width: '20px', marginLeft: '5px', paddingTop: '1px' }}
                  src="https://snowtrace.io/images/svg/brands/main.svg?v=21.11.4.6"
                ></img>
              </span>
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 my-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              Connect to a network
            </span>
          )}
        </a>
        <h3 className="font-bold" style={{ color: '#2d3445f7' }}>
          Add F Token to MetaMask
        </h3>
        <button
          id="addButton"
          style={{ color: 'red', border: 'none', width: '70px', padding: '0px' }}
          onClick={addTokenPressed}
        >
          <img
            className="mb-2 mt-1"
            src="https://static.coingecko.com/s/metamask_fox-11b1aab7f9a07cbe8903d8d6eb1e6d42be66d1bdd838c10786c1c49a2efb36f0.svg"
          ></img>
        </button>
        <h3 className="font-bold" style={{ color: '#2d3445f7' }}>
          Mint 100 F Tokens
        </h3>
      </form>
      <button id="mintButton" style={{ border: 'none', width: '70px', padding: '0px' }} onClick={onMintPressed}>
        <img
          style={{ maxWidth: '70px' }}
          className="my-2"
          src="https://emoji.discord.st/emojis/10298264-ad02-44d6-8791-42b8aeca875c.png"
        ></img>
      </button>
      <p id="status" style={{ color: '#2d3445f7', overflowWrap: 'break-word' }}>
        {status}
      </p>
      <hr style={{ color: '#2d3445f7', marginTop: '10px' }} />
      <p style={{ color: '#2d3445f7', overflowWrap: 'break-word' }}>
        <a
          href=" https://knowyourmeme.com/memes/press-f-to-pay-respects/photos"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#8247e5', overflowWrap: 'break-word' }}
        >
          <span className="inline-flex items-center px-2.5 py-0.5 my-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            knowyourmeme
          </span>
        </a>
        <a
          href=" https://twitter.com/andrew_eth"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#8247e5', overflowWrap: 'break-word' }}
        >
          <span className="inline-flex items-center px-2.5 py-0.5 my-3 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            @andrew_eth
          </span>
        </a>
      </p>
    </div>
  );
};

export default Minter;
