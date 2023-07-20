import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import Alarm from "./Alarm";

import alarm from "../../img/icons/alarm.png"

const Alarms = () => {
  const [subscribe, setSubscribe] = useState(false);
  const [alarmList, setAlarmList] = useState([]);
  let evSource;
  useEffect(() => {
    if (!subscribe) {
      evSource = new EventSource(`https://moa7.shop/sub?token=${localStorage.getItem("access_token")}`);
      evSource.onmessage = (ev) => {
        setAlarmList(prev => [...prev, JSON.parse(ev.data)])
      }
      setSubscribe(true);
      return () => {
        evSource.close();
      };
    }
  }, [])
  return (
    <UpperDiv>
      <UpperProfileDiv>
        {alarmList.length>0 ? 
          alarmList.map((prop,index) => <Alarm key={index} prop={prop}/>) 
          : 
          <AnyAlarm>
            <SquareDiv>
              <Img src={alarm}/>
            </SquareDiv>
            일정 알람이 없습니다.
          </AnyAlarm>
        }
      </UpperProfileDiv>
    </UpperDiv>
  );
}

export default Alarms;

const UpperDiv = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UpperProfileDiv = styled.div`
  height: 100%;
  width: 100%;
  border-radius: 4px;
  margin-top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
  overflow: auto;
`;
const AnyAlarm = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #AAAFB5;
`;
const SquareDiv = styled.div`
  width: 25%;
  margin-bottom: 3%;
  border-radius: 50%;
  position: relative;
  background-color: #E9EEF2;

  ::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;
const Img = styled.img`
  width: 60%;
  height: 60%;
  position: absolute;
  top: 20%;
  left: 20%;
  object-fit: cover;
`;
