import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter, SlopeWalletAdapter } from '@solana/wallet-adapter-wallets';
import { useMemo } from 'react';
import { Home } from './pages/Home';
import './index.css';
import '@solana/wallet-adapter-react-ui/styles.css';
import { ModalProvider } from './components/modal/Modal';
import { RPC_URL } from './config';

function App() {

  const endpoint = RPC_URL
  const wallets = useMemo(() => [
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter()
  ], [])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ModalProvider>
            <section className='page'>
              <Home/>
            </section>
          </ModalProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
