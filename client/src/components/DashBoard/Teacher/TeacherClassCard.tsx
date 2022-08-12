import { css } from '@emotion/react';

const TeacherClassCard = ({ clsList }: any) => {
  if (clsList) {
    return (
      <div css={TotalContainer}>
        <h2>{clsList.classTitle}</h2>
        <p>{clsList.classDesc}</p>
        <p>{clsList.timetableId} 교시</p>
        <p>{clsList.teacherName} 선생님</p>
      </div>
    );
  } else {
    return <div css={EmptyContainer}> </div>;
  }
};

const TotalContainer = () => css`
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

const EmptyContainer = () => css`
  width: 233px;
  height: 233px;
  background: #fdfcf3;
  border-radius: 20px;
  padding: 10px;
  border: dotted 2px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default TeacherClassCard;
