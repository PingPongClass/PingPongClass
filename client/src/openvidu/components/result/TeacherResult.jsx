import { css } from '@emotion/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import InterceptedAxios from '@src/utils/iAxios';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

const TeacherResult = ({
  teacherName,
  classTitle,
  whoami,
  myData,
  othersData,
  finTime,
  classId,
  studentList,
  studentInfo,
}) => {
  console.log(myData);
  console.log(othersData);
  const [attStudentNum, setAttStudentNum] = useState(0);
  const [totalSticker, setTotalSticker] = useState(0);

  console.log(studentList.length);

  const applyToDB = async () => {
    try {
      const promises = othersData.map(async (elem) => {
        InterceptedAxios.patch(
          `/students/points/${elem.point}?studentId=${elem.uid}`,
        );
      });
      await Promise.all(promises);
      console.log('DB에 포인트들 저장 완료~');
    } catch (e) {
      alert(
        '오류가 발생하여 정상적으로 저장되지 않았습니다. 행정실에 문의하세요.',
      );
    }
  };

  useEffect(() => {
    setAttStudentNum(othersData.length); // 참여자 수
    setTotalSticker(othersData.reduce((acc, cur) => (acc += cur.point), 0)); // 총 부여 스티커 계산식

    console.log(totalSticker);
  }, [whoami, myData, othersData, totalSticker]);

  // 스크롤 처리 해야함

  const data = [
    { name: '참여 학생', value: attStudentNum },
    { name: '미참여 학생', value: studentList.length - attStudentNum },
  ];

  const renderCustomizedLabel = ({
    cx,
    cy,
    value,
    outerRadius,
    fill,
    midAngle,
    index,
    name,
  }) => {
    const RADIAN = Math.PI / 180;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';
    return (
      <g>
        <text x={cx} y={cy} dy={8} textAnchor="middle">
          출석 통계
        </text>
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          fill="#333"
        >{`${name} : ${value}명`}</text>
      </g>
    );
  };

  const COLORS = [
    '#81a5f9',
    '#f3ab7e',
    '#6cb07d',
    '#7f67a1',
    '#71c4c1',
    '#ecd691',
  ];

  return (
    <div css={BackgroundContainer}>
      <div className="triangles">
        <div className="triangle1" />
        <div className="triangle2" />
      </div>
      <div className="parent">
        <div className="child">
          <div className="container">
            <div className="circles">
              <div className="circle1" />
              <div className="circle2" />
              <div className="circle3" />
            </div>
            <hr />
            <div className="sideContainer">
              <div css={TotalContainer}>
                <h2>고생하셨습니다 {teacherName} 선생님!</h2>
                <br />
                <div css={ClassStatistic}>
                  <h3 style={{ margin: '0' }}>수업 통계</h3>
                  <div className="classContainer">
                    <div className="teacherResult">
                      <div className="teacher index">
                        <div className="t-classname">수업 이름</div>
                        <div className="t-nickname">선생님 이름</div>
                        <div className="t-attendence-time">수업 개설 시간</div>
                        <div className="t-fin-time">수업 종료 시간</div>
                        <div className="t-point">총 부여 상점</div>
                      </div>
                      <div className="teacher">
                        <div className="t-classname">{classTitle}</div>
                        <div className="t-nickname">{teacherName}</div>
                        <div className="t-attendence-time">
                          {myData.attendenceTime}
                        </div>
                        <div className="t-fin-time">{finTime}</div>
                        <div className="t-point">{totalSticker}</div>
                      </div>
                    </div>
                    <div className="teacherResultChart">
                      <PieChart width={490} height={200}>
                        <Pie
                          label={renderCustomizedLabel}
                          data={data}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                      </PieChart>
                    </div>
                  </div>
                </div>
                <div css={TotalResult}>
                  <h3 style={{ margin: '0' }}>학생 통계</h3>
                  <div className="studentContainer">
                    <div className="studentResult">
                      <div className="person index">
                        <div className="s-nickname">닉네임</div>
                        <div className="s-attendence-time">최종 출석 시간</div>
                        <div className="s-point">상점</div>
                      </div>
                      {othersData.map((other, i) => (
                        <div key={i} className="person">
                          <div className="s-nickname">{other.nickname}</div>
                          <div className="s-attendence-time">
                            {other.attendenceTime}
                          </div>
                          <div className="s-point">{other.point}</div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <BarChart
                        width={450}
                        height={270}
                        data={othersData}
                        margin={{
                          top: 24,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="nickname" style={{ fontSize: '9pt' }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="point"
                          fill="#333"
                          label={{ position: 'top' }}
                          background={{ fill: '#eee' }}
                        >
                          {othersData.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % 20]}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </div>
                  </div>
                </div>
                <div css={OtherThings}>
                  <a href="/teacher">
                    <button onClick={applyToDB}>저장 후 돌아가기</button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const BackgroundContainer = css`
  background-color: #ffffff;
  opacity: 0.8;
  background-image: linear-gradient(#929292 1px, transparent 1px),
    linear-gradient(to right, #929292 1px, #ffffff 1px);
  background-size: 30px 30px;
  height: 100vh;
  position: relative;

  button {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    background: var(--pink);
    border: none;
    font-family: 'NanumSquareRound';
    font-size: 13pt;
    color: white;
    font-weight: 700;
    text-decoration-line: none;
    margin-top: 15px;
  }

  .triangles {
    position: absolute;
    width: 100%;
    height: 100%;

    div {
      width: 0px;
      height: 0px;
    }

    .triangle1 {
      border-bottom: 40vh solid #bdcde5;
      border-left: 0px solid transparent;
      border-right: 100vw solid transparent;
      transform: scaleY(-1);
    }

    .triangle2 {
      position: absolute;
      top: 60%;
      border-bottom: 40vh solid #f8cbd3;
      border-left: 100vw solid transparent;
      border-right: 0px solid transparent;
    }
  }

  .child {
    position: absolute;
    width: 79.8vw;
    height: 83vh;
    left: 0.5vw;
    top: -0.5vh;

    border-radius: 20px;

    background-color: white;

    border: 2px solid #000000;
  }

  .parent {
    position: relative;
    width: 80vw;
    height: 84vh;
    left: 9.8vw;
    top: 8vh;

    border-radius: 20px;

    background-color: #fff1bf;

    border: 2px solid #001111;
  }

  .container {
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: start;
  }

  .sideContainer {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 78vh;
    vertical-align: center;
  }

  hr {
    width: 100%;
    height: 2px;
    border: 0;
    background-color: black;
  }

  .circles {
    display: flex;
    flex-direction: row;
    justify-content: end;
    margin: 10px 10px 0 10px;
    div {
      border: 2px solid black;
      width: 10px;
      height: 10px;
      border-radius: 75px;
      background-color: #000000;
      float: left;
    }

    .circle1 {
      background-color: #96ba85;
    }

    .circle2 {
      background-color: #ffe381;
      margin-left: 0.3rem;
    }

    .circle3 {
      background-color: #ef8181;
      margin-left: 0.3rem;
    }
  }
`;

const TotalContainer = css`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ClassStatistic = css`
  width: 70%;
  height: 35%;
  border-radius: 20px;
  margin-top: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  justify-content: center;

  .classContainer {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
  }
  .teacherResult {
    display: flex;
    flex-direction: row;
    background: #fff7d9;
    margin-right: 20px;
    border-radius: 5px;
  }

  h3 {
    text-align: center;
  }

  .teacher {
    display: flex;
    flex-direction: column;

    & > div {
      display: flex;
      margin: 0.7rem;
      height: 0.5rem;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    & > .t-classname {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }

    & > .t-nickname {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }

    & > .t-attendence-time,
    .t-fin-time {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }

    & > .t-point,
    .t-student-number,
    .t-att-student-number {
      display: flex;
      width: 100px;
      justify-content: center;
      align-items: center;
    }
  }

  .index {
    font-weight: 700;
  }
`;

const TotalResult = css`
  width: 70%;
  height: 45%;
  border-radius: 20px;
  margin-top: 10px;
  align-items: center;
  display: flex;
  flex-direction: column;
  border: 1px solid lightgray;
  justify-content: center;

  .studentContainer {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .studentResult {
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 80%;
    background: #fff7d9;
    margin-right: 20px;
    border-radius: 5px;
  }

  h3 {
    text-align: center;
  }

  .person {
    display: flex;
    flex-direction: row;

    & > div {
      display: flex;
      margin: 0.7rem;
      height: 0.5rem;
      align-items: center;
      justify-content: center;
      text-align: center;
    }

    & > .s-nickname {
      display: flex;
      width: 150px;
      justify-content: center;
      align-items: center;
    }

    & > .s-attendence-time {
      display: flex;
      width: 150px;
      justify-content: center;
      align-items: center;
    }

    & > .s-point {
      display: flex;
      width: 150px;
      justify-content: center;
      align-items: center;
    }
  }

  .index {
    font-weight: 700;
  }
`;

const OtherThings = css``;

export default TeacherResult;
