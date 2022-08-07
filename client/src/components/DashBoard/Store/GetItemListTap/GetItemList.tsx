import { css } from '@emotion/react';
import ColorChangeJandi from '../../../../assets/images/colorChange_Jandi.png';
import ColorChangeBorder from '../../../../assets/images/colorChange_Border.png';
import DoublePong from '../../../../assets/images/doublePong.png';
import FreePassTicket from '../../../../assets/images/freePassTicket.png';

const GetItemList = () => {
  return (
    <div css={totalContainer}>
      <div className="colorchangeJandi">
        <img src={ColorChangeJandi} style={{ width: '100%' }} />
        <p>색변경권[잔디]:0</p>
      </div>
      <div className="colorchangeBorder">
        <img src={ColorChangeBorder} style={{ width: '100%' }} />
        <p>색변경권[테두리]:0</p>
      </div>
      <div className="doublePong">
        <img src={DoublePong} style={{ width: '100%' }} />
        <p>더블퐁퐁권:0</p>
      </div>
      <div className="freePassTicket">
        <img src={FreePassTicket} style={{ width: '100%' }} />
        <p>발표프리패스권:0</p>
      </div>
    </div>
  );
};

const totalContainer = () => css`
  display: flex;
  flex-direction: row;
  justify-content: center;

  div {
    width: 25%;
    height: 100%;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    box-shadow: 2px 2px 8px -5px;
    transition: all 0.1s ease-in-out;
    margin: 1rem;
    border: 1px solid lightgray;

    :hover {
      transform: scale(1.05);
      cursor: pointer;
    }

    p {
      font-size: calc(0.5vw);
    }
  }
`;

export default GetItemList;
