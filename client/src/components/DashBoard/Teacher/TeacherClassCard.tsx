import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link, useNavigate } from 'react-router-dom'; // 임시함수 - 주말 지나면 지우기
import getCode from '@utils/getCode'; // 임시함수 - 주말 지나면 지우기
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

interface ClassProps {
  classDay: number;
  classDesc: string;
  classId: number;
  classTitle: string;
  subjectEntity: {
    classSubjectCode: number;
    name: string;
  };
  teacherName: string;
  timetableId: number;
  classUrl: string;
}

const TeacherClassCard = ({ clsList }: any) => {
  const navigate = useNavigate(); // 임시함수 - 주말 지나면 지우기
  const AXIOS = setupInterceptorsTo(axios.create());
  const [img, setImg] = useState('');
  const [isMouseOn, setIsMouseOn] = useState(false);

  const openClass = async (cls: ClassProps) => {
    console.log(cls);
    const newCode = await getCode();
    const newData = {
      classId: cls.classId,
      classUrl: newCode,
    };

    try {
      await AXIOS.patch(`/classes/open`, newData);
      navigate(`/lecture/${newCode}`, {
        state: {
          classId: cls.classId,
          classTitle: cls.classTitle,
          teacherName: cls.teacherName,
        },
      });
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (clsList)
      setImg('/subject/' + clsList.subjectEntity.classSubjectCode + '.jpeg');
  }, [clsList]);

  if (clsList) {
    return (
      <div
        css={TotalContainer(isMouseOn)}
        onMouseEnter={() => setIsMouseOn(true)}
        onMouseLeave={() => setIsMouseOn(false)}
      >
        <div className="classcardContainer">
          <img src={img} className="classImg" alt="수업" />
          <h2>{clsList.classTitle}</h2>
          <p>{clsList.classDesc}</p>
          <p>
            [{clsList.timetableId}교시] {clsList.teacherName} 선생님
          </p>
        </div>
        {isMouseOn ? (
          <div
            onMouseEnter={() => setIsMouseOn(true)}
            className="iconsContainer"
          >
            <PlayCircleFilledWhiteIcon
              className="open-icon-btn"
              onClick={() => openClass(clsList)}
            />
            <Link to={`/teacher/edit/${clsList.classId}`}>
              <SettingsIcon className="edit-icon-btn" />
            </Link>
          </div>
        ) : null}
      </div>
    );
  } else {
    return <div css={EmptyContainer}> </div>;
  }
};

const TotalContainer = (isMouseOn) => css`
  width: 240px;
  height: 215px;

  .classcardContainer {
    display: flex;
    flex-direction: column;
    align-items: start;
    justify-content: end;
    border-radius: 20px;
    padding: 10px;
    box-sizing: border-box;
    transition: all 0.1s ease-in-out;
    border: 1px solid lightgray;
    box-shadow: 2px 2px 8px -5px;
    background: #fffbf2;
    color: black;
    filter: ${isMouseOn ? 'brightness(50%); ' : ''};
  }

  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }

  h2 {
    padding-top: 2px;
    padding-bottom: 4px;
    font-size: 14pt;
  }

  p {
    padding-bottom: 2px;
    font-size: 9.4pt;
  }

  .classImg {
    width: 100%;
    height: 60%;
    background: white;
    border-radius: 10px;
    align-items: center;
    margin-bottom: 10px;
  }

  .iconsContainer {
    display: flex;
    position: absolute;
    width: 233px;
    height: 215px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    box-sizing: border-box;
    top: 1px;
    left: 1px;
    color: white;
  }

  .open-icon-btn {
    width: 70px;
    height: 70px;
    color: #c7e2ff;
    cursor: pointer;
  }

  .edit-icon-btn {
    width: 30px;
    height: 30px;
    color: white;
    cursor: pointer;
    position: absolute;
    top: 11rem;
    left: 11.5rem;
  }
`;

const EmptyContainer = () => css`
  width: 240px;
  height: 215px;
  background: #ffffff;
  border-radius: 20px;
  padding: 10px;
  border: dashed 1.5px gray;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default TeacherClassCard;
