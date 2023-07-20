import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { kaKaoLogin } from "../../api/memberManage";

import Loading from "../loadingPage/Loading";

const KaKaoRedirectHandler = () => {
  const navigate = useNavigate()
  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    kaKaoLogin(code).then((res) => {
      //TODO: 서버에서 응답값 수정되면 success if문 추가할것
        localStorage.setItem("access_token", res.headers.access_token);
        localStorage.setItem("refresh_token", res.headers.refresh_token);
        navigate("/main");

    })
 
  }, [])

  return (
    <Loading />
  );
};

export default KaKaoRedirectHandler;
