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
    }).then((response) => setClsList(response.data.content));
  };

  useEffect(() => {
    if (memberStore.userId !== -1) {
      const rs = loadClassList(dt.getDay());
    }
  }, []);

  const render = (idx): any => {
    const clsIdx = idx * 6;
    return (
      <SwiperSlide key={idx}>
        <div className="cardContainer">
          <div className="upCardContainer">
            <ClassCard clsList={clsList[clsIdx]} />
            <ClassCard clsList={clsList[clsIdx + 1]} />
            <ClassCard clsList={clsList[clsIdx + 2]} />
          </div>
          <div className="downCardContainer">
            <ClassCard clsList={clsList[clsIdx + 3]} />
            <ClassCard clsList={clsList[clsIdx + 4]} />
            <ClassCard clsList={clsList[clsIdx + 5]} />
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
    </div>
  );
};

const totalContainer = css`
  width: 100%;
  .total-container {
    width: 100%;
    background: #fdfcf3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    border-radius: 20px;
    box-shadow: 2px 2px 15px -5px;
    animation: 0.5s ease-in-out loadEffect1;
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

  .active {
    background-color: #ff3366;
    color: white;
  }

  .tabs:hover {
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
