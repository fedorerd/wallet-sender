import { useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { FC } from 'react'
import { Button } from '../components/button/Button'
import styles from './styles.module.css'

export const Home: FC = () => {

    const { publicKey } = useWallet()

    const onClick = () => console.log('a')
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Wallet Sender</h1>
                <h2>Recepient: 9yas...asfc</h2>
            </div>
            <WalletMultiButton/>
            {
                publicKey ?
                <div className={styles.buttons}>
                    <Button onClick={onClick}>Send all Sol</Button>
                    <Button onClick={onClick}>Send all Tokens</Button>
                    <Button onClick={onClick}>Send all</Button>
                </div>
                : null
            }
        </div>
    )
}