import { useEffect, useState } from 'react';
import { connectWallet, getCurrentWalletConnected, mintNFT, addToken } from './util/interact.js';

const Minter = (props) => {
  const [walletAddress, setWallet] = useState('');
  const [status, setStatus] = useState('');

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [url, setURL] = useState('');

  useEffect(async () => {
    const { address, status } = await getCurrentWalletConnected();

    setWallet(address);
    setStatus(status);

    addWalletListener();
  }, []);

  function addWalletListener() {
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus('');
        } else {
          setWallet('');
          setStatus('🦊 Connect to Metamask using the top right button.');
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
  };

  const addTokenPressed = async (e) => {
    e.preventDefault();
    await addToken();
  };

  const onMintPressed = async (e) => {
    e.preventDefault();
    const { success, status } = await mintNFT(url, name, description);
    setStatus(status);
    if (success) {
      setName('');
      setDescription('');
      setURL('');
    }
  };

  return (
    <div style={{ backgroundColor: '#fff', borderRadius: '15px' }} className="Minter">
      <button
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        id="walletButton"
        onClick={connectWalletPressed}
      >
        {walletAddress.length > 0 ? (
          'Connected: ' + String(walletAddress).substring(0, 6) + '...' + String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>
      <br></br>

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-8 px-4 sm:py-8 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-purple-600 tracking-wide uppercase">
              <span style={{ color: '#8247e5' }}>(Polygon)</span>
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
              Send F tokens to pay respects.
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
          <span className="inline-flex items-center px-2.5 py-0.5 my-3 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            0x065902d124b823BC237890be37832d1790DFfc32
          </span>
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
    </div>
  );
};

export default Minter;
