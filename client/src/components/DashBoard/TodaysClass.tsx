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
  isActive: boolean;
}

function TodaysClass(props) {
  const classListFromMainContent = props.classList;
  const AXIOS = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const [classList, setClassList] = useState(classListFromMainContent as any);
  var dt = new Date();
  const loadClassList = async () => {
    const studentId = memberStore.userId;
    const classDay = dt.getDay();
    const result = await AXIOS.get(`/classes`, {
      params: { id: studentId, day: classDay },
    });

    // promise.all 처리!
    const promises = result.data.content.map(async (elem, i) => {
      const isActiveClass = await AXIOS.get(`/classes/isoopen/${elem.classId}`);
      console.log(isActiveClass.data, elem.classId);
      elem.isActive = isActiveClass.data;
    });
    await Promise.all(promises);
    // result.data.content.forEach(async (elem) => {
    //   const isActiveClass = await AXIOS.get(`/classes/isoopen/${elem.classId}`);
    //   elem.isActive = isActiveClass;
    // });
    setClassList(result.data.content);
  };
  console.log(classList);

  const joinClass = async (cls: ClassProps) => {
    console.log(cls);
    // string으로 받으면 아래 주석 풀수있음
    // if (cls.classUrl) {
    //   navigate(`/class/${cls.classUrl}`, {
    //     state: {
    //       classId: cls.classId,
    //       classTitle: cls.classTitle,
    //       teacherName: cls.teacherName,
    //     },
    //   });
    // }
  };

  useEffect(() => {
    loadClassList();
  }, [memberStore]);

  return (
    <div css={totalContainer}>
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
          <SwiperSlide key={idx} onClick={() => joinClass(cls)}>
            <ClassCard
              clsList={{ classTitle: cls.classTitle, classDesc: cls.classDesc }}
              isActive={cls.isActive}
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
`;

export default TodaysClass;
