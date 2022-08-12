/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useAppSelector } from '@src/store/hooks';
import loadingImg from '@src/openvidu/assets/images/loadingimg.gif';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';

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
  const [rankingList, setRankingList] = useState<RankingInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(false);
  const [introduce, setIntroduce] = useState(memberStore.introduce);
  const loadRankingList = async () => {
    await AXIOS.get(`/students/ranking/`)
      .then(function (response) {
        setRankingList(response.data);
        console.log(response.data);
      })
      .catch(function (error) {
        console.log('실패', error);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    loadRankingList().then(() => timer);
  }, []);

  const toggleNotice = (e: React.MouseEvent<HTMLElement>) => {
    // onCLick 이벤트
    setVisible(!visible);
  };

  const onClickEdit = (e) => {
    setIsEdit(!isEdit);
  };

  const onChangeIntroduce = (e) => {
    setIntroduce(e.target.value);
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
          location.reload();
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
        <div className="ranking" style={{ borderTop: ' #d0d0d0 1px solid' }}>
          <div className="rankingInfo">
            <div className="rankBox">{rankingList[0].rankNum}위</div>
            <div className="nameBox">
              {rankingList[0].name} [{rankingList[0].totalPoint} 퐁퐁]
            </div>
            <div className="myBio">
              {rankingList[0].studentId === memberStore.userId && isEdit && (
                <input
                  style={{
                    height: '35px',
                    width: '70%',
                  }}
                  value={introduce}
                  onChange={(e) => onChangeIntroduce(e)}
                />
              )}

              {rankingList[0].studentId === memberStore.userId && !isEdit && (
                <p>
                  {rankingList[0].introduce
                    ? rankingList[0].introduce
                    : '자기소개가 없습니다.'}
                </p>
              )}
              {rankingList[0].studentId !== memberStore.userId && (
                <p>
                  {rankingList[0].introduce
                    ? rankingList[0].introduce
                    : '자기소개가 없습니다.'}
                </p>
              )}
            </div>
          </div>
          {rankingList[0].studentId === memberStore.userId && !isEdit && (
            <button onClick={onClickEdit}>
              <EditIcon />
            </button>
          )}
          {rankingList[0].studentId === memberStore.userId && isEdit && (
            <button onClick={onEditIntroduce}>수정</button>
          )}
          {rankingList[0].studentId === memberStore.userId && isEdit && (
            <button onClick={onClickEdit} style={{ color: 'red' }}>
              취소
            </button>
          )}
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
        <div className={!visible ? 'dropDownEmpty' : 'dropDownContainer'}>
          {visible &&
            rankingList.map((ranking, index) => {
              if (index >= 1 && index % 2 == 0) {
                return (
                  <div className="ranking" key={index}>
                    <div className="rankingInfo">
                      <div className="rankBox">{ranking.rankNum}위</div>
                      <div className="nameBox">
                        {ranking.name} [{ranking.totalPoint} 퐁퐁]
                      </div>
                      <div className="myBio">
                        {ranking.studentId === memberStore.userId && isEdit && (
                          <input
                            style={{
                              height: '35px',
                              width: '70%',
                            }}
                            value={introduce}
                            onChange={(e) => onChangeIntroduce(e)}
                          />
                        )}
                        {ranking.studentId === memberStore.userId &&
                          !isEdit && (
                            <p>
                              {ranking.introduce
                                ? ranking.introduce
                                : '자기소개가 없습니다.'}
                            </p>
                          )}
                        {ranking.studentId !== memberStore.userId && (
                          <p>
                            {ranking.introduce
                              ? ranking.introduce
                              : '자기소개가 없습니다.'}
                          </p>
                        )}
                      </div>
                    </div>
                    {ranking.studentId === memberStore.userId && !isEdit && (
                      <button>
                        <EditIcon onClick={onClickEdit} />
                      </button>
                    )}
                    {ranking.studentId === memberStore.userId && isEdit && (
                      <button onClick={onEditIntroduce}>수정</button>
                    )}
                    {ranking.studentId === memberStore.userId && isEdit && (
                      <button onClick={onClickEdit} style={{ color: 'red' }}>
                        취소
                      </button>
                    )}
                  </div>
                );
              }

              if (index >= 1 && index % 2 == 1) {
                return (
                  <div className="rankingLow" key={index}>
                    <div className="rankingInfo">
                      <div className="rankBox">{ranking.rankNum}위</div>
                      <div className="nameBox">
                        {ranking.name} [{ranking.totalPoint} 퐁퐁]
                      </div>
                      <div className="myBio">
                        {ranking.studentId === memberStore.userId && isEdit && (
                          <input
                            style={{
                              height: '35px',
                              width: '70%',
                            }}
                            value={introduce}
                            onChange={(e) => onChangeIntroduce(e)}
                          />
                        )}
                        {ranking.studentId === memberStore.userId &&
                          !isEdit && (
                            <p>
                              {ranking.introduce
                                ? ranking.introduce
                                : '자기소개가 없습니다.'}
                            </p>
                          )}
                        {ranking.studentId !== memberStore.userId && (
                          <p>
                            {ranking.introduce
                              ? ranking.introduce
                              : '자기소개가 없습니다.'}
                          </p>
                        )}
                      </div>
                    </div>
                    {ranking.studentId === memberStore.userId && !isEdit && (
                      <button>
                        <EditIcon onClick={onClickEdit} />
                      </button>
                    )}
                    {ranking.studentId === memberStore.userId && isEdit && (
                      <button onClick={onEditIntroduce}>수정</button>
                    )}
                    {ranking.studentId === memberStore.userId && isEdit && (
                      <button onClick={onClickEdit} style={{ color: 'red' }}>
                        취소
                      </button>
                    )}
                  </div>
                );
              }
            })}
        </div>
        <div className="rankingLow">
          <div className="rankingInfo">
            <div className="rankBox">{rankingList[1].rankNum}위</div>
            <div className="nameBox">
              {rankingList[1].name} [{rankingList[1].totalPoint} 퐁퐁]
            </div>
            <div className="myBio">
              {rankingList[1].studentId === memberStore.userId && isEdit && (
                <input
                  style={{
                    height: '35px',
                    width: '70%',
                  }}
                  value={introduce}
                  onChange={(e) => onChangeIntroduce(e)}
                />
              )}
              {rankingList[1].studentId === memberStore.userId && !isEdit && (
                <p>
                  {rankingList[1].introduce
                    ? rankingList[1].introduce
                    : '자기소개가 없습니다.'}
                </p>
              )}
              {rankingList[1].studentId !== memberStore.userId && (
                <p>
                  {rankingList[1].introduce
                    ? rankingList[1].introduce
                    : '자기소개가 없습니다.'}
                </p>
              )}
            </div>
          </div>
          {rankingList[1].studentId === memberStore.userId && !isEdit && (
            <button>
              <EditIcon onClick={onClickEdit} />
            </button>
          )}
          {rankingList[1].studentId === memberStore.userId && isEdit && (
            <button onClick={onEditIntroduce}>수정</button>
          )}
          {rankingList[1].studentId === memberStore.userId && isEdit && (
            <button onClick={onClickEdit} style={{ color: 'red' }}>
              취소
            </button>
          )}
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

  .outRankingContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
  }

  .rankBox {
    width: 100px;
  }
  .myBio {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .nameBox {
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: end;
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
    background-color: #f2f2f2;
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
    width: 80%;
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
    z-index: 9999;
    padding: 0 20px 20px 20px;
    border-radius: 0 0 20px 20px;
    box-shadow: 0px 20px 15px 0px;
  }

  .dropDownEmpty {
    padding: 0;
  }

  button {
    background-color: transparent;
    border: none;
  }
`;

export default Ranking;
