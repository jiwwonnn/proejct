import { useState } from 'react';

const LoginModal = ({ handleLogin, closeModal }) => {
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleLoginClick = () => {
    handleLogin(id, pw);
  };

  return (
    <div className='modal_wrap'>
      <div className='modal'>
        <div>
          <div>id</div>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
        </div>
        <div>
          <div>pw</div>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} />
        </div>
        <button onClick={handleLoginClick}>로그인</button>
        <button onClick={closeModal}>닫기</button> {/* 추가: 모달 닫기 버튼 */}
      </div>
    </div>
  )
}

export default LoginModal;
