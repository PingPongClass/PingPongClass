/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { ClassBoardProps } from './ManagedClassBoard';
import EditIcon from '@mui/icons-material/Edit';
import { Link } from 'react-router-dom';

const ManagedClass = (props: {
  key: number;
  article: ClassBoardProps;
  deleteManagedClass: Function;
  toggleClass: Function;
}) => {
  const [visible, setVisible] = useState(false);
  const [article, setArticle] = useState<ClassBoardProps>(props.article);

  const toggleManagedClass = (e: React.MouseEvent<HTMLElement>) => {
    // onCLick 이벤트
    setVisible(!visible);
    props.toggleClass();
  };

  const deleteManagedClass = () => {
    props.deleteManagedClass();
  };

  return (
    <div className={visible ? 'row articleRow highlited' : 'row articleRow'}>
      <button className="row article-btn" onClick={toggleManagedClass}>
        <div className="col">{article.classId}</div>
        <div className="col">{article.timetableId} 교시</div>
        <div className="col">{dayName[article.classDay]}요일</div>
        <div className="col">{article.subjectEntity.name}</div>
        <div className="col classTitle">{article.classTitle}</div>
        <div className="col">{article.teacherName}</div>
        <div className="col">
          <Link to={`/admin/classEdit/${article.classId}`}>
            <EditIcon />
          </Link>
        </div>
      </button>
      {/* <button className="del-btn pink" onClick={deleteManagedClass}>
            <Link to="/admin/class">삭제</Link>
          </button> */}
    </div>
  );
};

export default ManagedClass;

const dayName = ['일', '월', '화', '수', '목', '금', '토'];
