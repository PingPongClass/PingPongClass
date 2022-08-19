import { css } from '@emotion/react';
import ClassCard from './ClassCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@src/store/hooks';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

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

const ClassList = () => {
  var dt = new Date();
  const [tab, setTab] = useState(dt.getDay());
  const [clsList, setClsList] = useState([] as any);
  const AXIOS = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const loadClassList = async (tt) => {
    const studentId = memberStore.userId;
    const classDay = tt;
    setTab(tt);
    const result = await AXIOS.get(`/classes`, {
      params: { id: studentId, day: classDay },
    });
    // promise.all 처리!
    const promises = result.data.content.map(async (elem, i) => {
      const classUrlData = await AXIOS.get(`/classes/isopen/${elem.classId}`);
      elem.classUrl = classUrlData.data;
    });
    await Promise.all(promises);
    setClsList(result.data.content);
  };

  useEffect(() => {
    if (memberStore.userId !== -1) {
      const rs = loadClassList(dt.getDay());
    }
  }, []);

  // 지금 무조건 첫수업으로 가게 해둠
  const render = (idx): any => {
    const clsIdx = idx * 6;
    return (
      <SwiperSlide key={idx}>
        <div className="cardContainer">
          <div className="upCardContainer">
            <ClassCard clsList={clsList[clsIdx]} classUrl={true} />
            <ClassCard clsList={clsList[clsIdx + 1]} classUrl={true} />
            <ClassCard clsList={clsList[clsIdx + 2]} classUrl={true} />
          </div>
          <div className="downCardContainer">
            <ClassCard clsList={clsList[clsIdx + 3]} classUrl={true} />
            <ClassCard clsList={clsList[clsIdx + 4]} classUrl={true} />
            <ClassCard clsList={clsList[clsIdx + 5]} classUrl={true} />
          </div>
        </div>
      </SwiperSlide>
    );
  };

  const renderList = (): any => {
    let tmp = [] as any;
    if (clsList.length !== 0) {
      for (let i = 0; i < clsList.length / 6; i++) {
        tmp.push(render(i));
      }
    } else {
      tmp.push(render(1));
    }
    return tmp;
  };

  return (
    <div css={totalContainer}>
      <div className="pageTitle">수업목록</div>
      <hr
        css={css`
          margin-bottom: 30px;
        `}
      />
      <div className="total-container">
        <div className="tabsContainer">
          <div className="weekTabs">
            <div
              className={tab === 1 ? 'active tabs' : 'tabs'}
              onClick={() => loadClassList(1)}
            >
              월
            </div>
            <div
              className={tab === 2 ? 'active tabs' : 'tabs'}
              onClick={() => loadClassList(2)}
            >
              화
            </div>
            <div
              className={tab === 3 ? 'active tabs' : 'tabs'}
              onClick={() => loadClassList(3)}
            >
              수
            </div>
            <div
              className={tab === 4 ? 'active tabs' : 'tabs'}
              onClick={() => loadClassList(4)}
            >
              목
            </div>
            <div
              className={tab === 5 ? 'active tabs' : 'tabs'}
              onClick={() => loadClassList(5)}
            >
              금
            </div>
          </div>
        </div>
        <Swiper
          style={{
            width: '100%',
            borderLeft: '1px solid gray',
            borderRight: '1px solid gray',
            borderBottom: '1px solid gray',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
          }}
          pagination={{
            type: 'progressbar',
          }}
          slidesPerView={1}
          spaceBetween={0}
          navigation={true}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {renderList()}
        </Swiper>
      </div>
    </div>
  );
};

const totalContainer = css`
  width: 100%;
  animation: 0.5s ease-in-out loadEffect1;

  .total-container {
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px 20px 0 0;
    text-align: center;
    margin: auto;
  }

  .tabsContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .tabs {
    height: 100%;
    width: 140px;
    background: #fcc97d;
    border-radius: 10px 10px 0 0;
    margin-right: 2px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: all 0.2s ease-in-out;
  }

  .active {
    background-color: white;
    font-weight: 700;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
  }

  .tabs:hover {
    background-color: #ffeed1;
  }

  .weekTabs {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
  }

  .cardContainer {
    width: 100%;
    margin: 50px 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 50px;
    box-sizing: border-box;
  }

  .upCardContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }

  .downCardContainer {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }

  .swiper-button-next,
  .swiper-button-prev {
    color: #6e6e6e;
  }

  --swiper-theme-color: #fcc97d;

  .pagination-progressbar-fill {
    background-color: #fdb878;
  }

  .linkButton {
    text-decoration: none;
    color: white;
  }

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default ClassList;
