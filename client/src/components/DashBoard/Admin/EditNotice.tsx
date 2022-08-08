/** @jsxImportSource @emotion/react */
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, setParam, selectContent } from '@src/store/content';
import { Router, Routes, Link, useParams } from 'react-router-dom';
import { saveMember } from '@src/store/member';

interface PostNoticeProps {
  noticeId?: number;
  classId: number;
  content: string;
  teacherId: number;
  title: string;
}

const EditNotice = () => {
  const { noticeId } = useParams();

  const [notice, setNotice] = useState<PostNoticeProps>();
  const [tmpCode, setTmpCode] = useState(-1);
  const [tmpTitle, setTmpTitle] = useState('');
  const [tmpContent, setTmpContent] = useState('');
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  let newPost = false;

  if (noticeId === undefined) {
    newPost = true;
  } else {
    newPost = false;
  }

  useEffect(() => {
    // console.log(noticeId);
  }, []);

  useEffect(() => {
    if (tmpTitle === '' || tmpContent === '') {
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

  const codeChanged = (e) => {
    console.log(e);
    setTmpContent(e.target.value);
  };

  const changePost = () => {
    InterceptedAxios.patch('/notice/' + noticeId, notice).then(() => {
      console.log('성공');
    });
  };

  const postNew = () => {
    InterceptedAxios.post('/notice/', notice);
  };

  const submitPost = () => {
    setNotice({
      title: tmpTitle,
      content: tmpContent,
      teacherId: memberStore.userId,
      classId: memberStore.classNum,
    });
  };

  return (
    <div>
      <select onChange={(e) => codeChanged(e)}>
        <option value="1">1</option>
        <option value="2">2</option>
      </select>
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
          <Link to="notice">작성</Link>
        </button>
        <button className="del-btn">
          <Link to="notice">취소</Link>
        </button>
      </div>
    </div>
  );
};

export default EditNotice;
