function ImagePopup(props) {
  return (
    <section
      className={`overlay ${props.isOpen === "true" ? "overlay__visible" : ""} `}
      id="overlayCardPreview"
    >
      <div className="overlay__content overlay__content-preview">
        <figure className="overlay__figure">
          <img
            src={props.selectedCard.link}
            alt="tarjeta con imagen"
            className="overlay__preview-image"
          />
          <figcaption className="overlay__preview-caption">
            {props.selectedCard.name}
          </figcaption>
        </figure>
        <button
          className="overlay__form-close-button"
          id="closePreviewOverlay"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default ImagePopup;
