import { useState } from "react";
import { useMutation } from "react-query";
import styled from "styled-components";
import { defaultColor } from "../styles/styles";

import { getMyFriend, postPlusFriend } from "../../api/memberManage";

import InputComponent from "./InputComponent";

import emoji from "../../img/icons/Sunglasses_emoji.png";

const SearchFriend = ({setShowSearch}) => {
  const [userName, setUserName] = useState("");
  const [userInfo, setUserInfo] = useState();

  const { mutate: searchMutate } = useMutation(getMyFriend, {
    onSuccess: ({ success, data, error }) => {
      if (success) {
        setUserInfo(data);
      } else {
        alert(error.detail);
      }
    },
  });
  const { mutate: addMutate } = useMutation(postPlusFriend, {
    onSuccess: ({ success, error }) => {
      if (success) {
        alert("친구추가가 완료되었습니다.");
        setShowSearch(false)
      } else {
        alert(error.detail);
      }
    },
  });

  const onChangeSearchInput = (e) => {
    const value = e.target.value;
    setUserName(value);
  };
  const onSearchFriend = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      if (!userName.trim()) {
        alert("찾고자하는 친구의 닉네임을 입력해주세요!");
        return;
      }
      searchMutate(userName);
    }
  };
  const onAddFriend = () => {
    const user = { userName: userInfo.friendUsername };
    addMutate(user);
    setUserInfo("")
  };
  return (
    <Container>
      <SearchTitle>
        친구검색
      </SearchTitle>
      <SearchInputDiv>
        <InputComponent
          placeholder="닉네임"
          value={userName}
          width={"95%"}
          height={"100%"}
          onChange={onChangeSearchInput}
          onKeyPress={onSearchFriend}
          iconClick={onSearchFriend}
        />
      </SearchInputDiv>
      <Body>
        {userInfo ? 
          <FriendWrapper>
            <UsersDiv>
              <SquareDiv>
              <UserImg src={userInfo.imgUrl} alt="userImg" />
              </SquareDiv>
              <UserName className="userName">{userInfo.friendUsername}</UserName>
              <UserId className="userId">{userInfo.userId}</UserId>
            </UsersDiv>
            <FriendAddDiv>
              <FriendAddBtn onClick={onAddFriend}>친구추가</FriendAddBtn>
            </FriendAddDiv>
          </FriendWrapper>
          : 
          <NotFriendWrapper>
            <SmileImgDiv>
              <SmileImg src={emoji} alt="emoji" />
            </SmileImgDiv>
            <AddFriendText>
              새로운 친구를 등록해주세요.
            </AddFriendText>
          </NotFriendWrapper>
        }
      </Body>
    </Container>
  );
};

export default SearchFriend;

const Container = styled.div`
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
  background-color: white;
`;
const SearchTitle = styled.div`
  width: 100%;
  height: 15%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 120%;
  font-weight: bold;
  user-select: none;
`;
const SearchInputDiv = styled.div`
  width: 100%;
  height: 7%;
  margin-bottom: 6%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Body = styled.div`
  width:100%;
  height: 72%;
  display: flex;
`;
const FriendWrapper = styled.div`
  width:100%;
  height:100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const UsersDiv = styled.div`
  width: 100%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SquareDiv = styled.div`
  width: 25%;
  position: relative;
  ::after {
    display: block;
    content: "";
    padding-bottom: 100%;
  }
`;
const UserImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover; 
`;
const UserName = styled.div`
  margin-top: 5%;
  font-size: 120%;
`;
const UserId = styled.div`
  font-size: 80%;
  color: ${defaultColor.darkGrey};
`;
const FriendAddDiv = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  cursor: pointer;
`;
const FriendAddBtn = styled.div`
  height: 70%;
  width:90%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  background-color: ${defaultColor.red};
  color: white;
`;
const NotFriendWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const SmileImgDiv = styled.div`
  height: 20%;
  width: 100%;
  margin-bottom: 3%;
  display: flex;
  justify-content: center;
  opacity: 0.3;
`;
const SmileImg = styled.img`
  height: 100%;
  max-width: 100%;
`;
const AddFriendText = styled.div`
  height: 7%;
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 100%;
  opacity: 0.4;
`;