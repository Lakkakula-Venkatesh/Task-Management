import moment from "moment";

function DateSection({ date, handlePrevDay, handleNextDay }) {
  
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <button onClick={handlePrevDay}>{`<`}</button>
      <div style={{padding: "0 10px"}}>
        <div>{moment(date).format("dddd")}</div>
        <div>{moment(date).format("MMM DD, YYYY")}</div>
      </div>
      <button onClick={handleNextDay}>{`>`}</button>
    </div>
  );
}

export default DateSection;