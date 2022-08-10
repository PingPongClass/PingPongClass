import { css } from '@emotion/react';

const ClassCard = ({ clsList, classUrl }: any) => {
  if (clsList) {
    return (
      <div css={TotalContainer(classUrl)}>
        <h2>{clsList.classTitle}</h2>
        <p>{clsList.classDesc}</p>
      </div>
    );
  } else {
    return null;
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
  box-shadow: 2px 2px 15px -5px;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  filter: ${classUrl !== '링크' && classUrl
    ? 'brightness(100%)'
    : 'brightness(50%)'};

  :hover {
    transform: ${classUrl !== '링크' && classUrl ? 'scale(1.05)' : null};
    cursor: ${classUrl !== '링크' && classUrl ? 'pointer' : null};
  }
`;

export default ClassCard;
