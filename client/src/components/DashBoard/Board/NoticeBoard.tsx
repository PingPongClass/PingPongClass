import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '@src/utils/useIntersectionObserver';
import Notice from './Notice';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, selectContent } from '@src/store/content';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';

export interface NoticeProps {
  noticeId: number;
  writer: string;
  classTitle: string;
  title: string;
  content: string;
  regtime: string;
}

export interface SubjectProps {
  subjectCode: number;
  classTitle: string;
}

const NoticeBoard = () => {
  const [isTeacher, setIsTeacher] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<SubjectProps>({
    subjectCode: -1,
    classTitle: '전체 선택',
  });
  const [articles, setArticles] = useState<NoticeProps[]>([]);
  const [subjects, setSubjects] = useState<SubjectProps[]>([
    {
      subjectCode: -1,
      classTitle: '전체 선택',
    },
  ]);
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  let timer: null | ReturnType<typeof setTimeout> | number;
  let totalPage = 0;

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    // console.log(`감지결과 : ${isIntersecting}`);
    if (isIntersecting) {
      if (totalPage >= page) {
        setPage((prev) => prev + 1);
      }
      // setArticles((prev) => [...prev, ...dummy]);
      // setArticles((prev) => [...prev]);
    }
  };

  const testUserId = 5030001;

  const { setTarget } = useIntersectionObserver({ onIntersect });
  // 임시 더미 데이터 불러오기
  useEffect(() => {
    setSubjects(dummySubjects);
    InterceptedAxios.get('/students/' + testUserId.toString())
      .then((response) => {
        let list = response.data.content;
        setSubjects(list);
      })
      .catch(() => {
        console.log('학생 수업정보 에러');
      });

    if (testUserId < 5040000) {
      setIsTeacher(true);
    } else {
      setIsTeacher(false);
    }
  }, []);

  useEffect(() => {
    getNotice();
  }, [page]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  const deleteNotice = (key: number) => {
    let finalCheck = confirm('정말로 삭제하시겠습니까?');
    if (finalCheck) {
      InterceptedAxios.delete('/notice/' + key.toString())
        .then(() => {
          setArticles(articles.filter((article) => article.noticeId !== key));
        })
        .catch(() => {});
    }
  };

  const postNotice = () => {
    dispatch(setContent({ content: 'postNotice' }));
  };

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
      '/notice/list?classId=' +
      selected.subjectCode.toString() +
      '&userId=' +
      testUserId.toString() +
      '&pageNumber=' +
      page.toString() +
      word;

    console.log(searchQuery);

    InterceptedAxios.get(searchQuery)
      .then((response) => {
        let list = response.data.content;
        totalPage = response.data.totalPages;
        if (totalPage >= page) {
          setArticles((prev) => [...prev, ...list]);
        } else {
          alert('마지막 페이지입니다!');
        }
      })
      .catch(() => {});
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    let code = parseInt(e.target.value);
    let title = '';
    subjects.forEach((s) => {
      if (s.subjectCode === code) {
        title = s.classTitle;
      }
    });
    setSelected({
      subjectCode: code,
      classTitle: title,
    });
  };

  return (
    <div css={totalContainer}>
      <div className="upperModalArea">
        <div className="pageTitle">공지사항</div>
        <form onSubmit={search}>
          <select onChange={handleSelect}>
            {subjects.map((s) => (
              <option key={s.subjectCode} value={s.subjectCode}>
                {s.classTitle}
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
          {isTeacher ? (
            <>
              <button type="submit" className="sub-btn">
                검색
              </button>
              <button type="button" className="main-btn" onClick={postNotice}>
                글 쓰기
              </button>
            </>
          ) : (
            <button type="submit" className="main-btn">
              검색
            </button>
          )}
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
            return (
              <Notice
                key={article.noticeId}
                article={article}
                deleteNotice={() => deleteNotice(article.noticeId)}
              />
            );
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

  /* 구분선 */
  /* .titleRow .col {
    border-right: 0.5rem solid black;
    vertical-align: middle;
    padding: 1rem 0;
  } */

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

    .edit-btn {
      background-color: #a1b9ce;
    }

    .del-btn {
      background-color: #bbbbbb;
    }

    textarea {
      background-color: rgba(255, 255, 255, 0.7);
      border: none;
      resize: none;
    }
    #editTitle {
      border-radius: 20rem;
      padding: 0 0.5rem;
    }
    #editContent {
      height: 200px;
      border-radius: 0.5rem;
      padding: 0.5rem;
      margin: 0.5rem;
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

const dummySubjects = [
  {
    subjectCode: 1,
    classTitle: '국어',
  },
  {
    subjectCode: 2,
    classTitle: '수학',
  },
  {
    subjectCode: 3,
    classTitle: '사회',
  },
  {
    subjectCode: 4,
    classTitle: '과학',
  },
  {
    subjectCode: 5,
    classTitle: '영어',
  },
];

export default NoticeBoard;
