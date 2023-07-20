import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

import MyProfile from "./MyProfile";
import Alarms from "./Alarms"

import { ReactComponent as AlarmImg } from "../../img/svg/ring.svg";
import { ReactComponent as MiniGroup } from "../../img/svg/mini-group.svg";
import logoImg from "../../img/icons/moa_logo.png"

const NavBar = ({infoData}) => {
  const navigate = useNavigate();
  const [myInfo, setMyInfo] = useState(false);
  const [alarm, setAlarm] = useState(false);

  const toMain = () => {
    navigate("/main")
  };
  const toMyFriends = () => {
    navigate("/myFriends")
  };
  const showAlarm = () => {
    setMyInfo(false);
    setAlarm(prev=>!prev);
  };
  const modalProfile = () => {
    setAlarm(false);
    setMyInfo(prev=>!prev);
  };
  return (
    <Upper>
      <Wrap>
        <LogoUpperDiv>
          <LogoImg src={logoImg} onClick={toMain}/>
        </LogoUpperDiv>
        <NavUpperDiv>
          <EleImgDiv>
            <MiniGroup width="50%" height="50%" fill="rgba(39,41,45,1)" onClick={toMyFriends}/>
          </EleImgDiv>
          <EleImgDiv>
            <AlarmImg onClick={showAlarm}/>
            <AlarmWrap
              transition={{ type: "linear" }}
              initial={{scaleY: 0}}
              animate={{scaleY: alarm ? 1 : 0, opacity: alarm ? 1 : 0, transition:{duration:0.5}}}
            >
              <Alarms />
            </AlarmWrap>
            <ProfileWrap
              transition={{ type: "linear" }}
              initial={{scaleY: 0}}
              animate={{scaleY: myInfo ? 1 : 0, opacity: myInfo ? 1 : 0, transition:{duration:0.5}}}
            >
              <MyProfile setMyInfo={setMyInfo}  info={infoData.data}/>
            </ProfileWrap>
          </EleImgDiv>
          <EleImgDiv>
            <SquareDiv>
              <NavImg src={infoData.data.imgUrl} onClick={modalProfile}/>
            </SquareDiv>
          </EleImgDiv>
        </NavUpperDiv>
      </Wrap>
    </Upper>
  )
}

export default NavBar;

const Upper = styled.div`
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ECF0F3;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  position: fixed;
  z-index: 15;
`;
const Wrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
`;
const LogoUpperDiv = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const LogoImg = styled(motion.img)`
  max-width: 100%;
  max-height: 60%;
  margin-left: 1%;
  cursor: pointer;
`;
const NavUpperDiv = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const EleImgDiv = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  svg {
    cursor: pointer;
  }
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
const NavImg = styled(motion.img)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
  cursor: pointer;
`;
const ProfileWrap = styled(motion.div)`
  height: 350%;
  width: 650%;
  top: 90%;
  right: -90%;
  position: absolute;
  transform-origin: top center;
`;
const AlarmWrap = styled(motion.div)`
  height: 550%;
  width: 750%;
  top: 90%;
  left: -565%;
  position: absolute;
  transform-origin: top;
`;