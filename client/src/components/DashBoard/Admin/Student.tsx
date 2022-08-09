/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { StudentProps } from './StudentBoard';
import { Link } from 'react-router-dom';

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
    <div className="row articleRow">
      {/* <button className="row article-btn" onClick={(e) => toggleNotice(e)}> */}
      <div>
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
        <Link to={`/teacher/studentEdit/${article.studentId}`}>
          <button type="button" className="edit-btn">
            수정
          </button>
        </Link>
      </div>
    </div>
  );
};
export default Student;
