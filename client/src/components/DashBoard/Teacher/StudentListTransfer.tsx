import * as React from 'react';
import { css } from '@emotion/react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { setupInterceptorsTo } from '@src/utils/AxiosInterceptor';
import { useState, useEffect } from 'react';
import MenuItem from '@mui/material/MenuItem';

function not(a: any, b: any) {
  return a.filter((value) => !b.includes(value));
}

function intersection(a: any, b: any) {
  return a.filter((value) => b.includes(value));
}

function union(a: any, b: any) {
  return [...a, ...not(b, a)];
}

const info = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 2,
    label: '2',
  },
  {
    value: 3,
    label: '3',
  },
];

export default function TransferList(props: { ChangeStudentList: Function }) {
  const [checked, setChecked] = useState([] as any);
  const [left, setLeft] = useState([] as any);
  const [right, setRight] = useState([] as any);
  const [studentGrade, setStudentGrade] = useState(0);
  const [studentClassNum, setStudentClassNum] = useState(0);
  const [studentName, setStudentName] = useState('');

  const AXIOS = setupInterceptorsTo(axios.create());
  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const ChangeStudentGrade = (data: any) => {
    setStudentGrade(+data);
  };
  const ChangeStudentClassNum = (data: any) => {
    setStudentClassNum(+data);
  };
  const ChangeStudentName = (data: any) => {
    setStudentName(data);
  };

  useEffect(() => {
    const finalList = right.slice().map((e) => e.slice(0, 10));
    props.ChangeStudentList(finalList);
  }, [right]);

  const SearchStudentList = async () => {
    let data: any = {};
    if (studentClassNum !== 0) {
      data.classNum = studentClassNum;
    }
    if (studentGrade !== 0) {
      data.grade = studentGrade;
    }
    if (studentName !== '') {
      data.name = studentName;
    }
    const result = await AXIOS.get('/students', { params: data });
    const nameList = Array.from(
      { length: result.data.length },
      (v, i) =>
        `${result.data[i].studentId} ${result.data[i].name} ${result.data[i].grade}학년 ${result.data[i].classNum}반 ${result.data[i].studentNum}번 `,
    );
    const leftList = not(nameList, right);
    setLeft(leftList);
  };

  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly number[]) =>
    intersection(checked, items).length;

  const handleToggleAll = (items: readonly number[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly number[]) => (
    <Card className="searchList">
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              'aria-label': 'all items selected',
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} 선택`}
      />
      <Divider />
      <List
        sx={{
          width: 310,
          height: 250,
          bgcolor: 'background.paper',
          overflow: 'auto',
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: any) => {
          const labelId = `transfer-list-all-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={value.slice(11, -1)} />
            </ListItem>
          );
        })}
        <ListItem />
      </List>
    </Card>
  );

  return (
    <div css={totalContainer}>
      <div className="studentSearch">
        <TextField
          onChange={(e) => ChangeStudentGrade(e.target.value)}
          id="outlined-basic"
          label="학년"
          select
          fullWidth
          size="small"
        >
          {info.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          onChange={(e) => ChangeStudentClassNum(e.target.value)}
          id="outlined-basic"
          label="반"
          select
          fullWidth
          size="small"
        >
          {info.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          onChange={(e) => ChangeStudentName(e.target.value)}
          id="outlined-basic"
          label="이름"
          size="small"
          fullWidth
        />
        <button
          className="listButton blue"
          onClick={() => {
            SearchStudentList();
          }}
        >
          학생검색
        </button>
      </div>
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList('검색 결과', left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedRight}
              disabled={leftChecked.length === 0}
              aria-label="수업 명단으로 이동"
            >
              &gt;
            </Button>
            <Button
              sx={{ my: 0.5 }}
              variant="outlined"
              size="small"
              onClick={handleCheckedLeft}
              disabled={rightChecked.length === 0}
              aria-label="수업 명단에서 제외"
            >
              &lt;
            </Button>
          </Grid>
        </Grid>
        <Grid item>{customList('수업 명단', right)}</Grid>
      </Grid>
    </div>
  );
}
const totalContainer = css`
  width: 100%;
  .searchList {
    border-radius: 10px;
    height: 1.1px;
    border: 1px solid lightgray;
    height: 300px;
  }
`;
