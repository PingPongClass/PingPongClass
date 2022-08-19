import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import DashBoard from '@pages/DashBoard';
import TeacherDashBoard from '@pages/TeacherDashBoard';
import Style from '@pages/Style';
import Login from '@pages/Login';
import OpenVidu from '@openvidu/App';
import MainContent from '@components/DashBoard/MainContent';
import NoticeBoard from '@components/DashBoard/Board/NoticeBoard';
import ClassList from '@components/DashBoard/TodaysClass/ClassList';
import StoreMain from '@components/DashBoard/Store/StoreMain';
import TeacherMainContent from '@components/DashBoard/Teacher/TeacherMainContent';
import TeacherNoticeBoard from '@src/components/DashBoard/Teacher/NoticeBoard';
import TeacherEditNotice from '@src/components/DashBoard/Teacher/EditNotice';
import TeacherClassList from '@src/components/DashBoard/Teacher/TeacherClassList';
import TeacherNewClass from '@src/components/DashBoard/Teacher/TeacherNewClass';
import InputPassword from '@components/DashBoard/MyPage/InputPassword';
import AdminDashBoard from '@pages/AdminDashBoard';
import AdminNotice from '@components/DashBoard/Admin/NoticeBoard';
import AdminEditNotice from '@components/DashBoard/Admin/EditNotice';
import StudentBoard from '@components/DashBoard/Admin/StudentBoard';
import TeacherBoard from '@components/DashBoard/Admin/TeacherBoard';
import StudentMyInfo from '@components/DashBoard/MyPage/StudentMyInfo';
import TeacherMyInfo from '@components/DashBoard/MyPage/TeacherMyInfo';
import ManagedClassBoard from '@components/DashBoard/Admin/ManagedClassBoard';
import EditClass from '@components/DashBoard/Admin/EditClass';
import { ToastContainer } from 'react-toastify';
import '@src/App.css';
import TimeTable from './components/DashBoard/TimeTable/TimeTable';
import TeacherEditClass from './components/DashBoard/Teacher/TeacherEditClass';
import TeacherClassLogList from './components/DashBoard/Teacher/TeacherClassLogList';
import ClassLogList from './components/DashBoard/ClassLog/ClassLogList';

const App = () => {
  return (
    <div className="App">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        newestOnTop={false}
        rtl={false}
        pauseOnFocusLoss
        limit={1}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/student" element={<DashBoard />}>
            <Route path="" element={<MainContent />} />
            <Route path="notice" element={<NoticeBoard />} />
            <Route path="classes" element={<ClassList />} />
            <Route path="store" element={<StoreMain />} />
            <Route path="mypage" element={<InputPassword />} />
            <Route path="studentmyinfo" element={<StudentMyInfo />} />
            <Route path="log" element={<ClassLogList />} />
          </Route>
          <Route path="/teacher" element={<TeacherDashBoard />}>
            <Route path="" element={<TeacherMainContent />} />
            <Route path="notice" element={<TeacherNoticeBoard />} />
            <Route
              path="noticeEdit/:noticeId"
              element={<TeacherEditNotice />}
            />
            <Route path="noticePost" element={<TeacherEditNotice />} />
            <Route path="classes" element={<TeacherClassList />} />
            <Route path="create" element={<TeacherNewClass />} />
            <Route path="edit/:classId" element={<TeacherEditClass />} />
            <Route path="mypage" element={<InputPassword />} />
            <Route path="teachermyinfo" element={<TeacherMyInfo />} />
            <Route path="log" element={<TeacherClassLogList />} />
          </Route>
          <Route path="/admin" element={<AdminDashBoard />}>
            <Route path="" element={<StudentBoard />} />
            <Route path="notice" element={<AdminNotice />} />
            <Route path="noticeEdit/:noticeId" element={<AdminEditNotice />} />
            <Route path="noticePost" element={<AdminEditNotice />} />
            <Route path="students" element={<StudentBoard />} />
            <Route path="teachers" element={<TeacherBoard />} />
            <Route path="mypage" element={<InputPassword />} />
            <Route path="teachermyinfo" element={<TeacherMyInfo />} />
            <Route path="classes" element={<ManagedClassBoard />} />
            <Route path="classPost" element={<EditClass />} />
            <Route path="classEdit/:classId" element={<EditClass />} />
          </Route>
          <Route path="/style" element={<Style />} />
          <Route path="/lecture/:code" element={<OpenVidu />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
