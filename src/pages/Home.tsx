import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { PublicKey } from '@solana/web3.js'
import { FC, useContext, useMemo, useState } from 'react'
import { Button } from '../components/button/Button'
import { Input } from '../components/input/Input'
import { ModalContext, ModalState } from '../components/modal/Modal'
import { transferAllSol, transferAllTokens } from '../solana/solana'
import styles from './styles.module.css'

export const Home: FC = () => {

    const { showModal } = useContext(ModalContext)
    const { publicKey, signAllTransactions, signTransaction } = useWallet()
    const { connection } = useConnection()

    const onSendSol = async () => {
        if (!publicKey || !signTransaction || !recepient) return

        showModal({
            header: 'Creating transactions',
            message: 'Checking your wallet balance.',
            state: ModalState.Loading
        })

        try {

            const { tx, balance } = await transferAllSol(publicKey, connection, recepient)

            if (balance <= 0) {
                showModal({
                    header: 'Insufficient balance',
                    message: `No $SOL found in the wallet.`,
                    state: ModalState.Final
                })
                return
            }

            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()

            tx.lastValidBlockHeight = lastValidBlockHeight
            tx.recentBlockhash = blockhash
            tx.feePayer = publicKey

            showModal({
                header: 'Approvide required',
                message: `Found ${balance} $SOL available for transfer. Please, sign transaction to proceed.`,
                state: ModalState.Message
            })

            await signTransaction(tx)

            showModal({
                header: 'Processing transaction',
                message: 'Sending and confirming transaction. Please, wait for a while.',
                state: ModalState.Loading
            })

            const txid = await connection.sendRawTransaction(tx.serialize())
            await connection.confirmTransaction({
                signature: txid,
                blockhash,
                lastValidBlockHeight
            })
            
            console.log(txid)

            showModal({
                header: 'Success',
                message: `Transfered ${balance} $SOL successfully. Check console for txid.`,
                state: ModalState.Final
            })

        } catch (e) {

            console.log(e)

            showModal({
                header: 'Error',
                message: `Something went wrong. Check console for error.`,
                state: ModalState.Final
            })

        }


    }

    const onSendTokens = async () => {
        if (!publicKey || !signAllTransactions || !recepient) return

        showModal({
            header: 'Creating transactions',
            message: 'Checking your wallet token balances.',
            state: ModalState.Loading
        })

        try {
            const { txs, transferAmount, closeAmount, frozenAccounts } = await transferAllTokens(publicKey, connection, recepient)

            if (transferAmount <= 0 && closeAmount <= 0) {

                let message = ''
                if (frozenAccounts > 0) message = `No available token accounts found in the wallet. ${frozenAccounts} accounts are frozen.`
                else message = `No token accounts found in the wallet.`

                showModal({
                    header: 'Insufficient balance',
                    message,
                    state: ModalState.Final
                })
                return
            }

            const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()

            txs.forEach(tx => {
                tx.lastValidBlockHeight = lastValidBlockHeight
                tx.recentBlockhash = blockhash
                tx.feePayer = publicKey
            })

            let message = ''
            if (transferAmount > 0) message += `Found ${transferAmount} token accounts to transfer from. `
            if (closeAmount > 0) message += `Found ${closeAmount} token accounts to close. `
            if (frozenAccounts > 0) message += `${frozenAccounts} accounts are frozen. `
            message += `${txs.length} transactions to be sent. Please, sign transactions to proceed.`

            showModal({
                header: 'Approvide required',
                message,
                state: ModalState.Message
            })

            await signAllTransactions(txs)

            showModal({
                header: 'Processing transactios',
                message: 'Sending and confirming transactions. Please, wait for a while.',
                state: ModalState.Loading
            })
            
            const results = await Promise.allSettled(
                txs.map(async tx => {
                    const txid = await connection.sendRawTransaction(tx.serialize())
                    await connection.confirmTransaction({
                        signature: txid,
                        blockhash,
                        lastValidBlockHeight
                    })
                    return txid
                })
            )

            const fulfilled = results.filter(r => r.status === 'fulfilled') as PromiseFulfilledResult<string>[]
            const rejected = results.filter(r => r.status === 'rejected') as PromiseRejectedResult[]

            if (rejected.length) console.log(rejected)
            if (fulfilled.length) fulfilled.forEach(f => console.log(f.value))

            showModal({
                header: 'Result',
                message: `${fulfilled.length}/${txs.length} transactions sent successfully. Check console for txids and errors.`,
                state: ModalState.Final
            })
        } catch (e) {
            showModal({
                header: 'Error',
                message: `Something went wrong. Check console for error.`,
                state: ModalState.Final
            })
        }

        
        
    }

    const [recepient, setRecepient] = useState<PublicKey | null>(null)
    const [recepientInputError, setRecepientInputError] = useState<string | null>(null)

    const recepientString = useMemo<string>(() => {
        if (recepient) return recepient.toBase58().slice(0, 4) + '...' + recepient.toBase58().slice(-4)
        else return ''
    }, [recepient])

    const valueBuilder = (val: string) => {
        try {
            let key = new PublicKey(val)
            return key
        } catch {
            throw new Error('Invalid address provided')
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h1>Wallet Sender</h1>
                <Input<PublicKey>
                    setValue={setRecepient}    
                    setError={setRecepientInputError}
                    valueBuilder={valueBuilder}
                />
                {
                    recepient 
                    ?
                    <h2>Recepient: {recepientString}</h2>
                    :
                    <h3>
                        {
                            recepientInputError || 'Insert recepient address above'
                        }    
                    </h3>
                }
            </div>
            <WalletMultiButton/>
            {
                publicKey && recepient?
                <div className={styles.buttons}>
                    <Button onClick={onSendSol}>Send all Sol</Button>
                    <Button onClick={onSendTokens}>Send all Tokens</Button>
                </div>
                : null
            }
        </div>
    )
}