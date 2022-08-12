/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import Teacher from './Teacher';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { Link, useNavigate } from 'react-router-dom';
import { saveMember } from '@src/store/member';
import Pagination from '@mui/material/Pagination';

export interface TeacherProps {
  teacherId?: number;
  name?: string;
  email?: string;
  password?: string;
  birth?: string;
  manageGrade?: number;
  isAdmin?: number;
  profile?: string;
  activated?: string;
  authorities?: Authorities[];
  isSelected?: boolean;
}
interface Authorities {
  authorityName: string;
}

const TeacherBoard = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [classId, setClassId] = useState<number>();
  const [keyword, setKeyword] = useState('');
  const [teachers, setTeachers] = useState<TeacherProps[]>([]);
  const LAST_PAGE =
    teachers.length % 12 === 0
      ? Math.floor(teachers.length / 12)
      : Math.floor(teachers.length / 12 + 1); // 마지막 페이지
  const [page, setPage] = useState(1); // 처음 페이지는 1이다.
  const [data, setData] = useState<TeacherProps[]>([]);

  useEffect(() => {
    dispatch(saveMember());
    getTeacher();
  }, []);

  useEffect(() => {
    if (page === 1) {
      setData(teachers.slice(0, 12));
    }
    refreshCheck();
  }, [teachers]);

  useEffect(() => {
    refreshCheck();
  }, [page]);

  const handlePage = (event) => {
    const nowPageInt = parseInt(event.target.outerText);
    setPage(nowPageInt);
  };

  const deleteSelected = () => {
    alert('현재 봉인된 기능입니다.');
    // let finalCheck = confirm('정말로 선택된 학생들을 삭제하시겠습니까?');
    // const deleteList = teachers
    //   .filter((s1) => s1.isSelected === true)
    //   .map((s2) => {
    //     return s2.teacherId;
    //   });
    // if (finalCheck) {
    // InterceptedAxios.delete('/teachers/teacher/select', deleteList);
    // .then(() => {
    // })
    // .catch(() => {});
    // }
  };

  const refreshCheck = () => {
    if (page === LAST_PAGE) {
      setData(teachers.slice(12 * (page - 1)));
    } else {
      setData(teachers.slice(12 * (page - 1), 12 * (page - 1) + 12));
    }
  };

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTeachers([]);
    // 검색 로직
    getTeacher();
  };

  const getTeacher = () => {
    let searchQuery = '/teachers?';
    if (keyword === '') {
      searchQuery = searchQuery + '&name=전체';
    } else {
      searchQuery = searchQuery + '&name=' + keyword;
    }

    InterceptedAxios.get(searchQuery)
      .then((response) => {
        let list = response.data;
        let newList: TeacherProps[] = [];
        list.forEach((element) => {
          const newElem = { ...element, isSelected: false };
          newList.push(newElem);
        });
        setTeachers(newList);
      })
      .catch(() => {
        console.log('선생님 데이터 가져오기 실패');
      });
  };

  // const toggleAll = () => {
  //   let newList: TeacherProps[] = [];
  //   teachers.forEach((s) => {
  //     const newElem = { ...s, isSelected: !s.isSelected };
  //     newList.push(newElem);
  //   });
  //   setTeachers(newList);
  //   // console.log(newList);
  // };

  const toggle = (id: number) => {
    const newList = teachers.map((s) => {
      if (s.teacherId === id) {
        return { ...s, isSelected: !s.isSelected };
      } else {
        return s;
      }
    });
    setTeachers(newList);
  };

  return (
    <>
      <div css={totalContainer}>
        <div className="upperModalArea">
          <div className="pageTitle">선생님 관리</div>
          <form onSubmit={search}>
            {/* 카테고리
            <input
              type="number"
              value={classId || ''}
              onChange={(e) => setClassId(+e.target.value)}
            /> */}
            이름
            <input
              type="search"
              value={keyword || ''}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="sub-btn">
              검색
            </button>
          </form>
        </div>
        <div className="tableArea">
          {data.map((teacher) => {
            return (
              <Teacher
                key={teacher.teacherId || 0}
                article={teacher}
                selected={teacher.isSelected || false}
                toggle={toggle}
              />
            );
          })}
        </div>
        <div className="btn-box" css={btnBox}>
          <Pagination
            className="Pagination"
            count={LAST_PAGE}
            defaultPage={1}
            boundaryCount={2}
            sx={{ margin: 2 }}
            onChange={(e) => handlePage(e)}
            variant="outlined"
            shape="rounded"
          />
          <button type="button" className="add-btn stu-bottom-btn">
            <Link to="/admin/teacherAdd">추가</Link>
          </button>
          <button type="button" className="add-btn stu-bottom-btn">
            <Link to="/admin/teacherAddBulk">일괄 추가</Link>
          </button>
          <button
            type="button"
            className="del-btn stu-bottom-btn"
            onClick={deleteSelected}
          >
            선택 삭제
          </button>
        </div>
      </div>
    </>
  );
};

const totalContainer = () => css`
  /* 전역 */
  text-align: center;
  display: grid;
  /* height: inherit; */
  height: max-content;
  position: relative;
  overflow: hidden;

  .upperModalArea {
    background-color: white;
    z-index: 2;
    width: 100%;
    /* width: -webkit-fill-available; */
  }

  button:hover {
    cursor: pointer;
  }

  form {
    margin: 0.5rem;
    button {
      border: none;
      border-radius: 0.5rem;
    }
    .main-btn {
      background-color: pink;
    }
    .sub-btn {
      background-color: grey;
      color: white;
      padding: 0.5rem;
    }
  }

  /* 스크롤 바 숨기기 */
  .tableArea::-webkit-scrollbar {
    display: none;
  }
  .tableArea {
    /* width: 40rem; */
    margin: 0.5rem;
    margin-bottom: 0px;
    padding: 0.5rem;
    padding-bottom: 0px;
    display: grid;
    grid-template-rows: 3fr;
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  input {
    margin: 0 1em;
    border-radius: 0.5rem;
    padding: 0.5rem;
  }
`;

const btnBox = () => css`
  height: max-content;
  display: flex;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
  background-color: transparent;
  margin: 0px;
  /* position: absolute;
  bottom: 13%; */
  .Pagination {
    /* margin-right: 11.5rem; */
    justify-content: center;
  }
  .stu-bottom-btn {
    /* position: relative; */
    margin: 0px 1rem;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    color: white;
  }
  .add-btn {
    background-color: #7063b5;
  }
  .del-btn {
    background-color: #e56666;
  }
  a,
  a:visited {
    color: white;
    background-color: transparent;
    text-decoration: none;
  }
`;

export default TeacherBoard;
