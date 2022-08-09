/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { StudentProps } from './StudentBoard';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, setParam, selectContent } from '@src/store/content';
import { Link } from 'react-router-dom';

const Student = (props: {
  key: number;
  article: StudentProps;
  deleteStudent: Function;
}) => {
  const [visible, setVisible] = useState(false);
  const [article, setArticle] = useState<StudentProps>(props.article);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 변경 결과 전송(예정)
  }, [article]);

  return (
    <div className={visible ? 'row articleRow highlited' : 'row articleRow'}>
      {/* <button className="row article-btn" onClick={(e) => toggleNotice(e)}> */}
      <div>
        <input type="checkbox" name="" id={`check` + article.studentId} />
      </div>
      <div className="col StudentId">{article.name}</div>
      <div className="col classTitle">{article.studentId}</div>
      <div className="col StudentId">{article.grade}</div>
      <div className="col StudentId">{article.classNum}</div>
      <div className="col StudentId">{article.studentNum}</div>
      <div className="col StudentTitle">{article.email}</div>
      <div className="col StudentId">
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
