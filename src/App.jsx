import { useState } from "react";
import Modal from "./component/modal.jsx";


const App = () => {
  const [images, setImages] = useState(null);
  const [value, setValue] = useState(null)
  const [error, setError] = useState(null)
  const [selectedImage, setSelectedImage] = useState(null)
  const [modalOpen, setModalOpen] = useState(false)

  const surpriseOption = [
    'A blue ostrich eating melon',
    'A matisse style shark on the telephone',
    'A dog is eating samosa',

  ]
  const surpriseMe = () => {
    setImages(null)
    const random = surpriseOption[Math.floor(Math.random() * surpriseOption.length)]
    setValue(random)
  }

  const getImages = async () => {
    setImages(null)
    if (value === null) {
      setError("Error! Must have a search term")
      return
    }
    try {
      const options = {
        method: "POST",
        body: JSON.stringify({
          message: value
        }),
        headers: {
          "Content-type": "application/json"
        }
      }
      const response = await fetch('http://localhost:8000/images', options);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      setImages(data)
    } catch (error) {
      console.error(error);
    }
  }
  // console.log(value);
  const uploadImage = async (e) => {
    const formData = new FormData()
    formData.append('file', e.target.files[0])
    setModalOpen(true)
    setSelectedImage(e.target.files[0])
    e.target.value = null
    try {
      const options = {
        method: "POST",
        body: formData
      }
      const response = await fetch('http://localhost:8000/upload', options);
      const data = await response.json()
    } catch (error) {
      console.error(error)
    }
  }

  const generateVariations = async () => {
    setImages(null)
    if (selectedImage === null) {
      setError('Error! Must have an existing image')
      setModalOpen(false)
      return
    }
    try {
      const options = {
        method: 'POST'

      }
      const response = await fetch("http://localhost:8000/variations", options)
      const data = await response.json()
      setImages(data)
      setError(null)
      setModalOpen(false)
    } catch (error) {
      console.error(error)

    }
  }

  return (
    <>

      <div className="app">
        <div className="header">
          <img src="logo.png" alt="" />
          <h2>Chatify</h2>
        </div>
        <hr />
        <section className="search-section">
          <p>Start With a detailed description
            <span className="surprise" onClick={surpriseMe}>Surprise me</span>
          </p>

          <div className="input-container">
            <input
              value={value}
              type="text" placeholder="An Impressionist oil paintinf of a sunflower in a purple vase..."
              onChange={e => setValue(e.target.value)} />
            <button onClick={getImages}>Generate</button>
          </div>
          <p className="extra-info">Or,
            <span>
              <label htmlFor="files">upload an <b> Image </b></label>
              <input id="files" onChange={uploadImage} accept="image/*" type="file" hidden />
            </span>
            to edit.
          </p>
          {error && <p>{error}</p>}
          {modalOpen &&
            <div className="overlay">
              <Modal
                setModalOpen={setModalOpen}
                setSelectedImage={setSelectedImage}
                selectedImage={selectedImage}
                generateVariation={generateVariations}
              />
            </div>}
        </section>
        <section className="image-section">
          {images?.map((images, _index) => (
            <img key={_index} src={images.url} alt={`Generated image of ${value}`}></img>
          ))}
        </section>
      </div>
    </>
  )
}

export default App











