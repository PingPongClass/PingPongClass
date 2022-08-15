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
  console.log(classList);

  const loadClassList = async () => {
    const teacherId = memberStore.userId;
    const classDay = dt.getDay();
    const result = await AXIOS.get(`/classes`, {
      params: { id: teacherId, day: classDay },
    });
    setClassList(result.data.content);
  };

  const openClass = async (cls: ClassProps) => {
    console.log(cls);
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

  return (
    <div css={totalContainer}>
      {classList.length === 0 && <p>오늘은 수업이 없습니다.</p>}
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        slidesPerView={3.5}
        spaceBetween={0}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {classList.map((cls, idx) => (
          <SwiperSlide key={idx} onClick={() => openClass(cls)}>
            <ClassCard clsList={cls} classUrl={true} />
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
