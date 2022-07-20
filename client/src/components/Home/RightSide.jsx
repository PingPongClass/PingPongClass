/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

function RightSide() {
  return (
    <div css={totalContainer}>
      <h2>
        함께 만들어가는 <br />
        <span className="programName">핑퐁클래스</span>.
      </h2>
      <p>
        핑퐁클래스는 20년간의 노하우가 담긴
        <br />
        선생님들과 학생분들의 각종 요청들을 받아서
        <br />
        모두가 꿈꾸는 온라인 교육 세상을
        <br />
        만들기 위해 제작했어요.
      </p>
      <div className="buttons">
        <button className="teacher">선생님이신가요?</button>
        <button className="student">학생이신가요?</button>
      </div>
    </div>
  );
}

const totalContainer = css`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: white;
    text-align: right;
    font-size: 48px;
    span {
      color: #e978a0;
    }
  }

  p {
    color: white;
    text-align: right;
    font-size: 1.5rem;
    font-weight: 600;
  }

  .buttons {
    display: flex;
    flex-direction: row;
    margin: 2rem 0;

    button {
      width: 160px;
      height: 50px;
      border-radius: 30px;
      border: none;
      font-weight: 600;
      cursor: pointer;
    }

    .student {
      color: #ffffff;
      background-color: #e978a0;
    }
    button:first-child {
      margin-right: 1rem;
    }
  }
`;

export default RightSide;
