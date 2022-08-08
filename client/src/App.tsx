import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import DashBoard from '@pages/DashBoard';
import Style from '@pages/Style';
import Login from '@pages/Login';
import MainContent from '@components/DashBoard/MainContent';
import NoticeBoard from '@components/DashBoard/Board/NoticeBoard';
import ClassList from '@components/DashBoard/TodaysClass/ClassList';
import StoreMain from '@components/DashBoard/Store/StoreMain';
import InputPassword from '@components/DashBoard/MyPage/InputPassword';
import AdminDashBoard from '@pages/AdminDashBoard';
import AdminNotice from '@components/DashBoard/Admin/NoticeBoard';
import EditNotice from '@components/DashBoard/Admin/EditNotice';
import Member from '@pages/MemberTest';
import '@src/App.css';

const App = () => {
  return (
    <div className="App">
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
          </Route>
          <Route path="/admin/" element={<AdminDashBoard />}>
            <Route path="" element={<Member />} />
            <Route path="member" element={<Member />} />
            <Route path="notice" element={<AdminNotice />} />
            <Route path="noticePost" element={<EditNotice />} />
            <Route path="noticeEdit/:noticeId" element={<EditNotice />} />
          </Route>
          <Route path="/style" element={<Style />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
