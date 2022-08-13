/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@src/store/hooks';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ClassProps, allClass, getClasses } from '@src/store/member';
import { css } from '@emotion/react';
import { MenuItem, TextField } from '@mui/material';

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
  const [classes, setClasses] = useState<ClassProps[]>([allClass]);
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  let newPost = false;

  if (noticeId === undefined) {
    newPost = true;
  } else {
    newPost = false;
  }

  useLayoutEffect(() => {
    dispatch(getClasses(memberStore.userId));
  }, []);

  useLayoutEffect(() => {
    setClasses(memberStore.classes);
  }, [memberStore]);

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

  useLayoutEffect(() => {
    getNoticeInfo();
  }, []);

  const getNoticeInfo = async () => {
    if (!newPost) {
      const result = await InterceptedAxios.get('/notice/' + noticeId);
      const noticeinfo = result.data;
      setTmpCode(noticeinfo.classEntity.classId);
      setTmpTitle(noticeinfo.title);
      setTmpContent(noticeinfo.content);
    }
    // navigate('/teacher/classes');
  };

  const titleChanged = (e) => {
    // onChange 이벤트
    setTmpTitle(e.target.value);
  };

  const contentChanged = (e) => {
    setTmpContent(e.target.value);
  };

  const codeChanged = (e) => {
    setTmpCode(+e.target.value);
  };

  const changePost = () => {
    InterceptedAxios.patch('/notice/' + noticeId, notice)
      .then(() => {
        alert('수정 완료');
        navigate('/admin/notice');
      })
      .catch(() => {
        alert('수정 실패! 정보를 다시 확인해 주세요.');
      });
  };

  const postNew = () => {
    InterceptedAxios.post('/notice/', notice)
      .then(() => {
        alert('추가 완료');
        navigate('/admin/notice');
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
    <div css={totalContainer}>
      {newPost ? (
        <div className="pageTitle">공지사항 작성</div>
      ) : (
        <div className="pageTitle">공지사항 수정</div>
      )}
      <hr />
      <br />
      <div className="firstContainer">
        <div>
          <TextField
            id="filled-select-currency"
            label="수업 선택"
            select
            onChange={(e) => {
              codeChanged(e);
            }}
            value={tmpCode}
            size="small"
            helperText="수업명을 선택해주세요."
            variant="outlined"
            fullWidth
          >
            {classes.map((s) => (
              <MenuItem key={s.classId} value={s.classId}>
                {s.classTitle}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div>
          <TextField
            id="filled-basic"
            label="제목"
            defaultValue={tmpTitle}
            onChange={(e) => {
              titleChanged(e);
            }}
            fullWidth
            size="small"
            helperText="제목을 입력해주세요."
            variant="outlined"
            style={{ width: '750px' }}
          />
        </div>
      </div>
      <div>
        <TextField
          id="filled-basic"
          label="내용"
          helperText="내용을 입력해주세요."
          rows={19}
          multiline
          variant="outlined"
          fullWidth
          defaultValue={tmpContent}
          onChange={(e) => {
            contentChanged(e);
          }}
        />
      </div>
      <div className="btn-box">
        {/* <Link to="/admin/notice"> */}
        {newPost ? (
          <button
            className="button-sm blue"
            onClick={() => {
              submitPost();
            }}
          >
            작성
          </button>
        ) : (
          <button
            className="button-sm blue"
            onClick={() => {
              submitPost();
            }}
          >
            수정
          </button>
        )}
        {/* </Link> */}
        <Link to="/admin/notice">
          <button className="button-sm gray">취소</button>
        </Link>
      </div>
    </div>
  );
};

const totalContainer = css`
  width: 100%;
  height: 100%;

  hr {
    width: 100%;
  }

  .firstContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .btn-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .gray {
    margin-left: 20px;
  }

  button {
    border-radius: 18px;
  }
`;

export default EditNotice;
