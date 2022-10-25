
export const CalendarEvent = (props) => {

  // console.log(props);

  const { title, event } = props;
  const { start, notes } = event;
  
  return (
    <>
      <small>{ start.toLocaleString('en-US', { hour: 'numeric', minute:'numeric', hour12: true }) }</small>
      <span className="text-white ms-1">{ title }</span>
      <span className="text-info small ms-1">{ notes }</span>
    </>
  )
}
