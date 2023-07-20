import { Client } from "@stomp/stompjs";
import { useEffect, useRef, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { defaultColor } from "../styles/styles";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

import { getAllMessage, getGroupDetail, getMyFriends, getMyInfo } from "../../api/memberManage";

import ChatSection from "./ChatSection";
import OnlineCheckSection from "./OnlineCheckSection";
import PlanSection from "./PlanSection";
import Loading from "../loadingPage/Loading";
import NavBar from "../navbar/NavBar";
import EditMyProfile from "../navbar/EditMyProfile";
import Portal from "../modal/Portal";
import InviteGroup from "../modal/InviteGroup";

// eslint-disable-next-line no-extend-native
 Date.prototype.amPm = function () {
  let h, min
  const hour = this.getHours();
  min = this.getMinutes();

  if(this.getMinutes() < 10) {
    min = `0${this.getMinutes()}`
  } 
  if (this.getHours() < 12) {
    h = `오전${hour}:${min}`;
  } else {
    h = `오후${hour - 12}:${min}`;
  }

  return h;
};

const ChatPage = () => {
  const MY_TOKEN = localStorage.getItem("access_token");

  const location = useLocation();
  const { groupId } = useParams();
  const { chatRoomId, infoData } = location.state;

  const [userBoxView, setUserBoxView] = useState(true);
  const [planBoxView, setPlanBoxView] = useState(true);
  const [allMessage, setAllMessage] = useState([]);
  const [onlineUser, setOnlineUser] = useState([]);

  const isEditProfile = useSelector(state => state.toggleModal.editProfile);
  const isInviteFriend = useSelector(state => state.toggleModal.inviteNewFriendToGroup);

  // 리액트쿼리
  const { isLoading:infoLoading, data:MyInfoData } = useQuery(["myInfo"], getMyInfo);
  const { isLoading:myFriendsLoading, data:myFriendsList } = useQuery(["getMyFriends"], getMyFriends);
  const { isLoading: detailLoading, data: detailData, refetch: detailRefetch } = useQuery(["groupDetail"], () => getGroupDetail(groupId));
  const { isLoading: msgLoading } = useQuery(["allMsg"], () => getAllMessage(chatRoomId), {
    onSuccess: (data) => {
      setAllMessage(allDateFormat(data.data))
    }
  });

  // utils
  const stompSendFn = (des, body) => {
    client.current.publish({
      destination: des,
      headers: {},
      body: JSON.stringify(body),
    });
  };

  const allDateFormat = (prevAllMsg) => {
    return prevAllMsg.map((msg) => {
      const newDate = new Date(Date.parse(msg.time));
      return {
        sender: msg.sender,
        message: [msg.message],
        time: newDate.amPm(),
      };
    });
  };

  // callbackHandler
  const messageCallbackHandler = (message) => {
    const msgData = JSON.parse(message.body);
    const date = new Date(Date.parse(msgData.time));
    const amPm = date.amPm();

    // 서버에서 받은 메세지 데이터를 배열로 담기위해 새로운 객체에 다시 담아준다.
    const newData = {
      message: [msgData.message],
      sender: msgData.sender,
      time: amPm,
    };

    setAllMessage((prev) => {
      if (
        // 내가보낸 메세지가 아니면서, 메세지가 1개이상, 직전의 메세지와 현재 메세지의 sender가 같을경우
        msgData.sender !== infoData.userName &&
        prev.length >= 1 &&
        msgData.sender === prev[prev.length - 1].sender &&
        amPm === prev[prev.length - 1].time
      ) {
        // 직전의 메세지 배열에 새로운 메세지를 push 해준다.
        prev[prev.length - 1].message.push(msgData.message);
        return [...prev];
      } else {
        return [...prev, newData];
      }
    });
  };

  const userCallbackHandler = (message) => {
    setOnlineUser(JSON.parse(message.body));
  };
  const updateCallbackHandler = () => {
    detailRefetch()
  }


  // stomp
  const client = useRef(
    new Client({
      brokerURL: "wss://moa7.shop/chatroom",
      debug: function (str) {
        // console.log(str);
      },
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })
  );

  useEffect(() => {
    client.current.activate();
    return () => {
      // 유저가 나갈때마다 실행
      stompSendFn("/app/user", {
        status: "LEAVE",
        token: MY_TOKEN,
        chatRoomId,
        message: "소켓연결종료",
      });
      // client.current.deactivate();
    };
  }, []);

  // 브라우저에서 웹소켓 지원 안할시 sockJS로 연결
  // client.current.webSocketFactory = () => {
  //   return new SockJS("http://18.206.140.108/chatroom");
  // };


  //채팅 로직
  client.current.onConnect = () => {
    // console.log("소켓 연결완료✅");
    // 채팅관련 구독
    client.current.subscribe(`/topic/${chatRoomId}/message`, messageCallbackHandler);
    // user상태관련 구독
    client.current.subscribe(`/topic/${chatRoomId}/user`, userCallbackHandler);
    // 업데이트 구독
    client.current.subscribe(`/topic/${chatRoomId}/update`, updateCallbackHandler)
    // 유저가 입장할때마다 실행(소켓연결)
    stompSendFn("/app/user", {status: "JOIN", token: MY_TOKEN, chatRoomId, message: "소켓연결됨",});
  };

  return (
    <>
      {(detailLoading || myFriendsLoading || infoLoading || msgLoading) ?
        <Loading/>
        :
        <>
          <NavBar infoData={MyInfoData} />
          <Portal>
            {isEditProfile && <EditMyProfile info={MyInfoData.data}/>}
            {isInviteFriend && <InviteGroup myFriendsList={myFriendsList.data} groupData={detailData?.data}/>}
          </Portal>
          <Layout>
            <Container>
              <ChatBox userBoxView={userBoxView} planBoxView={planBoxView}>
                <ChatSection
                  myProfile={infoData}
                  data={detailData?.data}
                  setUserBoxView={setUserBoxView}
                  userBoxView={userBoxView}
                  setPlanBoxView={setPlanBoxView}
                  planBoxView={planBoxView}
                  allMessage={allMessage}
                  stompSendFn={stompSendFn}
                  chatRoomId={chatRoomId}
                  MY_TOKEN={MY_TOKEN}
                />
              </ChatBox>
              <UserBox view={userBoxView}>
                <OnlineCheckSection onlineUser={onlineUser} userInfoList={detailData?.data?.userInfoList} />
              </UserBox>
              <PlanBox view={planBoxView}>
                <PlanSection data={detailData?.data} planBoxView={planBoxView} groupId={groupId} view={planBoxView} stompSendFn={stompSendFn} chatRoomId={chatRoomId}/>
              </PlanBox>
            </Container>
          </Layout>
        </>
      }
    </>
  );
};

export default ChatPage;

const Layout = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media all and (min-width: 1024px) {
    font-size: 15px;
  }
  @media all and (min-width: 2000px) {
    font-size: 20px;
  }

  * {
    box-sizing: border-box;
  }
`;

const Container = styled.div`
  height: 80%;
  width: 100%;
  border: 1px solid ${defaultColor.lightGrey};
  display: flex;
`;

const ChatBox = styled.div`
  height: 100%;
  width: 100%;

  transition: 0.5s ease-in-out;
  ${({ planBoxView, userBoxView }) => {
    if (planBoxView && userBoxView) {
      return css`
        width: 55%;
      `;
    }
    if (planBoxView) {
      return css`
        width: 70%;
      `;
    }
    if (userBoxView) {
      return css`
        width: 85%;
      `;
    }
  }}
`;

const UserBox = styled.div`
  height: 100%;
  width: 0%;
  display: flex;
  flex-direction: column;
  border-left: 1px solid ${defaultColor.lightGrey};
  font-size: 0px;
  opacity: 0;

  transition: 0.5s ease-in-out;

  ${(props) =>
    props.view &&
    css`
     @media all and (min-width: 1024px) {
          font-size: 15px;
        }
        @media all and (min-width: 2000px) {
          font-size: 20px;
        }
      width: 15%;
      opacity: 1;
      border-left: 1px solid ${defaultColor.lightGrey};
    `}
`;

const PlanBox = styled.div`
  height: 100%;
  width: 0%;
  border-left: 1px solid ${defaultColor.lightGrey};
  font-size: 0px;
  opacity: 0;

  transition: 0.5s ease-in-out;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  ${(props) =>
    props.view &&
    css`
    font-size: 15px;
    opacity: 1;
        @media all and (min-width: 1024px) {
          font-size: 15px;
        }
        @media all and (min-width: 2000px) {
          font-size: 20px;
        }
      width: 30%;
      border-left: 1px solid ${defaultColor.lightGrey};
    `}
`;
