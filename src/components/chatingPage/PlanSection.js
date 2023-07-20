import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import { defaultColor } from "../styles/styles";

import {  postScheduleGroup, reviseGroupSchedule } from "../../api/schedulesManage";

import InputDatePicker from "../modal/InputDatePicker";
import Time from "../modal/Time";

import { ReactComponent as MapSvg } from "../../img/svg/map.svg";

const PlanSection = ({ data ,groupId, stompSendFn, chatRoomId }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [places, setPlaces] = useState([]);
  const [roadName, setRoadname] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const { kakao } = window;
  const { register, handleSubmit, setValue, getValues, watch } = useForm();


  const { mutate: saveMyPlan } = useMutation(postScheduleGroup, {
    onSuccess: () => {
      alert("일정이 작성되었습니다.");
      setIsEdit(false);
      stompSendFn(`/topic/${chatRoomId}/update`, {message:"업데이트완료"})
    },
  });

  const { mutate: reviseMyPlan } = useMutation(reviseGroupSchedule, {
    onSuccess: () => {
      alert("일정이 수정되었습니다.");
      setIsEdit(false);
      stompSendFn(`/topic/${chatRoomId}/update`, {message:"업데이트완료"})
    },
  });

  const fullDateFormatFn =(startD, endD, startT, endT ) => {
    const replaceSD = startD?.replaceAll("-", ". ")
    const sliceST = startT?.slice(0, 5)
    const replaceSE = endD?.replaceAll("-", ". ")
    const sliceET = endT?.slice(0, 5)
// dd
    return `${replaceSD}, ${sliceST} - ${replaceSE}, ${sliceET}`
  }

  useEffect(() => {
    setIsEdit(data.plan ? false:true)
  },[data?.plan])

  // 초기 plan 섹션
  useEffect(() => {
    if (!isEdit) {
      const container = document.querySelector(".kakao-map");
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };
      const map = new kakao.maps.Map(container, options);

      const geocoder = new kakao.maps.services.Geocoder();
      geocoder.addressSearch(
        data?.locationRoadName || "서울 용산구 한강대로 405",
        (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });
            map.setCenter(coords);
          }
        }
      );
    }
  }, [isEdit, data]);

  // 수정중 plan 섹션
  useEffect(() => {
    // 마커를 담을 배열입니다
    if (isEdit) {
      const markers = [];
      const mapContainer = document.querySelector(".edit-kakao-map"), // 지도를 표시할 div
        mapOption = {
          center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
          level: 3, // 지도의 확대 레벨
        };

      // 지도를 생성합니다
      const map = new kakao.maps.Map(mapContainer, mapOption);
      // 장소 검색 객체를 생성합니다
      const ps = new kakao.maps.services.Places();
      // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      searchPlaces(ps);

      if (placeName || roadName) {
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(roadName || placeName, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            const coords = new kakao.maps.LatLng(result[0].y, result[0].x);
            const marker = new kakao.maps.Marker({
              map: map,
              position: coords,
            });
            map.setCenter(coords);
          }
        });
      }
    }
  }, [isEdit, watch("place")]);

  const searchPlaces = (ps) => {
    const keyword = watch("place");

    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    if (watch("place")) {
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        setPlaces(data);

        // 페이지 번호를 표출합니다
        displayPagination(pagination);
      }
    }
  };

  const displayPagination = (pagination) => {
    const paginationEl = document.querySelector(".pagination");
    const fragment = document.createDocumentFragment();
    let i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement("a");
      //   el.href = "#";
      el.innerHTML = i;
      el.setAttribute("style", "cursor:default");

      if (i === pagination.current) {
        el.className = "on";
        el.setAttribute("style", `color:${defaultColor.blue}`);
      } else {
        el.onclick = ((i) => {
          return () => {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  };

  const onPlaceClick = (placeName, roadName) => {
    setPlaceName(placeName);
    setRoadname(roadName);
    setValue("place", "");
  };

  const submitPlan = ({title, startTime, endTime, textArea}) => {
    if (
      !title.trim() ||
      !startTime ||
      !endTime ||
      !roadName ||
      !placeName ||
      startTime === "시작시간" ||
      endTime === "끝나는시간"
    ) {
      alert("필수항목(*)을 확인하고 다시 작성해주세요.");
      return;
    }

    if (
      dayjs(startDate).format("YYYY-MM-DD") >
      dayjs(endDate).format("YYYY-MM-DD")
    ) {
      alert("시작일은 종료일보다 늦을 수 없습니다.");
      return;
    }
    if (
      dayjs(startDate).format("YYYY-MM-DD") ===
        dayjs(endDate).format("YYYY-MM-DD") &&
      startTime > endTime
    ) {
      alert("시작시간이 종료시간보다 늦을 수 없습니다.");
      return;
    }
    if (
      dayjs(`${dayjs(startDate).format("YYYY-MM-DD")} ${startTime}`) - dayjs() <
      0
    ) {
      alert("시작일(시간)이 현재보다 늦을 수 없습니다.");
      return;
    }

    const savaData = {
      id:data?.scheduleId || groupId,
      planData: {
        title: title,
        startDate: dayjs(startDate).format("YYYY-MM-DD"),
        endDate: dayjs(endDate).format("YYYY-MM-DD"),
        startTime: startTime,
        endTime: endTime,
        location: placeName,
        locationRoadName: roadName,
        content: textArea,
      }
    }

    if(data.plan) {
      reviseMyPlan(savaData)
    } else {
      saveMyPlan(savaData);
    }
  };

  return (
    <>
      {!isEdit ? (
        <DefaultBox>
          <Header>{data?.title}</Header>
          <Body>
            <InfoArea>
              <DateWrapper>
                <SubTitle>일시</SubTitle>
                <span className="date">
                  {data?.startDate ? fullDateFormatFn(data?.startDate, data?.endDate, data?.startTime, data?.endTime) : "-"}
                </span>
              </DateWrapper>
              <LocationBox>
                <SubTitle>장소</SubTitle>
                <LocationTextArea>
                  <LocationTitle>{data?.location || "-"}</LocationTitle>
                  <SubWrapper>
                    <LocationLoadTitle>
                      {data?.locationRoadName || "-"}
                    </LocationLoadTitle>
                    <MapSvg height="1.2em" width="1.2em" />
                  </SubWrapper>
                </LocationTextArea>
                <LocationMapArea className="kakao-map" />
              </LocationBox>
              <MemoWrapper>
                <SubTitle>메모</SubTitle>
                <MemoDiv>{data?.content || ""}</MemoDiv>
              </MemoWrapper>
            </InfoArea>
            <ButtonWrapper>
            <Button onClick={() => setIsEdit((prev) => !prev)}>
              일정수정
            </Button>
            </ButtonWrapper>
          </Body>
        </DefaultBox>
      ) : (
        <Form>
          <EditHeader>
            <TitleInput placeholder="*****일정 제목을 입력해주세요*****" {...register("title")} />
          </EditHeader>
          <EditBody>
            <FormArea>
              <EditDateWrapper>
                <TextDiv className="date-text-div">
                  날짜<StarSpan>*</StarSpan>
                </TextDiv>
                <UpperDayDiv>
                  <InputDatePicker 
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                  />
                </UpperDayDiv>
              </EditDateWrapper>
              <EditTimeWrapper>
                <TextDiv>
                  시간<StarSpan>*</StarSpan>
                </TextDiv>
                <SelectTimeDiv>
                  <TimeDiv>
                    <TimeSelect
                      defaultValue="시작시간"
                      {...register("startTime")}
                    >
                      <TimeOption disabled value="시작시간">
                        시작시간
                      </TimeOption>
                      <Time />
                    </TimeSelect>
                  </TimeDiv>
                  <Dash>-</Dash>
                  <TimeDiv>
                    <TimeSelect
                      defaultValue="끝나는시간"
                      {...register("endTime")}
                    >
                      <TimeOption disabled value="끝나는시간">
                        끝나는시간
                      </TimeOption>
                      <Time />
                    </TimeSelect>
                  </TimeDiv>
                </SelectTimeDiv>
              </EditTimeWrapper>
              <EditLocationBox>
                <TextDiv className="placeText">
                  장소<StarSpan className="placeText">*</StarSpan>
                </TextDiv>
                <SearchMapDiv>
                  <SearchDiv>
                    <PlaceInput
                      {...register("place")}
                      placeholder="장소를 입력해주세요."
                    />
                    <SearchBtn>
                      <Svg
                        aria-label="검색"
                        color="#8e8e8e"
                        fill="#8e8e8e"
                        height="16"
                        role="img"
                        viewBox="0 0 24 24"
                        width="16"
                      >
                        <path
                          d="M19 10.5A8.5 8.5 0 1 1 10.5 2a8.5 8.5 0 0 1 8.5 8.5Z"
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        ></path>
                        <line
                          fill="none"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          x1="16.511"
                          x2="22"
                          y1="16.511"
                          y2="22"
                        ></line>
                      </Svg>
                    </SearchBtn>
                  </SearchDiv>
                  <MapAreaWrapper>
                    <EditMapArea className="edit-kakao-map" />
                    {watch("place") && (
                      <>
                        <PlaceListBox>
                          {places.map((place, i) => (
                            <PlaceWrapper
                              key={i}
                              onClick={() =>
                                onPlaceClick(
                                  place.place_name,
                                  place.road_address_name
                                )
                              }
                            >
                              <div>{place.place_name}</div>
                              <span>{place.road_address_name}</span>
                            </PlaceWrapper>
                          ))}
                        </PlaceListBox>
                        <PlacePageWrapper className="pagination" />
                      </>
                    )}
                    <SelectLocationWrapper>
                      <span className="place-name">{placeName || "-"}</span>
                      <span className="road-name">{roadName || "-"}</span>
                    </SelectLocationWrapper>
                  </MapAreaWrapper>
                </SearchMapDiv>
              </EditLocationBox>
              <EditMemoWrapper>
                <TextDiv className="placeText">메모</TextDiv>
                <MemoTextArea
                  {...register("textArea")}
                  placeholder="메모가 있나요?"
                />
              </EditMemoWrapper>
            </FormArea>
            <ButtonWrapper>
            <Button className="cancel-btn" onClick={() => setIsEdit(prev => !prev)}>취소</Button>
            <Button onClick={handleSubmit(submitPlan)} className="submit-btn">
              {isEdit ? "일정작성" : "수정하기"}
            </Button>
            </ButtonWrapper>
          </EditBody>
        </Form>
      )}
    </>
  );
};

export default PlanSection;

const DefaultBox = styled.div`
  height: 100%;
  width: 100%;
`;

const Header = styled.div`
  height: 9%;
  width: 100%;
  padding-left: 1em;
  display: flex;
  align-items: flex-end;
  font-size: 1.5em;
  font-weight: 500;
`;

const Body = styled.div`
  height: 91%;
  width: 100%;
  padding: 1em 2em;
`;

const InfoArea = styled.div`
  height: 93%;
  width: 100%;
`;

const DateWrapper = styled.div`
  height: 10%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LocationBox = styled.div`
  height: 50%;
  width: 100%;
`;

const LocationTextArea = styled.div`
  font-weight: 300;
  width: 100%;
`;
const LocationTitle = styled.span`
  width: 100%;
`;

const LocationLoadTitle = styled.span`
  color: ${defaultColor.darkGrey};
`;

const SubWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const LocationMapArea = styled.div`
  height: 70%;
  border-radius: 0.3em;
`;

const MemoWrapper = styled.div`
  height: 40%;
`;

const ButtonWrapper = styled.div`
display: flex;
gap: 1em;
height: 7%;

.cancel-btn {
  width: 20%;
  background-color: ${defaultColor.darkGrey};
}

.submit-btn {
  width: 80%;
}
`

const Button = styled.div`
  width: 100%;
  padding: 0.5em 1em;
  border-radius: 0.3em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${defaultColor.red};
  color: white;
  cursor: pointer;
`;

const SubTitle = styled.span`
  display: block;
  font-weight: 500;
  margin-bottom: 0.3em;
`;

const MemoDiv = styled.div`
  height: 70%;
  padding: 0.5em 1em;
  border: 1px solid ${defaultColor.lightGrey};
  border-radius: 0.3em;
`;

// --

const Form = styled.form`
  height: 100%;
  width: 100%;
`;

const EditHeader = styled.div`
  height: 9%;
  padding: 0 2em;
  display: flex;
  align-items: flex-end;
`;

const TitleInput = styled.input`
  height: 70%;
  width: 100%;
  padding-top: 0px;
  border: none;
  border-bottom: 1px solid black;
  font-size: 1.1em;
  outline: none;
`;

const EditBody = styled.div`
  height: 91%;

  padding: 1em 2em;
`;

const FormArea = styled.div`
  height: 93%;

  .date-text-div {
    margin-right: 0.35em;
  }
`;

const EditDateWrapper = styled.div`
  height: 5%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-left: 0.2em;
  margin-bottom: 0.6em;
`;

const TextDiv = styled.div`
  width: 10%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  white-space: nowrap;
`;
const StarSpan = styled.span`
  height: 100%;
  display: flex;
  align-items: center;
  font-weight: 800;
  color: #ff4545;
`;

const UpperDayDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditTimeWrapper = styled.div`
  height: 5%;
  display: flex;
  align-items: center;
`;

const SelectTimeDiv = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const TimeDiv = styled.div`
  height: 100%;
  width: 46%;
  display: flex;
  flex-direction: column;
`;
const TimeSelect = styled.select`
  height: 100%;
  width: 100%;
  border: 1px solid #aaafb5;
  border-radius: 5px;
  background-color: white;
  outline: none;
`;
const TimeOption = styled.option`
  height: 100%;
  width: 40%;
  border: 1px solid;
  border-radius: 4px;
  display: none;
`;

const EditLocationBox = styled.div`
  height: 45%;
  margin-top: 0.5em;
  display: flex;
  align-items: flex-start;

  .placeText {
    display: flex;
    align-items: flex-start;
  }
`;

const SearchMapDiv = styled.div`
  height: 100%;
  width: 90%;
`;

const SearchDiv = styled.div`
  height: 10%;
  width: 100%;
  margin-bottom: 0.5em;
  border: 1px solid #aaafb5;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  overflow: hidden;
  z-index: 3;
`;

const PlaceInput = styled.input`
  height: 100%;
  width: 85%;
  font-size: 90%;
  font-weight: 600;
  display: flex;
  align-items: center;
  border: none;
  outline: none;
`;

const SearchBtn = styled.button`
  height: 100%;
  width: 7%;
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

const MapAreaWrapper = styled.div`
  height: 70%;
  width: 100%;
  border-radius: 0.3em;
  position: relative;
  z-index: 3;
`;

const EditMapArea = styled.div`
  height: 80%;
  width: 100%;
  border-radius: 0.3em;
`;

const PlaceListBox = styled.div`
  height: 70%;
  width: 100%;
  border: 1px solid ${defaultColor.lightGrey};
  border-top-left-radius: 0.3em;
  border-top-right-radius: 0.3em;
  background-color: ${defaultColor.white};
  overflow: auto;
  position: absolute;
  top: 0;
  z-index: 1;
`;

const PlaceWrapper = styled.div`
  padding: 0.3em 0.5em;
  border-bottom: 1px solid ${defaultColor.lightGrey};
  cursor: pointer;

  div {
    font-size: 0.9em;
    font-weight: 600;
  }

  span {
    font-size: 0.7em;
  }

  &:hover {
    background-color: ${defaultColor.lightGrey};
  }
`;

const PlacePageWrapper = styled.div`
  height: 10%;
  width: 100%;
  border: 1px solid ${defaultColor.lightGrey};
  border-bottom-left-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
  display: flex;
  justify-content: center;
  position: absolute;
  gap: 0.3em;
  background-color: ${defaultColor.white};
  bottom: 20%;
  z-index: 1;
`;

const EditMemoWrapper = styled.div`
  height: 35%;
  width: 100%;
  display: flex;
`;

const MemoTextArea = styled.textarea`
  width: 100%;
  height: 100%;
  border: 1px solid ${defaultColor.lightGrey};
  border-radius: 0.3em;
  overflow: auto;
  outline: none;
  resize: none;
`;

const SelectLocationWrapper = styled.div`
  height: 20%;
  width: 100%;
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  gap: 0.2em;

  .road-name {
    color: ${defaultColor.darkGrey};
  }
`;

const Dash = styled.div`
  height: 100%;
  width: 3%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 200%;
  font-weight: 700;
`;
