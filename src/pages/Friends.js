import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { getFriendGroup, getMyFriends, getMyInfo } from "../api/memberManage";

import Loading from "../components/loadingPage/Loading";
import Portal from "../components/modal/Portal";
import NavBar from "../components/navbar/NavBar";
import EditMyProfile from "../components/navbar/EditMyProfile";
import GroupList from "../components/friendsPage/GroupList";

const Friends = () => {
  const isEditProfile = useSelector(state => state.toggleModal.editProfile);

  const { isLoading: infoLoading, data: infoData } = useQuery(["myInfo"], getMyInfo);
  const { isLoading: groupLoading, data: friendGroup } = useQuery(["friendGroup"], getFriendGroup);
  const { isLoading: friendLoading, data: friendList } = useQuery(["friendList"], getMyFriends);
  return (
    <>
      {(infoLoading || groupLoading || friendLoading) ? 
        <Loading />
        : 
        <>
          <NavBar infoData={infoData} />
          <Portal>
            {isEditProfile && <EditMyProfile info={infoData.data} />}
          </Portal>
          <Wrap>
            <GroupContainer>
              <GroupList friendGroup={friendGroup.data} friendList={friendList} infoData={infoData.data}/>
            </GroupContainer>
          </Wrap>
        </>
      }
    </>
  );
};

export default Friends;

const Wrap = styled(motion.div)`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3%;

  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
  Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

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

const GroupContainer = styled(motion.div)`
  height: 70%;
  width: 93.3%;
  display: flex;
  flex-direction: column;
`;
