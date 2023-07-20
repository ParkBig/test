import styled, { css } from "styled-components";
import { defaultColor } from "../styles/styles";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ReactComponent as ArrowLeftSvg } from "../../img/svg/arrow_left.svg";
import { ReactComponent as ArrowBottom } from "../../img/svg/arrow_bottom.svg";
import { ReactComponent as FriendSvg } from "../../img/svg/friend.svg";
import { ReactComponent as BugerLineSvg } from "../../img/svg/burgerLine.svg";

const ChatSection = ({
  setUserBoxView,
  userBoxView,
  setPlanBoxView,
  planBoxView,
  allMessage,
  stompSendFn,
  chatRoomId,
  MY_TOKEN,
  myProfile,
  data,
}) => {
  const [chatInput, setChatInput] = useState("");
  const [scroll, setScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(10000);

  const navigate = useNavigate();
  const chatRef = useRef();

  const userImgMatchingFn = (userName) => {
    const filterUser = data?.userInfoList.filter(
      (user) => user.userName === userName
    )[0];

    const MatchigImg = filterUser ? filterUser.imgUrl : "https://yuns8708bucket.s3.ap-northeast-2.amazonaws.com/images/moa99_profile.jpg"

    return MatchigImg
  };

  const onChattingChange = (e) => {
    const value = e.target.value;
    setChatInput(value);
  };

  const onChatEnter = (e) => {
    if (
      e.key === "Enter" &&
      !e.shiftKey &&
      e.nativeEvent.isComposing === false
    ) {
      e.preventDefault();
      if (!chatInput.trim()) return;
      stompSendFn("/app/message", {
        token: MY_TOKEN,
        chatRoomId,
        status: "MESSAGE",
        message: chatInput,
      });
      setChatInput("");
    }
  };

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
    setScrollTop(chatRef.current.scrollTop);
  }, [allMessage]);

  useEffect(() => {
    chatRef.current.addEventListener("scroll", handleScroll);
    return () => {
      chatRef.current?.removeEventListener("scroll", handleScroll); //clean up
    };
  }, [scrollTop]);

  const handleScroll = () => {
    // 스크롤이 Top에서 50px 이상 내려오면 true값을 useState에 넣어줌
    if (chatRef.current.scrollTop <= scrollTop * 0.8) {
      setScroll(true);
    } else {
      setScroll(false);
    }
  };


  return (
    <>
      <ChatBoxHeader>
        <ArrowLeftSvg
          width="1em"
          height="1em"
          onClick={() => navigate("/myFriends")}
        />
        <ChatTitle>{data?.groupName}</ChatTitle>
        <ChatIconWrapper>
          <FriendSvg
            width="1.5em"
            height="1.5em"
            onClick={() => setUserBoxView((prev) => !prev)}
            fill={userBoxView ? defaultColor.blue : null}
          />
          <BugerLineSvg
            width="1.5em"
            height="1.5em"
            onClick={() => setPlanBoxView((prev) => !prev)}
            stroke={planBoxView ? defaultColor.blue : "currentColor"}
          />
        </ChatIconWrapper>
      </ChatBoxHeader>
      <ChatBoxBody>
        <ChattingArea ref={chatRef}>
          {allMessage.map((msg ,i) =>
            // sender가 본인일 경우
            msg.sender === myProfile.userName ? (
                <MyChattingBox key={i}>
                  <ChattingMainWrapper myMessage={true}>
                    <div>{msg.message}</div>
                  </ChattingMainWrapper>
                  <ChattingTimeWrapper>
                    <span>{msg.time}</span>
                  </ChattingTimeWrapper>
                </MyChattingBox>
            ) : (
              // sender가 타인일 경우
              <>
                <ChattingBox>
                  <ChattingUserImgWrapper>
                    <img src={userImgMatchingFn(msg.sender)} alt="userImage" />
                  </ChattingUserImgWrapper>
                  <ChattingMainWrapper myMessage={false} wideTime={msg.time.length>6}>
                    <span>{msg.sender}</span>
                    {/* 같은 시간에 온 메세지는 이어서 렌더링 해준다. */}
                    {msg.message.map((message, i) => (                      
                        <div key={i}>
                          {message}
                          {/* 메세지의 시간은 마지막 메세지에만 표시, 포지션 앱솔루트로 고정 */}
                          {msg.message.length - 1 === i && (
                            <span className="send_time">{msg.time}</span>
                          )}
                        </div>
                    ))}
                  </ChattingMainWrapper>
                </ChattingBox>
              </>
            )
          )}
        </ChattingArea>
        <ChatInput
          value={chatInput}
          onChange={onChattingChange}
          onKeyDown={onChatEnter}
          placeholder="메세지를 입력하세요. (Enter : 전송 / Shift+Enter : 줄바꿈)"
          wrap="hard"
        />

        <BottomScrollWrapper
          scroll={scroll}
          onClick={() => (chatRef.current.scrollTop = scrollTop)}
        >
          <ArrowBottom height="1.2em" width="1.2em" />
        </BottomScrollWrapper>
      </ChatBoxBody>
    </>
  );
};
export default ChatSection;

const ChatBoxHeader = styled.div`
  height: 9%;
  padding: 1%;
  border-bottom: 1px solid ${defaultColor.lightGrey};
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const ChatTitle = styled.span`
  font-size: 1.2em;
  font-weight: 500;
`;

const ChatIconWrapper = styled.div`
  width: fit-content;
  display: flex;
  gap: 0.5em;
`;

const ChatBoxBody = styled.div`
  height: 91%;
  padding: 1em;
  position: relative;
`;

const ChattingArea = styled.div`
  height: 93%;
  padding-bottom: 0.5em;
  overflow: auto;

  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;

const ChattingBox = styled.div`
  height: fit-content;
  display: flex;
`;

const ChattingUserImgWrapper = styled.div`
  width: fit-content;
  height: fit-content;
  margin-right: 0.3em;

  img {
    height: 3em;
    width: 3em;
    border-radius: 50%;
  }
`;

const MyChattingBox = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const ChattingMainWrapper = styled.div`
  max-width: 60%;
  margin-top: 5px;

  div {
    ${(props) =>
      props.myMessage
        ? css`
            margin-left: 0.5em;
            background-color: ${defaultColor.blue};
            color: ${defaultColor.white};
          `
        : css`
            margin: 0.3em 0.5em 0.5em 0em;
            background-color: ${defaultColor.lightGrey};

            &:last-child {
              position: relative;
            }

            .send_time {
              font-size: 0.9em;
              width: fit-content;
              position: absolute;
              white-space: nowrap;
              right: -4.2em;
              bottom: 0;

              // 시간을 표시해주는 문자열의 길이가 7자 이상일 경우 right값을 더 준다.
              ${props => props.wideTime && css`right:-5em;`}
            }
          `}

    width: fit-content;
    padding: 0.7em;
    border-radius: 0.5em;
    font-size: 0.9em;
    white-space: pre-line;
  }
`;

const ChattingTimeWrapper = styled.div`
  display: flex;
  flex-direction: column-reverse;

  span {
    font-size: 0.8em;
  }
`;

const ChatInput = styled.textarea`
  height: 7%;
  width: 100%;
  padding: 0.5em 1em;
  border: 1px solid ${defaultColor.lightGrey};
  border-radius: 0.3em;
  resize: none;
  font-size: 1em;
  font-weight: 400;

  &:focus {
    outline: 2px solid ${defaultColor.blue};
  }
`;

const BottomScrollWrapper = styled.div`
  padding: 1em;
  border: 1px solid #e9eef2;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${defaultColor.white};
  right: 100px;
  bottom: 150px;
  position: absolute;
  opacity: 0;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.3);
  transition: 0.3s ease-in-out;

  ${(props) =>
    props.scroll &&
    css`
      opacity: 1;
      visibility: visible;
    `}
`;
