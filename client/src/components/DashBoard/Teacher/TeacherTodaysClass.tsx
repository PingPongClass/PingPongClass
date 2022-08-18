import { css } from '@emotion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ClassCard from '@components/DashBoard/TodaysClass/ClassCard';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@src/store/hooks';
import getCode from '@utils/getCode';
import { useNavigate } from 'react-router-dom';

interface ClassProps {
  classDay: number;
  classDesc: string;
  classId: number;
  classTitle: string;
  subjectEntity: {
    classSubjectCode: number;
    name: string;
  };
  teacherName: string;
  timetableId: number;
}

function TeacherTodaysClass() {
  const AXIOS = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const [classList, setClassList] = useState([] as any);
  const navigate = useNavigate();
  const dt = new Date();

  const loadClassList = async () => {
    const teacherId = memberStore.userId;
    const classDay = dt.getDay();
    const result = await AXIOS.get(`/classes`, {
      params: { id: teacherId, day: classDay },
    });
    setClassList(result.data.content);
  };

  const openClass = async (cls: ClassProps) => {
    const newCode = await getCode();
    const newData = {
      classId: cls.classId,
      classUrl: newCode,
    };

    try {
      await AXIOS.patch(`/classes/open`, newData);
      navigate(`/lecture/${newCode}`, {
        state: {
          classId: cls.classId,
          classTitle: cls.classTitle,
          teacherName: cls.teacherName,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadClassList();
  }, []);

  useEffect(() => {
    const now = new Date();
    const nowHour = now.getHours();
    const nowMinute = now.getMinutes();
    let nowClassTime = 0;

    // 시간체크
    if (nowHour > 9 || (nowHour >= 9 && nowMinute >= 45)) nowClassTime = 1;
    if (nowHour > 10 || (nowHour >= 10 && nowMinute >= 40)) nowClassTime = 2;
    if (nowHour > 11 || (nowHour >= 11 && nowMinute >= 35)) nowClassTime = 3;
    if (nowHour > 12 || (nowHour >= 12 && nowMinute >= 30)) nowClassTime = 4;
    if (nowHour > 14 || (nowHour >= 14 && nowMinute >= 10)) nowClassTime = 5;
    if (nowHour > 15 || (nowHour >= 15 && nowMinute >= 5)) nowClassTime = 6;
    if (nowHour > 18 || (nowHour >= 18 && nowMinute >= 0)) nowClassTime = 7;

    classList.forEach((elem) => {
      if (elem.timetableId <= nowClassTime) elem.isDimming = 'done';
      else elem.isDimming = 'notyet';
    });
    setClassList(classList);
  }, [classList]);

  return (
    <div css={totalContainer}>
      {classList.length === 0 && <p>오늘은 수업이 없습니다.</p>}
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        slidesPerView={4}
        spaceBetween={0}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {classList.map((cls, idx) => (
          <SwiperSlide key={idx} onClick={() => openClass(cls)}>
            <ClassCard
              clsList={cls}
              classUrl={true}
              isDimming={cls.isDimming}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

const totalContainer = css`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-sizing: border-box;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }

  .swiper-slide img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #6e6e6e;
  }

  .swiper-pagination-progressbar-fill {
    background-color: #d65745;
  }

  .swiper-slide {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin: 0;
  }
`;

export default TeacherTodaysClass;
