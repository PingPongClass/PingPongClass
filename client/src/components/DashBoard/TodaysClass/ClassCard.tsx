import { css } from '@emotion/react';

const ClassCard = ({ clsList }: any) => {
  console.log(clsList);
  if (clsList) {
    return (
      <div css={TotalContainer(clsList.classUrl)}>
        <h2>{clsList.classTitle}</h2>
        <p>{clsList.classDesc}</p>
        <p>{clsList.timetableId} 교시</p>
        <p>{clsList.teacherName} 선생님</p>
      </div>
    );
  } else {
    return <div css={EmptyContainer}></div>;
  }
};

const TotalContainer = (classUrl: string) => css`
  width: 233px;
  height: 233px;
  background: #fdfcf3;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  box-shadow: 2px 2px 15px -5px;
  filter: ${classUrl !== '링크' && classUrl
    ? 'brightness(100%)'
    : 'brightness(50%)'};

  :hover {
    transform: ${classUrl !== '링크' && classUrl ? 'scale(1.05)' : null};
    cursor: ${classUrl !== '링크' && classUrl ? 'pointer' : null};
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

export default ClassCard;
