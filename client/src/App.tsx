import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '@pages/Home';
import DashBoard from '@pages/DashBoard';
import Style from '@pages/Style';
import Login from '@pages/Login';
import MainContent from '@components/DashBoard/MainContent';
import NoticeBoard from '@src/components/DashBoard/Board/NoticeBoard';
import ClassList from '@src/components/DashBoard/TodaysClass/ClassList';
import StoreMain from '@src/components/DashBoard/Store/StoreMain';
import InputPassword from './components/DashBoard/MyPage/InputPassword';
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
          <Route path="/style" element={<Style />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
