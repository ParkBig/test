import { axiosIns } from "./api";

// 회원가입, 로그인, 로그아웃, 소셜로그인
export const postLogin = async (userData) => {
  const data = await axiosIns.post("/signin", userData);
  return data;
};
export const postSignUp = async (userData) => {
  const {data} = await axiosIns.post("/signup", userData);
  return data;
};
export const postLogOut = async () => {
  const {data} = await axiosIns.post("/signout"); 
  return data;
};
export const kaKaoLogin = async (code) => {
  const data = await axiosIns.get(`/kakao?code=${code}`)
  return data
  }

// 아이디, 닉네임 중복확인
export const postIdDupChecker = async (idName) => {
  const {data} = await axiosIns.post("/userIdCheck", idName);
  return data;
}
export const postNickDupChecker = async (nickname) => {
  const {data} = await axiosIns.post("/userNameCheck", nickname);
  return data;
}

// 내정보 가져오기, 내정보 변경
export const getMyInfo = async () => {
  const {data} = await axiosIns.get("/mypage");
  return data;
}
export const putInfoChange = async (changeData) => {
  const data = await axiosIns.put("/mypage", changeData);
  return data;
}

// 친구 목록 조회, 친구 찾기, 친구 추가, 친구 삭제, 그룹, 그룹에추가로초대, 그룹나가기
export const getMyFriends = async () => {
  const {data} = await axiosIns.get("/friends");
  return data;
}
export const getMyFriend = async (userName) => {
  const {data} = await axiosIns.get(`/users/${userName}`);
  return data;
}
export const postPlusFriend = async (userName) => {
  const {data} = await axiosIns.post(`/friend`, userName);
  return data;
}
export const getFriendGroup = async () => {
  const {data} = await axiosIns.get("/group");
  return data;
}
export const deleteFriend = async (friendId) => {
  const data = await axiosIns.delete(`/friend/${friendId}`);
  return data;
}
export const getGroupDetail = async (groupId) => {
  const {data} = await axiosIns.get(`/group/${groupId}`)
  return data
}
export const postGroupInvite = async (group) => {
  const {data} = await axiosIns.post(`/group/${group[0]}`, group[1])
  return data
}
export const postGroupOut = async (groupId) => {
  const {data} = await axiosIns.post(`/group/exit/${groupId}`)
  return data
}


// 메세지 조회
export const getAllMessage = async (chatRoomId) => {
  const {data} = await axiosIns.get(`/message/${chatRoomId}`);
  return data;
} 

// 알람관리
export const postAlarmCheck = async (alarmId) => {
  const {data} = await axiosIns.post(`/alert/${alarmId}`)
  return data
}
