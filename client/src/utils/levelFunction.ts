const level = [
  'white',
  'yellow',
  'green',
  'blue',
  'purple',
  'rainbow',
  'rainbow',
];

const levelFunction = (point) => {
  let levelNum = 0;
  if (point >= 200) {
    levelNum = 6;
  } else if (point >= 150) {
    levelNum = 5;
  } else if (point >= 100) {
    levelNum = 4;
  } else if (point >= 50) {
    levelNum = 3;
  } else if (point >= 1) {
    levelNum = 2;
  } else levelNum = 1;
  return '/levels/' + level[levelNum - 1] + '.png';
};

export default levelFunction;
