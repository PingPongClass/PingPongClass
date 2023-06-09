/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from 'react';
import { TeacherProps } from './TeacherBoard';
import { css } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import ProfilImage from '@assets/images/profile.png';
import EditTeacher from './EditTeacher';

const Teacher = (props: {
  key: number;
  article: TeacherProps;
  selected: boolean;
  toggle: Function;
}) => {
  const [checked, setChecked] = useState(props.selected);
  const [article, setArticle] = useState<TeacherProps>(props.article);
  const [preview, setPreview] = useState<string>(
    'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' +
      props?.article.profile ||
      'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null',
  );
  const [isModal, setIsModal] = useState<boolean>(false);
  const [teacherId, setTeacherId] = useState(0 as number);

  const onClickOpenModal = useCallback(() => {
    if (props.article.teacherId) setTeacherId(props.article.teacherId);
    setIsModal(!isModal);
  }, [isModal]);

  const toggleCheck = () => {
    setChecked(!checked);
    props.toggle(article.teacherId);
  };

  return (
    <div className="teacher-box" css={TeacherStyle}>
      {isModal && (
        <EditTeacher
          onClickOpenModal={onClickOpenModal}
          teacherId={teacherId}
        />
      )}
      {/* <button className="row article-btn" onClick={(e) => toggleNotice(e)}> */}
      <div className="teacher-upper">
        <button className="teacher-edit" onClick={onClickOpenModal}>
          <EditIcon className="edit-btn" style={{ fontSize: '1.3em' }} />
        </button>
        <input
          type="checkbox"
          className="teacher-select"
          onChange={toggleCheck}
          checked={props.selected}
        />
      </div>
      <div className="teacher-preview">
        {preview ===
          'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ||
        preview ===
          'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' ? (
          <img
            src={ProfilImage}
            alt="기본프로필사진"
            className="profile-logo"
          />
        ) : (
          <img src={preview} alt={article.name} />
        )}
      </div>
      <div className="col col4">
        <span className="teacher-name">{article.name}</span>
      </div>
    </div>
  );
};

export const TeacherStyle = () => css`
  /* 전역 */
  text-align: center;
  font-family: 'NanumSquare';
  vertical-align: middle;
  /* width: fit-content; */
  /* height: inherit; */
  font-size: 15pt;
  font-weight: 400;

  position: relative;
  width: fit-content;
  min-width: -webkit-fill-available;
  max-width: 9vw;
  height: 300px;
  border: 0.01rem solid black;
  margin: 1rem;
  border-radius: 0.5rem;

  .teacher-preview {
    height: 70%;
  }
  .teacher-upper {
    position: relative;
    height: 5%;
  }
  .teacher-edit,
  .teacher-select {
    position: absolute;
    z-index: 2;
    top: 1rem;
    width: 1rem;
    height: 1rem;
  }
  .teacher-name {
    background-color: #e4edfa;
    padding: 6px 50px;
    color: var(--text-dark);
    border-radius: 10px;
  }
  .teacher-edit {
    top: 0.5rem;
    right: 0.5rem;
    width: max-content;
    height: max-content;
    color: black;
  }
  .teacher-edit::hover {
    cursor: pointer;
  }
  button {
    width: max-content;
    height: max-content;
  }

  .teacher-select {
    left: 0.01rem;
  }
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
  button {
    border: none;
    /* height: -webkit-fill-available; */
    background-color: transparent;
  }
`;

export default Teacher;
