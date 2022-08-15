/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@src/store/hooks';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ClassProps, allClass, getClasses } from '@src/store/member';
import { css } from '@emotion/react';
import { MenuItem, TextField } from '@mui/material';
import { toast } from 'react-toastify';

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
    if (tmpTitle === '' || tmpContent === '' || tmpContent === '') {
      toast.warning('모두 입력해주세요.');
      return;
    } else {
      InterceptedAxios.patch('/notice/' + noticeId, notice)
        .then(() => {
          alert('공지사항이 수정되었습니다.');
          navigate('/teacher/notice');
        })
        .catch(() => {
          toast.error('수정 실패! 정보를 다시 확인해 주세요.');
        });
    }
  };

  const postNew = () => {
    if (tmpTitle === '' || tmpContent === '' || tmpContent === '') {
      toast.warning('모두 입력해주세요.');
      return;
    } else {
      InterceptedAxios.post('/notice/', notice)
        .then(() => {
          alert('공지사항이 작성되었습니다.');
          navigate('/teacher/notice');
        })
        .catch(() => {
          toast.error('작성 실패! 정보를 다시 확인해 주세요.');
        });
    }
  };

  const submitPost = () => {
    console.log(tmpContent);

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
      <div className="notice-content">
        <div className="firstContainer">
          <div style={{ width: '26%', display: 'flex', alignItems: 'center' }}>
            <div
              style={{ width: '100px', fontSize: '1.1em', fontWeight: '600' }}
            >
              수업명
            </div>
            <TextField
              id="outlined-select-currency"
              // label="수업 선택"
              select
              onChange={(e) => {
                codeChanged(e);
              }}
              value={tmpCode}
              size="small"
              variant="outlined"
              fullWidth
              style={{ backgroundColor: 'whitesmoke' }}
            >
              {classes.map((s) => (
                <MenuItem key={s.classId} value={s.classId}>
                  {s.classTitle}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div style={{ width: '50%', display: 'flex', alignItems: 'center' }}>
            <div
              style={{ width: '50px', fontSize: '1.1em', fontWeight: '600' }}
            >
              제목
            </div>
            <TextField
              id="outlined-basic"
              // label="제목"
              value={tmpTitle}
              onChange={(e) => {
                titleChanged(e);
              }}
              fullWidth
              size="small"
              variant="outlined"
              style={{ backgroundColor: 'whitesmoke' }}
            />
          </div>
        </div>
        <br />

        <div style={{ marginTop: '15px' }}>
          <TextField
            id="outlined-basic"
            label="내용"
            rows={11}
            multiline
            variant="outlined"
            fullWidth
            value={tmpContent}
            onChange={(e) => {
              contentChanged(e);
            }}
            style={{ backgroundColor: 'whitesmoke' }}
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
              className="button-sm pink"
              onClick={() => {
                submitPost();
              }}
            >
              수정
            </button>
          )}
          {/* </Link> */}
          <Link to="/teacher/notice">
            <button className="button-sm gray">취소</button>
          </Link>
        </div>
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
  .notice-content {
    padding: 27px 34px;
  }
  .firstContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 3%;
  }

  .btn-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
  }

  .gray {
    margin-left: 20px;
  }

  button {
    border-radius: 18px;
  }
`;

export default EditNotice;
