import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { alertAndText } from "../../store/modules/parkmade/alertText";

const Alert = () => {
  const dispatch = useDispatch();

  const text = useSelector(state => state.alertText.text);

  const AlertClose = () => {
    dispatch(alertAndText([false, ""]))
  }
  return (
    <Wrap>
      <UpperAlertDiv>
        <AlertTextDiv>
          <AlertTex>
            {text}
          </AlertTex>
        </AlertTextDiv>
        <OkBtnDiv>
          <OkBtn onClick={AlertClose}>
            확인
          </OkBtn>
        </OkBtnDiv>
      </UpperAlertDiv>
    </Wrap>
  )
}

export default Alert;

const Wrap = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 30;
`;
const UpperAlertDiv = styled(motion.div)`
  width: 17%;
  height: 15%;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.4);
`;
const AlertTextDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  word-break: break-all;
`;
const AlertTex = styled.span`
  font-size: 110%;
  font-weight: 400;
`;
const OkBtnDiv = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OkBtn = styled.div`
  width: 15%;
  height: 40%;
  border-radius: 4px;
  border: 1px solid #AAAFB5;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 100%;
  font-weight: 400;
  background-color: #FFFFFF;
  cursor: pointer;
`;