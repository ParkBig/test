import { axiosIns } from "./api";

// 스케쥴 가져오기(달력포함), 상세보기
export const getSchedules = async () => {
  const {data} = await axiosIns.get("/schedules");
  return data;
}
export const getDetailSchedule = async (scheduleId) => {
  const {data} = await axiosIns.get(`/schedule/${scheduleId}`);
  return data;
}

// 일정 만들기(개인), 그룹만들기, 일정삭제, 일정수정
export const postSchedule = async (planData) => {
  const {data} = await axiosIns.post(`/schedule`, planData);
  return data;
}
// export const postScheduleGroup = async (planData) => {
//   const {data} = await axiosIns.post(`/schedule/${planData[0]}`, planData[1]);
//   return data;
// }
export const postScheduleGroup = async (planData) => {
  const {data} = await axiosIns.post(`/schedule/${planData.id}`, planData.planData);
  return data;
}
export const reviseGroupSchedule = async (planData) => {
  const {data} = await axiosIns.put(`/schedule/${planData.id}`, planData.planData);
  return data;
}
export const deleteSchedule = async (scheduleId) => {
  const {data} = await axiosIns.delete(`/schedule/${scheduleId}`);
  return data;
}
export const reviseSchedule = async (reviseData) => {
  const {data} = await axiosIns.put(`/schedule/${reviseData[0]}`, reviseData[1]);
  return data;
}

// 그룹만들기
export const postMakeGroup = async (groupData) => {
  const {data} = await axiosIns.post(`/group`, groupData);
  return data;
}
