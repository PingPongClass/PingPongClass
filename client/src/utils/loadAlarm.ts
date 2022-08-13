import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';

const timeTable = {
  1: 910,
  2: 1005,
  3: 1100,
  4: 1240,
  5: 1340,
  6: 1435,
  7: 1530,
  8: 1625,
};

const loadAlarm = async (props: any) => {
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const dt = new Date();
  //const nowTime = +`${dt.getHours()}${dt.getMinutes()}`;
  const nowTime = 905;
  const today = `${dt.getMonth()}.${dt.getDate()}`;
  const userId = props.id;
  const userName = props.name;
  const classDay = 1;
  const result = await InterceptedAxios.get(`/classes`, {
    params: { id: userId, day: classDay },
  });
  const classes = result.data.content;
  const pk = `${today}:${userId}`;
  let data = [] as any;

  const historyDate = JSON.parse(localStorage.getItem('pk') as any);
  if (!historyDate || historyDate !== pk) {
    localStorage.setItem('pk', JSON.stringify(pk));
    localStorage.setItem('alarms', JSON.stringify([]));
    localStorage.setItem('removed', JSON.stringify([]));
  }

  const greeting = {
    title:
      userId > 2022000000
        ? `반갑습니다! ${userName} 학생`
        : `반갑습니다! ${userName} 선생님`,
    msg: `오늘 수업은${classes.length}개 입니다`,
    sort: 'greeting',
  };

  const getList = JSON.parse(localStorage.getItem('removed') as any);
  if (!getList) {
    const removedAlarms = [] as any;
    localStorage.setItem('removed', JSON.stringify(removedAlarms));
    data.push(greeting);
    for (let i of classes) {
      if (timeTable[i.timetableId] - nowTime === 10) {
        data.push({
          title: i.classTitle,
          msg: '수업 10분전입니다.',
          sort: `${i.classId}10`,
        });
      }
      if (timeTable[i.timetableId] - nowTime === 5) {
        data.push({
          title: i.classTitle,
          msg: '수업 5분전입니다.',
          sort: `${i.classId}05`,
        });
      }
    }
  } else {
    const removedAlarms = getList;
    if (!removedAlarms.includes('greeting')) {
      data.push(greeting);
    }
    for (let i of classes) {
      if (
        timeTable[i.timetableId] - nowTime === 10 &&
        !removedAlarms.includes(`${i.classId}10`)
      ) {
        data.push({
          title: i.classTitle,
          msg: '수업 10분전입니다.',
          sort: `${i.classId}10`,
        });
      }
      if (
        timeTable[i.timetableId] - nowTime === 5 &&
        !removedAlarms.includes(`${i.classId}05`)
      ) {
        data.push({
          title: i.classTitle,
          msg: '수업 5분전입니다.',
          sort: `${i.classId}05`,
        });
      }
    }

    localStorage.setItem('alarms', JSON.stringify(data));
  }
};

export default loadAlarm;
