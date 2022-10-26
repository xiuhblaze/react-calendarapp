import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { startDeletingEvent, hasEventSelected } = useCalendarStore();

  const onClickDelete = () => {
    startDeletingEvent();
  };

  return (
    <button 
      className="btn btn-danger fab-delete"
      onClick={ onClickDelete }
      disabled={ !hasEventSelected }
      style={{
        display: hasEventSelected ? '' : 'none'
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
