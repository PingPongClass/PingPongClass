/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ClassCard from './TodaysClass/ClassCard';

function TodaysClass() {
  return (
    <div css={totalContainer}>
      <Swiper
        pagination={{
          type: 'progressbar',
        }}
        slidesPerView={3.5}
        spaceBetween={20}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <ClassCard objectName={'수학'} />
        </SwiperSlide>
        <SwiperSlide>
          <ClassCard objectName={'국어'} />
        </SwiperSlide>
        <SwiperSlide>
          <ClassCard objectName={'영어'} />
        </SwiperSlide>
        <SwiperSlide>
          <ClassCard objectName={'사회'} />
        </SwiperSlide>
        <SwiperSlide>
          <ClassCard objectName={'물리'} />
        </SwiperSlide>
        <SwiperSlide>
          <ClassCard objectName={'화학'} />
        </SwiperSlide>
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
