/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import useIntersectionObserver from '@src/utils/useIntersectionObserver';
import ManagedClass from './ManagedClass';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, selectContent } from '@src/store/content';
export interface ManagedClassProps {
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
  const [articles, setArticles] = useState<ManagedClassProps[]>([]);
  const [subjects, setSubjects] = useState<SubjectProps[]>([]);
  const [isTeacher, setIsTeacher] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<SubjectProps>();
  const [page, setPage] = useState(1);
  const dispatch = useAppDispatch();

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    // console.log(`감지결과 : ${isIntersecting}`);
    if (isIntersecting) {
      setPage((prev) => prev + 1);
      setArticles((prev) => [...prev, ...dummy]);
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });
  // 임시 더미 데이터 불러오기
  useEffect(() => {
    setSubjects(dummySubjects);
    setIsTeacher(true);
  }, []);

  const deleteClass = (key: number) => {
    setArticles(articles.filter((article) => article.noticeId !== key));
  };

  const addClass = () => {
    // setContent('addClass');
    dispatch(setContent({ content: 'addClass' }));
  };

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    console.log(e.currentTarget.elements[0]);
    console.log(e.currentTarget.elements[1]);

    // 검색 로직
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
    console.log(selected);
  };

  return (
    <div css={totalContainer}>
      <div className="upperModalArea">
        <div className="pageTitle">수업관리</div>
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
              <button type="button" className="main-btn">
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
          <div className="col title">제목</div>
          <div className="col writer">작성자</div>
          <div className="col regtime">작성일</div>
        </div>

        <div className="articleArea">
          {articles.map((article) => {
            return (
              <ManagedClass
                key={article.noticeId}
                article={article}
                deleteClass={() => deleteClass(article.noticeId)}
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
    font-size: 2rem;
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
  .title {
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: calc(46%);
    width: calc(46%);
    max-width: calc(50%);
  }
`;

const dummySubjects = [
  {
    subjectCode: 0,
    classTitle: '수업선택',
  },
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

const dummy = [
  {
    noticeId: 1,
    writer: '이선생',
    classTitle: '국어',
    title:
      '2학년 3반 국어 중간고사 범위aaaaaaaaaaaaaa22222222222222222222222222222222222222222',
    content:
      '공부 열심히 해aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    regtime: '2022/07/15',
  },
  {
    noticeId: 2,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위12321312312312312312312312',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 3,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위zzzz',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 4,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위zzzzzzzzzzz',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 5,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위dddddddddddddddddddd',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 6,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 7,
    writer: '이선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 8,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 9,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 10,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 11,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 100,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 1000,
    writer: '이선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 10000,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 100000,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 1000000,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 10000000,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
  {
    noticeId: 100000000,
    writer: '김선생',
    classTitle: '국어',
    title: '2학년 3반 국어 중간고사 범위',
    content: '공부 열심히 해',
    regtime: '2022/07/15',
  },
];

export default NoticeBoard;
