import { css } from '@emotion/react';
import { useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useAppSelector } from '@src/store/hooks';
import StudentListTransfer from '@components/DashBoard/Teacher/StudentListTransfer';
import { Link, useNavigate } from 'react-router-dom';

const weeks = [
  {
    value: 1,
    label: '월요일',
  },
  {
    value: 2,
    label: '화요일',
  },
  {
    value: 3,
    label: '수요일',
  },
  {
    value: 4,
    label: '목요일',
  },
  {
    value: 5,
    label: '금요일',
  },
];
const timetable = [
  {
    value: 1,
    label: '1교시',
  },
  {
    value: 2,
    label: '2교시',
  },
  {
    value: 3,
    label: '3교시',
  },
  {
    value: 4,
    label: '4교시',
  },
  {
    value: 5,
    label: '5교시',
  },
  {
    value: 6,
    label: '6교시',
  },
  {
    value: 7,
    label: '7교시',
  },
];

const subjects = [
  {
    value: 1,
    label: '국어',
  },
  {
    value: 2,
    label: '영어',
  },
  {
    value: 3,
    label: '수학',
  },
  {
    value: 4,
    label: '사회',
  },
  {
    value: 5,
    label: '국사',
  },
  {
    value: 6,
    label: '도덕',
  },
  {
    value: 7,
    label: '체육',
  },
  {
    value: 8,
    label: '음악',
  },
  {
    value: 9,
    label: '미술',
  },
  {
    value: 10,
    label: '과학',
  },
  {
    value: 11,
    label: '기술',
  },
  {
    value: 12,
    label: '가정',
  },
  {
    value: 13,
    label: '한문',
  },
  {
    value: 14,
    label: '정보',
  },
  {
    value: 15,
    label: '일본어',
  },
  {
    value: 16,
    label: '중국어',
  },
];

const NewClassList = () => {
  const [classTitle, setClassTitle] = useState('');
  const [classDay, setClassDay] = useState(1);
  const [subjectCode, setSubjectCode] = useState(1);
  const [studentList, setStudentList] = useState([] as any);
  const [timetableId, setTimetableId] = useState(1);
  const [classDes, setClassDes] = useState('');

  const memberStore = useAppSelector((state) => state.member);

  const AXIOS = setupInterceptorsTo(axios.create());

  const ChangeDay = (data) => {
    setClassDay(data);
  };
  const ChangeTitle = (data) => {
    setClassTitle(data);
  };
  const ChangeCode = (data) => {
    setSubjectCode(data);
  };
  const ChangeStudentList = (data) => {
    setStudentList(data);
  };
  const ChangeTimetableId = (data) => {
    setTimetableId(data);
  };
  const ChangeClassDes = (data: any) => {
    setClassDes(data);
  };

  const navigate = useNavigate();

  const createClass = async () => {
    if (!classTitle) alert('수업 제목을 입력하세요!');
    else if (!classDes) alert('수업 설명을 입력하세요!');
    else {
      const data = {
        teacherId: memberStore.userId,
        subjectCode: subjectCode,
        classTitle: classTitle,
        classDay: classDay,
        classUrl: '',
        timetableId: timetableId,
        classDesc: classDes,
        studentIdList: studentList,
      };
      const result = await AXIOS.post('/classes', data);
      console.log(result);
      navigate('/teacher/classes');
    }
  };

  return (
    <div css={totalContainer}>
      <h1>수업 생성</h1>
      <br />
      <div className="inputContainer">
        <TextField
          onChange={(e) => ChangeTitle(e.target.value)}
          id="outlined-basic"
          label="수업명"
          fullWidth
          size="small"
          inputProps={{ maxLength: 12 }}
          required
        />
        <div className="timeContainer">
          <TextField
            id="outlined-select-currency"
            select
            label="과목 선택"
            value={subjectCode}
            onChange={(e) => ChangeCode(e.target.value)}
            helperText="과목을 선택해주세요"
            size="small"
            fullWidth
            style={{ paddingRight: '20px' }}
          >
            {subjects.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="요일 선택"
            value={classDay}
            onChange={(e) => ChangeDay(e.target.value)}
            helperText="요일을 선택해주세요"
            size="small"
            fullWidth
            style={{ paddingRight: '20px' }}
          >
            {weeks.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-currency"
            select
            label="교시 선택"
            value={timetableId}
            onChange={(e) => ChangeTimetableId(e.target.value)}
            helperText="교시를 선택해주세요"
            size="small"
            fullWidth
          >
            {timetable.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <TextField
          onChange={(e) => ChangeClassDes(e.target.value)}
          id="outlined-basic"
          label="수업 설명"
          fullWidth
          size="small"
          inputProps={{ maxLength: 19 }}
          required
        />
        <StudentListTransfer ChangeStudentList={ChangeStudentList} />
        <div className="buttonContainer">
          <button className="listButton pink" onClick={createClass}>
            생성
          </button>
          <Link to="/teacher/classes">
            <button className="listButton gray">취소</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

const totalContainer = css`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  border-radius: 20px;
  box-sizing: border-box;

  .inputContainer {
    width: 80%;
    display: flex;
    margin-bottom: 50px;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  .studentSearch {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
  }

  .listButton {
    vertical-align: middle;
    min-width: 112px;
    border-radius: 10px;
    padding: 10px 16px;
    border: none;
    font-weight: 600;
    cursor: pointer;
    color: #ffffff;
    font-size: 1.2em;
  }
  .listButton:hover {
    transform: scale(1.1);
  }

  .timeContainer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .buttonContainer {
    display: flex;
    flex-direction: row;
  }

  .gray {
    background: var(--gray);
    margin-left: 20px;
  }
`;

export default NewClassList;
