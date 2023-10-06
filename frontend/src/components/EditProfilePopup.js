import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeJob(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
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
          onChange={handleChangeName}
          className="overlay__text-input"
          type="text"
          name="name"
          id="overlay__form-name"
          placeholder="Escribe el nombre"
          required
          minLength="2"
          maxLength="40"
          value={name}
        />
      </div>
      <span className="overlay__form-input-error overlay__form-name-error"></span>

      <div className="overlay__form-input-grup">
        <input
          onChange={handleChangeJob}
          className="overlay__text-input"
          type="text"
          name="job"
          id="overlay__form-job"
          placeholder="Escribe la ocupación"
          required
          minLength="2"
          maxLength="200"
          value={description}
        />
      </div>
      <span className="overlay__form-input-error overlay__form-job-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
