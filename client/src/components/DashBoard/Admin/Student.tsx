/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { StudentProps } from './StudentBoard';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import EditIcon from '@mui/icons-material/Edit';

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

  return (
    <div className="row articleRow" css={StudentStyle}>
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
        <Link to={`/admin/studentEdit/${article.studentId}`}>
          <button type="button" className="edit-btn">
            <EditIcon></EditIcon>
          </button>
        </Link>
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
