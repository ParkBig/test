import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { motion } from "framer-motion";
import styled from "styled-components";

import { postLogin } from "../../api/memberManage";

import KaKao from "../../img/icons/KaKao.png"
import LogoLogin from "../../img/icons/Logo_Login.png"

const ToLogIn = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm();
  const { mutate:toLogIn } = useMutation(postLogin, {
    onSuccess: (res) => {
      if (res.data.error) {
        alert("비밀번호가 일치하지 않습니다.")
        return;
      } else {
        localStorage.setItem("access_token", res.headers.access_token);
        localStorage.setItem("refresh_token", res.headers.refresh_token);
        navigate("/main");
        setValue("LogInId", "");
        setValue("LogInPassword", "");
      }
    },
    onError: (err) => {
      alert("로그인에 실패하였습니다!")
    }
  });
  const submitLogin = (data) => {
    toLogIn({"userId":data.LogInId, "password":data.LogInPassword});
  };
  const toSignUp = () => {
    navigate("/signUp");
  };

  // 카카오 소셜로그인 로직
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`
  const onKakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }
  return (
    <Wrap>
      <MoaLogo>
        <MoaImg src={LogoLogin}/>
      </MoaLogo>
      <UpperDiv>
        <Form onSubmit={handleSubmit(submitLogin)}>
          <SignTitleDiv>
            <SignTitle>
              일정은 모아에서!
            </SignTitle>
            <SignSubTitle>
              모아에서 지인들과 함께 일정을 정해보세요
            </SignSubTitle>
          </SignTitleDiv>
          <UpperLoginDiv>
            <InputDiv>
              <Input {...register("LogInId", { required: true })} placeholder="아이디" />
              <Input type="password" {...register("LogInPassword", { required: true })} placeholder="비밀번호(8~16자 특수문자 필수)" />
            </InputDiv>
            <LoginBtnDiv>
              <LoginBtn whileHover={{scale:1.02}}>
                로그인
              </LoginBtn>
            </LoginBtnDiv>
          </UpperLoginDiv>
          <ToSignUpDiv>
            <ToSignUp onClick={toSignUp} whileHover={{scale:1.02}}>
              회원가입
            </ToSignUp>
            <KaKaoLogIn whileHover={{scale:1.02}} onClick={onKakaoLogin}>
              <KaKaoImg src={KaKao}/>
              카카오 로그인
            </KaKaoLogIn>
          </ToSignUpDiv>
        </Form>
      </UpperDiv>
    </Wrap>
  );
}

export default ToLogIn;

const Wrap = styled.div`
  height: 100vh;
  margin: auto;
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
`;
const UpperDiv = styled.div`
  width: 22%;
  height: 47%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius:10px;
  background-color: white;
`;
const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SignTitleDiv = styled.div`
  width: 95%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SignTitle = styled.div`
  height: 64%;
  width: 95%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 170%;
  font-weight: 600;
`;
const SignSubTitle = styled.div`
  height: 34%;
  width: 95%;
  margin-top: 3%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  color:gray;
  font-size: 80%;
`;
const UpperLoginDiv = styled.div`
  width: 95%;
  height: 45%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const InputDiv =styled.div`
  width: 95%;
  height: 60%;
  border: 1px solid white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10%;
`;
const Input = styled.input`
  width: 100%;
  height: 35%;
  border: 1px solid #E9EEF2;
  border-radius: 3px;
  text-indent: 2%;

  &:focus {
    border: 2px solid #008cff;
    outline: none;
  }
`;
const LoginBtnDiv = styled.div`
  height: 40%;
  width: 95%;
  border-bottom: 1px solid #EBEEF1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const LoginBtn = styled(motion.button)`
  width: 100%;
  height: 60%;
  padding: 0;
  border: none;
  border-radius: 3px;
  background-color: #008cff;
  color:white;
  font-size: 100%;
  font-weight: 700;
  cursor: pointer;
`;
const ToSignUpDiv = styled.div`
  width: 95%;
  height: 25%;
  display: flex;
  justify-content: center;
  gap: 4%;
`;
const ToSignUp =  styled(motion.div)`
  width: 47%;
  height: 40%;
  border-radius: 3px;
  margin-top: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9eef2;
  font-size: 100%;
  font-weight: 700;
  cursor: pointer;
`;
const KaKaoLogIn = styled(motion.div)`
  width: 47%;
  height: 40%;
  border-radius: 3px;
  margin-top: 6%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #FEE500;
  font-size: 100%;
  font-weight: 700;
  cursor: pointer;
`;
const KaKaoImg = styled.img`
  max-width: 20%;
  height: 40%;
  margin-right: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
