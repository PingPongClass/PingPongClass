import { css } from '@emotion/react';
import { useState, useCallback, useEffect } from 'react';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';
import ItemList from './ItemListTap/ItemList';
import ReactionList from './ItemListTap/ReactionList';
import GetItemList from './GetItemListTap/GetItemList';
import GetReactionList from './GetItemListTap/GetReactionList';
import BobkkiCapsule from '../../../assets/images/bobkkiCapsule.png';
import HelpIcon from '@mui/icons-material/HelpOutline';
import CircleIcon from '@mui/icons-material/Circle';
import { yellow } from '@mui/material/colors';
import Animation from './Animation';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@src/store/hooks';
import member, {
  setPoint,
  saveMember,
  allItems,
  Items,
  saveItem,
} from '@src/store/member';

const StoreMain = () => {
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const [itemtap, setTap] = useState('itemTap');
  const [gettap, setGetTap] = useState('getItemTap');
  const [isOpenBbobkki, setOpenBbobkki] = useState<boolean>(false);
  const [items, setItems] = useState<Items[]>([allItems]);
  const [change, setChange] = useState('');
  const [getItem, setGetItem] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    //로딩시 해당 유저의 아이템 불러오기
    dispatch(saveItem(memberStore.userId)).then(() => {
      setItems(memberStore.items);
      dispatch(saveMember());
      console.log('-------랜더링 : ', items);
    });
  }, []);

  useEffect(() => {
    dispatch(saveItem(memberStore.userId)).then(() => {
      setItems(memberStore.items);
      dispatch(saveMember());
      console.log('-------뽑을때 : ', items);
    });
  }, [change]);

  const onClickBtn = () => {
    //사용하시겠습니까? 창
    if (memberStore.point < 15) {
      alert('보유 퐁퐁이가 부족합니다.');
    } else {
      const isUse = confirm('퐁퐁이 15개를 사용하여 뽑기를 진행하시겠습니까?');
      if (isUse) {
        let itemId = 0;
        //랜덤 아이템 선택
        const rarity = Math.floor(Math.random() * 10) + 1; //1~10까지
        if (rarity > 6) {
          //희귀도4
          itemId = Math.floor(Math.random() * 2) + 1;
        } else if (rarity > 3) {
          //희귀도3
          itemId = Math.floor(Math.random() * 10) + 5;
        } else if (rarity > 1) {
          //희귀도2
          itemId = 4;
        } else {
          //희귀도1
          itemId = 3;
        }
        setGetItem(itemId);
        console.log('뽑은 아이템 :' + itemId + ',' + memberStore.userId);

        //뽑기 아이템 DB 저장
        InterceptedAxios.post('/items', {
          studentId: memberStore.userId,
          itemId: itemId,
        })
          .then(() => {
            onClickOpenModal();
            setChange('change');
            //퐁퐁이 개수 줄인 정보 받아오기
            console.log(memberStore);
          })
          .catch(function (error) {
            alert('뽑기 과정에서 에러 발생');
            console.log('뽑기 DB저장 실패', error);
          });
      }
    }
  };

  const onClickOpenModal = useCallback(() => {
    setOpenBbobkki(!isOpenBbobkki);
  }, [isOpenBbobkki]);

  // 클릭 이벤트 핸들러
  const onClickTap = (prop: string) => {
    setTap(prop);
  };

  const onClickGetTap = (prop: string) => {
    setGetTap(prop);
  };

  const onInfoEnter = () => {};

  return (
    <div css={totalContainer}>
      {isOpenBbobkki && (
        <Animation onClickOpenModal={onClickOpenModal} getItem={getItem} />
      )}

      <div className="drawContainer">
        <div className="store-title-div">
          <div className="pageTitle">
            뽑기{' '}
            <span
              css={css`
                font-size: 0.5em;
                font-weight: 300;
                margin-left: 10px;
              `}
            >
              {' '}
              뽑기로 획득 가능한 아이템 리스트
            </span>
          </div>
          <div className="pongCount">
            <span>
              <CircleIcon fontSize="small" sx={{ color: yellow[700] }} />
              &nbsp; X {memberStore.point}
            </span>
          </div>
        </div>
        <hr />
        <div className="sideContainer">
          <div className="draw">
            <div className="bbobkki">
              <p>랜덤 뽑기</p>
              <HelpIcon
                fontSize="small"
                color="action"
                onMouseEnter={onInfoEnter}
              />
            </div>
            <img src={BobkkiCapsule} alt="뽑기캡슐" className="bobkkiCapsule" />
            <motion.button
              type="button"
              className="bbobkkiBtn"
              onClick={onClickBtn}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <span>
                <CircleIcon fontSize="small" sx={{ color: yellow[700] }} />
                &nbsp; X 15
              </span>
            </motion.button>
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
  animation: 0.5s ease-in-out loadEffect1;

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
    width: 70%;
    height: 80%;
    margin-left: 29px;
    border-radius: 20px;
  }

  .getItemList {
    width: 55%;
    height: 23vh;
    margin: auto;
    border-radius: 20px;
  }

  .example {
    width: 40%;
    height: 23vh;
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
      width: 25%;
      border-top-left-radius: 10px;
      border-top-right-radius: 10px;
      background-color: #fcc97d;
      margin-right: 0.2rem;
    }
    .store1:hover,
    .store2:hover {
      cursor: pointer;
      background-color: #ffeed1;
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

  .store-title-div {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  .drawContainer {
    height: 55%;
    justify-content: center;
  }

  .sideContainer {
    display: inline-flex;
    flex-direction: row;
    vertical-align: middle;
    margin-top: 0.7rem;
    justify-content: center;
    width: 100%;
    height: 83%;
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
    height: 80%;
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

  @keyframes loadEffect1 {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export default StoreMain;
