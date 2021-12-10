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

  const connectWalletPressed = async () => {
    const walletResponse = await connectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
  };

  const addTokenPressed = async () => {
    await addToken();
  };

  const onMintPressed = async () => {
    const { success, status } = await mintNFT(url, name, description);
    setStatus(status);
    if (success) {
      setName('');
      setDescription('');
      setURL('');
    }
  };

  return (
    <div style={{ backgroundColor: '#f0f0f0', borderRadius: '15px' }} className="Minter">
      <button style={{ color: 'purple', borderColor: 'purple' }} id="walletButton" onClick={connectWalletPressed}>
        {walletAddress.length > 0 ? (
          'Connected: ' + String(walletAddress).substring(0, 6) + '...' + String(walletAddress).substring(38)
        ) : (
          <span>Connect Wallet</span>
        )}
      </button>

      <br></br>
      <h1 id="title" style={{ color: '#344771f7' }}>
        Send F Token <span style={{ color: 'purple'}}>(Polygon)</span>
      </h1>
      <p style={{ color: '#344771f7' }}>
        <strong>Claim 100 tokens every hour. Send F to pay respects to those in need.</strong>
      </p>
      <form>
        <h2 style={{ color: '344771f7' }}>Contract </h2>
        <a
          href="https://polygonscan.com/address/0x065902d124b823BC237890be37832d1790DFfc32"
          target="_blank"
          rel="noreferrer"
          style={{ color: 'purple' }}
        >
          polygonscan.com/address/0x065902d124b823BC237890be37832d1790DFfc32
        </a>
        <h2 style={{ color: '344771f7' }}>Add F Token to MetaMask</h2>
        <button id="addButton" style={{ color: 'red', borderColor: 'red', width: '100px' }} onClick={addTokenPressed}>
          🦊
        </button>
        <h2 style={{ color: '#344771f7' }}>Mint 100 F Tokens</h2>
      </form>
      <button
        id="mintButton"
        style={{ backgroundColor: '#344771f7', borderColor: '#344771f7', width: '100px' }}
        onClick={onMintPressed}
      >
        F
      </button>
      <p id="status">{status}</p>
    </div>
  );
};

export default Minter;
