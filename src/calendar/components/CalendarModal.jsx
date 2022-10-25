import { addHours, differenceInSeconds } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from "react-datepicker";
import es from 'date-fns/locale/es';

import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

import { useCalendarStore, useUiStore } from '../../hooks';

registerLocale('es', es);

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    // width: '500px'
  },
};

Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { activeEvent } = useCalendarStore();
  const [formValues, setFormValues] = useState({
    title: '',
    notes: '',
    start: new Date(),
    end: addHours(new Date(), 2)
  });
  // const [startDate, setStartDate] = useState(new Date());

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';

    return (formValues.title.length > 0) ? '' : 'is-invalid';
  }, [ formValues.title, formSubmitted ]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({...activeEvent});
    }
  
  }, [activeEvent])

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, inputName) => {
    setFormValues({
      ...formValues,
      [inputName]: event
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();

    setFormSubmitted(true);

    // Validaciones
    const difference = differenceInSeconds(formValues.end, formValues.start); // obtiene la diferencia defechas, si es positivo, la fecha de termino es mayor que la de inicio como se espera

    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Una de las fechas no es valida, no esta capturada o la fecha de temino es menor que la de inicio.', 'error');
      return;
    }

    if (formValues.title.length <= 0) {
      Swal.fire('Título', 'El título no puede ir vacio.', 'error');
      return;
    }

    console.log(formValues);
  };

  return (
    <Modal
      isOpen={ isDateModalOpen }
      onRequestClose={ onCloseModal }
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <h3 className='mt-3'> Nuevo evento </h3>
      <hr />
      <form className="container" onSubmit={ onSubmit }>
        <div className="form-group mb-2">
          <label>Fecha y hora inicio</label>
          <DatePicker 
            name="start" 
            selected={ formValues.start } 
            onChange={ (date) => onDateChange(date, 'start') } 
            className="form-control" 
            placeholder="Fecha inicio"
            dateFormat="Pp"
            showTimeSelect={ true }
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <div className="form-group mb-2">
          <label>Fecha y hora fin</label>
          <DatePicker 
            name="end" 
            selected={ formValues.end } 
            onChange={ (date) => onDateChange(date, 'end') } 
            className="form-control" 
            placeholder="Fecha fin" 
            dateFormat="Pp"
            minDate={ formValues.start }
            showTimeSelect={ true }
            locale="es"
            timeCaption="Hora"
          />
        </div>

        <hr />
        <div className="form-group mb-2">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={ `form-control ${ titleClass }` }
            placeholder="Título del evento"
            name="title"
            autoComplete="off"
            value={ formValues.title }
            onChange={ onInputChange }
          />
          <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
        </div>

        <div className="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={ formValues.notes }
            onChange={ onInputChange }
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">Información adicional</small>
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary btn-block"
        >
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>

      </form>
    </Modal>
  )
}
