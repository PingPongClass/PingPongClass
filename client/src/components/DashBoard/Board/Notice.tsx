/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { NoticeProps } from './NoticeBoard';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { setContent, setParam, selectContent } from '@src/store/content';

const Notice = (props: { key: number; article: NoticeProps }) => {
  const [visible, setVisible] = useState(false);
  const [article, setArticle] = useState<NoticeProps>(props.article);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 변경 결과 전송(예정)
  }, [article]);

  const toggleNotice = (e: React.MouseEvent<HTMLElement>) => {
    // onCLick 이벤트
    setVisible(!visible);
  };

  const editNotice = (num) => {
    // 수정페이지로 이동
    dispatch(setParam({ param: num }));
    dispatch(setContent({ content: 'editNotice' }));
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
        <div className="col regtime">
          {article.regtime.slice(0, article.regtime.indexOf('T'))}
        </div>
      </button>
      <div className={visible ? 'row detailRow' : 'row detailRow hide'}>
        <div className="detailContent">{article.content}</div>
        <div className="detailWriter">- {article.writer}</div>
      </div>
    </div>
  );
};

export default Notice;
