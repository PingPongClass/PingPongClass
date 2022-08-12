/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import useIntersectionObserver from '@src/utils/useIntersectionObserver';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { Link } from 'react-router-dom';
import loadingImg from '@src/openvidu/assets/images/loadingimg.gif';
import Notice from './Notice';
import { allClass, ClassProps, getClasses, saveMember } from '@store/member';
import axios from 'axios';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';

export interface NoticeProps {
  noticeId: number;
  writer: string;
  classTitle: string;
  title: string;
  content: string;
  regtime: string;
}

const NoticeBoard = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [isTeacher, setIsTeacher] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [selected, setSelected] = useState<ClassProps>(allClass);
  const [articles, setArticles] = useState<NoticeProps[]>([]);
  const [classes, setClasses] = useState<ClassProps[]>([allClass]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

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
    getNotice();
    dispatch(getClasses(memberStore.userId));
    setLoading(false);
  }, []);

  useEffect(() => {
    setClasses(memberStore.classes);
    if (memberStore.userId.toString().length !== 10) {
      setIsTeacher(true);
    } else {
      setIsTeacher(false);
    }
    getNotice();
  }, []);

  useEffect(() => {
    if (totalPage > page) {
      getNotice();
    }
  }, [page]);

  const deleteNotice = (key: number) => {
    if (memberStore.isAdmin) {
      let finalCheck = confirm('정말로 삭제하시겠습니까?');
      if (finalCheck) {
        InterceptedAxios.delete('/notice/' + key.toString())
          .then(() => {
            setArticles(articles.filter((article) => article.noticeId !== key));
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
    getNotice();
  };

  const getNotice = async () => {
    let word = '';
    if (keyword !== '') {
      word = '&titleSearch=' + keyword;
    }

    let searchQuery =
      '/notice/list?paged=true&sort.sorted=true&sort.unsorted=false&classId=' +
      selected.classId +
      '&userId=' +
      memberStore.userId +
      '&page=' +
      (page - 1) +
      word;

    const response = await InterceptedAxios.get(searchQuery);
    setTotalPage(response.data.totalPages);
    let list = response.data.content;
    if (keyword !== '' || selected.classId !== -1) {
      setArticles(list);
    } else {
      checkNewNotice(list);
    }
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

  const handleSelect = (e) => {
    let classId = parseInt(e.target.value);
    let current = allClass;
    classes.forEach((s) => {
      if (s.classId === classId) {
        current = s;
      }
    });
    setSelected(current);
  };

  return (
    <div css={NoticeBoardStyle}>
      <div className="upperModalArea">
        <div className="pageTitle">공지사항</div>
        <hr />
        <form onSubmit={search} className="search-div">
          {/* <select onChange={handleSelect}>
            {classes.map((s) => (
              <option key={s.classId} value={s.classId}>
                {s.classTitle}
              </option>
            ))}
          </select> */}

          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">수업명</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-select-small"
              label="수업명"
              onChange={handleSelect}
              MenuProps={MenuProps}
            >
              <MenuItem disabled value="">
                <em>선택</em>
              </MenuItem>
              {classes.map((s) => (
                <MenuItem key={s.classId} value={s.classId}>
                  {s.classTitle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-basic"
            variant="outlined"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="button-sm pink">
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

export const NoticeBoardStyle = () => css`
  /* 전역 */
  text-align: center;
  width: -webkit-fill-available;
  height: inherit;
  position: relative;
  /* overflow: hidden; */
  max-height: inherit;
  max-width: inherit;
  animation: 0.5s ease-in-out loadEffect1;

  .pageTitle {
    width: 100%;
  }

  button:hover {
    cursor: pointer;
  }

  .search-div {
    gap: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  form {
    margin: 0.5rem;
    button {
      border: none;
    }
    button:visited {
      text-decoration: none;
    }
    .main-btn {
      background-color: pink;
      text-decoration: none;
      color: white;
    }
    .sub-btn {
      background-color: grey;
      color: white;
    }
    input,
    select,
    button {
      margin: 0 1rem;
      padding: 0.5rem;
      border-radius: 0.5rem;
    }
  }

  /* table 영역 */
  .tableArea {
    border-spacing: 0;
    width: -webkit-fill-available;
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
  }

  .col {
    overflow: hidden;
    width: 15%;
    line-height: 30px;
  }
  /* 제목 행 */
  .titleRow {
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    padding: 0.5rem 0;
    background-color: #c0d2e5;
    height: 30px;
    vertical-align: middle;
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
      cursor: pointer;
    }

    /* 아코디언 내용 */
    .detailRow {
      display: block;
      padding: 0.5rem 0;

      margin: 0.5rem 0 -0.5rem 0;
      background-color: #f9f9f9;
      height: -webkit-max-content;
      button {
        border-radius: 3rem;
        color: white;
        border: none;
        width: max-content;
        padding: 0.5rem;
        margin: 0 0.5rem;
        width: 5rem;
      }
      button.sub-btn {
        background-color: grey;
        color: black;
      }
      button.sub-btn:hover {
        background-color: grey;
        color: red;
      }

      button:visited {
        text-decoration: none;
      }
      Link:visited {
        text-decoration: none;
      }
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
  select {
    max-width: 8%;
  }
  a {
    color: white;
    background-color: transparent;
    text-decoration: none;
  }
  a:visited {
    text-decoration: none;
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

export default NoticeBoard;
