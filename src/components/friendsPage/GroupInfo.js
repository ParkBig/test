import { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import { defaultColor } from "../styles/styles";

import { axiosIns } from "../../api/api";
import { postGroupOut } from "../../api/memberManage";

const GroupInfo = ({ group, infoData }) => {
  const [isHovering, setIsHovering] = useState(false);
  const [deleteHovering,setDeleteHovering] = useState(false)
  const navigate = useNavigate();

  const { mutate:groupOut } = useMutation(postGroupOut, {
    onSuccess: (res) => {
      alert("그룹이 삭제되었습니다.")
    }
  })

  const DateFormat = (startDate) => {
    const year = startDate.slice(0,4)
    const month = startDate.slice(5,7)
    const day = startDate.slice(8,10)

    return `${year}년 ${month}월 ${day}일`
  }

  const timeFormat = (startTime) => {
    let hour = Number(startTime.slice(0,2))
    if(hour < 12) hour = `오전 ${hour}시`
    else hour = `오후 ${hour - 12}시`

    return hour
  }

  const handleMouseOver = () => {
    setIsHovering(true);
  };
  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handlerDeleteOver= () => {
    setDeleteHovering(true)
  }
  const handleDeleteOut = () => {
    setDeleteHovering(false)
  }

  const deleteGroup = () => {
    groupOut(group.groupId)
  }

  const onChatRoomMove = () => {
    if(deleteHovering) return
    axiosIns
      .post("/room", {
        chatRoomId: group.groupId,
      })
      .then((res) => {
        navigate(`/chatroom/${group.groupId}`, {
          state: {
            chatRoomId: res.data.data.chatRoomId,
            infoData
          },
        });
      });
  };

  return (
    <GroupInfoBox
      over={group.userNum > 4}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onClick={onChatRoomMove}
    >
      <InfoHeader>
        <span>{group.groupName}</span>
        <DeleteIconWrapper   
        hovering={deleteHovering}
        onMouseOver={handlerDeleteOver}
        onMouseOut={handleDeleteOut}>
          {deleteHovering && <Choice onClick={deleteGroup}>삭제</Choice>}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="1.5em"
        >
          <path d="M12,10a2,2,0,1,0,2,2A2,2,0,0,0,12,10ZM5,10a2,2,0,1,0,2,2A2,2,0,0,0,5,10Zm14,0a2,2,0,1,0,2,2A2,2,0,0,0,19,10Z" />
        </svg>
        </DeleteIconWrapper>
      </InfoHeader>
      <InfoBody>
        <TextInfo>
          <TextInfoTop>
            <DayWrapper>
              <TextInfoSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z" />
              </TextInfoSvg>
              <span>{group?.startDate ? DateFormat(group?.startDate) : "-"}</span>
            </DayWrapper>
            <TimeWrapper>
              <TextInfoSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
                <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
              </TextInfoSvg>
              <span>{group?.startTime ? timeFormat(group?.startTime) : "-"}</span>
            </TimeWrapper>
          </TextInfoTop>
          <TextInfoBottom>
            <LocationWrapper>
              <TextInfoSvg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="#000000"
              >
                <path d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </TextInfoSvg>
              <span>{group.location ? `${group.location}, ${group.locationRoadName}` : "-"}</span>
            </LocationWrapper>
          </TextInfoBottom>
        </TextInfo>
        <ImgInfo>
          <ImgWrapper>
            {group?.imgUrls?.map((img, i) => {
              if (i > 3) return;
              return <Img src={img} key={i} />;
            })}
            <CountCircle className="countCircle">
              {isHovering && group.userNum > 4
                ? `+${group.userNum - 3}`
                : `+${group.userNum}`}
            </CountCircle>
          </ImgWrapper>
        </ImgInfo>
      </InfoBody>
    </GroupInfoBox>
  );
};

export default GroupInfo;

const GroupInfoBox = styled.div`
  padding: 1.5em 1em;
  border: 1px solid ${defaultColor.lightGrey};
  border-radius: 0.5em;
  user-select: none;

  transition: 0.3s ease-in-out;

  cursor: pointer;

  &:hover {
    border: 1px solid ${defaultColor.blue};
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

    .countCircle {
      opacity: 0;
    }

    Img {
      &:nth-child(2) {
        transform: translateX(30px);
      }

      &:nth-child(3) {
        transform: translateX(60px);
      }

      &:nth-child(4) {
        transform: translateX(90px);
      }
    }

    ${(props) =>
      props.over &&
      css`
        .countCircle {
          transform: translateX(90px);
          opacity: 1;
        }
      `}
  }
`;

const InfoHeader = styled.div`
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  

  span {
    font-weight: 400;

    @media all and (min-width: 1024px) {
      font-size: 1.4em;
    }
    @media all and (min-width: 2000px) {
      font-size: 1em;
    }
  }

`;

const DeleteIconWrapper = styled.div`
position: relative;

  svg {
    transition: 0.2s ease-in-out;

    ${props => props.hovering && css`transform: rotate(90deg);`}
  }
`;

const Choice = styled.div`
  padding: 1.5em 2.5em;
  border: 1px solid ${defaultColor.darkGrey};
  border-radius: 0.7em;
  font-size: 0.5em;
  position: absolute;
  left: -8em;
  top: -1em;
  transition: 0.2s ease-in-out;

  &:hover {
    scale: 1.2;
  }
`;

const InfoBody = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const TextInfo = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 0.5em;
`;

const TextInfoTop = styled.div`
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const DayWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 15px;
  }
`;

const TimeWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 15px;
  }
`;

const TextInfoBottom = styled.div`
  height: 50%;
`;

const LocationWrapper = styled.div`
  display: flex;
  align-items: center;

  span {
    font-size: 0.8em;
  }
`;

const TextInfoSvg = styled.svg`
  height: 0.8em;
  width: 0.8em;
  margin-right: 0.5em;
`;

const ImgInfo = styled.div`
  height: 100%;
  width: 30%;
  display: flex;
  align-items: flex-end;
`;

const ImgWrapper = styled.div`
  display: flex;
  position: relative;
`;

const Img = styled.img`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  transition: 0.3s ease-in-out;
  object-fit: cover;
`;

const CountCircle = styled.div`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${defaultColor.lightGrey};
  font-size: 0.7em;
  position: absolute;
  bottom: 0;
  opacity: 1;
  transition: 0.3s ease-in-out;
`;

const NullBox = styled.div`
  height: 100%;
  width: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 1em;
  background-color: white;
  position: absolute;
`;
