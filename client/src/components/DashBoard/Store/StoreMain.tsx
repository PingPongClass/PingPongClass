import { css } from '@emotion/react';
import { useState } from 'react';
import ItemList from '@components/DashBoard/Store/ItemListTap/ItemList';
import ReactionList from '@components/DashBoard/Store/ItemListTap/ReactionList';
import GetItemList from '@components/DashBoard/Store/GetItemListTap/GetItemList';
import GetReactionList from '@components/DashBoard/Store/GetItemListTap/GetReactionList';
import BobkkiCapsule from '@assets/images/bobkkiCapsule.png';
import HelpIcon from '@mui/icons-material/HelpOutline';
import CircleIcon from '@mui/icons-material/Circle';
import { yellow } from '@mui/material/colors';

const StoreMain = () => {
  const [itemtap, setTap] = useState('itemTap');
  const [gettap, setGetTap] = useState('getItemTap');

  // 클릭 이벤트 핸들러
  const onClickTap = (prop: string) => {
    setTap(prop);
  };

  const onClickGetTap = (prop: string) => {
    setGetTap(prop);
  };

  return (
    <div css={totalContainer}>
      <div className="drawContainer">
        <div className="pageTitle">뽑기</div>
        <hr />
        <div className="sideContainer">
          <div className="draw">
            <div className="bbobkki">
              <p>랜덤 뽑기</p>
              <HelpIcon fontSize="small" color="action" />
            </div>
            <img src={BobkkiCapsule} alt="뽑기캡슐" className="bobkkiCapsule" />
            <button type="button" className="bbobkkiBtn">
              <span>
                <CircleIcon fontSize="small" sx={{ color: yellow[700] }} />
                &nbsp; X 15
              </span>
            </button>
          </div>
          <div className="itemList">
            <div className="item-tap">
              <div
                className={itemtap === 'itemTap' ? 'store1 selected' : 'store1'}
                onClick={() => onClickTap('itemTap')}
              >
                아이템
              </div>
              <div
                className={
                  itemtap === 'reactionTap' ? 'store2 selected' : 'store2'
                }
                onClick={() => onClickTap('reactionTap')}
              >
                리액션
              </div>
            </div>
            <div className="item-main">
              {itemtap === 'itemTap' && <ItemList />}
              {itemtap === 'reactionTap' && <ReactionList />}
            </div>
          </div>
          <div className="pongCount">
            <span>
              <CircleIcon fontSize="small" sx={{ color: yellow[700] }} />
              &nbsp; X 보유개수
            </span>
          </div>
        </div>
      </div>
      <div className="myItemContainer">
        <div className="pageTitle">보유 목록</div>
        <hr />
        <div className="sideContainer">
          <div className="example">예시화면</div>
          <div className="getItemList">
            <div className="item-tap">
              <div
                className={
                  gettap === 'getItemTap' ? 'store1 selected' : 'store1'
                }
                onClick={() => onClickGetTap('getItemTap')}
              >
                아이템
              </div>
              <div
                className={
                  gettap === 'getReactionTap' ? 'store2 selected' : 'store2'
                }
                onClick={() => onClickGetTap('getReactionTap')}
              >
                리액션
              </div>
            </div>
            <div className="item-main">
              {gettap === 'getItemTap' && <GetItemList />}
              {gettap === 'getReactionTap' && <GetReactionList />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const totalContainer = () => css`
  /* 전역 */
  text-align: center;
  width: inherit;
  height: 100%;
  position: relative;
  overflow: hidden;
  max-height: inherit;
  max-width: inherit;
  display: flex;
  flex-direction: column;

  .bbobkki {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  .itemList {
    width: 55%;
    height: 28vh;
    margin: auto;
    border-radius: 20px;
  }

  .getItemList {
    width: 55%;
    height: 25vh;
    margin: auto;
    border-radius: 20px;
  }

  .example {
    width: 40%;
    height: 25vh;
    margin: auto;
    background-color: gray;
  }

  .item-tap {
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    height: 2rem;
    border-bottom: dashed 1px gray;

    .store1,
    .store2 {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 33.33%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #fcc97d;
      margin-right: 0.2rem;
    }
    .store1:hover,
    .store2:hover {
      cursor: pointer;
    }

    .selected {
      background-color: white;
      font-weight: 700;
      border-top: 1px solid gray;
      border-left: 1px solid gray;
      border-right: 1px solid gray;
    }
  }

  .item-main {
    background-color: white;
    height: calc(100% - 2rem);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    text-align: left;
    border-bottom: 1px solid gray;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
  }

  .pageTitle {
    text-align: left;
    font-size: calc(0.5rem + 1vw);
    font-weight: 700;
  }

  .drawContainer {
    height: 55%;
    justify-content: center;
  }

  .sideContainer {
    display: inline-flex;
    flex-direction: row;
    vertical-align: middle;
    margin-top: 1rem;
    justify-content: center;
    width: 100%;
  }

  .myItemContainer {
    height: 45%;
    justify-content: center;
  }

  hr {
    margin: 0 auto;
  }

  .draw {
    width: 21%;
    height: 28vh;
    display: inline-flex;
    margin: 0;
    justify-content: center;
    background: #fff1bd;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    box-shadow: 0 0 3px 0 lightgray;

    p {
      font-weight: 700;
      padding-right: 0.2rem;
    }

    .bobkkiCapsule {
      width: 50%;
      height: auto;
    }
  }

  .pongCount {
    width: 15%;
    background-color: white;
    justify-content: center;
    height: 5vh;
    display: inline-flex;
    border-radius: 5px;
    border: 1px solid lightgray;
    font-weight: 700;
    box-shadow: 0 0 3px 0 lightgray;

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  .bbobkkiBtn {
    width: 50%;
    background-color: white;
    height: 4vh;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin: 16px 0 16px 0;
    font-family: 'NanumSquareRound';
    font-weight: 700;
    box-shadow: 0 0 3px 0 lightgray;

    span {
      width: 100%;
      flex-direction: row;
      align-items: center;
      text-align: center;
      display: flex;
      justify-content: center;
    }
  }
`;

export default StoreMain;
