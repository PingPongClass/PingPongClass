import React, { useState, useEffect } from 'react';
import { NoticeProps } from '@components/DashBoard/Board/NoticeBoard';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { setContent, selectContent } from '@store/content';

const Notice = (props: {
  key: number;
  article: NoticeProps;
  deleteClass: Function;
}) => {
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

  const editNotice = () => {
    // 수정페이지로 이동
    dispatch(setContent({ content: 'editClass' }));
  };

  const deleteClass = () => {
    // 삭제요청 송신(예정)
    props.deleteClass();
  };

  return (
    <div className={visible ? 'row articleRow highlited' : 'row articleRow'}>
      <button className="row article-btn" onClick={(e) => toggleNotice(e)}>
        <div className="col noticeId">{article.noticeId}</div>
        <div className="col classTitle">
          <div className="col classTitleIcon">{article.classTitle}</div>
        </div>
        <div className="col title">{article.title}</div>
        <div className="col writer">{article.writer}</div>
        <div className="col regtime">{article.regtime}</div>
      </button>
      <div className={visible ? 'row detailRow' : 'row detailRow hide'}>
        <div className="detailContent">{article.content}</div>
        <div className="detailWriter">- {article.writer}</div>
        <div className="detailFooter">
          <button className="edit-btn" onClick={() => editNotice()}>
            수정
          </button>
          <button className="del-btn" onClick={() => deleteClass()}>
            삭제
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notice;
