import { motion } from "framer-motion";
import styled from "styled-components";

import one from "../../img/loadingImg/logo1.png"
import two from "../../img/loadingImg/logo2.png"
import thr from "../../img/loadingImg/logo3.png"

const Loading = () => {
  return (
    <Wrap>
      <UpperDiv>
        <ImgDiv>
          <Img src={one} variants={moveMove} animate="firUp"/>
          <Img src={two} variants={moveMove} animate="secUp"/>
          <Img src={thr} variants={moveMove} animate="thrUp"/>
        </ImgDiv>
        <TextDiv>
          Loading
          <Span variants={moveMove} animate="firDot">..</Span>
          <Span variants={moveMove} animate="secDot">..</Span>
          <Span variants={moveMove} animate="thrDot">..</Span>
        </TextDiv>
      </UpperDiv>
    </Wrap>
  );
}

export default Loading;

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const UpperDiv = styled.div`
  height: 13%;
  width: 17.5%;
`;
const ImgDiv = styled.div`
  height: 77%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3%;
`;
const Img = styled(motion.img)`
  height: 100%;
  width: 28.4%;
`;
const TextDiv = styled.div`
  height: 23%;
  width: 100%;
  padding-top: 4%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #e58e26;
  font-weight: 800;
`;
const Span = styled(motion.span)`
  color: #e58e26;
  font-weight: 800;
  opacity: 0;
`;

const moveMove = {
  firUp : {
    y:-20,
    transition : {
      duration : 0.5,
      repeat : Infinity,
      repeatDelay: 1
    }
  },
  secUp : {
    y:-20,
    transition : {
      delay : 0.5,
      duration : 0.5,
      repeat : Infinity,
      repeatDelay: 1
    }
  },
  thrUp : {
    y:-20,
    transition : {
      delay : 1,
      duration : 0.5,
      repeat : Infinity,
      repeatDelay: 1
    }
  },
  firDot : {
    opacity : 1,
    transition : {
      duration : 0.5,
      repeat : Infinity,
      repeatDelay: 1
    }
  },
  secDot : {
    opacity : 1,
    transition : {
      delay : 0.5,
      duration : 0.5,
      repeat : Infinity,
      repeatDelay: 1
    }
  },
  thrDot : {
    opacity : 1,
    transition : {
      delay : 1,
      duration : 0.5,
      repeat : Infinity,
      repeatDelay: 1
    }
  }
}