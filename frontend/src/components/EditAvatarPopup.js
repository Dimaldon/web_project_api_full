import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputAvatar = useRef(null);
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onUpdateAvatar({
      avatar: inputAvatar.current.value,
    });
  }
  return (
    <PopupWithForm
      title={props.title}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <div className="overlay__form-input-grup">
        <input
          className="overlay__text-input"
          type="text"
          name="place"
          placeholder="Imagen URL"
          id="overlay__form-avatar-update"
          required
          minLength="2"
          ref={inputAvatar}
        />
      </div>
      <span className="overlay__form-input-error overlay__form-avatar-update-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
