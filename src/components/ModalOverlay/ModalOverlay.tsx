import stylesModalOverlay from './ModalOverlay.module.css'

export default function ModalOverlay(props: {exit: () => void}) {

    const overlayClose = (e: React.SyntheticEvent) => {
        let target = e.target as HTMLInputElement;
        if (target.classList.contains(`${stylesModalOverlay.overlay}`)) {
            props.exit()
        }
    }
    
    return (
        <div className={stylesModalOverlay.overlay} onClick={overlayClose}></div>
    )
}