/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, setParam, selectContent } from '@src/store/content';

interface PostNoticeProps {
  noticeId?: number;
  classId: number;
  content: string;
  teacherId: number;
  title: string;
}

const EditNotice = () => {
  const [notice, setNotice] = useState<PostNoticeProps>();
  const [tmpTitle, setTmpTitle] = useState('');
  const [tmpContent, setTmpContent] = useState('');
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.content.param);
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  let timer: null | ReturnType<typeof setTimeout> | number;
  let newPost = false;
  let noticeId = 0;
  if (selector === undefined) {
    newPost = true;
  } else {
    newPost = false;
    noticeId = selector;
    // console.log('키: ' + selector);
  }

  useEffect(() => {}, [tmpTitle]);

  useEffect(() => {
    console.log('컨텐츠' + tmpContent);
  }, [tmpContent]);

  useEffect(() => {
    // 입력값이 없는 경우 제외
    if (tmpTitle === '' || tmpContent === '') {
      return;
    }

    if (noticeId) {
      changePost();
    } else {
      postNew();
    }
  }, [notice]);

  const debounce = (func: Function) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, 300);
  };

  const titleChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // onChange 이벤트
    debounce(() => {
      setTmpTitle(e.target.value);
    });
  };

  const contentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debounce(() => {
      setTmpContent(e.target.value);
    });
  };

  const changePost = () => {
    InterceptedAxios.patch('/notice/' + noticeId, notice).then((response) => {
      // console.log(response);
      // 공지게시판으로 이동
      // 초기화
      dispatch(setParam({ param: undefined }));
      dispatch(setContent({ content: 'notice' }));
    });
  };

  const postNew = () => {
    InterceptedAxios.post('/notice/', notice).then((response) => {
      dispatch(setContent({ content: 'notice' }));
    });
  };

  const submitPost = () => {
    // 임시로 대충
    let classId = -1;
    let teacherId = 5030001;

    setNotice({ title: tmpTitle, content: tmpContent, teacherId, classId });
    // dispatch(setContent({ content: 'notice' }));
    // setNotice({ ...notice, teacherId, classId });
    // setNotice({ ...notice, title: tmpTitle, content: tmpContent });
  };

  const canclePost = () => {
    // 공지목록페이지로 이동
    setTmpTitle('');
    setTmpContent('');
    dispatch(setContent({ content: 'notice' }));
  };

  return (
    <div>
      제목:{' '}
      <textarea
        className="editTitle"
        defaultValue={tmpTitle}
        // onChange={(e) => titleChanged(e)}
      ></textarea>
      내용:{' '}
      <textarea
        className="editContent"
        defaultValue={tmpContent}
        // onChange={(e) => contentChanged(e)}
      ></textarea>
      <div className="btn-box">
        <button className="edit-btn" onClick={() => submitPost()}>
          작성
        </button>
        <button className="del-btn" onClick={() => canclePost()}>
          취소
        </button>
      </div>
    </div>
  );
};

export default EditNotice;
