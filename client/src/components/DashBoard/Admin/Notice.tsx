/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { NoticeProps } from './NoticeBoard';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, setParam, selectContent } from '@src/store/content';
import { Link } from 'react-router-dom';

const Notice = (props: {
  key: number;
  article: NoticeProps;
  deleteNotice: Function;
}) => {
  const [visible, setVisible] = useState(false);
  const [article, setArticle] = useState<NoticeProps>(props.article);
  const editLink = 'edit/' + article.noticeId;
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 변경 결과 전송(예정)
  }, [article]);

  const toggleNotice = (e: React.MouseEvent<HTMLElement>) => {
    // onCLick 이벤트
    setVisible(!visible);
  };

  const deleteNotice = () => {
    // 삭제요청 송신(예정)
    props.deleteNotice();
  };

  return (
    <div className={visible ? 'row articleRow highlited' : 'row articleRow'}>
      <button className="row article-btn" onClick={(e) => toggleNotice(e)}>
        <div className="col noticeId">{article.noticeId}</div>
        <div className="col classTitle">
          <div className="col classTitleIcon">{article.classTitle}</div>
        </div>
        <div className="col noticeTitle">{article.title}</div>
        <div className="col writer">{article.writer}</div>
        <div className="col regtime">{article.regtime}</div>
      </button>
      <div className={visible ? 'row detailRow' : 'row detailRow hide'}>
        <div className="detailContent">{article.content}</div>
        <div className="detailWriter">- {article.writer}</div>
        <div className="detailFooter">
          <button className="edit-btn">
            <Link to={`/admin/noticeEdit/${article.noticeId}`}>수정</Link>
          </button>
          <button className="del-btn" onClick={() => deleteNotice()}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notice;
