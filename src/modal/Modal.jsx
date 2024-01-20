import { useRef, useEffect} from 'react'

export default function Modal({ children, isOpen, handleClose }) {
    // commentaire à expliciter 
    const dialogRef = useRef(null);

    const close = () => {
        dialogRef.current?.close();
    };

    useEffect(() => {
        const dialog = dialogRef.current;
        if (isOpen && !dialogRef.current?.open) {
            dialog?.showModal(); // usage propre à l'élément <dialog>
        } else {
            dialog?.close(); // usage propre à l'élément <dialog>
        }
    }, [isOpen]);

    function handleClickOutside(event) {
        if (!dialogRef.current) {
            return;
        }
        
        const box = dialogRef.current?.getBoundingClientRect();
        // On calcule si le curseur est à l'extérieur de la boîte englobante de la modale
        if (
            event.pageX < box.left ||
            event.pageX > box.right ||
            event.pageY < (box.top + window.scrollY) ||
            event.pageY > (box.bottom + window.scrollY)
        ) {
            close();
        }
    }

    return (
        <dialog 
            ref={dialogRef}
            // 👇 capture l'élément 'close' et mise à jour de l'état du composant
            onClose={handleClose}
            onClick={handleClickOutside}
            className="bg-myBlue overscroll-contain backdrop:backdrop-blur-sm backdrop:backdrop-brightness-75 text-white min-w-2xl text-center p-8 border-2 border-white ring-myBlue ring-4 mx-auto"
        >
            {children}

            <button 
                type="button" 
                onClick={close} 
                title="close modal" 
                aria-label="close modal"
                className='mt-8 mx-auto py-1 px-6 ring-1 ring-white hover:bg-rose-700'
                >
                Fermer
            </button>
        </dialog>
    );
}