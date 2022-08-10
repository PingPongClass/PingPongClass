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
import AddStudentBulk from '@components/DashBoard/Admin/AddStudentBulk';
import AddTeacherBulk from '@components/DashBoard/Admin/AddTeacherBulk';
import EditStudent from '@src/components/DashBoard/Admin/EditStudent';
import StudentBoard from '@components/DashBoard/Admin/StudentBoard';
import EditTeacher from '@src/components/DashBoard/Admin/EditTeacher';
import TeacherBoard from '@components/DashBoard/Admin/TeacherBoard';
import StudentMyInfo from '@components/DashBoard/MyPage/StudentMyInfo';
import TeacherMyInfo from '@components/DashBoard/MyPage/TeacherMyInfo';
import { ToastContainer } from 'react-toastify';
import '@src/App.css';

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
            <Route path="mypage" element={<InputPassword />} />
            <Route path="teachermyinfo" element={<TeacherMyInfo />} />
          </Route>
          <Route path="/admin" element={<AdminDashBoard />}>
            <Route path="" element={<MainContent />} />
            <Route path="notice" element={<AdminNotice />} />
            <Route path="noticeEdit/:noticeId" element={<AdminEditNotice />} />
            <Route path="noticePost" element={<AdminEditNotice />} />
            <Route path="students" element={<StudentBoard />} />
            <Route path="studentAdd" element={<EditStudent />} />
            <Route path="studentAddBulk" element={<AddStudentBulk />} />
            <Route path="studentEdit/:studentId" element={<EditStudent />} />
            <Route path="teachers" element={<TeacherBoard />} />
            <Route path="teacherAdd" element={<EditTeacher />} />
            <Route path="teacherAddBulk" element={<AddTeacherBulk />} />
            <Route path="teacherEdit/:teacherId" element={<EditTeacher />} />
            <Route path="mypage" element={<InputPassword />} />
            <Route path="teachermyinfo" element={<TeacherMyInfo />} />
          </Route>
          <Route path="/style" element={<Style />} />
          <Route path="/class/:code" element={<OpenVidu />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
