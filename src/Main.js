import List from "./List";
import { useNavigate } from 'react-router-dom'
import { useState , useEffect } from "react";
import LoginModal from "./LoginModal";

const Main = ({ data, handleLogin, loginUserInfo }) => {
  const [loginModal, setLoginModal] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null); // 추가: 로그인된 사용자의 ID

  const navigate = useNavigate();
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  useEffect(() => { // useEffect를 사용하여 페이지 로드 시 로그인 정보를 로컬 스토리지에서 가져옴
    const storedLoginUserInfo = localStorage.getItem('loginUserInfo');
    if (storedLoginUserInfo) {
      setLoggedInUserId(JSON.parse(storedLoginUserInfo).id); // 수정된 부분: ID만 상태에 저장
    }
  }, []);

  const handleRegist = () => {
    navigate('/write');
  }

  const handleModal = () => {
    setLoginModal(true);
  }

  const closeModal = () => {
    setLoginModal(false);
  }

  const handleLoginClick = (id, pw) => {
    const loggedIn = handleLogin(id, pw);
    if (loggedIn) {
      setLoggedInUserId(id); // 추가: 로그인된 사용자의 ID 설정
      localStorage.setItem('loginUserInfo', JSON.stringify({ id: id })); // 로그인 정보를 로컬 스토리지에 저장
      closeModal();
    } else {
      alert('로그인에 실패하였습니다.');
    }
  };

  // 어제 입력한 날짜의 리스트 필터링
  const yesterdayData = data.filter(item => {
    const itemDate = new Date(item.newDate);
    return itemDate.toDateString() === yesterday.toDateString();
  });

  // 오늘 입력한 날짜의 리스트 필터링
  const todayData = data.filter(item => {
    const itemDate = new Date(item.newDate);
    return itemDate.toDateString() === today.toDateString();
  });

  return (
    <div className='main'>
      {loginModal && <LoginModal handleLogin={handleLoginClick} closeModal={closeModal} />}
      <header>
        <div className="header_inner">
          {loggedInUserId ? null : ( // 로그인 상태에 따라 버튼 표시
            <button onClick={handleModal}>로그인</button>
          )}
          {loggedInUserId && ( // 로그인 상태에 따라 버튼 표시
            <button onClick={handleRegist}>등록</button>
          )}
          {loggedInUserId && <div>{loggedInUserId}</div>} {/* 변경: 로그인된 사용자의 ID 표시 */}
        </div>

      </header>

      <div>
        <div>
        </div>
        전체
        {
          data.map((item, idx) => (
            <List data={item} idx={idx} key={idx} loginUserInfo={loginUserInfo} />
          ))
        }
        월 마다 구분
      </div>
      <div>
        <div>어제</div>
        {
          yesterdayData.length > 0 ? (
            <>
              {yesterdayData.map((item, idx) => (
                <List data={item} idx={idx} key={idx} loginUserInfo={loginUserInfo}/>
              ))}
            </>
          ) : null
        }
      </div>
      <div>
        오늘
        {todayData.map((item, idx) => (
          <List data={item} idx={idx} key={idx} loginUserInfo={loginUserInfo}/>
        ))}
      </div>
      <div>
        내일
      </div>
    </div>
  )
}

export default Main;
