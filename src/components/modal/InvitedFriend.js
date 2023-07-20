import React from "react";
import styled from "styled-components";

import cancel from "../../img/icons/Icon_Group_cancel.png"

const InvitedFriend = ({name, inviteList, setInviteList}) => {
  const deleteList = () => {
    setInviteList(inviteList.filter(prop => prop !== name));
  }
  return (
    <UpperDiv>
      <NameDiv>
        <NameSpan>
          {name}
        </NameSpan>
      </NameDiv>
      <XImg src={cancel} onClick={deleteList}/>
    </UpperDiv>
  );
}
export default React.memo(InvitedFriend);

const UpperDiv = styled.div`
  height: 60%;
  width: 30%;
  border: 1px solid;
  border-radius: 10px;
  display: flex;
  flex-grow: 0;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
`;
const NameDiv = styled.div`
  height: 70%;
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const NameSpan = styled.span`
  font-size: 70%;
  
`;
const XImg = styled.img`
  height: 65%;
  cursor: pointer;
`;