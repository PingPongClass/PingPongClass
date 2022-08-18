import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import loadingImg from '@openvidu/assets/images/loadingimg.gif';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import { saveMember } from '@store/member';
import { TextField } from '@mui/material';
import levelFunction from '@utils/levelFunction';

interface RankingInterface {
  rankNum: number;
  studentId: number;
  name: string;
  totalPoint: number;
  introduce: string;
}

interface StudentDataInterface {
  studentId: number;
  introduce: string;
}

const Ranking = () => {
  const AXIOS = setupInterceptorsTo(axios.create());
  const memberStore = useAppSelector((state) => state.member);
  const [visible, setVisible] = useState(false);
  const [rankingList, setRankingList] = useState<RankingInterface[]>([
    { rankNum: 0, studentId: 0, name: '', totalPoint: 0, introduce: '' },
  ]);
  const [myRanking, setMyRanking] = useState<RankingInterface>();
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [introduce, setIntroduce] = useState(memberStore.introduce);
  const dispatch = useAppDispatch();

  const loadRankingList = async () => {
    await AXIOS.get(`/students/ranking/`)
      .then(function (response) {
        //랭킹 리스트 저장
        setRankingList(response.data);

        //내 랭킹 정보 저장
        response.data.forEach((element) => {
          if (element.studentId === memberStore.userId) {
            setMyRanking(element);
          }
        });
      })
      .catch(function (error) {
        console.log('실패', error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    loadRankingList().then(() => timer);
  }, []);

  const toggleNotice = (e: React.MouseEvent<HTMLElement>) => {
    // onCLick 이벤트
    setVisible(!visible);
  };

  const onClickEdit = () => {
    setIsEdit(!isEdit);
  };

  const onChangeIntroduce = (e) => {
    setIntroduce(e.target.value);
  };

  const loadMember = () => {
    const timer = setTimeout(() => {
      loadRankingList();
      setIsEdit(false);
    }, 500);
    dispatch(saveMember()).then(() => timer);
  };

  const onEditIntroduce = (e) => {
    if (introduce == null) {
      toast.warning('자개소개를 입력해주세요.');
    } else {
      const frm = new FormData();
      let student: StudentDataInterface;
      student = {
        studentId: memberStore.userId,
        introduce: introduce,
      };
      const studentString = JSON.stringify(student);
      frm.append(
        'student',
        new Blob([studentString], { type: 'application/json' }),
      );

      AXIOS.post('/students/modify', frm, {
        headers: {
          'Content-Type': `multipart/form-data`,
        },
      })
        .then(function (response) {
          alert('정보 수정에 성공하였습니다.');
          loadMember();
        })
        .catch(function (error) {
          console.log(error);
          toast.error('정보 수정에 실패하였습니다.');
        });
    }
  };

  const render = () => {
    return (
      <div className="outRankingContainer">
        {/* 내랭킹 */}
        <div className="myRanking">
          <div className="rankingInfo">
            <div className="rankBox">
              <img src={'rank/rank0.png'} alt="" className="rankNumImg" />
              <p className="rankNum">{myRanking?.rankNum}위</p>
            </div>

            <div className="nameBox">
              <img
                src={levelFunction(myRanking?.totalPoint)}
                style={{
                  height: '60%',
                  border: 'none',
                  width: 'auto',
                  marginRight: '5%',
                }}
                alt=""
              />
              {myRanking?.name}{' '}
              <span className="ranking-pongpong">
                {myRanking?.totalPoint}퐁퐁이
              </span>
            </div>

            <div className="myBio">
              {isEdit && (
                <TextField
                  id="standard-basic"
                  variant="standard"
                  value={introduce}
                  onChange={onChangeIntroduce}
                  style={{
                    height: '35px',
                    width: '70%',
                    fontFamily: 'NanumSquareRound',
                    padding: '4px 16px',
                  }}
                />
              )}
              {!isEdit && (
                <p>
                  {myRanking?.introduce
                    ? myRanking?.introduce
                    : '자기소개가 없습니다.'}
                </p>
              )}
            </div>
          </div>
          {!isEdit && (
            <button onClick={onClickEdit}>
              <EditIcon style={{ fontSize: '1.2rem' }} />
            </button>
          )}

          {isEdit && (
            <div className="myrank-btn-div">
              <button onClick={onEditIntroduce} className="myrank-btn">
                수정
              </button>
              <button
                onClick={onClickEdit}
                style={{ color: 'red' }}
                className="myrank-btn"
              >
                취소
              </button>
            </div>
          )}
        </div>

        {/* 토글 안했을때 보이는 랭킹 부분 */}
        {!visible ? (
          <div className="ranking" style={{ borderTop: ' #d0d0d0 1px solid' }}>
            <div className="rankingInfo">
              <div className="rankBox">
                <img
                  src={'rank/rank' + rankingList[0].rankNum + '.png'}
                  alt=""
                  className="rankNumImg"
                />
                <p className="rankNum">{rankingList[0].rankNum}위</p>
              </div>
              <div className="nameBox">
                <img
                  src={levelFunction(rankingList[0].totalPoint)}
                  style={{
                    height: '60%',
                    border: 'none',
                    width: 'auto',
                    marginRight: '5%',
                  }}
                  alt=""
                />
                {rankingList[0].name}
                <span className="ranking-pongpong">
                  {rankingList[0].totalPoint}퐁퐁이
                </span>
              </div>
              <div className="myBio">
                <p>
                  {rankingList[0].introduce
                    ? rankingList[0].introduce
                    : '자기소개가 없습니다.'}
                </p>
              </div>
            </div>

            {!visible && (
              <button onClick={toggleNotice}>
                <ArrowDropDownIcon />
              </button>
            )}
            {visible && (
              <button onClick={toggleNotice}>
                <ArrowDropUpIcon />
              </button>
            )}
          </div>
        ) : null}
        {/* 드롭다운시 */}
        <div className={!visible ? 'dropDownEmpty' : 'dropDownContainer'}>
          {visible &&
            rankingList.map((ranking, index) => {
              if (index < 10) {
                return (
                  <div
                    className={index % 2 == 1 ? 'even ranking' : 'ranking'}
                    key={index}
                  >
                    <div className="rankingInfo" style={{ height: '100%' }}>
                      <div className="rankBox">
                        <img
                          src={
                            'rank/rank' + rankingList[index].rankNum + '.png'
                          }
                          alt=""
                          className="rankNumImg"
                        />
                        <p className="rankNum">
                          {rankingList[index].rankNum}위
                        </p>
                      </div>
                      <div className="nameBox" style={{ height: '100%' }}>
                        <img
                          src={levelFunction(ranking.totalPoint)}
                          style={{
                            height: '60%',
                            border: 'none',
                            width: 'auto',
                            marginRight: '5%',
                          }}
                          alt=""
                        />
                        {ranking.name}
                        <span className="ranking-pongpong">
                          {ranking.totalPoint}퐁퐁이
                        </span>
                      </div>
                      <div className="myBio">
                        <p>
                          {ranking.introduce
                            ? ranking.introduce
                            : '자기소개가 없습니다.'}
                        </p>
                      </div>
                    </div>

                    {index === 0 && !visible && (
                      <button onClick={toggleNotice}>
                        <ArrowDropDownIcon />
                      </button>
                    )}
                    {index === 0 && visible && (
                      <button onClick={toggleNotice}>
                        <ArrowDropUpIcon />
                      </button>
                    )}
                  </div>
                );
              }
            })}
        </div>
      </div>
    );
  };

  return (
    <div css={totalContainer}>
      {loading ? (
        <div className="loadingImgBox">
          <p>로딩중...</p>
          <img src={loadingImg} alt="" style={{ border: 'none' }} />
        </div>
      ) : (
        render()
      )}
    </div>
  );
};

const totalContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    font-family: 'NanumSquareRound';
  }

  .outRankingContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .rankBox {
    height: 100%;
    display: flex;
    width: 15% !important;
    align-items: center;
  }
  img.rankNumImg {
    height: 80%;
    width: auto;
    border: none;
    object-fit: contain;
    margin-right: 7%;
  }
  p.rankNum {
    font-weight: bold;
    font-size: 1.1em;
  }

  .even {
    background-color: #f3f7ff;
  }

  .myBio {
    width: 50% !important;
    display: flex;
    flex-direction: row;
    justify-content: flex-start !important;
    font-size: 0.9em;
  }
  .nameBox {
    width: 30% !important;
    display: flex;
    flex-direction: row;
    justify-content: flex-start !important;
    align-items: center;
    height: 100%;
  }

  .myrank-btn-div {
    width: 10%;
  }

  .myrank-btn {
    font-weight: 400;
    padding-right: 5%;
  }
  .ranking {
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    transition: all 0.1s ease-in-out;
  }
  .ranking:hover {
    transform: scale(1.04);
  }

  .rankingLow {
    width: 100%;
    height: 40px;
    background-color: #f4f6f8;
    border-top: #d0d0d0 1px solid;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: start;
    transition: all 0.1s ease-in-out;
  }
  .rankingLow:hover {
    transform: scale(1.04);
  }

  .rankingInfo {
    height: 100%;
    width: 95%;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .loadingImgBox {
    width: 80px;
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border: none;
  }

  .dropDownContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    background-color: white;
    z-index: 990;
    padding: 0 20px 20px 20px;
    border-radius: 0 0 20px 20px;
    box-shadow: -1px 2px 12px -3px grey;
  }

  .dropDownEmpty {
    padding: 0;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
  span.ranking-pongpong {
    margin-left: 2%;
    font-size: 0.8em;
    color: #696969;
  }
`;

export default Ranking;
