import React from "react";
import { useMutation } from "react-query";
import styled from "styled-components";

import { postAlarmCheck } from "../../api/memberManage";

import moaDefaultImg from "../../img/icons/moaDefaultImg.jpg"

const Alarm = ({prop}) => {
  const { mutate:alarmCheck } = useMutation(postAlarmCheck)

  const check = () => {
    alarmCheck(prop.id)
  }
  return (
    <UpperDiv onClick={check}>
      <ImgDiv>
        <SquareDiv>
          <Img src={prop.imgUrl ? prop.imgUrl : moaDefaultImg}/>
        </SquareDiv>
      </ImgDiv>
      <InfoDiv>
        {prop.message}
      </InfoDiv>
    </UpperDiv>
  );
}

export default React.memo(Alarm);

const UpperDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  flex-grow: 0;
  flex-shrink: 0;

  &:hover {
    background-color: #E9EEF2;
  }
  
  cursor: pointer;
`;
const ImgDiv = styled.div`
  height: 100%;
  width: 16%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SquareDiv = styled.div`
  width: 65%;
  position: relative;
  ::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;
const InfoDiv = styled.div`
  height: 100%;
  max-width: 82.5%;
  margin-right:1.5%;
  display: flex;
  align-items: center;
`;