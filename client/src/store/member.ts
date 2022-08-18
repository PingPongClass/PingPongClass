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
export interface ClassProps {
  classId: number;
  teacherName: string;
  subjectEntity: {
    classSubjectCode: number;
    name: string;
  };
  classTitle: string;
  classDay: number;
  classDesc: string;
  timetableId: number;
}
export const allClass = {
  classId: -1,
  teacherName: '',
  subjectEntity: {
    classSubjectCode: -1,
    name: '',
  },
  classTitle: '전체',
  classDay: 0,
  classDesc: '',
  timetableId: 0,
};

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
  jandiColor?: number;
  borderColor?: number;

  items?: Item[];
  classes?: ClassProps[];

  // 선생, 관리자만
  birth?: string;
  manageGrade?: number;
  authorities?: Authorities[];
  isAdmin?: number;
}

export interface Items {
  itemId?: number;
  name?: string;
  rarity?: number;
  category?: string;
  describe?: string;
  cnt?: number;
}

export const allItems = {
  itemId: 1,
  name: '',
  rarity: 1,
  category: '',
  describe: '',
  cnt: 0,
};

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
  jandiColor: 0,
  borderColor: 0,

  items: [
    {
      itemId: 0,
      cnt: 0,
    },
  ],
  classes: [],
  // 선생, 관리자만
  birth: '',
  manageGrade: 0,
  authorities: [],
  isAdmin: 0,
};

export const getClasses = createAsyncThunk('getClasses', async (id: number) => {
  const InterceptedAxios = setupInterceptorsTo(axios.create());
  const response = await InterceptedAxios.get('/classes/' + id);
  const list = response.data.content;
  let newList: ClassProps[] = [];
  newList = [allClass, ...list];
  return newList;
});

export const saveMember = createAsyncThunk('saveMember', async () => {
  const InterceptedAxios = setupInterceptorsTo(axios.create());

  const uData = await InterceptedAxios.get('/users/info');
  const userData = uData.data;

  const { teacherId: tId, ...fUserData } = userData;
  const { studentId: sId, ...formattedUserData } = fUserData;

  if (userData.teacherId) {
    formattedUserData.userId = userData.teacherId;
  } else {
    formattedUserData.userId = userData.studentId;
  }
  // console.log(formattedUserData);
  return formattedUserData;
});

export const saveItem = createAsyncThunk('saveItem', async (id: number) => {
  const InterceptedAxios = setupInterceptorsTo(axios.create());

  const response = await InterceptedAxios.get('/items/' + id);

  const list = response.data;
  let newList: Items[] = [];
  newList = [allItems, ...list];

  return newList;
});

const convert = (state, action: PayloadAction<any>) => {
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
    jandiColor: action.payload?.jandiColor ? action.payload?.jandiColor : 0,
    borderColor: action.payload?.borderColor ? action.payload?.borderColor : 0,
    items: action.payload?.items === [] ? action.payload?.items : state.items,
    classes:
      action.payload?.classes === [] ? action.payload?.classes : state.classes,
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
      return convert(state, action);
    },
    logOut: () => initialState,
    setPoint: (state) => {
      let newPoint = +state.point - 15;

      return { ...state, point: newPoint };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(saveMember.fulfilled, (state, action) => {
        return convert(state, action);
      })
      .addCase(getClasses.fulfilled, (state, action) => {
        const newUser = { ...state, classes: action.payload };
        return newUser;
      })
      .addCase(saveItem.fulfilled, (state, action) => {
        const newItem = { ...state, items: action.payload };
        return newItem;
      });
  },
});

export const { logIn, logOut, setPoint } = memberSlice.actions;

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
