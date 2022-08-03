/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { ArticleProps } from './NoticeBoard';

const NoticeBoardArticle = (props: { key: number; article: ArticleProps }) => {
  const [visible, setVisible] = useState(false);
  const [editable, setEditable] = useState(false);
  const [article, setArticle] = useState<ArticleProps>(props.article);
  const [title, setTitle] = useState(article.title);
  const [content, setContent] = useState(article.content);
  let timer: null | ReturnType<typeof setTimeout> | number;

  useEffect(() => {
    // 변경 결과 전송(예정)
  }, [article]);

  const toggleNotice = (e: React.MouseEvent<HTMLElement>) => {
    // onCLick 이벤트
    if (editable) {
      // 수정 중인 상태라면 제목줄을 클릭해도 클릭 이벤트가 발생하지 않음
      e.preventDefault();
    } else {
      // 본문 보여주기 토글
      setVisible(!visible);
    }
  };

  const editNotice = () => {
    if (editable) {
      // 수정이 끝났다면 article 갱신
      setArticle({ ...article, title: title, content: content });
    }
    // 수정 상태 토글
    setEditable(!editable);
  };

  const cancleEdit = () => {
    // 제목, 내용값을 초기화하고 상세 내용을 수정 불가 상태로 되돌리는 함수
    setEditable(!editable);
    setTitle(article.title);
    setContent(article.content);
  };

  const deleteNotice = () => {
    alert('미구현!');
  };

  const debounce = (func: Function) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(func, 300);
  };

  const titleChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // onChange 이벤트
    debounce(() => {
      let newTitle = e.target.value;
      console.log(newTitle);
      setTitle(newTitle);
    });
  };

  const contentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    debounce(() => {
      let newContent = e.target.value;
      console.log(newContent);
      setContent(newContent);
    });
  };

  return (
    <div className={visible ? 'row articleRow highlited' : 'row articleRow'}>
      <button className="row article-btn" onClick={(e) => toggleNotice(e)}>
        <div className="col noticeId">{article.noticeId}</div>
        <div className="col classTitle">
          <div className="col classTitleIcon">{article.classTitle}</div>
        </div>
        {editable ? (
          <textarea
            className="col title"
            id="editTitle"
            defaultValue={article.title}
            onChange={(e) => titleChanged(e)}
          ></textarea>
        ) : (
          <div className="col title">{article.title}</div>
        )}
        <div className="col writer">{article.writer}</div>
        <div className="col regtime">{article.regtime}</div>
      </button>
      <div className={visible ? 'row detailRow' : 'row detailRow hide'}>
        {editable ? (
          <textarea
            className="detailContent"
            id="editContent"
            defaultValue={article.content}
            onChange={(e) => contentChanged(e)}
          ></textarea>
        ) : (
          <div className="detailContent">{article.content}</div>
        )}
        <div className="detailWriter">- {article.writer}</div>
        <div className="detailFooter">
          <button className="edit-btn" onClick={() => editNotice()}>
            수정
          </button>

          {editable ? (
            <button className="del-btn" onClick={() => cancleEdit()}>
              취소
            </button>
          ) : (
            <button className="del-btn" onClick={() => deleteNotice()}>
              삭제
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NoticeBoardArticle;
