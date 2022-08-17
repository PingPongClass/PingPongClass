import { css } from '@emotion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ClassCard from '@components/DashBoard/TodaysClass/ClassCard';
import InterceptedAxios from '@src/utils/iAxios';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@src/store/hooks';
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
  classUrl: string;
}

function TodaysClass() {
  const [loading, setLoading] = useState(true);
  const memberStore = useAppSelector((state) => state.member);
  const [classList, setClassList] = useState([] as any);
  const navigate = useNavigate();
  const dt = new Date();

  const loadClassList = async () => {
    const studentId = memberStore.userId;
    const classDay = dt.getDay();
    const result = await InterceptedAxios.get(`/classes`, {
      params: { id: studentId, day: classDay },
    });
    setClassList(result.data.content);

    // promise.all 처리!
    const promises = result.data.content.map(async (elem, i) => {
      const classUrlData = await InterceptedAxios.get(
        `/classes/isopen/${elem.classId}`,
      );
      elem.classUrl = classUrlData.data;
      console.log(elem.classUrl);
    });
    await Promise.all(promises);
  };

  const joinClass = async (cls: ClassProps) => {
    if (cls.classUrl && cls.classUrl !== '링크') {
      navigate(`/lecture/${cls.classUrl}`, {
        state: {
          classId: cls.classId,
          classTitle: cls.classTitle,
          teacherName: cls.teacherName,
        },
      });
    }
  };

  const render = () => {
    if (!loading) {
      return classList.map((cls, idx) => (
        <SwiperSlide key={idx} onClick={() => joinClass(cls)}>
          <ClassCard clsList={cls} classUrl={cls.classUrl} />
        </SwiperSlide>
      ));
    }
  };

  useEffect(() => {
    loadClassList().then(() => setLoading(false));
  }, []);

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
        {render()}
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
  --swiper-theme-color: #fdb878;

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
`;

export default TodaysClass;
