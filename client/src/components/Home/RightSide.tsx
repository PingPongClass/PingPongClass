import { css } from '@emotion/react';
import PropTypes from 'prop-types';

interface RightSideProps {
  setTap: Function;
}

function RightSide(props: RightSideProps) {
  const { setTap } = props;

  const onClickTeacher = () => {
    setTap('teacherLogin');
  };
  const onClickStudent = () => {
    setTap('studentLogin');
  };
  return (
    <div css={totalContainer}>
      <div className="title-div">
        <div className="title">인터렉티브 화상 교육</div>
        <div className="title-highlight">&nbsp;핑퐁클래스&nbsp;</div>
      </div>
      <div className="text text-div">
        핑퐁클래스는 20년간의 노하우가 담긴
        <br />
        선생님들과 학생분들의 각종 요청들을 받아서
        <br />
        모두가 꿈꾸는 온라인 교육 세상을
        <br />
        만들기 위해 제작했어요.
      </div>
      <div className="buttons-div">
        <button className="button blue" onClick={onClickTeacher}>
          선생님이신가요?
        </button>
        <button className="button pink" onClick={onClickStudent}>
          학생이신가요?
        </button>
      </div>
    </div>
  );
}

const totalContainer = css`
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: right;
  padding-right: 5rem;

  .text-div {
    padding: 11px 20px 41px;
  }

  .text {
    color: #332757;
    text-align: right;
    font-size: calc(1.2vw);
  }

  .buttons-div {
    margin: 1rem 0;
    text-align: right;

    button:first-child {
      margin-right: 1rem;
    }
  }

  .title-highlight,
  .title {
    font-weight: 800;
  }
`;

RightSide.propTypes = {
  setTap: PropTypes.func.isRequired,
};

export default RightSide;
