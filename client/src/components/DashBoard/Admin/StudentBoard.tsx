/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState, useCallback } from 'react';
import Student from './Student';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { Link, useNavigate } from 'react-router-dom';
import { saveMember } from '@src/store/member';
import EditStudent from './EditStudent';
import AddStudentBulk from './AddStudentBulk';

export interface StudentProps {
  isSelected: boolean;
  name: string;
  studentId: number;
  grade: number;
  classNum: number;
  studentNum: number;
  email: string;
}

const StudentBoard = () => {
  const dispatch = useAppDispatch();
  const memberStore = useAppSelector((state) => state.member);
  const navigate = useNavigate();
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [classNum, setClassNum] = useState<number>();
  const [grade, setGrade] = useState<number>();
  const [keyword, setKeyword] = useState('');
  const [students, setStudents] = useState<StudentProps[]>([]);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [studentId, setStudentId] = useState(0 as number);
  const [isBulkModal, setIsBulkModal] = useState<boolean>(false);

  useEffect(() => {
    dispatch(saveMember());
    getStudent();
  }, []);

  const deleteSelected = () => {
    alert('현재 봉인된 기능입니다.');
    // let finalCheck = confirm('정말로 선택된 학생들을 삭제하시겠습니까?');
    // const deleteList = students
    //   .filter((s1) => s1.isSelected === true)
    //   .map((s2) => {
    //     return s2.studentId;
    //   });
    // if (finalCheck) {
    // InterceptedAxios.delete('/students/student/select', deleteList);
    // .then(() => {
    // })
    // .catch(() => {});
    // }
  };

  const deleteAll = () => {
    alert('현재 봉인된 기능입니다.');
    // let finalCheck = confirm('정말로 모든 학생들을 삭제하시겠습니까?');
    // if (finalCheck) {
    //   InterceptedAxios.delete('/students/student/all')
    //     .then(() => {
    //       navigate('/admin');
    //     })
    //     .catch(() => {});
    // }
  };

  const onClickOpenModal = useCallback(() => {
    setStudentId(0);
    setIsModal(!isModal);
  }, [isModal]);

  const onClickOpenBulkModal = useCallback(() => {
    setIsBulkModal(!isBulkModal);
  }, [isBulkModal]);

  const search = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStudents([]);
    // 검색 로직
    getStudent();
  };

  const getStudent = () => {
    let searchQuery = '/students';
    if (keyword !== '' || classNum !== undefined || grade !== undefined) {
      searchQuery += '?';
      if (keyword !== '') {
        searchQuery = searchQuery + '&name=' + keyword;
      }
      if (classNum !== undefined) {
        searchQuery = searchQuery + '&classNum=' + classNum;
      }
      if (grade !== undefined) {
        searchQuery = searchQuery + '&grade=' + grade;
      }
    }

    InterceptedAxios.get(searchQuery)
      .then((response) => {
        let list = response.data;
        let newList: StudentProps[] = [];
        list.forEach((element) => {
          const newElem = { ...element, isSelected: false };
          newList.push(newElem);
        });
        setStudents(newList);
      })
      .catch(() => {});
  };

  const toggleAll = () => {
    let newList: StudentProps[] = [];
    students.forEach((s) => {
      const newElem = { ...s, isSelected: !s.isSelected };
      newList.push(newElem);
    });
    setStudents(newList);
    // console.log(newList);
  };

  const toggle = (id: number) => {
    const newList = students.map((s) => {
      if (s.studentId === id) {
        return { ...s, isSelected: !s.isSelected };
      } else {
        return s;
      }
    });
    setStudents(newList);
  };

  return (
    <div css={totalContainer}>
      {isModal && (
        <EditStudent
          onClickOpenModal={onClickOpenModal}
          studentId={studentId}
        />
      )}
      {isBulkModal && (
        <AddStudentBulk onClickOpenBulkModal={onClickOpenBulkModal} />
      )}
      <div className="upperModalArea">
        <div className="pageTitle">학생관리</div>
        <form onSubmit={search}>
          <div style={{ width: '60%', textAlign: 'left' }}>
            학년
            <input
              type="number"
              value={grade || ''}
              style={{ width: '30px' }}
              onChange={(e) => setGrade(+e.target.value)}
            />
            반
            <input
              type="number"
              value={classNum || ''}
              style={{ width: '30px' }}
              onChange={(e) => setClassNum(+e.target.value)}
            />
            이름
            <input
              type="search"
              value={keyword || ''}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <button type="submit" className="sub-btn">
              검색
            </button>
          </div>
          <div className="btn-box" css={btnBox}>
            <button
              type="button"
              className="add-btn stu-bottom-btn"
              onClick={onClickOpenModal}
            >
              개별 추가
            </button>
            <button
              type="button"
              className="add-btn stu-bottom-btn"
              onClick={onClickOpenBulkModal}
            >
              일괄 추가
            </button>
            <button
              type="button"
              className="del-btn stu-bottom-btn"
              onClick={deleteSelected}
            >
              선택 삭제
            </button>
            <button
              type="button"
              className="del-btn stu-bottom-btn"
              onClick={deleteAll}
            >
              일괄 삭제
            </button>
          </div>
        </form>
      </div>
      <div className="tableArea">
        <div className="row titleRow">
          <div className="col col1">
            <input
              type="checkbox"
              name=""
              id={`checkAll`}
              onChange={toggleAll}
            />
          </div>
          <div className="col col4">이름</div>
          <div className="col col3">학번</div>
          <div className="col col1">학년</div>
          <div className="col col1">반</div>
          <div className="col col1">번호</div>
          <div className="col col2">이메일</div>
          <div className="col col1">수정</div>
        </div>

        <div className="articleArea">
          {students.map((student) => {
            return (
              <Student
                key={student.studentId}
                article={student}
                selected={student.isSelected}
                toggle={toggle}
              />
            );
          })}
          {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
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
  animation: 0.5s ease-in-out loadEffect1;

  button:hover {
    cursor: pointer;
  }

  .pageTitle {
    text-align: left;
    /* font-size: 2rem; */
    border-bottom: 0.15rem solid black;
    width: inherit;
  }

  form {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    margin: 10px;
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
    display: inline-block;
  }

  .col {
    overflow: hidden;
    width: 15%;
    max-width: 30%;
    text-align: center;
    display: inline-block;
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
      height: -webkit-fill-available;
    }

    /* 하이라이트 */
    .articleRow:hover,
    .highlited {
      background-color: #dfe9f2;
      border-bottom: 0.15rem solid black;
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
  .col1 {
    max-width: 3rem;
  }
  .col3,
  .writer,
  .regtime {
    min-width: 14%;
    max-width: 17%;
  }
  .col2 {
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: calc(46%);
    width: calc(46%);
    max-width: calc(50%);
  }
  .col4 {
    max-width: 5rem;
  }
  input {
    border-radius: 0.5rem;
    padding: 0.5rem;
    width: 20%;
    border: 1px solid gray;
    margin-left: 10px;
    margin-right: 15px;
  }
`;

const btnBox = () => css`
  width: 40%;
  text-align: right;
  .add-btn {
    background-color: var(--blue);
  }
  .del-btn {
    background-color: var(--gray);
  }
  .stu-bottom-btn {
    margin-left: 5px;
    padding: 0.5rem;
    border: none;
    border-radius: 0.5rem;
    color: white;
  }
  a,
  a:visited {
    color: white;
    background-color: transparent;
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

export default StudentBoard;
