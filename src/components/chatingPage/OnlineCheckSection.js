import { useDispatch } from "react-redux";
import styled from "styled-components";
import { defaultColor } from "../styles/styles";

import { inviteNewFriendToGroup } from "../../store/modules/toggleModal";

const OnlineCheckSection = ({ onlineUser, userInfoList }) => {
  const dispatch = useDispatch()
  const openInviteFriends = () => {
    dispatch(inviteNewFriendToGroup(true));
  }

  return (
    <>
      <UserBoxHeader>활동 중인 사람 ({onlineUser.length - 1}명)</UserBoxHeader>
      <UserBoxBody>
        <UserList>
          {userInfoList?.map((user ,i) => (
            <UserWrapper key={i}>
              <ImgWrapper>
                <img src={user.imgUrl} alt="user" />
                <OnlineCheckDot online={onlineUser.includes(user.userName)} />
              </ImgWrapper>
              <span>{user.userName}</span>
            </UserWrapper>
          ))}
        </UserList>
        <UserBoxAddFriend onClick={openInviteFriends}>
          친구추가
        </UserBoxAddFriend>
      </UserBoxBody>
    </>
  );
};

export default OnlineCheckSection;

const UserBoxHeader = styled.div`
  height: 9%;
  margin-left: 1em;
  display: flex;
  align-items: flex-end;
  font-weight: 400;
  white-space: nowrap;
`;

const UserBoxBody = styled.div`
  height: 91%;
  padding: 1em;
`;

const UserList = styled.div`
  height: 93%;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 1em;

  img {
    height: 3.5em;
    width: 3.5em;
    border-radius: 50%;
  }

  span {
    margin-left: 0.5em;
  }
`;

const ImgWrapper = styled.div`
  position: relative;
`;

const OnlineCheckDot = styled.div`
  height: 1.3em;
  width: 1.3em;
  border-radius: 50%;
  border: 0.2em solid ${defaultColor.white};
  background-color: ${(props) =>
    props.online ? `${defaultColor.blue}` : `${defaultColor.darkGrey}`};
  position: absolute;
  bottom: 0.15em;
  right: -0.15em;
`;

const UserBoxAddFriend = styled.div`
  height: 7%;
  width: 100%;
  padding: 0.5em 1em;
  border-radius: 0.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${defaultColor.black};
  color: white;
  cursor: pointer;
`;
