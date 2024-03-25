import './assets/style/style.scss'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./Main";
import Write from "./Write";
import View from "./View";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [loginUserInfo, setLoginUserInfo] = useState(null);

  const defaultUserInfo = [
    {
      id: "이지원",
      pw: "1234"
    },
    {
      id: "김규찬",
      pw: "1234"
    },
    {
      id: "김종원",
      pw: "1234'"
    }
  ];

  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  useEffect(() => {
    const savedData = localStorage.getItem('savedData');
    if (savedData) {
      setData(JSON.parse(savedData));
    }

    const storedUserInfo = localStorage.getItem('userInfoData');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }

    const storedLoginUserInfo = localStorage.getItem('loginUserInfo'); // 로그인 정보를 가져옴
    if (storedLoginUserInfo) {
      setLoginUserInfo(JSON.parse(storedLoginUserInfo)); // 가져온 정보를 loginUserInfo 상태에 저장
    }
  }, []);

  const handleLogin = (id, pw) => {
    const foundUser = userInfo.find(user => user.id === id && user.pw === pw);

    if (foundUser) {
      // 로그인 성공 시 해당 사용자 정보를 저장
      setLoginUserInfo(foundUser);
      localStorage.setItem('loginUserInfo', JSON.stringify(foundUser)); // 로그인 정보를 localStorage에 저장
      return true; // 로그인 성공
    } else {
      return false; // 로그인 실패
    }
  };

  const foodWrite = (image, title, info) => {
    const newDate = new Date();
    const newFoodWrite = {
      image,
      title,
      info,
      newDate,
    };

    const newData = [newFoodWrite, ...data];
    setData(newData);
    localStorage.setItem('savedData', JSON.stringify(newData));
  };

  return (
    <div className='wrap'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main data={data} handleLogin={handleLogin} userInfo={userInfo} loginUserInfo={loginUserInfo}/>} />
          <Route path='/write' element={<Write foodWrite={foodWrite} />} />
          <Route path='/view/:id' element={<View loginUserInfo={loginUserInfo}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
