import { css } from '@emotion/react';

const ClassCard = ({ clsList, isActive }: any) => {
  if (clsList) {
    return (
      <div css={TotalContainer(isActive)}>
        <h2>{clsList.classTitle}</h2>
        <p>{clsList.classDesc}</p>
      </div>
    );
  } else {
    return null;
  }
};

const TotalContainer = (isActive: boolean) => css`
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
  filter: ${isActive ? 'brightness(100%)' : 'brightness(50%)'};

  :hover {
    transform: ${isActive ? 'scale(1.05)' : null};
    cursor: ${isActive ? 'pointer' : null};
  }
`;

export default ClassCard;
