import { motion } from "framer-motion";
import { useMutation } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { postLogOut } from "../../api/memberManage";
import { toggleEditProfile } from "../../store/modules/toggleModal";

// 상위에서 이미지, 이름 받아와야함
const MyProfile = ({info, setMyInfo}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate } = useMutation(postLogOut, {
    onSuccess: (res) => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      navigate("/")
    }
  })
  const logOut = () => {
    mutate();
  }
  const editProfile = () => {
    dispatch(toggleEditProfile(true));
    setMyInfo(prev=>!prev)
  }
  return (
    <UpperDiv initial={{zIndex:10}}>
      <UpperProfileDiv>
        <ImgDiv>
          <SquareDiv>
            <Img src={info.imgUrl} />
          </SquareDiv>
        </ImgDiv>
        <ProfileDiv>
          <MyInfoDiv>
            <NickNameSpan>
              {info.userName}
            </NickNameSpan>
            <EditBtn onClick={editProfile}>
              편집
            </EditBtn>
          </MyInfoDiv>
          <LogOutBtn onClick={logOut}>
            로그아웃
          </LogOutBtn>
        </ProfileDiv>
      </UpperProfileDiv>
    </UpperDiv>
  );
}

export default MyProfile;

const UpperDiv = styled(motion.div)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UpperProfileDiv = styled(motion.div)`
  height: 100%;
  width: 100%;
  margin-top: 3%;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
`;
const ImgDiv = styled.div`
  height: 100%;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SquareDiv = styled.div`
  width: 85%;
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
const ProfileDiv = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const MyInfoDiv = styled.div`
  height: 40%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NickNameSpan = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 130%;
  font-weight: 800;
`;
const EditBtn = styled(motion.div)`
  height: 100%;
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 90%;
  font-weight: 600;
  cursor: pointer;
`;
const LogOutBtn = styled(motion.div)`
  height: 20%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 7%;
  border-radius: 10px;
  background-color: black;
  color: white;
  font-size: 110%;
  font-weight: 800;
  cursor: pointer;
`;
