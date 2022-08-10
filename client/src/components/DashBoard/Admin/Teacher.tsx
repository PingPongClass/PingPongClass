/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { TeacherProps } from './TeacherBoard';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import ProfilImage from '@assets/images/profile.png';
import IconButton from '@mui/material/IconButton';

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

  const toggleCheck = () => {
    setChecked(!checked);
    props.toggle(article.teacherId);
  };

  return (
    <div className="teacher-box" css={TeacherStyle}>
      {/* <button className="row article-btn" onClick={(e) => toggleNotice(e)}> */}
      <div className="teacher-upper">
        <Link
          to={`/admin/teacherEdit/${article.teacherId}`}
          className="teacher-edit"
        >
          <EditIcon className="edit-btn" />
        </Link>
        <input
          type="checkbox"
          className="teacher-select"
          onChange={toggleCheck}
          checked={props.selected}
        />
      </div>
      <div className="teacher-preview">
        {preview ===
        'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ? (
          <img
            src={ProfilImage}
            alt="기본프로필사진"
            className="profile-logo"
          />
        ) : (
          <img src={preview} alt={article.name} />
        )}
      </div>
      <hr></hr>
      <div className="col col4">{article.name}</div>
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

  position: relative;
  width: 10rem;
  height: 10rem;
  border: 0.01rem solid black;
  margin: 0.1rem;
  border-radius: 0.5rem;
  .teacher-preview {
    position: relative;
  }
  .teacher-upper {
    position: relative;
    height: 1rem;
  }
  .teacher-edit,
  .teacher-select {
    position: absolute;
    z-index: 2;
    top: 1rem;
    width: 1rem;
    height: 1rem;
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
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
  }
  button {
    border: none;
    /* height: -webkit-fill-available; */
    background-color: transparent;
  }
`;

export default Teacher;
