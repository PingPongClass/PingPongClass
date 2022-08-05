import { css } from '@emotion/react';

const ClassCard = ({ objectName }: any) => {
  return (
    <div css={totalContainer}>
      <h2>{objectName}</h2>
    </div>
  );
};

const totalContainer = css`
  width: 233px;
  height: 233px;
  background: #fdfcf3;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  box-shadow: 2px 2px 15px -5px;
  transition: all 0.1s ease-in-out;

  :hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;

export default ClassCard;
