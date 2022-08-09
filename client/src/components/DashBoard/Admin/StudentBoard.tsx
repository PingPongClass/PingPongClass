/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import Student from './Student';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { Link } from 'react-router-dom';

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
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const [classNum, setClassNum] = useState<number>();
  const [grade, setGrade] = useState<number>();
  const [keyword, setKeyword] = useState('');
  const [students, setStudents] = useState<StudentProps[]>([]);

  // const testUserId = 2022000003;
  // const testUserId = 5030001;

  // 임시 더미 데이터 불러오기
  useEffect(() => {
    // console.log(memberStore.userId);
  }, []);

  const deleteStudent = (key: number) => {
    let finalCheck = confirm('정말로 삭제하시겠습니까?');
    if (finalCheck) {
      InterceptedAxios.delete('/Student/' + key.toString())
        .then(() => {
          setStudents(students.filter((s) => s.studentNum !== key));
        })
        .catch(() => {});
    }
  };

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
        // checkNewStudent(list);
        setStudents(list);
      })
      .catch(() => {});
  };

  const toggleAll = () => {
    console.log(students);

    // students.forEach((s) => {
    //   return {
    //     ...s,
    //     isSelected: !s.isSelected,
    //   };
    // });
  };

  return (
    <div css={totalContainer}>
      <div className="upperModalArea">
        <div className="pageTitle">학생관리</div>
        <form onSubmit={search}>
          학년
          <input
            type="number"
            name=""
            id=""
            value={grade}
            onChange={(e) => setGrade(+e.target.value)}
          />
          반
          <input
            type="number"
            name=""
            id=""
            value={classNum}
            onChange={(e) => setClassNum(+e.target.value)}
          />
          이름
          <input
            type="search"
            name=""
            id=""
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button type="submit" className="sub-btn">
            검색
          </button>
        </form>
      </div>
      <div className="tableArea">
        <div className="row titleRow">
          <div className="col StudentId">
            <input
              type="checkbox"
              name=""
              id={`checkAll`}
              onChange={toggleAll}
            />
            이름
          </div>
          <div className="col classTitle">학번</div>
          <div className="col StudentId">학년</div>
          <div className="col StudentId">반</div>
          <div className="col StudentId">번호</div>
          <div className="col StudentTitle">이메일</div>
          <div className="col StudentId">수정</div>
        </div>

        <div className="articleArea">
          {students.map((student) => {
            return (
              <Student
                key={student.studentId}
                article={student}
                deleteStudent={deleteStudent}
              />
            );
          })}
          {/* <Pagination count={10} variant="outlined" shape="rounded" /> */}
          <Link to="/admin/studentAdd">
            <button type="button" className="main-btn">
              개별 추가
            </button>
          </Link>
          <Link to="/admin/studentAddBulk">
            <button type="button" className="main-btn">
              일괄 추가
            </button>
          </Link>
          <button type="button" className="main-btn">
            선택 삭제
          </button>
          <button type="button" className="main-btn">
            일괄 삭제
          </button>
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
  .StudentId {
    max-width: 3rem;
  }
  .classTitle,
  .writer,
  .regtime {
    min-width: 14%;
    max-width: 17%;
  }
  .StudentTitle {
    white-space: nowrap;
    text-overflow: ellipsis;
    min-width: calc(46%);
    width: calc(46%);
    max-width: calc(50%);
  }
`;

export default StudentBoard;
