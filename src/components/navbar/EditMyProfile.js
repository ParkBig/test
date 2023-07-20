import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { postNickDupChecker, putInfoChange } from "../../api/memberManage";
import { toggleEditProfile } from "../../store/modules/toggleModal";

import camera from "../../img/icons/camera.png"

const EditMyProfile = ({info}) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const isEditProfile = useSelector(state => state.toggleModal.editProfile);

  const [isChangeImg, setIsChangeImg ] = useState("");
  const [doneDupCheck, setDoneDupCheck] = useState(false);
  const [myNick, setMyNick] = useState(info.userName);
  const { register, handleSubmit, setValue, getValues } = useForm();

  const { mutate:changeInfo } = useMutation(putInfoChange, {
    onSuccess: (res) => {
      alert("프로필 수정이 완료되었습니다.");
      dispatch(toggleEditProfile(false))
    },
    onError: (err) => {
      alert("프로필 수정에 실패하였습니다.");
    }
  });
  const { mutate:checkNickname} = useMutation(postNickDupChecker, {
    onSuccess: (res) => {
      if (res.data === "닉네임이 이미 존재합니다.") {
        alert(res.data)
        return;
      }
      alert("사용 가능한 닉네임입니다.");
      setDoneDupCheck(true);
      setMyNick(getValues("nickname"));
    },
    onError: (err) => {
      alert("형식에 맞게 닉네임을 작성해주세요.");
      setValue("nickname", "");
    }
  });
  const dupCheck = () => {
    (getValues("nickname")) ? checkNickname({"userName":getValues("nickname")}) : alert("닉네임을 입력해주세요.")
  };
  const getImgFile = (ev) => {
    const newImg = ev.target.files[0];
    if (newImg) {
      const url = URL.createObjectURL(newImg);
      setIsChangeImg(url);
    };
  };
  const submit = (data) => {
    const formData = new FormData();
    if (data.nickname) {
      if (data.nickname === info.userName) {
        formData.append("userName", "");
        if (data.img[0]) {
          formData.append("file", data.img[0]);
        };
      } else {
        if (!doneDupCheck) {
          alert("닉네임 중복확인 해주세요.");
          return;
        };
        formData.append("userName", data.nickname);
        if (data.img[0]) {
          formData.append("file", data.img[0]);
        };
      }
    } ;
    if (!data.nickname) {
      formData.append("userName", "");
      if (data.img[0]) {
        formData.append("file", data.img[0]);
      };
    };
    if (window.confirm("프로필을 수정하시겠습니까?")) {
      changeInfo(formData);
    };
  };

  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);
    return () => {document.removeEventListener('mousedown', clickModalOutside)};
  });
  const clickModalOutside = (ev) => {
    (isEditProfile && !modalRef.current.contains(ev.target)) && dispatch(toggleEditProfile(false));
  };
  return (
    <Wrap>
      <UpperProfileForm ref={modalRef} onSubmit={handleSubmit(submit)}>
        <UpperImgDiv>
          <EditText>
            프로필 편집
          </EditText>
          <ImgDiv>
            <SquareDiv>
              <Img src={isChangeImg ? isChangeImg : info.imgUrl} />
              <ClickMe whileHover={{ scale: 1.2, backgroundColor:"#008CFF", transition: {duration : 0.2} }}>
                <CameraImg src={camera} />
                <InputImg {...register("img")} onChange={getImgFile} type="file" />
              </ClickMe>
            </SquareDiv>
          </ImgDiv>
        </UpperImgDiv>
        <ProfileDiv>
          <MyInfoDiv>
            <EditName>
              <NickNameInput {...register("nickname", { pattern: { value: /^[-a-zA-Z0-9가-힣]{2,8}$/ } })} placeholder="2~8글자 한글 가능!" defaultValue={info.userName}/>
              <EditBtn onClick={dupCheck} whileHover={{ scale: 1.1 }}>
                중복확인
              </EditBtn>
            </EditName>
          </MyInfoDiv>
          <CompleteDeleteDiv>
            <CompleteBtn whileHover={{ scale: 1.05 }}>
              저장
            </CompleteBtn>
          </CompleteDeleteDiv>
        </ProfileDiv>
      </UpperProfileForm>
    </Wrap>
  );
}
export default EditMyProfile;

const Wrap = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  left: 0;
  top: 0;
  z-index: 20;
`;
const UpperProfileForm = styled.form`
  height: 40%;
  width: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
`;
const UpperImgDiv = styled.div`
  height: 60%;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
`;
const EditText = styled.div`
  width: 100%;
  height: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 150%;
  font-weight: 700;
`;
const ImgDiv = styled.div`
  width: 100%;
  height: 65%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;
const SquareDiv = styled.div`
  width: 35%;
  margin-bottom: 3%;
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
const ClickMe = styled(motion.div)`
  height: 22%;
  width: 22%;
  top: 80%;
  right: 5%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #AAAFB5;
  font-size: 70%;
`;
const CameraImg = styled(motion.img)`
  max-height: 70%;
  max-width: 80%;
  object-fit: cover;
`;
const InputImg = styled.input`
  width: 100%;
  max-height: 100%;
  border-radius: 50%;
  position: absolute;
  opacity: 0;
`;
const ProfileDiv = styled.div`
  height: 40%;
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const MyInfoDiv = styled.div`
  height: 50%;
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EditName = styled.div`
  height: 70%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const NickNameInput = styled.input`
  height: 60%;
  width: 71%;
  border: 1px solid #E9EEF2;
  border-radius: 5px;
  display: flex;
  align-items: center;
  font-size: 60%;
  font-weight: 800; 
  text-indent: 10px;
`;
const EditBtn = styled(motion.div)`
  height: 70%;
  width: 25%;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #AAAFB5;
  color: white;
  font-size: 90%;
  font-weight: 600;
  cursor: pointer;
`;
const CompleteDeleteDiv = styled.div`
  height: 50%;
  width: 90%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;
const CompleteBtn = styled(motion.button)`
  height: 40%;
  width: 17%;
  border: 1px solid #AAAFB5;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-weight: 800;
  cursor: pointer;
`;