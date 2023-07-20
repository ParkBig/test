import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { postIdDupChecker, postNickDupChecker, postSignUp } from "../../api/memberManage";

import LogoLogin from "../../img/icons/Logo_Login.png";

const ToSignUp = () => {
  const navigate = useNavigate();
  const [idCheckDone, setIdCheckDone] = useState(false);
  const [nickCheckDone, setNickCheckDone] = useState(false);
  const { register, handleSubmit, setValue, getValues } = useForm();
  const { mutate:toSign } = useMutation(postSignUp, {
    onSuccess: () => {
      alert("회원가입이 완료되었습니다.");
      setValue("signId", "");
      setValue("signPassword1", "");
      setValue("signPassword2", "");
      setValue("userName", "")
      navigate("/");
    },
    onError: () => {
      alert("실패! 다시 시도해주세요.");
    },
  });
  const { mutate:dupCheckId} = useMutation(postIdDupChecker, {
    onSuccess: (res)=> {
      if (res.data === "사용가능한 ID 입니다.") {
        setIdCheckDone(true);
        alert(res.data);
      } else {
        setIdCheckDone(false);
        alert(res.data);
      }
    },
    onError: () => {
      setIdCheckDone(false);
      alert("조건을 다시한번 확인해 주세요");
      setValue("signId", "");
    }
  });
  const { mutate:dupCheckNick} = useMutation(postNickDupChecker, {
    onSuccess: (res)=> {
      if (res.data === "사용가능한 닉네임 입니다.") {
        setNickCheckDone(true);
        alert(res.data);
      } else {
        setNickCheckDone(false);
        alert(res.data);
      }
    },
    onError: () => {
      setNickCheckDone(false);
      alert("조건을 다시한번 확인해 주세요");
      setValue("signNickname", "");
    }
  });
  const submitSignUp = (data) => {
    if (idCheckDone && nickCheckDone) {
      toSign({"userId":data.signId, "userName":data.signNickname, "password":data.signPassword1, "passwordCheck":data.signPassword2});
    }
    if (!idCheckDone) {
      alert("아이디 중복확인을 해주세요")
    }
    if (!nickCheckDone) {
      alert("닉네임 중복확인을 해주세요")
    }
  };
  const checkId = () => {
    dupCheckId({"userId":getValues("signId")});
  };
  const checkNick = () => {
    dupCheckNick({"userName":getValues("signNickname")});
  };
  const toLogIn = () => {
    navigate("/")
  };
  return (
    <Wrap>
      <MoaLogo>
        <MoaImg onClick={toLogIn} src={LogoLogin} />
      </MoaLogo>
      <UpperDiv>
        <Form onSubmit={handleSubmit(submitSignUp)}>
          <SignUserTitle>
            회원가입
          </SignUserTitle>
          <InputField>
            <InputDiv>
              <Input {...register("signId", {required: true})} placeholder="아이디(4~16자 문자 및 숫자가능)" />
              <OverlapCheck whileHover={{scale:1.03}} onClick={checkId}>
                중복확인
              </OverlapCheck>
            </InputDiv>
          </InputField>
          <InputField>
            <InputDiv>
              <Input type="text" {...register("signNickname", {required: true})} placeholder="닉네임(2~8자 문자 및 숫자가능)" />
              <OverlapCheck whileHover={{scale:1.03}} onClick={checkNick}>
                중복확인
              </OverlapCheck>
            </InputDiv>
          </InputField>
          <InputField>
            <InputDiv>
              <Input type="password" wd="100%" {...register("signPassword1", {required: true})} placeholder="비밀번호(8~16자 특수문자(@$!%*#?&) 필수)" />
            </InputDiv>
          </InputField>
          <InputField>
            <InputDiv>
              <Input type="password" wd="100%" {...register("signPassword2", {required: true, validate : { areSame : (value) => value === getValues("signPassword2") ? true : "틀렸씁니다." }})} placeholder="비밀번호 확인" />
            </InputDiv>
          </InputField>
          <UpperLogin>
            <Login whileHover={{scale:1.02}}>
              회원가입
            </Login>
          </UpperLogin>
          <BackToLogInDiv> 
            이미 가입한 적이 있나요? &nbsp;
            <Span whileHover={{scale:1.1, fontWeight:"800"}} onClick={toLogIn}>
              로그인
            </Span>
          </BackToLogInDiv>
        </Form>
      </UpperDiv>
    </Wrap>
  );
}

export default ToSignUp;

const Wrap = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f4f7f9;
`;
const MoaLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5%;
`;
const MoaImg = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;
const UpperDiv = styled.div`
  width: 22%;
  height: 50%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
const Form = styled.form`
  width: 95%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SignUserTitle = styled.div`
  width: 100%;
  height: 23%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 170%;
  font-weight: 600;
`;
const InputField = styled.div`
  width: 100%;
  height: 11%;
  display : flex;
  justify-content : center;
  align-items : center;
`;
const InputDiv =styled.div`
  width: 95%;
  height: 100%;
  display: flex;
`;
const Input = styled.input`
  width: ${prop => prop.wd ? prop.wd : "70%"};
  height: 75%;
  padding: 0;
  border: 1px solid gray;
  border-radius: 3px;
  text-indent: 10px;
  
  &:focus {
    border: 2px solid #008cff;
    outline: none;
  }
`;
const OverlapCheck = styled(motion.div)`
  width: 28%;
  height: 76%;
  border-radius: 3px;
  margin-left: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  color:white;
  background-color: #a5aab0;
  cursor: pointer;
`;
const UpperLogin = styled.div`
  width: 100%;
  height: 13%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Login = styled(motion.button)`
  width: 95%;
  height: 70%;
  border: none;
  padding: 0;
  border-radius: 3px;
  background-color: #008cff;
  color:white;
  font-weight: 800;
  font-size: 100%;
  cursor: pointer;
`;
const BackToLogInDiv = styled.div`
  width: 100%;
  height: 17%;
  margin-top: 4%;
  display: flex;
  justify-content: center;
  font-weight: 400;
`;
const Span = styled(motion.div)`
  font-weight: 200;
  cursor: pointer;
`;