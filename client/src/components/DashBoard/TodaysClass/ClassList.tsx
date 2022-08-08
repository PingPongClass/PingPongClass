import { css } from '@emotion/react';
import { useState } from 'react';
import ClassCard from './ClassCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const ClassList = () => {
  const [tab, setTab] = useState('월');
  return (
    <div css={totalContainer}>
      <div className="weekTabs">
        <div
          className={tab === '월' ? 'active tabs' : 'tabs'}
          onClick={() => setTab('월')}
        >
          월
        </div>
        <div
          className={tab === '화' ? 'active tabs' : 'tabs'}
          onClick={() => setTab('화')}
        >
          화
        </div>
        <div
          className={tab === '수' ? 'active tabs' : 'tabs'}
          onClick={() => setTab('수')}
        >
          수
        </div>
        <div
          className={tab === '목' ? 'active tabs' : 'tabs'}
          onClick={() => setTab('목')}
        >
          목
        </div>
        <div
          className={tab === '금' ? 'active tabs' : 'tabs'}
          onClick={() => setTab('금')}
        >
          금
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
        <SwiperSlide>
          <div className="cardContainer">
            <div className="upCardContainer">
              <ClassCard objectName={'수학'} />
              <ClassCard objectName={'수학'} />
              <ClassCard objectName={'수학'} />
            </div>
            <div className="downCardContainer">
              <ClassCard objectName={'수학'} />
              <ClassCard objectName={'수학'} />
              <ClassCard objectName={'수학'} />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="cardContainer">
            <div className="upCardContainer">
              <ClassCard />
              <ClassCard />
              <ClassCard />
            </div>
            <div className="downCardContainer">
              <ClassCard />
              <ClassCard />
              <ClassCard />
            </div>
          </div>
        </SwiperSlide>
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
`;

export default ClassList;
