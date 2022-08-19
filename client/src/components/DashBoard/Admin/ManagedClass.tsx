/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { ClassBoardProps } from './ManagedClassBoard';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import { Checkbox } from '@mui/material';

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
    // onClick={toggleManagedClass}
    props.toggleClass();
  };

  const deleteManagedClass = () => {
    props.deleteManagedClass();
  };

  return (
    <div className={visible ? 'row articleRow highlited' : 'row articleRow'}>
      <button className="row article-btn" onClick={toggleManagedClass}>
        {/* <div className="col">{article.classId}</div> */}
        <div className="col">
          <Checkbox checked={visible} />
          {article.classId}
        </div>
        <div className="col">{article.timetableId} 교시</div>
        <div className="col">{dayName[article.classDay]}요일</div>
        <div className="col">{article.subjectEntity.name}</div>
        <div className="col classTitle">
          <span className=" classTitleIcon">{article.classTitle}</span>
        </div>
        <div className="col">{article.teacherName}</div>
        <div
          className="col"
          style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
        >
          <Link
            to={`/admin/classEdit/${article.classId}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <EditIcon
              style={{
                fontSize: '1.2em',
              }}
            />
          </Link>
          <DeleteIcon
            style={{ fontSize: '1.2em' }}
            // onClick={deleteManagedClass}
          />
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
