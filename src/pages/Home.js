import styled, { keyframes } from 'styled-components';
import github from '../assets/github.png';
import instagram from '../assets/instagram.png';

const Home = () => {
  const App = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  gap: 50px;
  `;

  const Title = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;  
  gap: 10px;
  `;

  const KRTitle = styled.p`
  font-size: 50px;
  color: #000000;
  `;

  const ENTitle = styled.p`
  font-size: 20px;
  color: rgba(0, 0, 0, 0.3);
  `;

  const Rainbow = keyframes`
  0% {
    background-color: red;
  } 10% {
    background-color: orange;
  } 30% {
    background-color: yellow;
  } 50% {
    background-color: green;
  } 70% {
    background-color: blue;
  } 90% {
    background-color: purple;
  } 100% {
    background-color: red;
  }
  `;

  const StartButton = styled.button`
  width: 320px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  font-weight: 500;
  color: #FFFFFF;
  text-shadow: 2px 2px 2px gray;
  cursor: pointer;
  transition: all 0.25s;
  animation: ${Rainbow} 10s linear infinite;
  &:hover {
    opacity: 0.5;
  }
  `;

  const Me = styled.div`
  width: 300px;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 25px;
  right: 25px;
  `;

  const Github = styled.a`
  width: 25px;
  height: 25px;
  cursor: pointer;
  background-image: url(${github});
  background-size: contain;
  background-repeat: no-repeat;
  `;

  const Sns = styled.div`
  display: flex;
  flex-flow: row nowrap;
  gap: 15px;
  `;

  const Instagram = styled(Github)`
  background-image: url(${instagram});
  `;

  // 페이지 전환
  const goGame = () => {
    window.location.replace('/game');
  }

  return(
    <App>
      <Title>
        <KRTitle>다른 색깔 찾기</KRTitle>
        <ENTitle>Numble Challenge</ENTitle>
      </Title>
      <StartButton onClick={goGame}>게임 시작</StartButton>
      <Me>
        <ENTitle>Made by Juhyeon</ENTitle>
        <Sns>
          <Github href='https://github.com/2ee000'/>
          <Instagram href='https://www.instagram.com/2ee_00/'/>
        </Sns>
      </Me>
    </App>
  );
}

export default Home;