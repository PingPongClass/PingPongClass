import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { setupInterceptorsTo } from '@utils/AxiosInterceptor';

export interface Authorities {
  authorityName: string;
}

export interface Item {
  itemId: number;
  cnt: number;
}

export interface Subject {
  code: number;
  title: string;
}

export interface Member {
  userId: number;
  name: string;
  email: string;
  // profile: string; // fullpath만 있으면 됨
  profileFullPath: string;

  // 학생만
  grade?: number;
  classNum?: number;
  studentNum?: number;
  introduce?: string;
  point?: number;
  totalPoint?: number;
  currentLevel?: string;
  nextLevel?: string;
  levelPoint?: number;
  myRank?: number;

  items?: Item[];
  subjects?: Subject[];

  // 선생, 관리자만
  birth?: string;
  manageGrade?: number;
  authorities?: Authorities[];
  isAdmin?: number;
}

export interface StudentMember
  extends Omit<Member, 'birth' | 'manageGrade' | 'authorities' | 'isAdmin'> {}

export interface TeacherMember
  extends Pick<
    Member,
    | 'userId'
    | 'name'
    | 'email'
    | 'profileFullPath'
    | 'birth'
    | 'manageGrade'
    | 'authorities'
    | 'isAdmin'
  > {}

const initialState = {
  userId: -1,
  name: '',
  email: '',
  profileFullPath: '',

  // 학생만
  grade: -1,
  classNum: -1,
  studentNum: -1,
  introduce: '소개 없음',
  point: 0,
  totalPoint: 0,
  currentLevel: '',
  nextLevel: '',
  levelPoint: 0,
  myRank: 0,

  items: [
    {
      itemId: 0,
      cnt: 0,
    },
  ],
  subjects: [
    {
      code: -1,
      title: '모두 조회',
    },
  ],
  // 선생, 관리자만
  birth: '',
  manageGrade: 0,
  authorities: [
    {
      authorityName: '권한없음',
    },
  ],
  isAdmin: 0,
};

export const saveMember = createAsyncThunk('saveMember', async (id: number) => {
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  let query = '/teachers/' + id.toString();
  if (id.toString.length == 10) {
    query = '/students/' + id.toString();
  }

  const uData = await InterceptedAxios.get(query);
  const userData = uData.data;

  const { teacherId: tId, ...fUserData } = userData;
  const { studentId: sId, ...formattedUserData } = fUserData;

  if (userData.teacherId) {
    formattedUserData.userId = userData.teacherId;
  } else {
    formattedUserData.userId = userData.studentId;
  }

  return formattedUserData;
});

const convert = (action: PayloadAction<any>) => {
  const newMember = {
    userId: action.payload.userId,
    name: action.payload.name,
    email: action.payload.email,
    profileFullPath: action.payload.profileFullPath,
    grade: action.payload?.grade ? action.payload?.grade : 0,
    classNum: action.payload?.classNum ? action.payload?.classNum : 0,
    studentNum: action.payload?.studentNum ? action.payload?.studentNum : 0,
    introduce: action.payload?.introduce ? action.payload?.introduce : '',
    point: action.payload?.point ? action.payload?.point : 0,
    totalPoint: action.payload?.totalPoint ? action.payload?.totalPoint : 0,
    currentLevel: action.payload?.currentLevel
      ? action.payload?.currentLevel
      : '',
    nextLevel: action.payload?.nextLevel ? action.payload?.nextLevel : '',
    levelPoint: action.payload?.levelPoint ? action.payload?.levelPoint : 0,
    myRank: action.payload?.myRank ? action.payload?.myRank : 0,
    items: action.payload?.items ? action.payload?.items : [],
    subjects: action.payload?.subjects ? action.payload?.subjects : [],
    // 선생, 관리자만
    birth: action.payload?.birth ? action.payload?.birth : '',
    manageGrade: action.payload?.manageGrade ? action.payload?.manageGrade : 0,
    authorities: action.payload?.authorities ? action.payload?.authorities : [],
    isAdmin: action.payload?.isAdmin ? action.payload?.isAdmin : 0,
  };
  return newMember;
};

export const memberSlice = createSlice({
  name: 'member',
  initialState: initialState,
  reducers: {
    logIn: (state, action: PayloadAction<any>) => {
      return convert(action);
    },
    logOut: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(saveMember.fulfilled, (state, action) => {
      return convert(action);
    });
  },
});

export const { logIn, logOut } = memberSlice.actions;

export default memberSlice.reducer;

// { 학생 정보조회 결과
//   "studentId": 2022000011,
//   "name": "전민재",
//   "grade": 1,
//   "classNum": 2,
//   "studentNum": 5,
//   "email": null,
//   "profile": null,
//   "profileFullPath": "https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null",
//   "point": 0,
//   "totalPoint": 0,
//   "introduce": null,
//   "currentLevel": "Bronze",
//   "nextLevel": "Silver",
//   "levelPoint": 1,
//   "myRank": 1,
//   "s3Service": null
// }

// { 선생님 정보조회 결과
//   "teacherId": 5030001,
//   "name": "관리자",
//   "birth": "19971101",
//   "email": null,
//   "profile": null,
//   "profileFullPath": "https://test-ppc-bucket.s3.ap-northeast-2.amazonaws.com/null",
//   "manageGrade": 0,
//   "isAdmin": 1,
//   "s3Service": null
// }
