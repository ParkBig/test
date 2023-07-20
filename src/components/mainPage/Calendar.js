import FullCalendar from "@fullcalendar/react";
import styled from "styled-components";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import React from "react";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";

import { toggleChoiceGroup } from "../../store/modules/toggleModal";

const Calendar = ({ schedulesData }) => {
  const dispatch = useDispatch();
  const onDateClick = (e) => {
    const date = e.dateStr;
  };
  const onEventClick = (e) => {};
  const onAddEvent = () => {
    dispatch(toggleChoiceGroup(true));
  };
  const onSelectAllow = (selectionInfo) => {
    let startDate = selectionInfo.start;
    let endDate = selectionInfo.end;
    endDate.setSeconds(endDate.getSeconds() - 1);
    if (startDate.getDate() === endDate.getDate()) {
      return true;
    } else {
      return false;
    }
  };
  const setTitleFormat = (date) => {
    const newD = new Date()
    const year = newD.getFullYear()
    const month = newD.getMonth() + 1
    const today = newD.getDate()
    const yearMonth = React.createElement("div",{key:1},`${date.date.year}년 ${date.date.month+1}월`)
    let todayElm, dateBox

    if(date.date.year === year && date.date.month +1 === month){
      // todayElm = React.createElement("div",{key:2},`${today}`)
      dateBox = React.createElement("div",null,[yearMonth,todayElm])
      return dateBox
    } else {
      // todayElm = React.createElement("div",{key:2},1)
      dateBox = React.createElement("div",null,[yearMonth,todayElm])
      return dateBox
    }
  }
  return (
    <Wrap>
      <UpperDiv>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          buttonText={{ today: "오늘" }}
          headerToolbar={{
            left: "today myCustomButton",
            center: "title",
            right: "prev,next",
          }}
          selectable={true}
          selectAllow={onSelectAllow}
          customButtons={{
            myCustomButton: {
              text: "일정생성",
              click: onAddEvent,
            },
          }}
          titleFormat={setTitleFormat}
          height="100%"
          locale="en"
          dayMaxEvents={true}
          events={
            schedulesData.map((prop) => {
              if (prop.startDate === prop.endDate) {
                return { "title": prop.title, "start": prop.startDate, "color": (prop.userNum === 1) ? "rgba(255,69,69,0.9)" : "#008CFF" }
              }
              return { "title": prop.title, "start": prop.startDate, "end": dayjs(prop.endDate).add(1, "day").format("YYYY-MM-DD"), "color": (prop.userNum === 1) ? "rgba(255,69,69,0.9)" : "#008CFF" }
            })
          }
          eventClick={onEventClick}
          dateClick={onDateClick}
        />
      </UpperDiv>
      <MadeBy>
        <SpanDiv>
          FE 
          <ToGitHub href="https://github.com/ParkBig">박종원</ToGitHub>
          <ToGitHub href="https://github.com/nimgnas">윤상민</ToGitHub>
          <ToGitHub href="https://github.com/Jino0403">이진호</ToGitHub>
        </SpanDiv>
        <SpanDiv>
          BE 
          <ToGitHub href="https://github.com/yuns8708">윤시원</ToGitHub>
          <ToGitHub href="https://github.com/tmpanmitw">신현재</ToGitHub>
          <ToGitHub href="https://github.com/acutecritic">이동진</ToGitHub>
        </SpanDiv>
        <SpanDiv>
          UI/UX 
          <ToGitHub>최가희</ToGitHub>
        </SpanDiv>
      </MadeBy>
    </Wrap>
  );
};

export default React.memo(Calendar);

const Wrap = styled.div`
  height: 100%;
  width: 70%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-end;
`;
const UpperDiv = styled.div`
  height: 83%;
  width: 100%;

  .fc-header-toolbar {
    width: 100%;
    height: 5%;
    display: flex;
    justify-content: space-between;

    .fc-toolbar-chunk {
      height: 100%;
      width: 33%;
      display: flex;
      align-items: center;
      position: relative;
      z-index: 5;

      .fc-today-button {
        height: 80%;
        width: 10%;
        border: 0.5px solid #AAAFB5;
        padding: 0;
        margin-left: 4%;
        background-color: white;
        font-size: 90%;
        color: #27292D;
        opacity: 1;

        &:hover {
          background-color: #E9EEF2;
        }
        &:focus {
          box-shadow: none;
        }
      }
      .fc-myCustomButton-button {
        width: 30%;
        height: 150%;
        top: 1770%;
        left : 266%;
        margin: 0%;
        border: none;
        border-radius: 30px;
        background-color: #FF4545;
        box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
        position: absolute;
        transition: all 0.3s ease 0s;

        &:hover {
          transform: translateY(-20%);
        }
        &:focus {
          box-shadow: none;
        }
      }

      .fc-toolbar-title {
        width: 100%;
        height: 100%;
        font-size: 120%;

        div {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }

      .fc-button-group {
        height: 100%;
        width: 20%;
        margin-left: 80%;
        gap: 15%;

        button {
          height: 100%;
          width: 40%;
          padding: 0;
          border: none;
          background-color: transparent;

          &:hover {
            border-radius: 50%;
            background-color: #E9EEF2;
          }
          &:focus {
            box-shadow: none;
          }

          span {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #27292D;
            font-weight: 400;
          }
        }
      }
    }
  }

  .fc-view-harness {
    height: 90%;
    width: 100%;

    .fc-col-header-cell {
      background-color: #E9EEF2;

      div {
        width: 95%;
        margin-left: 5%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
    }

    .fc-daygrid-day {
      font-weight: 500;
      font-size: 90%;
    }

    .fc-day-sun {
      color: rgba(255, 119, 119);
    }
  }

  .fc .fc-daygrid-day-top {
    display: flex;
    flex-direction: row;
  }
`;
const MadeBy = styled.div`
  width: 100%;
  height: 5%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;
const SpanDiv = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 70%;
  color: #AAAFB5;
`;
const ToGitHub = styled.a`
  width: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 70%;
  font-weight: 400;
  color: #AAAFB5;
`;
