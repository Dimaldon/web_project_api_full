import React from 'react';
import accepted from '../images/accepted.png';
import denied from '../images/denied.png';

const InfoTooltip = ({ error, infoToolOpen, handleClose }) => {
  return (
    <div className={`overlay ${infoToolOpen && 'overlay__visible'}`}>
      <div className='overlay__content infoTooltip'>
        <button
          alt='Icono de cerrar'
          className='overlay__form-close-button'
          onClick={handleClose}
        ></button>
        {error ? (
          <>
            <img
              src={denied}
              alt='Icono de rechazo'
              className='overlay__preview-image'
            />
            <h2 className='overlay__title overlay__title_tooltip'>
              Uy, algo salió mal. Por favor, inténtalo de nuevo
            </h2>
          </>
        ) : (
          <>
            <img
              src={accepted}
              alt='Icono de aprobación'
              className='popup__image'
            />
            <h2 className='overlay__title overlay__title_tooltip'>
              ¡Correcto! Ya estás registrado
            </h2>
          </>
        )}
      </div>
    </div>
  );
};

export default InfoTooltip;
