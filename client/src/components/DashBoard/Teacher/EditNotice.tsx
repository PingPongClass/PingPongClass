/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@src/store/hooks';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ClassProps, allClass, getClasses } from '@src/store/member';

interface PostNoticeProps {
  noticeId?: number;
  classId: number;
  content: string;
  teacherId: number;
  title: string;
}

const EditNotice = () => {
  const { noticeId } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [notice, setNotice] = useState<PostNoticeProps>();
  const [tmpCode, setTmpCode] = useState(-1);
  const [tmpTitle, setTmpTitle] = useState('');
  const [tmpContent, setTmpContent] = useState('');
  const [subjectCodes, setSubjectCodes] = useState<ClassProps[]>([allClass]);
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  let newPost = false;

  if (noticeId === undefined) {
    newPost = true;
  } else {
    newPost = false;
  }

  useEffect(() => {
    dispatch(getClasses(memberStore.userId));
    setSubjectCodes(memberStore.classes);
  }, []);

  useEffect(() => {
    // 입력값이 없는 경우 제외
    if (tmpTitle === '' || tmpContent === '' || tmpContent === '') {
      return;
    }

    if (noticeId) {
      changePost();
    } else {
      postNew();
    }
  }, [notice]);

  const titleChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // onChange 이벤트
    setTmpTitle(e.target.value);
  };

  const contentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTmpContent(e.target.value);
  };

  const codeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTmpCode(+e.target.value);
  };

  const changePost = () => {
    InterceptedAxios.patch('/notice/' + noticeId, notice)
      .then(() => {
        alert('수정 완료');
        navigate('/taecher/notice');
      })
      .catch(() => {
        alert('수정 실패! 정보를 다시 확인해 주세요.');
      });
  };

  const postNew = () => {
    InterceptedAxios.post('/notice/', notice)
      .then(() => {
        alert('추가 완료');
        navigate('/taecher/notice');
      })
      .catch(() => {
        alert('작성 실패! 정보를 다시 확인해 주세요.');
      });
  };

  const submitPost = () => {
    setNotice({
      title: tmpTitle,
      content: tmpContent,
      teacherId: memberStore.userId,
      classId: tmpCode,
    });
  };

  return (
    <div>
      과목:{' '}
      <select
        onChange={(e) => {
          codeChanged(e);
        }}
      >
        {subjectCodes.map((s) => (
          <option key={s.classId} value={s.classId}>
            {s.classTitle}
          </option>
        ))}
      </select>
      제목:{' '}
      <textarea
        className="editTitle"
        defaultValue={tmpTitle}
        onChange={(e) => {
          titleChanged(e);
        }}
      ></textarea>
      내용:{' '}
      <textarea
        className="editContent"
        defaultValue={tmpContent}
        onChange={(e) => {
          contentChanged(e);
        }}
      ></textarea>
      <div className="btn-box">
        {/* <Link to="/admin/notice"> */}
        <button
          className="edit-btn"
          onClick={() => {
            submitPost();
          }}
        >
          작성
        </button>
        {/* </Link> */}
        <Link to="/teacher/notice">
          <button className="del-btn">뒤로가기</button>
        </Link>
      </div>
    </div>
  );
};

export default EditNotice;
