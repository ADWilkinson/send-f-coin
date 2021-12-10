import './App.css';
import Minter from './Minter';

function App() {
  return (
    <div
      className="App"
      style={{
        backgroundColor: '#2d3445f7',
        height: '100vh',
        backgroundImage:
          'url("https://gumlet.assettype.com/afkgaming%2Fimport%2Fmedia%2Fimages%2F92881-3fb2db6cccf4a23383383394b28b2b31.jpeg?auto=format%2Ccompress&dpr=1.0&w=1200")',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <div style={{ paddingTop: '2em' }}></div>
      <Minter></Minter>
    </div>
  );
}

export default App;
