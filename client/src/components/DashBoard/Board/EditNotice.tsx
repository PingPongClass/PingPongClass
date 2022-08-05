/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, selectContent } from '@src/store/content';

interface PostNoticeProps {
  classId: number;
  content: string;
  teacherId: number;
  title: string;
}

const PostNotice = () => {
  const [notice, setNotice] = useState<PostNoticeProps>();
  const [tmpTitle, setTmpTitle] = useState('');
  const [tmpContent, setTmpContent] = useState('');
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.content.content);
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  let timer: null | ReturnType<typeof setTimeout> | number;
  let newPost = false;
  if (selector === 'postNotice') {
    newPost = true;
  } else if (selector === 'editNotice') {
    newPost = false;
  }

  useEffect(() => {
    // 입력값이 없는 경우 제외
    if (tmpTitle === '' || tmpContent === '') {
      return;
    }
    // 변경 결과 전송(예정)
    InterceptedAxios.post('/notice', notice).then((response) => {
      // response Action
      console.log(response);
      // 공지게시판으로 이동
      dispatch(setContent({ content: 'postNotice' }));
    });
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

  const submitPost = () => {
    // 임시로 대충
    let classId = 1;
    let teacherId = 5030001;
    //   if (newPost) {

    // } else {
    //   classId = 0;
    // }
    setNotice({ title: tmpTitle, content: tmpContent, teacherId, classId });
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
        onChange={(e) => titleChanged(e)}
      ></textarea>
      내용:{' '}
      <textarea
        className="editContent"
        defaultValue={tmpContent}
        onChange={(e) => contentChanged(e)}
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

export default PostNotice;
