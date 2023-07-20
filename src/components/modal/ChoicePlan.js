import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { toggleChoiceGroup } from "../../store/modules/toggleModal";

import MakeGroup from "./MakeGroup";
import MakePlan from "./MakePlan";

import alone from "../../img/icons/personal.png"
import group from "../../img/icons/group.png"

const ChoiceGroup =({myFriendsList}) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const [isFirStep, setIsFirStep] = useState(true);
  const [isAlone, setIsAlone] = useState(true);
  const isChoiceGroup = useSelector(state => state.toggleModal.choiceGroup);

  const nextStepAlone = () => {
    setIsFirStep(false);
    setIsAlone(true);
  };
  const nextStepGroup = () => {
    setIsFirStep(false);
    setIsAlone(prev=>!prev);
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);
    return () => {document.removeEventListener('mousedown', clickModalOutside)};
  });
  const clickModalOutside = (ev) => {
    (isChoiceGroup && !modalRef.current.contains(ev.target)) && dispatch(toggleChoiceGroup(false));
  };
  return (
    <Wrap $isFirStep={isFirStep}>
      {isFirStep ?
        (<UpperDiv ref={modalRef} layoutId="transition">
          <ChoiceBtn onClick={nextStepAlone} $bgColor={"#FF4545"} variants={showVariants} initial="init" animate="start" whileHover="hover">
            <IconImg src={alone}/>
            개인
          </ChoiceBtn>
          <ChoiceBtn onClick={nextStepGroup} $bgColor={"#008CFF"} variants={showVariants} initial="init" animate="start" whileHover="hover">
            <IconImg src={group}/>
            그룹
          </ChoiceBtn>
        </UpperDiv>) 
        :
        isAlone ?
          (<Alone ref={modalRef} layoutId="transition">
            <MakePlan/>
          </Alone>)
          :
          (<Group ref={modalRef} layoutId="transition">
            <MakeGroup myFriendsList={myFriendsList}/>
          </Group>)
      }
    </Wrap>
  );
}

export default ChoiceGroup;

const Wrap = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: ${prop => prop.$isFirStep ? "rgba(0, 0, 0, 0.4)" : null};
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
`;
const UpperDiv = styled(motion.div)`
  width: 20%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5%;
`;
const ChoiceBtn = styled(motion.button)`
  width: 41%;
  height: 90%;
  border: none;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${prop => prop.$bgColor};
  color: white;
  font-size: 110%;
  font-weight: 700;
  gap: 15%;
  cursor: pointer;
`;
const IconImg = styled(motion.img)`
  height: 20%;
  max-width: 50%;
`;
const Alone = styled(motion.div)`
  width: 35%;
  height: 90%;
`;
const Group = styled(motion.div)`
  width: 25%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
`;

const showVariants = {
  init : {
    scale: 0
  },
  start : {
    scale: 1,
  },
  hover : {
    scale: 1.1
  }
}