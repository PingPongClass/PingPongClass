import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setContent, selectContent } from '@store/content';

interface ManageClassProps {
  classId: number;
  content: string;
  teacherId: number;
  title: string;
}

const ManageClass = () => {
  const [notice, setNotice] = useState<ManageClassProps>();
  const [tmpTitle, setTmpTitle] = useState('');
  const [tmpContent, setTmpContent] = useState('');
  const dispatch = useAppDispatch();

  let timer: null | ReturnType<typeof setTimeout> | number;

  useEffect(() => {
    // 변경 결과 전송(예정)
    if (tmpTitle === '' || tmpContent === '') {
      return;
    }
    axios('/teachers', {
      method: 'get',
      responseType: 'json',
    }).then(function (response) {
      // response Action
      console.log(response);
      // 공지게시판으로 이동
      dispatch(setContent({ content: 'noticePost' }));
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

  const postNotice = () => {
    // 임시로 대충
    let teacherId = 0;
    let classId = 0;
    setNotice({ title: tmpTitle, content: tmpContent, teacherId, classId });
    // setNotice({ ...notice, teacherId, classId });
    // setNotice({ ...notice, title: tmpTitle, content: tmpContent });
  };

  const canclePost = () => {
    // 공지목록페이지로 이동
    setTmpTitle('');
    setTmpContent('');
    dispatch(setContent({ content: 'class' }));
  };

  return (
    <div>
      제목:{' '}
      <textarea
        className="title"
        defaultValue={tmpTitle}
        onChange={(e) => titleChanged(e)}
      ></textarea>
      내용:{' '}
      <textarea
        className="content"
        defaultValue={tmpContent}
        onChange={(e) => contentChanged(e)}
      ></textarea>
      <div className="btn-box">
        <button className="edit-btn" onClick={() => postNotice()}>
          작성
        </button>
        <button className="del-btn" onClick={() => canclePost()}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ManageClass;
