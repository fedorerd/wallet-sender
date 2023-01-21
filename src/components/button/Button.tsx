import { FC, PropsWithChildren } from 'react'
import styles from './styles.module.css'

type ButtonProps = {
    onClick: () => any
}

export const Button: FC<PropsWithChildren<ButtonProps>> = ({onClick, children}) => {
    return (
        <button onClick={onClick} className={styles.button}>
            {children}
        </button>
    )
}