import { useState } from "react";
import { notifyManager, useMutation } from "react-query";
import styled from "styled-components";

import { deleteFriend } from "../../api/memberManage";

import FriendInfo from "./FriendInfo";
import InputComponent from "./InputComponent";

const FriendList = ({ friendList }) => {
  const [friendName, setFriendName] = useState("");
  const [filterFriendList, setFilterFriendList] = useState([]);

  const { mutate } = useMutation(deleteFriend, {
    onSuccess: () => {
      alert("친구가 삭제되었습니다.");
    },
  });

  const onChangeFriendInput = (e) => {
    const value = e.target.value;
    const filterList = friendList.data.filter(({ friendUsername }) => {
      return friendUsername.includes(value);
    });

    setFilterFriendList(filterList);
    setFriendName(value);
  };
  const onDeleteFriend = (id) => {
    const rst = window.confirm("친구를 삭제하시겠습니까?");
    if (rst) mutate(id);
    setFilterFriendList(
      filterFriendList.filter((friendInfo) => friendInfo.id !== id)
    );
  };

  return (
    <Container>
      <FriendTitle>
        친구목록
      </FriendTitle>
      <SearchInputDiv>
        <InputComponent
          width={"95%"}
          placeholder="닉네임"
          onChange={onChangeFriendInput}
          value={friendName}
          isIcon={false}
        />
      </SearchInputDiv>
      <Body>
        {(filterFriendList.length >= 1 || friendName) ? 
          filterFriendList.map((friendInfo) => 
            <FriendInfo
              friendInfo={friendInfo}
              onDeleteFriend={onDeleteFriend}
              key={friendInfo.id}
            />)
            : 
            friendList?.data.map((friendInfo) => 
              <FriendInfo
                friendInfo={friendInfo}
                onDeleteFriend={onDeleteFriend}
                key={friendInfo.id}
              />
        )}
      </Body>
    </Container>
  );
};

export default FriendList;

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
const FriendTitle = styled.div`
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

  svg {
      display: none;
    }
`;
const Body = styled.div`
  width:100%;
  height: 72%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5%;
  overflow-y:auto;

  ::-webkit-scrollbar {
    width: 0.7em;
    border-radius: 8px;
    background-color: #E9EEF2;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: #AAAFB5;
  }
  ::-webkit-scrollbar-track {
    border-radius: 8px;
  }
`;

