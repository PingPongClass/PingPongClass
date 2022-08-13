import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const ClassCard = ({ clsList }: any) => {
  const [img, setImg] = useState('');
  useEffect(() => {
    if (clsList)
      setImg('/subject/' + clsList.subjectEntity.classSubjectCode + '.jpeg');
  }, [clsList]);

  if (clsList) {
    return (
      <div css={TotalContainer(clsList.classUrl)}>
        <img src={img} className="classImg" alt="수업" />
        <hr />
        <h2>{clsList.classTitle}</h2>
        <p>
          [{clsList.subjectEntity.name}] {clsList.classDesc}
        </p>
        <p>
          [{clsList.timetableId}교시] {clsList.teacherName} 선생님
        </p>
      </div>
    );
  } else {
    return <div css={EmptyContainer}></div>;
  }
};

const TotalContainer = (classUrl: string) => css`
  width: 233px;
  height: 215px;
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: end;
  border-radius: 20px;
  padding: 10px;
  box-sizing: border-box;
  transition: all 0.1s ease-in-out;
  border: 1px solid lightgray;

  filter: ${classUrl !== '링크' && classUrl
    ? 'brightness(100%)'
    : 'brightness(85%)'};

  box-shadow: ${classUrl !== '링크' && classUrl ? '2px 2px 8px -5px' : null};
  background: ${classUrl !== '링크' && classUrl ? '#fffbf2' : '#f9f7f2'};
  color: ${classUrl !== '링크' && classUrl ? 'black' : 'gray'};
  :hover {
    transform: ${classUrl !== '링크' && classUrl ? 'scale(1.05)' : null};
    cursor: ${classUrl !== '링크' && classUrl ? 'pointer' : null};
  }

  h2 {
    padding-top: 2px;
    padding-bottom: 4px;
    font-size: 15pt;
  }
  p {
    padding-bottom: 2px;
    font-size: 10pt;
  }

  hr {
    width: 200px;
  }

  .classImg {
    width: 100%;
    height: 120px;
    background: white;
    border-radius: 10px;
    align-items: center;
  }
`;

const EmptyContainer = () => css`
  width: 233px;
  height: 215px;
  background: #ffffff;
  border-radius: 20px;
  padding: 10px;
  border: dashed 1.5px gray;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default ClassCard;
