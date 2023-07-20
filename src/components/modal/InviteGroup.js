import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { postGroupInvite } from "../../api/memberManage";
import { inviteNewFriendToGroup } from "../../store/modules/toggleModal";

import FriendDiv from "./FriendDiv";
import InvitedFriend from "../modal/InvitedFriend";

import logoImg from "../../img/icons/Logo_Main.png"
import cancel from "../../img/icons/Icon_Group_cancel.png"

const InviteGroup = ({myFriendsList, groupData}) => {
  const modalRef = useRef();
  const dispatch = useDispatch();
  const isInviteFriend = useSelector(state => state.toggleModal.inviteNewFriendToGroup);

  const [isTargetSearch, setIsTargetSearch] = useState(false);
  const [resultF, setResultF] = useState({});;
  const [inviteList, setInviteList] = useState([]);
  const { register:searchRegister, handleSubmit:searchHandle, setValue:searchSetValue } = useForm();

  const { mutate:invite } = useMutation(postGroupInvite, {
    onSuccess: (res) => {
      alert("친구초대가 완료되었습니다.")
      dispatch(inviteNewFriendToGroup(false));
    }
  })

  const SearchFriends = (formData) => {
    myFriendsList.map(prop => {
      if (prop.friendUsername === formData.friendsNick) {
        setIsTargetSearch(true);
        setResultF(prop);
      }
    })
  };
  const backToFriendsList = () => {
    setIsTargetSearch(false);
    setResultF({});
    searchSetValue("friendsNick", "");
    dispatch(dispatch(inviteNewFriendToGroup(false)))
  }
  const inviteFriends = () => {
    invite([groupData.groupId, {"users" : inviteList}])
  }

  useEffect(() => {
    document.addEventListener('mousedown', clickModalOutside);
    return () => {document.removeEventListener('mousedown', clickModalOutside)};
  });
  const clickModalOutside = (ev) => {
    (isInviteFriend && !modalRef.current.contains(ev.target)) && dispatch(inviteNewFriendToGroup(false));
  };
  return (
    <Wrap>
      <UpperDiv ref={modalRef}>
        <FindFriendDiv>
          <SearchPlaceForm onSubmit={searchHandle(SearchFriends)}>
            <PlaceInput {...searchRegister("friendsNick")} placeholder="친구 닉네임 검색"/>
            <SearchBtn>
              <Svg aria-label="검색" color="#8e8e8e" fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16">
                <path d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path>
                <line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="16.511" x2="22" y1="16.511" y2="22"></line>
              </Svg>
            </SearchBtn>
          </SearchPlaceForm>
          <BackToList>
            <BackBtnImg src={cancel} onClick={backToFriendsList}/>
          </BackToList>
        </FindFriendDiv>
        <ResultFriendDiv>
          {!isTargetSearch ?
            myFriendsList.length ?
              <>
                <FriendsDiv>
                  내 친구
                  <FriendsCount>
                    {myFriendsList.length}
                  </FriendsCount>
                </FriendsDiv>
                {myFriendsList.map((prop) => <FriendDiv key={prop.id} img={prop.imgUrl} name={prop.friendUsername} inviteList={inviteList} setInviteList={setInviteList} setIsTargetSearch={setIsTargetSearch} participant={groupData.userInfoList}/>)}
              </>
              :
              <ZeroFRdiv>
                <LogoImg src={logoImg} />
                <SaltyDiv>
                  아직 친구가 없군요~
                </SaltyDiv>
              </ZeroFRdiv>
            :
            <>
              <FriendsDiv>
                검색결과
              </FriendsDiv>
              <FriendDiv img={resultF.imgUrl} name={resultF.friendUsername} inviteList={inviteList} setInviteList={setInviteList} setIsTargetSearch={setIsTargetSearch} />
            </>
          }
        </ResultFriendDiv>
        <InviteDiv>
          <Invite>
            초대
            <FriendsCount>
              {inviteList.length > 0 && inviteList.length}
            </FriendsCount>
          </Invite>
          <InviteListDiv>
            {inviteList.map((prop, index) => <InvitedFriend key={index} name={prop} inviteList={inviteList} setInviteList={setInviteList} />)}
          </InviteListDiv>
        </InviteDiv>
        <MakeGroupBtnDiv>
          <MakeGroupBtn onClick={inviteFriends}>
            초대
          </MakeGroupBtn>
        </MakeGroupBtnDiv>
      </UpperDiv>
    </Wrap>
  )
}

export default InviteGroup;

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;
`;
const UpperDiv = styled.div`
  width: 20%;
  height: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
`;
const FindFriendDiv = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const SearchPlaceForm = styled.form`
  width: 85%;
  height: 75%;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #E9EEF2;
  position: relative;
`;
const PlaceInput = styled.input`
  height: 100%;
  width: 100%;
  border: none;
  outline: none;
  display: flex;
  align-items: center;
  font-size: 90%;
  font-weight: 600;
  text-indent: 3%;
  background-color: transparent;
`;
const SearchBtn = styled.button`
  height: 80%;
  max-width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
const Svg = styled.svg`
  width: 80%;
  height: 80%;
`;
const BackToList = styled.div`
  height: 100%;
  width: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BackBtnImg = styled.img`
  cursor: pointer;
`;
const ResultFriendDiv = styled.div`
  width: 90%;
  height: 53%;
  margin-bottom: 2%;
  border-bottom: 1px solid #AAAFB5;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
  gap: 3%;
`;
const FriendsDiv = styled.div`
  height: 5%;
  width: 97%;
  margin-left: 3%;
  margin-top: 3%;
  margin-bottom: 1%;
  display: flex;
  align-items: center;
  font-weight: 800;
`;
const FriendsCount = styled.span`
  margin-left: 1%;
`;
const ZeroFRdiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10%;
`;
const LogoImg = styled.img`
  width: 30%;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SaltyDiv = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const InviteDiv = styled.div`
  width: 90%;
  height: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Invite = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  align-items: center;
  font-size: 100%;
  font-weight: 600;
`;
const InviteListDiv = styled.div`
  width: 100%;
  height: 75%;
  margin-top: 1%;
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap:2%;
`;
const MakeGroupBtnDiv = styled.div`
  width: 90%;
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const MakeGroupBtn = styled.button`
  width: 100%;
  height: 85%;
  border: 1px solid #FF4545;
  border-radius: 5px;
  background-color: #FF4545;
  font-size: 110%;
  font-weight: 600;
  color: white;
  cursor: pointer;
`;