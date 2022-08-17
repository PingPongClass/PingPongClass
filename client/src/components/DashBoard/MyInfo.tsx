import { css } from '@emotion/react';
import defaultProfile from '@assets/images/defaultProfile.jpeg';
import { useEffect, useState } from 'react';
import Ranking from './Ranking';
import EditIcon from '@mui/icons-material/Edit';
import { toast } from 'react-toastify';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useAppDispatch, useAppSelector } from '@src/store/hooks';
import { saveMember } from '@src/store/member';
import PlayArrow from '@mui/icons-material/PlayArrow';

interface StudentDataInterface {
  studentId: number;
  introduce: string;
}

const Myinfo = () => {
  const memberStore = useAppSelector((state) => state.member);
  const [totalRate, setTotalRate] = useState(0 as number);
  const [currentRate, setcurrentRate] = useState(0 as number);
  const [levelImg, setLevelImg] = useState('');
  const [isEdit, setIsEdit] = useState(false);
  const [introduce, setIntroduce] = useState(memberStore.introduce);
  const AXIOS = setupInterceptorsTo(axios.create());
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTotalRate(
      (memberStore.totalPoint /
        (memberStore.totalPoint + memberStore.levelPoint)) *
        100,
    );
    setcurrentRate(
      (memberStore.point / (memberStore.totalPoint + memberStore.levelPoint)) *
        100,
    );

    setLevelImg(
      '/levels/' + (memberStore.currentLevel + '').toLowerCase() + '.png',
    );
  }, []);

  const loadMember = () => {
    const timer = setTimeout(() => {
      setIsEdit(false);
    }, 500);
    dispatch(saveMember()).then(() => timer);
  };

  const onClickEdit = (e) => {
    setIsEdit(!isEdit);
  };

  const onChangeIntroduce = (e) => {
    setIntroduce(e.target.value);
  };

  const onEditIntroduce = (e) => {
    if (introduce == null) {
      toast.warning('자기소개를 입력해주세요.');
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

  const rankingRefresh = () => {
    return <Ranking />;
  };

  return (
    <div css={totalContainer(currentRate, totalRate)}>
      <div
        css={css`
          width: 100%;
          height: 50%;
        `}
      >
        <div className="infoContainer">
          <div className="info-left">
            {memberStore.profileFullPath ===
              'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null' ||
            memberStore.profileFullPath ===
              'https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/' ? (
              <img
                src={defaultProfile}
                alt="기본프로필사진"
                className="profile-logo"
              />
            ) : (
              <img
                src={memberStore.profileFullPath}
                alt="지정된프로필사진"
                className="profile-logo"
              />
            )}
            <div className="nameContainer">
              <h2>{memberStore.name} 학생</h2>
              <p style={{ fontSize: '0.95em' }}>
                <b>{memberStore.nextLevel}</b> 레벨까지 {memberStore.levelPoint}
                퐁퐁 남았어요!
              </p>
            </div>
          </div>
          <div className="level-div info-right">
            <img src={levelImg} alt="" className="level-img" />
            <div>
              <h2 className="level">{memberStore.currentLevel}</h2>
            </div>
          </div>
        </div>
        <div className="levelContainer">
          <div className="stickerContainer">
            <div className="soFarSticker" style={{ width: `${totalRate}%` }}>
              <div className="point-info">
                <div>누적 {memberStore.totalPoint}</div>
                <PlayArrow className="arrow-icon" />
              </div>
            </div>
            <div
              className="currentSticker"
              style={{ width: `${currentRate}%` }}
            >
              <div className="point-info">
                <div>현재 {memberStore.point}</div>
                <PlayArrow className="arrow-icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rankingContainer">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '98%',
            alignItems: 'flex-end',
            marginBottom: '2%',
          }}
        >
          <div style={{ width: '100%', fontWeight: 'bold', fontSize: '1.2em' }}>
            Ranking{' '}
          </div>
          <div
            style={{
              fontSize: '0.5em',
              marginLeft: '5%',
              width: '20%',
              textAlign: 'end',
            }}
          >
            오전 8:00 기준 랭킹
          </div>
        </div>
        {isEdit ? '자기소개 수정중' : rankingRefresh()}
      </div>
    </div>
  );
};

const totalContainer = (currentRate: number, totalRate: number) => css`
  width: 100%;
  height: 100%;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  border-radius: 20px;
  padding: 50px;
  box-shadow: -1px 2px 12px -3px gray;
  box-sizing: border-box;

  .infoContainer {
    width: 100%;
    height: 50%;
    margin-bottom: 5%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .infoContainer img {
    display: inline-block;
    height: auto;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.1s ease-in-out;
  }
  .infoContainer img:hover {
    transform: scale(1.2);
  }

  .info-left {
    display: flex;
  }

  .nameContainer {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .rankBox {
    width: 100px;
  }
  .myBio {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .nameBox {
    width: 300px;
    display: flex;
    flex-direction: row;
    justify-content: end;
  }

  .levelContainer {
    width: 100%;
    height: 17%;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-between;
  }

  .rankingContainer {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
    margin-top: 2%;
  }

  img.profile-logo {
    width: 80px;
    height: 80px;
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
    justify-content: space-between;
    transition: all 0.1s ease-in-out;
  }

  .myRanking {
    width: 100%;
    height: 40px;
    background-color: #f1f5ff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
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

  .level {
    margin: 0;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: end;
  }

  .stickerContainer {
    position: relative;
    width: 100%;
    height: 30px;
    border-radius: 20px;
    background-color: #d1d1d1;
  }
  .soFarSticker {
    position: relative;
    height: 100%;
    background-color: #ffe790;
    border-radius: 20px;
    z-index: 1;
    text-align: right;
    animation: barIn2 0.6s;
  }
  .currentSticker {
    position: absolute;
    top: 0;
    height: 100%;
    background-color: #fdb878;
    border-radius: 20px;
    z-index: 99;
    animation: barIn 0.6s;
    text-align: right;
  }
  .point-info {
    height: 30px;
    width: 76px;
    font-weight: 600;
    color: var(--text-dark);
    position: absolute;
    top: -39px;
    right: -28px;
    font-size: 0.9em;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .arrow-icon {
    font-size: 1.2em;
    transform: rotate(90deg);
  }

  img {
    border: 1px solid gray;
    border-radius: 100px;
    width: 80px;
    height: 30%;
  }

  .level-div {
    display: flex;
    flex-direction: row;
    margin-right: 13px;
    align-items: flex-end;
    height: 100%;
  }

  .level-img {
    border: none;
    height: 100%;
    width: 29px;
    margin-right: 6px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  @keyframes barIn {
    from {
      width: 0%;
    }
    to {
      width: ${currentRate}%;
    }
  }

  @keyframes barIn2 {
    from {
      width: 0%;
    }
    to {
      width: ${totalRate}%;
    }
  }
`;

export default Myinfo;
