/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useCallback } from 'react';
import { StudentProps } from './StudentBoard';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';
import EditStudent from './EditStudent';

const Student = (props: {
  key: number;
  article: StudentProps;
  selected: boolean;
  toggle: Function;
}) => {
  const [checked, setChecked] = useState(props.selected);
  const [article, setArticle] = useState<StudentProps>(props.article);

  const toggleCheck = () => {
    setChecked(!checked);
    props.toggle(article.studentId);
  };

  const [isModal, setIsModal] = useState<boolean>(false);
  const [studentId, setStudentId] = useState(0 as number);

  const onClickOpenModal = useCallback(() => {
    if (props.article.studentId) setStudentId(props.article.studentId);
    setIsModal(!isModal);
  }, [isModal]);

  return (
    <div className="row articleRow" css={StudentStyle}>
      {isModal && (
        <EditStudent
          onClickOpenModal={onClickOpenModal}
          studentId={studentId}
        />
      )}
      {/* <button className="row article-btn" onClick={(e) => toggleNotice(e)}> */}
      <div className="col col1">
        <input
          type="checkbox"
          name=""
          onChange={toggleCheck}
          checked={props.selected}
        />
      </div>
      <div className="col col4">{article.name}</div>
      <div className="col col3">{article.studentId}</div>
      <div className="col col1">{article.grade}</div>
      <div className="col col1">{article.classNum}</div>
      <div className="col col1">{article.studentNum}</div>
      <div className="col col2">{article.email}</div>
      <div className="col col1">
        <button type="button" className="edit-btn" onClick={onClickOpenModal}>
          <EditIcon />
        </button>
      </div>
    </div>
  );
};

export const StudentStyle = () => css`
  /* 전역 */
  text-align: center;
  width: -webkit-fill-available;
  height: inherit;

  button {
    border: none;
    height: -webkit-fill-available;
    background-color: transparent;
  }
`;

export default Student;
