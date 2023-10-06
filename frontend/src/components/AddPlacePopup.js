import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [addPlaceTitle, setAddPlaceTitle] = useState("");
  const [addPlaceUrl, setAddPlaceUrl] = useState("");

  function handleaddPlaceTitle(evt) {
    setAddPlaceTitle(evt.target.value);
  }

  function handleaddPlaceUrl(evt) {
    setAddPlaceUrl(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onAddPlaceSubmit({
      title: addPlaceTitle,
      url: addPlaceUrl,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      title={props.title}
      onSubmit={handleSubmit}
    >
      <div className="overlay__form-input-grup">
        <input
          onChange={handleaddPlaceTitle}
          className="overlay__text-input"
          type="text"
          name="place"
          id="overlay__form-place"
          placeholder="Título"
          required
          minLength="2"
          maxLength="30"
          value={addPlaceTitle}
        />
      </div>
      <span className="overlay__form-input-error overlay__form-place-error"></span>

      <div className="overlay__form-input-grup">
        <input
          onChange={handleaddPlaceUrl}
          className="overlay__text-input"
          type="url"
          name="imageURL"
          id="overlay__form-imageURL"
          placeholder="Enlace a la imagen"
          required
          value={addPlaceUrl}
        />
      </div>
      <span className="overlay__form-input-error overlay__form-imageURL-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
