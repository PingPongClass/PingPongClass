/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import useIntersectionObserver from '@src/utils/useIntersectionObserver';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { Link } from 'react-router-dom';
import Notice from './Notice';
import loadingImg from '@src/openvidu/assets/images/loadingimg.gif';
import { allClass, ClassProps, getClasses, saveMember } from '@store/member';
import axios from 'axios';
import { NoticeBoardStyle } from '../Board/NoticeBoard';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Rtt } from '@mui/icons-material';

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
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

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
  }, []);

  useEffect(() => {
    getNotice();
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

  // const render = () => {
  return (
    <div css={NoticeBoardStyle}>
      <div className="upperModalArea">
        <div className="pageTitle">공지사항 관리</div>
        <hr />
        <form onSubmit={search} className="search-div">
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-simple-select-label">수업명</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-select-small"
              label="수업명"
              defaultValue={''}
              onChange={handleSelect}
              MenuProps={MenuProps}
            >
              {classes.map((s) => (
                <MenuItem key={s.classId} value={s.classId}>
                  {s.classTitle}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            type="search"
            id="outlined-basic"
            variant="outlined"
            value={keyword || ''}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="button-sm gray">
            검색
          </button>
          <button type="button" className="button-sm blue">
            <Link to="/admin/noticePost">글 쓰기</Link>
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
  // };
  // return (
  //   <div css={NoticeBoardStyle}>
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

export default NoticeBoard;
