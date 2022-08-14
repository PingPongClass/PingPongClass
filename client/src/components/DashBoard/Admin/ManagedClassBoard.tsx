/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import useIntersectionObserver from '@src/utils/useIntersectionObserver';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { Link } from 'react-router-dom';
import ManagedClass from './ManagedClass';
import loadingImg from '@src/openvidu/assets/images/loadingimg.gif';
import { allClass, ClassProps, getClasses, saveMember } from '@store/member';
import axios from 'axios';

export interface ClassBoardProps {
  classDay: number;
  classId: number;
  timetableId: number;
  classTitle: string;
  teacherName: string;
  subjectEntity: SubjectEntity;
  isSelected: boolean;
}
interface SubjectEntity {
  classSubjectCode: number;
  name: string;
}

const ClassBoard = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [isTeacher, setIsTeacher] = useState(false);
  const [selectedCnt, setSelectedCnt] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [articles, setArticles] = useState<ClassBoardProps[]>([]);
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const onIntersect: IntersectionObserverCallback = ([{ isIntersecting }]) => {
    // console.log(`감지결과 : ${isIntersecting}`);
    if (loading === true) return;
    if (isIntersecting) {
      if (totalPage > page) {
        setPage((prev) => prev + 1);
      }
    }
  };

  const { setTarget } = useIntersectionObserver({ onIntersect });

  // 로딩 2번 보는게 신경쓰여서 일단 막고 useLayoutEffect 사용함
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 2000);

  //   dispatch(saveMember()).then(() => timer);
  // }, []);

  useLayoutEffect(() => {
    dispatch(saveMember());
    getManagedClass();
    dispatch(getClasses(memberStore.userId));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (memberStore.userId.toString().length !== 10) {
      setIsTeacher(true);
    } else {
      setIsTeacher(false);
    }
  }, []);

  useEffect(() => {
    if (totalPage > page) {
      getManagedClass();
    }
  }, [page]);

  useEffect(() => {
    let cnt = 0;
    articles.forEach((elem) => {
      if (elem.isSelected) {
        cnt++;
      }
    });
    setSelectedCnt(cnt);
  }, [articles]);

  const deleteManagedClass = (key: number) => {
    if (memberStore.isAdmin) {
      let finalCheck = confirm('정말로 삭제하시겠습니까?');
      if (finalCheck) {
        InterceptedAxios.delete('/classes/' + key.toString())
          .then(() => {
            setArticles(articles.filter((article) => article.classId !== key));
          })
          .catch(() => {});
      }
    }
  };

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setArticles([]);
    setTotalPage(0);
    setPage(0);

    // 검색 로직
    getManagedClass();
  };

  const getManagedClass = async () => {
    let searchQuery =
      '/classes/' +
      memberStore.userId +
      '?pageNumber=' +
      (page + 1) +
      '&title=' +
      keyword;

    const response = await InterceptedAxios.get(searchQuery);
    setTotalPage(response.data.totalPages);
    const list = response.data.content;
    checkNewClass(list);
  };

  const checkNewClass = (value: ClassBoardProps[]) => {
    const newClass: ClassBoardProps[] = [];
    value.forEach((element) => {
      const id = element.classId;
      let ExistenceStatus = articles.findIndex((i) => i.classId === id);
      if (ExistenceStatus === -1) {
        newClass.push({ ...element, isSelected: false });
      }
    });
    if (keyword !== '' && keyword !== ' ' && keyword !== undefined) {
      setArticles(newClass);
    } else {
      setArticles([...articles, ...newClass]);
    }
  };

  const toggle = (id: number) => {
    const newList = articles.map((s) => {
      if (s.classId === id) {
        return { ...s, isSelected: !s.isSelected };
      } else {
        return s;
      }
    });
    setArticles(newList);
  };

  // const render = () => {
  return (
    <div css={totalContainer}>
      <div className="upperModalArea">
        <div className="pageTitle">수업관리(관리자)</div>
        <form onSubmit={search}>
          <div>
            {selectedCnt !== 0 ? (
              <>
                <span className="selected-cnt">({selectedCnt}) 개 선택</span>
              </>
            ) : null}
            <input
              type="search"
              value={keyword || ''}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="sub-btn">
              검색
            </button>
          </div>
          <div>
            <button type="button" className="main-btn">
              <Link to="/admin/classPost">수업 추가</Link>
            </button>
          </div>
        </form>
      </div>
      <div className="tableArea">
        <div className="row titleRow">
          <div className="col">수업번호</div>
          <div className="col">교시</div>
          <div className="col">요일</div>
          <div className="col">과목</div>
          <div className="col classTitle">수업 제목</div>
          <div className="col">선생님</div>
          <div className="col">수정</div>
        </div>

        <div className="articleArea">
          {articles.map((article) => {
            return (
              <ManagedClass
                key={article.classId}
                article={article}
                deleteManagedClass={() => deleteManagedClass(article.classId)}
                toggleClass={() => toggle(article.classId)}
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
  // };
  // return (
  //   <div css={ClassBoardStyle}>
  //     {loading ? (
  //       <div className="loadingImgBox">
  //         <h1>로딩중...</h1>
  //         <img src={loadingImg} alt="" />
  //       </div>
  //     ) : (
  //       render()
  //     )}
  //   </div>
  // );
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

  button:hover {
    cursor: pointer;
  }
  .upperModalArea {
    a,
    a:visited {
      color: white;
      background-color: transparent;
      text-decoration: none;
    }
  }
  .pageTitle {
    text-align: left;
    /* font-size: 2rem; */
    border-bottom: 0.15rem solid black;
    width: inherit;
  }

  form {
    margin: 0.5rem;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    button {
      margin: 1rem;
      padding: 0.5rem;
      border: none;
      border-radius: 0.5rem;
      color: white;
    }
    .main-btn {
      background-color: var(--blue);
      color: white;
      padding: 0.5rem;
    }
    .sub-btn {
      background-color: var(--gray);
      color: white;
      padding: 0.5rem;
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
    vertical-align: middle;
    font-size: 13pt;
    font-weight: 290;
  }

  .col {
    overflow: hidden;
    width: 10%;
    max-width: 30%;
    text-align: center;
  }
  /* 제목 행 */
  .titleRow {
    padding: 1rem 0 0.5rem 0;
    background-color: #c0d2e5;
    font-size: 15pt;
    font-weight: 400;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }

  /* 게시글 항목 영역 */
  .articleArea {
    /* padding: 1% 0; */
    width: -webkit-fill-available;
    max-width: 100%;

    /* 제목줄 1줄 */
    .articleRow {
      padding: 0.5rem 0;
      border-bottom: 1.5px solid gray;
      height: -webkit-fill-available;
    }

    /* 하이라이트 */
    .highlited {
      background-color: #dfe9f2;
      border-bottom: 1.5px solid gray;
    }
    a,
    a:visited {
      color: black;
      background-color: transparent;
      text-decoration: none;
    }
  }
  .classTitle {
    width: 30%;
    max-width: 30%;
    text-overflow: ellipsis;
  }
  .selected-cnt {
    padding-right: 0.5rem;
  }

  input {
    height: 35px;
    border-radius: 10px;
    border: 1px solid gray;
  }
`;

export default ClassBoard;
