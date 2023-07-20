import styled from "styled-components";
import { defaultColor } from "../styles/styles";

const FriendInfo = ({ friendInfo, onDeleteFriend }) => {
  return (
    <UserWrapper>
      <ImgAndName>
        <UserImageDiv>
          <SquareDiv>
            <UserImage src={friendInfo.imgUrl} alt="userImg" />
          </SquareDiv>
        </UserImageDiv>
        <User>
          <Name className="userName">{friendInfo.friendUsername}</Name>
          <Id className="userId">{friendInfo.userId}</Id>
        </User>
      </ImgAndName>
      <DeleteWrapper>
        <Delete className="btn" onClick={() => onDeleteFriend(friendInfo.id)}>
          ⊝
        </Delete>
      </DeleteWrapper>
    </UserWrapper>
  );
};

export default FriendInfo;

const UserWrapper = styled.div`
  width:95%;
  height: 18%;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
`;
const ImgAndName = styled.div`
  width:90%;
  height:100%;
  display: flex;
`;
const UserImageDiv = styled.div`
  height:100%;
  width: 23%;
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
const UserImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 0;
  object-fit: cover;
`;

const User = styled.div`
  height: 100%;
  width: 72%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const Name = styled.span`
  font-weight: 700;
  font-size: 110%;
  margin-left: 2%;
`;
const Id = styled.span`
  font-weight: 300;
  font-size: 90%;
  margin-left: 2%;
  color:gray;
`;
const DeleteWrapper = styled.div`
  height: 100%;
  width:10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Delete = styled.div`
  font-size: 120%;
  cursor: pointer;

  &:hover {
    color: ${defaultColor.red};
  }
`;