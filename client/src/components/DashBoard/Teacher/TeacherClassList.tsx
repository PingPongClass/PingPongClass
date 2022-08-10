import { css } from '@emotion/react';
import ClassCard from './TeacherClassCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@src/store/hooks';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ClassList = () => {
  var dt = new Date();
  const [tab, setTab] = useState(dt.getDay());
  const [clsList, setClsList] = useState([] as any);
  const AXIOS = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const loadClassList = async (tt) => {
    const teacherId = memberStore.userId;
    const classDay = tt;
    setTab(tt);
    const result = await AXIOS.get(`/classes`, {
      params: { id: teacherId, day: classDay },
    }).then((response) => setClsList(response.data.content));
  };

  useEffect(() => {
    if (memberStore.userId !== -1) {
      const rs = loadClassList(dt.getDay());
    }
  }, [memberStore]);

  const render = (idx): any => {
    return (
      <SwiperSlide key={idx}>
        <div className="cardContainer">
          <div className="upCardContainer">
            <ClassCard clsList={clsList[idx]} />
            <ClassCard clsList={clsList[idx + 1]} />
            <ClassCard clsList={clsList[idx + 2]} />
          </div>
          <div className="downCardContainer">
            <ClassCard clsList={clsList[idx + 3]} />
            <ClassCard clsList={clsList[idx + 4]} />
            <ClassCard clsList={clsList[idx + 5]} />
          </div>
        </div>
      </SwiperSlide>
    );
  };

  const renderList = (): any => {
    let tmp = [] as any;
    for (let i = 0; i < clsList.length / 6; i++) {
      tmp.push(render(i));
    }
    return tmp;
  };

  return (
    <div css={totalContainer}>
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
        <div className="createTab">
          <Link to="/teacher/create" className="linkButton">
            수업 열기
          </Link>
        </div>
      </div>
      <Swiper
        style={{ width: '100%' }}
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
  );
};

const totalContainer = css`
  width: 100%;
  background: #fdfcf3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 20px;
  box-shadow: 2px 2px 15px -5px;

  .tabsContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .tabs {
    height: 100%;
    width: 100px;
    background: #f8f7ec;
    border-radius: 20px 20px 0 0;
    margin-right: 2px;
    box-shadow: -2px -2px 10px -7px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: all 0.2s ease-in-out;
  }

  .createTab {
    height: 100%;
    width: 100px;
    background: #f63471;
    border-radius: 20px 20px 0 0;
    box-shadow: -2px -2px 10px -7px;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    transition: all 0.2s ease-in-out;
    color: white;
  }

  .active {
    background-color: #ff3366;
    color: white;
  }

  .tabs:hover,
  .createTab:hover {
    transform: scale(1.04);
    background-color: #87a1c7;
  }

  .weekTabs {
    width: 100%;
    height: 50px;
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

  .swiper-pagination-progressbar-fill {
    background-color: #029371;
  }

  .linkButton {
    text-decoration: none;
    color: white;
  }
`;

export default ClassList;
