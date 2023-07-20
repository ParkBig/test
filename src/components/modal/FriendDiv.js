import React from "react";
import styled from "styled-components";

import plus from "../../img/icons/Icon_Group_add.png"

const FriendDiv = ({img, name, inviteList, setInviteList, setIsTargetSearch, participant}) => {
  const addInviteList = () => {
    if (inviteList.length) {
      for (let prop of inviteList) {
        if (prop === name) {
          alert("이미 목록에 추가되어 있습니다.");
          return;
        }
      }
      setInviteList([...inviteList, name]);
      setIsTargetSearch(false);
    } else {
      setInviteList([...inviteList, name]);
      setIsTargetSearch(false)
    }
  };
  return (
    <Wrap>
      <ImgDiv>
        <SquareDiv>
          <Img src={img} />
        </SquareDiv>
      </ImgDiv>
      <NickNameDiv>
        <NickName>
          {name}
        </NickName>
      </NickNameDiv>
      <PlusIconDiv>
        {(!inviteList.find(prop => prop === name) && !participant?.find(prop => prop.userName === name)) && <PlusIconImg src={plus} onClick={addInviteList}/>}
      </PlusIconDiv>
    </Wrap>
  );
}

export default React.memo(FriendDiv);

const Wrap = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
`;
const ImgDiv = styled.div`
  height: 100%;
  width: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SquareDiv = styled.div`
  width: 70%;
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
const NickNameDiv = styled.div`
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
`;
const NickName = styled.span`
  margin-left: 3%;
`;
const PlusIconDiv = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PlusIconImg = styled.img`
  
  cursor: pointer;
`;
