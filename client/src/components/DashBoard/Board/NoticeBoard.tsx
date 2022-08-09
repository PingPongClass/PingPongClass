/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '@src/utils/useIntersectionObserver';
import Notice from './Notice';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, selectContent } from '@src/store/content';
import { logIn, logOut, saveMember, Subject } from '@src/store/member';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { getCookie } from '@src/utils/cookie';

export interface NoticeProps {
  noticeId: number;
  writer: string;
  classTitle: string;
  title: string;
  content: string;
  regtime: string;
}

const NoticeBoard = () => {
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [isTeacher, setIsTeacher] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<Subject>({
    code: -1,
    title: '전체',
  });
  const [articles, setArticles] = useState<NoticeProps[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [page, setPage] = useState(1);
  let totalPage = 0;

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    // console.log(`감지결과 : ${isIntersecting}`);
    if (isIntersecting) {
      if (totalPage >= page) {
        setPage((prev) => prev + 1);
      }
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  useEffect(() => {
    setSubjects(memberStore.subjects);
    if (memberStore.userId.toString().length !== 10) {
      setIsTeacher(true);
    } else {
      setIsTeacher(false);
    }
  }, []);

  useEffect(() => {
    getNotice();
  }, [page]);

  useEffect(() => {
    // console.log(selected);
  }, [selected]);

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setArticles([]);
    setPage(1);

    // 검색 로직
    getNotice();
  };

  const getNotice = () => {
    let word = '';
    if (keyword !== '') {
      word = '&titleSearch=' + keyword;
    }

    let searchQuery =
      '/notice/list?paged=true&sort.sorted=true&sort.unsorted=false&classId=' +
      selected.code.toString() +
      '&userId=' +
      memberStore.userId.toString() +
      '&pageNumber=' +
      page.toString() +
      word;

    InterceptedAxios.get(searchQuery)
      .then((response) => {
        let list = response.data.content;
        totalPage = response.data.totalPages;
        if (totalPage >= page) {
          checkNewNotice(list);
        } else {
          console.log('마지막 페이지입니다!');
        }
      })
      .catch(() => {});
  };

  const checkNewNotice = (value: NoticeProps[]) => {
    const newNotice: NoticeProps[] = [];
    value.forEach((element) => {
      const id = element.noticeId;
      let ExistenceStatus = articles.findIndex((i) => i.noticeId === id);
      if (ExistenceStatus === -1) {
        newNotice.push(element);
      }
    });
    setArticles([...articles, ...newNotice]);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let code = parseInt(e.target.value);
    let title = '';
    subjects.forEach((s) => {
      if (s.code === code) {
        title = s.title;
      }
    });
    setSelected({
      code: code,
      title: title,
    });
  };

  return (
    <div css={totalContainer}>
      <div className="upperModalArea">
        <div className="pageTitle">공지사항</div>
        <form onSubmit={search}>
          <select onChange={handleSelect}>
            {subjects.map((s) => (
              <option key={s.code} value={s.code}>
                {s.title}
              </option>
            ))}
          </select>
          <input
            type="search"
            name=""
            id=""
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="main-btn">
            검색
          </button>
        </form>
      </div>
      <div className="tableArea">
        <div className="row titleRow">
          <div className="col noticeId">번호</div>
          <div className="col classTitle">수업명</div>
          <div className="col noticeTitle">제목</div>
          <div className="col writer">작성자</div>
          <div className="col regtime">작성일</div>
        </div>

        <div className="articleArea">
          {articles.map((article) => {
            return <Notice key={article.noticeId} article={article} />;
          })}
          <div ref={setTarget} className="Loading">
            {/* {isLoading && 'Loading...'} */}
          </div>
        </div>
      </div>
    </div>
  );
};

const totalContainer = () => css`
  /* 전역 */
  text-align: center;
  width: -webkit-fill-available;
  height: inherit;
  position: relative;
  /* overflow: hidden; */
  max-height: inherit;
  max-width: inherit;

  .pageTitle {
    text-align: left;
    /* font-size: 2rem; */
    border-bottom: 0.15rem solid black;
    width: inherit;
  }

  form {
    margin: 0.5rem;
    button {
      border: none;
    }
    .main-btn {
      background-color: pink;
    }
    .sub-btn {
      background-color: grey;
    }
  }

  /* table 영역 */
  .tableArea {
    border-spacing: 0;
    width: inherit;
    height: inherit;
    position: absolute;
    /* overflow-y: scroll; */
  }

  /* 스크롤 바 숨기기 */
  .tableArea::-webkit-scrollbar {
    display: none;
  }

  .tableArea div {
    display: inline-block;
  }

  .row,
  .article.btn {
    width: -webkit-fill-available;
    min-width: inherit;
    max-width: inherit;
    border: none;
    background-color: transparent;
    font-family: 'NanumSquare';
  }

  .col {
    overflow: hidden;
    width: 15%;
    max-width: 30%;
    height: 1.25rem;
  }
  /* 제목 행 */
  .titleRow {
    padding: 0.5rem 0;
    background-color: #c0d2e5;
  }

  /* 게시글 항목 영역 */
  .articleArea {
    /* padding: 1% 0; */
    width: -webkit-fill-available;
    max-width: 100%;

    /* 제목줄 1줄 */
    .articleRow {
      padding: 0.5rem 0;
      border-bottom: 0.15rem solid black;
    }

    /* 하이라이트 */
    .articleRow:hover,
    .highlited {
      background-color: #dfe9f2;
      border-bottom: 0.15rem solid black;
    }

    /* 아코디언 내용 */
    .detailRow {
      display: block;
      padding: 0.5rem 0;

      margin: 0.5rem 0 -0.5rem 0;
      background-color: #f9f9f9;
      height: -webkit-max-content;
    }

    /* 안 보이는 요소 */
    .hide {
      display: none;
    }

    /*  */
    .detailRow div {
      display: block;
    }

    /* 토글 내용 본문 영역 */
    .detailContent {
      padding: 0 2%;
      text-align: left;
      width: inherit;
      word-wrap: break-word;
    }

    /* 토글 내용 바닥 영역 */
    .detailFooter {
      background-color: #f9f9f9;
      padding: 1% 0;
      position: relative;
      left: 76%;
      width: max-content;
      button {
        border-radius: 3rem;
        color: white;
        border: none;
        width: max-content;
        padding: 0.5rem;
        margin: 0 0.5rem;
        width: 5rem;
      }
    }

    .detailWriter {
      padding: 0.5rem;
      max-width: -webkit-max-content;
    }

    textarea {
      background-color: rgba(255, 255, 255, 0.7);
      border: none;
      resize: none;
    }
  }
  /* 특정 열 별 설정 */
  .noticeId {
    max-width: 3rem;
  }
  .classTitle,
  .writer,
  .regtime {
    min-width: 14%;
    max-width: 17%;
  }
  .classTitleIcon {
    display: inline-block;
    border-radius: 0.5rem;
    background-color: #ffe790;
    align-self: center;
    width: 50%;
    min-width: max-content;
    vertical-align: top;
  }
  .noticeTitle {
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: calc(46%);
    width: calc(46%);
    max-width: calc(50%);
  }
`;

export default NoticeBoard;
