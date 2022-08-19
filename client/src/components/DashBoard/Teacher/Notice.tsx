/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { NoticeProps } from './NoticeBoard';
import { Link } from 'react-router-dom';

const Notice = (props: {
  key: number;
  article: NoticeProps;
  deleteNotice: Function;
}) => {
  const [visible, setVisible] = useState(false);
  const [article, setArticle] = useState<NoticeProps>(props.article);

  const toggleNotice = (e: React.MouseEvent<HTMLElement>) => {
    // onCLick 이벤트
    setVisible(!visible);
  };

  const deleteNotice = () => {
    props.deleteNotice();
  };

  return (
    <div className={visible ? 'row articleRow highlited' : 'row articleRow'}>
      <button className="row article-btn" onClick={toggleNotice}>
        <div className="col noticeId">{article.noticeId}</div>
        <div className="col classTitle">
          <div className="col classTitleIcon">{article.classTitle}</div>
        </div>
        <div className="col noticeTitle">{article.title}</div>
        <div className="col writer">{article.writer}</div>
        <div className="col regtime">
          {article.regtime.slice(0, article.regtime.indexOf('T'))}
        </div>
      </button>
      <div className={visible ? 'row detailRow' : 'row detailRow hide'}>
        <div className="detailContent">{article.content}</div>
        <div className="detailFooter">
          <button className="edit-btn blue">
            <Link to={`/teacher/noticeEdit/${article.noticeId}`}>수정</Link>
          </button>
          <button className="del-btn gray" onClick={deleteNotice}>
            <Link to="/teacher/notice">삭제</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notice;
