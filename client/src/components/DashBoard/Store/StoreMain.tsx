import { css } from '@emotion/react';
import { useState, useCallback, useEffect, useRef } from 'react';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';
import ItemList from './ItemListTap/ItemList';
import ReactionList from './ItemListTap/ReactionList';
import GetItemList from './GetItemListTap/GetItemList';
import GetReactionList from './GetItemListTap/GetReactionList';
import BobkkiCapsule from '../../../assets/images/bobkkiCapsule.png';
import HelpIcon from '@mui/icons-material/HelpOutline';
import CircleIcon from '@mui/icons-material/Circle';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { green, pink, yellow } from '@mui/material/colors';
import Animation from './Animation';
import Animation2 from './Animation2';
import { motion } from 'framer-motion';
import { useAppSelector, useAppDispatch } from '@src/store/hooks';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import member, {
  saveMember,
  allItems,
  Items,
  saveItem,
} from '@src/store/member';
import StorePreview from '@components/DashBoard/Store/StorePreview';

const StoreMain = () => {
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const [itemtap, setTap] = useState('itemTap');
  const [gettap, setGetTap] = useState('getItemTap');
  const [isOpenBbobkki, setOpenBbobkki] = useState<boolean>(false);
  const [items, setItems] = useState<Items[]>([allItems]);
  const [getItem, setGetItem] = useState<number>(0);
  const [getColor, setGetColor] = useState<number>(0);
  const [getBorder, setGetBorder] = useState<number>(0);
  const [getColorType, setGetColorType] = useState<number>(0);
  const [isOpenPick, setIsOpenPick] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [showReaction, setShowReaction] = useState('');
  const [cameraLoading, setCameraLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  const color = [
    'pingpong',
    'platinum',
    'dia',
    'purple',
    'blue',
    'yellow',
    'green',
    'black',
  ];

  const onClickVideoOn = () => {
    if (!cameraLoading) setIsCameraOn(true);
  };

  const onClickVideoOff = () => {
    if (!cameraLoading) setIsCameraOn(false);
  };

  const loadInfo = () => {
    const timer = () => {
      setTimeout(() => {
        setItems(memberStore.items);
        setGetBorder(memberStore.borderColor);
        setLoading(false);
      }, 300);
    };
    setLoading(true);
    dispatch(saveItem(memberStore.userId)).then(() => timer());
  };

  useEffect(() => {
    loadInfo();
  }, []);

  const onClickBtn = () => {
    //사용하시겠습니까? 창
    if (memberStore.point < 15) {
      toast.warning('보유 퐁퐁이가 부족합니다.');
    } else {
      const isUse = confirm('퐁퐁이 15개를 사용하여 뽑기를 진행하시겠습니까?');
      if (isUse) {
        let itemId = 0;
        //랜덤 아이템 선택
        const rarity = Math.floor(Math.random() * 100) + 1; //1~100까지
        if (rarity <= 55) {
          //희귀도4
          itemId = Math.floor(Math.random() * 2) + 1;
        } else if (rarity <= 85) {
          //희귀도3
          itemId = Math.floor(Math.random() * 10) + 5;
        } else if (rarity <= 95) {
          //희귀도2
          itemId = 4;
        } else {
          //희귀도1
          itemId = 3;
        }

        //뽑기 아이템 DB 저장
        InterceptedAxios.post('/items', {
          studentId: memberStore.userId,
          itemId: itemId,
        })
          .then(() => {
            console.log('1');
            onClickOpenModal();
            loadInfo();
            console.log('2');
            //퐁퐁이 개수 줄인 정보 받아오기
          })
          .catch(function (error) {
            toast.warning('뽑기 과정에서 에러 발생');
            console.error('뽑기 DB저장 실패', error);
          });

        setGetItem(itemId);
      }
    }
  };

  const onClickOpenModal = useCallback(() => {
    setOpenBbobkki(!isOpenBbobkki);
  }, [isOpenBbobkki]);

  const onClickOpenModal2 = useCallback(() => {
    //창 꺼지게
    setIsOpenPick(!isOpenPick);
    if (getColorType === 1) {
      //색 변경
      setGetBorder(getColor);
    }
  }, [isOpenPick]);

  //보유 아이템 사용 propfunction
  const highFunction = (color, type) => {
    //창 보이게
    setIsOpenPick(!isOpenPick);
    setGetColor(color);
    setGetColorType(type);
    loadInfo();
    //Animation2로 전달
  };

  //리액션 보이는 창
  const reactionFunction = (reaction) => {
    //리액션 보이게
    setShowReaction(reaction);
    setTimeout(() => setShowReaction(''), 3500);
  };

  // 클릭 이벤트 핸들러
  const onClickTap = (prop: string) => {
    setTap(prop);
  };

  const onClickGetTap = (prop: string) => {
    setGetTap(prop);
  };

  const renderItemList = () => {
    if (gettap === 'getItemTap')
      return <GetItemList highFunction={highFunction} />;
    if (gettap === 'getReactionTap') {
      return <GetReactionList reactionFunction={reactionFunction} />;
    }
  };

  return (
    <div css={totalContainer}>
      {isOpenBbobkki && (
        <Animation onClickOpenModal={onClickOpenModal} getItem={getItem} />
      )}
      {isOpenPick && (
        <Animation2
          onClickOpenModal2={onClickOpenModal2}
          getColor={getColor}
          getType={getColorType}
        />
      )}

      <div className="drawContainer">
        <div className="store-title-div">
          <div className="pageTitle">
            뽑기
            <span
              css={css`
                font-size: 0.5em;
                font-weight: 300;
                margin-left: 10px;
              `}
            >
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
              <div className="help-div" data-tip data-for="helpIcon">
                <p>랜덤 뽑기</p>
                <HelpIcon
                  fontSize="small"
                  color="action"
                  css={css`
                    height: 1.2vw;
                  `}
                />
              </div>
              <ReactTooltip
                id="helpIcon"
                effect="solid"
                place="top"
                type="light"
                textColor="#191919"
                border
                borderColor="gray"
              >
                <div
                  css={css`
                    text-align: center;
                    padding: 5px;
                  `}
                >
                  퐁퐁이를 모아 아이템을 뽑아 보세요!
                  <br />
                  랜덤확률로 아이템을 획득할수 있습니다.
                </div>
              </ReactTooltip>
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
              <div className="rarity-div">
                <p
                  css={css`
                    margin-right: 5px;
                  `}
                >
                  확률
                </p>
                <HelpIcon
                  fontSize="small"
                  color="action"
                  css={css`
                    height: 1.2vw;
                  `}
                  data-tip
                  data-for="rarity"
                  className="hover"
                />
              </div>
              <ReactTooltip
                id="rarity"
                effect="solid"
                place="top"
                type="light"
                textColor="#191919"
                border
                borderColor="gray"
              >
                <div
                  css={css`
                    text-align: start;
                    padding: 5px;
                  `}
                >
                  <div
                    css={css`
                      display: flex;
                      margin-right: 2px;
                    `}
                  >
                    <div>
                      <LocalOfferIcon
                        fontSize="small"
                        sx={{ color: 'blueviolet' }}
                        css={css`
                          margin-right: 5px;
                        `}
                      />
                    </div>
                    <div>
                      <b>레전드</b> : 5% 확률로 획득 가능
                    </div>
                  </div>{' '}
                  <div
                    css={css`
                      display: flex;
                      margin-right: 2px;
                    `}
                  >
                    <div>
                      <LocalOfferIcon
                        fontSize="small"
                        sx={{ color: 'pink' }}
                        css={css`
                          margin-right: 5px;
                        `}
                      />
                    </div>
                    <div>
                      <b>레어</b> : 10% 확률로 획득 가능
                    </div>
                  </div>{' '}
                  <div
                    css={css`
                      display: flex;
                      margin-right: 2px;
                    `}
                  >
                    <div>
                      <LocalOfferIcon
                        fontSize="small"
                        sx={{ color: 'cadetblue' }}
                        css={css`
                          margin-right: 5px;
                        `}
                      />
                    </div>
                    <div>
                      <b>중급</b> : 35% 확률로 획득 가능
                    </div>
                  </div>{' '}
                  <div
                    css={css`
                      display: flex;
                      margin-right: 2px;
                    `}
                  >
                    <div>
                      <LocalOfferIcon
                        fontSize="small"
                        sx={{ color: 'gold' }}
                        css={css`
                          margin-right: 5px;
                        `}
                      />
                    </div>
                    <div>
                      <b>일반</b> : 55% 확률로 획득 가능
                    </div>
                  </div>{' '}
                </div>
              </ReactTooltip>
            </div>
            <div className="item-main">
              {itemtap === 'itemTap' && <ItemList />}
              {itemtap === 'reactionTap' && <ReactionList />}
            </div>
          </div>
        </div>
      </div>
      <div className="myItemContainer">
        <div className="pageTitle">
          보유 목록
          <span
            css={css`
              font-size: 0.5em;
              font-weight: 300;
              margin-left: 10px;
            `}
          >
            아이템을 클릭해 사용해보세요
          </span>
        </div>
        <hr />
        <div className="sideContainer">
          <div className="left-side-container">
            <div className={'image-box border-' + color[getBorder - 1]}>
              {showReaction != '' && (
                <img
                  src={showReaction}
                  alt=""
                  style={{
                    position: 'absolute',
                    width: '30%',
                    right: '3%',
                    bottom: '3%',
                  }}
                />
              )}
              {isCameraOn ? (
                <StorePreview
                  isCameraOn={isCameraOn}
                  cameraLoading={cameraLoading}
                  setCameraLoading={setCameraLoading}
                />
              ) : (
                <img src="../img/cam.jpg" alt="" className="image-thumbnail" />
              )}
            </div>
            <div className="video-div">
              {isCameraOn ? (
                cameraLoading ? (
                  <VideocamIcon
                    className="video-icon"
                    onClick={onClickVideoOff}
                    color="disabled"
                  />
                ) : (
                  <VideocamIcon
                    className="video-icon"
                    onClick={onClickVideoOff}
                  />
                )
              ) : (
                <VideocamOffIcon
                  className="video-icon"
                  onClick={onClickVideoOn}
                />
              )}
            </div>
          </div>
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
              <div className="rarity-div">
                <p
                  css={css`
                    margin-right: 5px;
                  `}
                >
                  색상권
                </p>
                <HelpIcon
                  fontSize="small"
                  color="action"
                  css={css`
                    height: 1.2vw;
                  `}
                  data-tip
                  data-for="rarity-color"
                  className="hover"
                />
                <ReactTooltip
                  id="rarity-color"
                  effect="solid"
                  place="top"
                  type="light"
                  textColor="#191919"
                  border
                  borderColor="gray"
                >
                  <div
                    css={css`
                      text-align: start;
                      padding: 5px;
                    `}
                  >
                    <div
                      css={css`
                        display: flex;
                        margin-right: 2px;
                        flex-direction: column;
                      `}
                    >
                      <div className="div-color">
                        <div
                          style={{
                            marginBottom: '5px',
                          }}
                        >
                          <b>레전드</b> : 1% 확률로 획득 가능
                        </div>
                        <div className="div-color-info">
                          <div className="pong-pingpong div-color-rarity"></div>
                          pingpong
                        </div>
                      </div>

                      <div className="div-color">
                        <div
                          style={{
                            marginBottom: '5px',
                          }}
                        >
                          <b>레어</b> : 9% 확률로 획득 가능
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <div className="div-color-info">
                            <div className="pong-dia div-color-rarity"></div>
                            dia
                          </div>
                          <div className="div-color-info">
                            <div className="pong-platinum div-color-rarity"></div>
                            platinum
                          </div>
                        </div>
                      </div>
                      <div className="div-color">
                        <div
                          style={{
                            marginBottom: '5px',
                          }}
                        >
                          <b>노멀</b> : 90% 확률로 획득 가능
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                          }}
                        >
                          <div className="div-color-info">
                            <div className="pong-black div-color-rarity"></div>
                            black
                          </div>
                          <div className="div-color-info">
                            <div className="pong-yellow div-color-rarity"></div>
                            yellow
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '5px',
                          }}
                        >
                          <div className="div-color-info">
                            <div className="pong-green div-color-rarity"></div>
                            green
                          </div>
                          <div className="div-color-info">
                            <div className="pong-blue div-color-rarity"></div>
                            blue
                          </div>
                        </div>
                        <div>
                          <div className="div-color-info">
                            <div className="pong-purple div-color-rarity"></div>
                            purple
                          </div>
                        </div>
                      </div>
                    </div>{' '}
                  </div>
                </ReactTooltip>
              </div>
            </div>
            <div className="item-main">
              {loading ? (
                <div className="loadingSpiner">
                  <CircularProgress />
                </div>
              ) : (
                renderItemList()
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const totalContainer = () => css`
  /* 전역 */
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: start;
  gap: 20px;
  animation: 0.7s ease-in-out loadEffect1;

  .left-side-container {
    width: 35%;
    height: 100%;
  }
  .help-div {
    display: flex;
    align-items: flex-end;
    margin-bottom: 10%;
  }

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
    margin-left: 30px;
    border-radius: 20px;
  }

  .getItemList {
    width: 55%;
    height: 100%;
    margin: 0;
    margin-left: 30px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    border-radius: 20px;
  }

  .div-color {
    margin-bottom: 10px;
  }

  .div-color-info {
    display: flex;
    gap: 10px;
  }
  .div-color-rarity {
    border-radius: 100%;
    width: 18px;
    height: 18px;
  }

  .example {
    width: 35%;
    height: 100%;
    box-sizing: border-box;
    background-color: gray;
  }
  .rarity-div {
    display: flex !important;
    justify-content: flex-end !important;
    width: 50% !important;
    align-items: center !important;
  }
  .item-tap {
    width: 100%;
    height: 15%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
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
    width: 100%;
    height: 85%;
    border-radius: 0 0 20px 20px;
    text-align: left;
    border-bottom: 1px solid gray;
    border-left: 1px solid gray;
    border-right: 1px solid gray;
  }

  .pageTitle {
    text-align: left;
    font-size: 26px;
    font-weight: 700;
    display: inline-block;
    height: 40px;
  }

  .store-title-div {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .drawContainer {
    width: 100%;
    height: 380px;
    min-height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .sideContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    margin-bottom: 30px;
  }

  .myItemContainer {
    width: 100%;
    height: 40%;
    min-height: 380px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .image-box {
    position: relative;
    border-radius: 10%;
    border: 17px solid transparent;
    background-origin: border-box;
    background-clip: content-box, border-box;
    width: 90%;
    height: 75%;
    overflow: hidden;
    margin: 0 auto;
  }

  .video-icon {
    border-radius: 10px;
    background-color: #fcc97d;
    padding: 4px 25px;
  }

  .video-div {
    display: flex;
    justify-content: center;
    align-items: end;
    height: 36px;

    & > * {
      height: 24px;
    }
  }

  .image-thumbnail {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  hr {
    width: 100%;
    margin: 10px 0;
  }

  .draw {
    width: 20%;
    height: 80%;
    margin: 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    background: #fff1bd;
    border-radius: 20px;
    box-shadow: 0 0 3px 0 lightgray;

    p {
      font-weight: 700;
      font-size: 1.1vw;
      padding-right: 0.2rem;
    }

    .bobkkiCapsule {
      width: 60%;
      height: auto;
    }
  }

  .pongCount {
    width: 15%;
    padding: 10px 0px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: white;
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
    width: 80%;
    background-color: white;
    height: 15%;
    border-radius: 5px;
    border: 1px solid lightgray;
    margin-top: 5%;
    font-family: 'NanumSquareRound';
    font-weight: 700;
    box-shadow: 0 0 3px 0 lightgray;
    cursor: pointer;

    span {
      width: 100%;
      flex-direction: row;
      align-items: center;
      text-align: center;
      display: flex;
      justify-content: center;
    }
  }

  .loadingSpiner {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
