import { css } from '@emotion/react';

const TeacherClassCard = ({ clsList }: any) => {
  if (clsList) {
    return (
      <div css={totalContainer}>
        <h2>{clsList.classTitle}</h2>
        <p>{clsList.classDesc}</p>
      </div>
    );
  } else {
    return <div css={totalContainer}> </div>;
  }
};

const totalContainer = css`
  width: 233px;
  height: 233px;
  background: #fdfcf3;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  border-radius: 20px;
  box-shadow: 2px 2px 15px -5px;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.1s ease-in-out;

  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export default TeacherClassCard;
