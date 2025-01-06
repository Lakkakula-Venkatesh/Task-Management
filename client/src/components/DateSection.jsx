
function DateSection({ date, handlePrevDay, handleNextDay }) {
  
  return (
    <div>
      <button onClick={handlePrevDay}>Previous</button>
      <span>{date.toDateString()}</span> 
      <button onClick={handleNextDay}>Next</button>
    </div>
  );
}

export default DateSection;