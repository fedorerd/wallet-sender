import { Dispatch, ReactElement, SetStateAction, useCallback, useRef, useState } from 'react'
import styles from './styles.module.css'

type InputProps<T> = {
    setValue: Dispatch<SetStateAction<T | null>>,
    setError: Dispatch<SetStateAction<string | null>>,
    valueBuilder: (value: string) => T
}

export const Input: <T>(props: InputProps<T>) => ReactElement = ({
    setValue, setError, valueBuilder
}) => {

    const [timer, setTimer] = useState<NodeJS.Timeout>()

    const ref = useRef<HTMLInputElement>(null)

    const saveValue = useCallback(() => {
        try {
            setError(null)
            setValue(null)
            if (!ref.current || !ref.current.value || !ref.current.value.length) return
            let val = valueBuilder(ref.current.value)
            setValue(val)
        } catch (e: any) {
            setValue(null)
            setError(e.message)
        }
    // eslint-disable-next-line
    }, [ref])

    const onKeyUp = () => {
        if (timer) clearTimeout(timer)
        const id = setTimeout(saveValue, 500)
        setTimer(id)
    }

    const onKeyDown = () => {
        if (timer) clearTimeout(timer)
    }

    return (
        <input ref={ref} onKeyUp={onKeyUp} onKeyDown={onKeyDown} className={styles.input}/>
    )
}