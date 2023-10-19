function PopupWithForm(props) {
  return (
    <>
      <section
        className={`overlay overlay_type_${props.name} ${
          props.isOpen ? 'overlay__visible' : ''
        } `}
      >
        <div className='overlay__content'>
          <h2 className='overlay__title'>{props.title}</h2>
          <form
            className='overlay__form'
            noValidate
            name={props.name}
            onSubmit={props.onSubmit}
          >
            {props.children}
            <button
              className='overlay__form-submit-button'
              type='submit'
              data-valordefault='Guardar'
            >
              Guardar
            </button>
          </form>
          <button
            className='overlay__form-close-button'
            id='closeProfileOverlay'
            onClick={props.onClose}
          ></button>
        </div>
      </section>
    </>
  );
}

export default PopupWithForm;
