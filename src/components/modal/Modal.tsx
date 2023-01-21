import { FC, createContext, useState, PropsWithChildren, useContext } from 'react'
import styles from './styles.module.css'

type ModalContextProps = {
    showModal: (props: ModalProps) => void,
    closeModal: () => void
}

export const ModalContext = createContext<ModalContextProps>({
    showModal: () => undefined,
    closeModal: () => undefined
})

type ModalProps = {
    state: ModalState,
    header: string,
    message: string
}

export enum ModalState {
    Message = 'message',
    Loading = 'loading',
    Final = 'final'
}

export const Modal: FC<ModalProps> = ({header, state, message}) => {

    const { closeModal } = useContext(ModalContext)

    if (state === ModalState.Message) return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <h3>{header}</h3>
                <p>{message}</p>
            </div>
        </div>
    )

    if (state === ModalState.Loading) return (
        <div className={styles.wrapper}>
            <div className={styles.modal_loading}>
                <div className={styles.loading_header}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.98757 0.389258C9.77567 0.39257 9.57374 0.479818 9.42609 0.631853C9.27845 0.783888 9.19716 0.988289 9.20006 1.2002V4.4002C9.19857 4.5062 9.21815 4.61145 9.25768 4.70983C9.29721 4.8082 9.3559 4.89774 9.43034 4.97324C9.50477 5.04873 9.59347 5.10868 9.69128 5.1496C9.78908 5.19052 9.89404 5.21159 10.0001 5.21159C10.1061 5.21159 10.211 5.19052 10.3089 5.1496C10.4067 5.10868 10.4954 5.04873 10.5698 4.97324C10.6442 4.89774 10.7029 4.8082 10.7424 4.70983C10.782 4.61145 10.8016 4.5062 10.8001 4.4002V1.2002C10.8015 1.09316 10.7815 0.986926 10.7412 0.887774C10.7008 0.788622 10.641 0.698571 10.5653 0.622954C10.4895 0.547337 10.3993 0.487692 10.3001 0.44755C10.2009 0.407408 10.0946 0.387586 9.98757 0.389258ZM14.4126 1.56895C14.269 1.56794 14.1279 1.60556 14.0039 1.67786C13.8799 1.75016 13.7777 1.85448 13.7079 1.97988L12.1079 4.7502C12.0503 4.84127 12.0117 4.94303 11.9945 5.04937C11.9772 5.15571 11.9816 5.26445 12.0074 5.36906C12.0331 5.47366 12.0798 5.57199 12.1445 5.65813C12.2092 5.74428 12.2906 5.81647 12.3839 5.87037C12.4772 5.92428 12.5804 5.95879 12.6873 5.97183C12.7943 5.98488 12.9027 5.97619 13.0062 5.94629C13.1098 5.91639 13.2062 5.8659 13.2897 5.79783C13.3732 5.72977 13.4421 5.64554 13.4923 5.5502L15.0923 2.77988C15.1646 2.65896 15.2038 2.52106 15.2057 2.38014C15.2077 2.23922 15.1724 2.10029 15.1034 1.97739C15.0344 1.85449 14.9342 1.752 14.8129 1.68028C14.6916 1.60855 14.5535 1.57015 14.4126 1.56895ZM5.56413 1.57051C5.42544 1.57586 5.29052 1.6172 5.17264 1.69047C5.05476 1.76374 4.95796 1.86641 4.89177 1.9884C4.82557 2.11039 4.79225 2.24751 4.79507 2.38627C4.7979 2.52504 4.83677 2.66069 4.90788 2.77988L6.50788 5.5502C6.55804 5.64554 6.62695 5.72977 6.71046 5.79783C6.79398 5.8659 6.89038 5.91639 6.99388 5.94629C7.09739 5.97619 7.20586 5.98488 7.31281 5.97183C7.41975 5.95879 7.52296 5.92428 7.61624 5.87037C7.70952 5.81647 7.79096 5.74428 7.85566 5.65813C7.92036 5.57199 7.967 5.47366 7.99277 5.36906C8.01855 5.26445 8.02293 5.15571 8.00566 5.04937C7.98838 4.94303 7.94981 4.84127 7.89225 4.7502L6.29225 1.97988C6.22037 1.8512 6.11434 1.74487 5.98586 1.67263C5.85737 1.60039 5.71143 1.56505 5.56413 1.57051ZM2.40007 4.79394C2.37349 4.79314 2.3469 4.79366 2.32038 4.79551C2.14791 4.80627 1.98356 4.87258 1.85191 4.98452C1.72026 5.09646 1.6284 5.24801 1.59005 5.41651C1.55171 5.58501 1.56895 5.76139 1.6392 5.91927C1.70944 6.07716 1.82892 6.20805 1.97975 6.29238L4.75007 7.89238C4.84114 7.94994 4.9429 7.98851 5.04924 8.00579C5.15558 8.02306 5.26432 8.01868 5.36893 7.9929C5.47353 7.96713 5.57186 7.92049 5.658 7.85579C5.74415 7.79108 5.81634 7.70965 5.87024 7.61637C5.92415 7.52309 5.95866 7.41988 5.9717 7.31294C5.98475 7.20599 5.97606 7.09752 5.94616 6.99401C5.91626 6.89051 5.86577 6.79411 5.7977 6.71059C5.72964 6.62708 5.64541 6.55817 5.55007 6.50801L2.77975 4.90801C2.66476 4.83874 2.53419 4.79951 2.40007 4.79394ZM17.6563 4.79551C17.5032 4.79051 17.3519 4.82955 17.2204 4.90801L14.4501 6.50801C14.3547 6.55817 14.2705 6.62708 14.2024 6.71059C14.1344 6.79411 14.0839 6.89051 14.054 6.99401C14.0241 7.09752 14.0154 7.20599 14.0284 7.31294C14.0415 7.41988 14.076 7.52309 14.1299 7.61637C14.1838 7.70965 14.256 7.79108 14.3421 7.85579C14.4283 7.92049 14.5266 7.96713 14.6312 7.9929C14.7358 8.01868 14.8445 8.02306 14.9509 8.00579C15.0572 7.98851 15.159 7.94994 15.2501 7.89238L18.0204 6.29238C18.1724 6.20683 18.2924 6.07393 18.3619 5.91391C18.4314 5.75389 18.4467 5.57553 18.4055 5.40601C18.3643 5.23648 18.2687 5.08508 18.1335 4.97487C17.9982 4.86465 17.8307 4.80167 17.6563 4.79551ZM1.20007 9.20019C1.09406 9.1987 0.988806 9.21828 0.890431 9.25781C0.792057 9.29734 0.70252 9.35603 0.627024 9.43047C0.551528 9.5049 0.491579 9.5936 0.450661 9.69141C0.409743 9.78921 0.388672 9.89417 0.388672 10.0002C0.388672 10.1062 0.409743 10.2112 0.450661 10.309C0.491579 10.4068 0.551528 10.4955 0.627024 10.5699C0.70252 10.6444 0.792057 10.703 0.890431 10.7426C0.988806 10.7821 1.09406 10.8017 1.20007 10.8002H4.40007C4.50607 10.8017 4.61133 10.7821 4.7097 10.7426C4.80807 10.703 4.89761 10.6444 4.97311 10.5699C5.0486 10.4955 5.10855 10.4068 5.14947 10.309C5.19039 10.2112 5.21146 10.1062 5.21146 10.0002C5.21146 9.89417 5.19039 9.78921 5.14947 9.69141C5.10855 9.5936 5.0486 9.5049 4.97311 9.43047C4.89761 9.35603 4.80807 9.29734 4.7097 9.25781C4.61133 9.21828 4.50607 9.1987 4.40007 9.20019H1.20007ZM15.6001 9.20019C15.4941 9.1987 15.3888 9.21828 15.2904 9.25781C15.1921 9.29734 15.1025 9.35603 15.027 9.43047C14.9515 9.5049 14.8916 9.5936 14.8507 9.69141C14.8097 9.78921 14.7887 9.89417 14.7887 10.0002C14.7887 10.1062 14.8097 10.2112 14.8507 10.309C14.8916 10.4068 14.9515 10.4955 15.027 10.5699C15.1025 10.6444 15.1921 10.703 15.2904 10.7426C15.3888 10.7821 15.4941 10.8017 15.6001 10.8002H18.8001C18.9061 10.8017 19.0113 10.7821 19.1097 10.7426C19.2081 10.703 19.2976 10.6444 19.3731 10.5699C19.4486 10.4955 19.5086 10.4068 19.5495 10.309C19.5904 10.2112 19.6115 10.1062 19.6115 10.0002C19.6115 9.89417 19.5904 9.78921 19.5495 9.69141C19.5086 9.5936 19.4486 9.5049 19.3731 9.43047C19.2976 9.35603 19.2081 9.29734 19.1097 9.25781C19.0113 9.21828 18.9061 9.1987 18.8001 9.20019H15.6001ZM14.8704 11.9939C14.8438 11.9931 14.8172 11.9937 14.7907 11.9955C14.6182 12.0063 14.4539 12.0726 14.3222 12.1845C14.1906 12.2965 14.0987 12.448 14.0604 12.6165C14.022 12.785 14.0393 12.9614 14.1095 13.1193C14.1798 13.2772 14.2992 13.4081 14.4501 13.4924L17.2204 15.0924C17.3114 15.1499 17.4132 15.1885 17.5196 15.2058C17.6259 15.2231 17.7346 15.2187 17.8392 15.1929C17.9438 15.1671 18.0422 15.1205 18.1283 15.0558C18.2145 14.9911 18.2866 14.9097 18.3406 14.8164C18.3945 14.7231 18.429 14.6199 18.442 14.5129C18.4551 14.406 18.4464 14.2975 18.4165 14.194C18.3866 14.0905 18.3361 13.9941 18.268 13.9106C18.2 13.8271 18.1157 13.7582 18.0204 13.708L15.2501 12.108C15.1351 12.0387 15.0045 11.9995 14.8704 11.9939ZM5.186 11.9955C5.03292 11.9905 4.88161 12.0296 4.75007 12.108L1.97975 13.708C1.88441 13.7582 1.80018 13.8271 1.73212 13.9106C1.66405 13.9941 1.61356 14.0905 1.58366 14.194C1.55376 14.2975 1.54507 14.406 1.55811 14.5129C1.57116 14.6199 1.60567 14.7231 1.65958 14.8164C1.71348 14.9097 1.78567 14.9911 1.87181 15.0558C1.95796 15.1205 2.05628 15.1671 2.16089 15.1929C2.2655 15.2187 2.37424 15.2231 2.48058 15.2058C2.58692 15.1885 2.68868 15.1499 2.77975 15.0924L5.55007 13.4924C5.70212 13.4068 5.82204 13.2739 5.89156 13.1139C5.96109 12.9539 5.9764 12.7755 5.93517 12.606C5.89394 12.4365 5.79842 12.2851 5.66318 12.1749C5.52793 12.0647 5.36036 12.0017 5.186 11.9955ZM7.21257 14.0393C7.06905 14.0383 6.9279 14.0759 6.80392 14.1482C6.67993 14.2205 6.57768 14.3248 6.50788 14.4502L4.90788 17.2205C4.85032 17.3116 4.81175 17.4133 4.79448 17.5197C4.7772 17.626 4.78159 17.7348 4.80736 17.8394C4.83314 17.944 4.87977 18.0423 4.94448 18.1284C5.00918 18.2146 5.09061 18.2868 5.18389 18.3407C5.27717 18.3946 5.38038 18.4291 5.48732 18.4421C5.59427 18.4552 5.70274 18.4465 5.80625 18.4166C5.90975 18.3867 6.00615 18.3362 6.08967 18.2681C6.17318 18.2001 6.24209 18.1159 6.29225 18.0205L7.89225 15.2502C7.96463 15.1293 8.00378 14.9914 8.00574 14.8505C8.0077 14.7095 7.97241 14.5706 7.90343 14.4477C7.83445 14.3248 7.73423 14.2223 7.61292 14.1506C7.4916 14.0789 7.35349 14.0405 7.21257 14.0393ZM12.7641 14.0408C12.6254 14.0462 12.4905 14.0875 12.3726 14.1608C12.2548 14.234 12.158 14.3367 12.0918 14.4587C12.0256 14.5807 11.9922 14.7178 11.9951 14.8566C11.9979 14.9954 12.0368 15.131 12.1079 15.2502L13.7079 18.0205C13.758 18.1159 13.827 18.2001 13.9105 18.2681C13.994 18.3362 14.0904 18.3867 14.1939 18.4166C14.2974 18.4465 14.4059 18.4552 14.5128 18.4421C14.6198 18.4291 14.723 18.3946 14.8162 18.3407C14.9095 18.2868 14.991 18.2146 15.0557 18.1284C15.1204 18.0423 15.167 17.944 15.1928 17.8394C15.2185 17.7348 15.2229 17.626 15.2057 17.5197C15.1884 17.4133 15.1498 17.3116 15.0923 17.2205L13.4923 14.4502C13.4204 14.3215 13.3143 14.2152 13.1859 14.1429C13.0574 14.0707 12.9114 14.0354 12.7641 14.0408ZM9.98757 14.7893C9.77567 14.7926 9.57374 14.8798 9.42609 15.0319C9.27845 15.1839 9.19716 15.3883 9.20006 15.6002V18.8002C9.19857 18.9062 9.21815 19.0115 9.25768 19.1098C9.29721 19.2082 9.3559 19.2977 9.43034 19.3732C9.50477 19.4487 9.59347 19.5087 9.69128 19.5496C9.78908 19.5905 9.89404 19.6116 10.0001 19.6116C10.1061 19.6116 10.211 19.5905 10.3089 19.5496C10.4067 19.5087 10.4954 19.4487 10.5698 19.3732C10.6442 19.2977 10.7029 19.2082 10.7424 19.1098C10.782 19.0115 10.8016 18.9062 10.8001 18.8002V15.6002C10.8015 15.4932 10.7815 15.3869 10.7412 15.2878C10.7008 15.1886 10.641 15.0986 10.5653 15.023C10.4895 14.9473 10.3993 14.8877 10.3001 14.8475C10.2009 14.8074 10.0946 14.7876 9.98757 14.7893Z" fill="white"/>
                    </svg>
                    <h3>{header}</h3>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )

    if (state === ModalState.Final) return (
        <div className={styles.wrapper}>
            <div className={styles.modal}>
                <div className={styles.final_header}> 
                    <h3>{header}</h3>
                    <svg onClick={closeModal} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L13 13M1 13L13 1" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
                    </svg>
                </div>
                <p>{message}</p>
            </div>
        </div>
    )

    return null
}

export const ModalProvider: FC<PropsWithChildren> = ({children}) => {

    const [show, setShow] = useState<ModalProps | null>(null)

    const showModal = (props: ModalProps) => setShow(props)
    const closeModal = () => setShow(null)

    return (
        <ModalContext.Provider value={{showModal, closeModal}}>
            {
                show ?
                <Modal state={show.state} header={show.header} message={show.message}/> :
                null
            }
            {children}
        </ModalContext.Provider>
    )
}