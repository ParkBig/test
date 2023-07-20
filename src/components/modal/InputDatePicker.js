import DatePicker from "react-datepicker";
import styled from "styled-components";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";

const InputDatePicker = ({startDate, setStartDate, endDate, setEndDate}) => {
  return (
    <Wrap className="Wrap-DatePicker">
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        selectsStart
        startDate={new Date()}
        endDate={null}
        locale={ko}
        placeholderText="시작일"
      />
      <Dash>-</Dash>
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        selectsEnd
        startDate={new Date()}
        endDate={null}
        minDate={startDate}
        locale={ko}
        placeholderText="종료일"
      />
    </Wrap>
  );
};

export default InputDatePicker;

const Wrap = styled.div`
  width: 100%;
  height: 100%; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  .react-datepicker-wrapper {
    width: 46%;
    height: 100%;
  }
  .react-datepicker-popper {
    z-index: 10;
  }
  .react-datepicker-popper {
    z-index: 10;
  }
  .react-datepicker-popper {
    z-index: 10;
  }
  .react-datepicker-popper {
    position: absolute;
  }
  .react-datepicker__input-container {
    height: 100%;
  }
  input {
    width: 99%;
    height: 99%;
    border: 1px solid #AAAFB5;
    padding: 0;
    border-radius: 5px;
    text-indent: 3%;
  };
`;
const Dash = styled.div`
  height: 100%;
  width: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  font-weight: 700;
`;