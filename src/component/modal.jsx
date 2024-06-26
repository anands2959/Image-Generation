import { useRef, useState } from "react"


const Modal = ({ setModalOpen, setSelectedImage, selectedImage, generateVariations }) => {
    const [error, setError] = useState(null)
    const ref = useRef(null)

    const closeModal = () => {
        setModalOpen(false)
        setSelectedImage(null)
    }

    const checkSize = () => {
        if (ref.current.width == 256 && ref.current.height == 256) {
            generateVariations()
        } else {
            setError('Error: Choose 256x256 image')
        }

    }

    return (
        <div className="modal">
            <div onClick={closeModal} className="close">✖</div>

            <div className="image-container">
                {selectedImage && <img ref={ref} src={URL.createObjectURL(selectedImage)} alt="upload image" />}
            </div>
            <p>{error || "* Image must be 256 x 256"}</p>
            {!error && <button onClick={checkSize}>Generate</button>}
            {error && <button onClick={closeModal}>Close this and try again</button>}

        </div>
    )
}
export default Modal;