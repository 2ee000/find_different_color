import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

import github from '../assets/github.png';
import instagram from '../assets/instagram.png';
import X from '../assets/X.png';

const Game = () => {
  // 현재 남은 시간
  const [StageTime, setStageTime] = useState(15);
  const [Count, setCount] = useState(300);
  useEffect(() => {
    const id = setInterval(() => {
      setStageTime((StageTime) => StageTime - 1);
      setCount(Count - 20);
    }, 1000);
    
    // 0이 되면 카운트가 멈춤
    if(StageTime === 0) {
      clearInterval(id);
    }
    return () => clearInterval(id);
    // 카운트 변수가 바뀔때마다 useEffecct 실행
  }, [StageTime]);
// 페이지 전환
const goHome = () => {
  window.location.replace('/');
}
const goGame = () => {
  window.location.replace('/game');
}
// 현재 단계
const [StageNumber, setStageNumber] = useState(1);
// 랜덤 컬러
const [Color, setColor] = useState('#8181F7');
const ColorCode = () => {
  const ColorCodeArr = ['#F7A3A7','#F7AD97','#FAD89E', '#C8D7C4', '#BBCBD2'
  , '#B7B6D6', '#E2BBD8', '#e55d62', '#db7e6a', '#faab23'
  , '#87b27c', '#7db0c7', '#7774b6', '#b780a9', '#b1a995'
  , '#cdaa90', '#b57d5c', '#333f4d', '#4f524b', '#626479'];
  const ColorNumber = Math.floor(Math.random() * ColorCodeArr.length);
  setColor(ColorCodeArr[ColorNumber]);
}
// 불투명도
const [Opacity, setOpacity] = useState(0.1);
// 단계별 사각형 수
const [NumberOfSquares, setNumberOfSquares] = useState(4);
// 현재 score
const [Score, setScore] = useState(0);
// 단계별 사각형 크기
const SizeOfSquares = 0.95*(300/Math.sqrt(NumberOfSquares));
// 단계별 gap 크기
const SizeOfGap = 0.05*(300/Math.sqrt(NumberOfSquares));
// 단계별 사각형 수가 4보다 작을 때
const SmallNumberOfSquares = () => {
  const number = Math.pow(Math.floor(((StageNumber + 2)/2)+1), 2);
  if(number < 4) {
    setNumberOfSquares(4);
  } else {
    setNumberOfSquares(number);
  }
}
// 힌트
const [Hint, setHint] = useState(3);
const [Border, setBorder] = useState('none');
const ClickHint = () => {
  if(Hint > 0 && Border == 'none') {
    setHint(Hint-1);
    setBorder('2.5px solid red');
  }
}
// 정답 클릭 시 단계 증가
const ClickAnswer = () => {
  setStageNumber(StageNumber+1); // 스테이지 + 1
  setStageTime(15); // 타이머 초기화(15초)
  setCount(300); // 타이머 크기 초기화(300px)
  ColorCode(); // 랜덤 색상
  setOpacity(Opacity*1.1); // 불투명도 조절(난이도 상승)
  setRandom(Math.floor(Math.random() * NumberOfSquares)); // 랜덤 정답
  setScore(Score + (StageNumber*StageNumber*StageTime)); // 스코어
  setBorder('none'); // 힌트 썼을 때 준 border 효과 초기화
  SmallNumberOfSquares();
}
// 오답 클릭 시 시간 줄어듬
const ClickWorng = () => {
  if(StageTime > 2) { // 남은 시간이 2초보다 많을 때
    setStageTime(StageTime-3); // 타임 - 3초
    setCount(Count - 60); // 타이머 크기 - 60px
  } else { // 남은 시간이 2초보다 적거나 같을 때
    setStageTime(0);
    setCount(0);
  }
}
// 단계별 사각형 출력
const squareArr = [];
const [Random, setRandom] = useState(Math.floor(Math.random() * NumberOfSquares));
const Squares = () => {
  for(let i = 0; i < NumberOfSquares; i++) {
    if(i === Random) { // 정답
      squareArr.push(
        <Answer onClick={ClickAnswer}/>
      )
    } else {
      squareArr.push(
        <Square onClick={ClickWorng}/>
      )
    }
  }
  return squareArr;
}

const GameOver = () => {
  if(StageTime === 0) {
    return(
      <ModalBackground>
        <Modal>
          <ModalHeader>
            <XButton onClick={goGame}/>
          </ModalHeader>
          <ModalBody>
            <ModalContent>Game Over</ModalContent>
            <Stage>{StageNumber} stage</Stage>
            <ScoreDisplay>{Score} point</ScoreDisplay>
          </ModalBody>
          <Button>
            <ReStart onClick={goGame}>Replay</ReStart>
            <GoHome onClick={goHome}>Home</GoHome>
          </Button>
        </Modal>
      </ModalBackground>
    )
  }
}

const App = styled.div`
width: 100%;
height: 100vh;
display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: center;
gap: 50px;
`;

const Title = styled.p`
font-size: 50px;
color: #000000;  
`

const Body = styled.div`
display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: center;
gap: 10px;
`;

const Stage = styled(Title)`
font-size: 30px;
`;

const ENTitle = styled.p`
font-size: 20px;
color: rgba(0, 0, 0, 0.3);
`;

const Timer = styled.div`
width: 300px;
background-color: rgb(181, 181, 181);
`;

const Time = styled.div`
width: ${Count}px;
height: 25px;
background-color: #000000;
`;

const TimeDisplay = styled.p`
width: 25px;
height: 25px;
position: relative;
left: 140px;
top: 2px;
color: #FFFFFF;
`;

const Screen = styled.div`
width: 300px;
height: 300px;
display: flex;
flex-flow: wrap;
align-items: center;
justify-content: center;
gap: ${SizeOfGap}px;
`;

const Square = styled.div`
width: ${SizeOfSquares}px;
height: ${SizeOfSquares}px;
border-radius: 10%;
aspect-ratio: 1;
cursor: pointer;
background-color: ${Color};
`;

const Answer = styled(Square)`
border: ${Border};
opacity: ${Opacity};
`;

const ScoreDisplay = styled(Stage)`
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

const HintButton = styled.button`
width: 100%;
height: 50px;
border-radius: 10px;
font-size: 20px;
font-weight: 500;
background-color: rgba(0, 0, 0, 0.05);
cursor: pointer;
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

const ModalBackground = styled.div`
width: 100%;
height: 100vh;
position: absolute;
display: flex;
align-items: center;
justify-content: center;
background-color: rgba(0, 0, 0, 0.5);
`;

const Modal = styled.div`
width: 350px;
height: 450px;
padding: 25px;
display: flex;
flex-flow: column nowrap;
justify-content: space-between;
background: #FFFFFF;
opacity: 1;
`

const ModalHeader = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: end;
`;

const XButton = styled.p`
width: 25px;
height: 25px;
cursor: pointer;
background-image: url('${X}');
background-size: contain;
background-repeat: no-repeat;
`;

const ModalBody = styled.div`
width: 100%;
display: flex;
flex-flow: column nowrap;
align-items: center;
justify-content: center;
gap: 25px;
`;

const ModalContent = styled.p`
font-size: 50px;
color: #000000;
`;

const Button = styled.div`
display: flex;
flex-flow: row nowrap;
align-items: center;
justify-content: center;
gap: 20px;
`;

const ReStart = styled.button`
width: 150px;
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

const GoHome = styled(ReStart)`
`

return (
  <App>
    <Title onClick={goHome}>다른 색깔 찾기</Title>
    <Body>
      <Stage>stage {StageNumber}</Stage>
      <Timer>
        <Time>
          <TimeDisplay>{StageTime}</TimeDisplay>
        </Time>
      </Timer>
      <Screen>
        {Squares()}
      </Screen>
      <HintButton onClick={ClickHint}>Hint {Hint}</HintButton>
    </Body>
    <ScoreDisplay>{Score}</ScoreDisplay>
      <Me>
        <ENTitle>Made by Juhyeon</ENTitle>
        <Sns>
          <Github href='https://github.com/2ee000'/>
          <Instagram href='https://www.instagram.com/2ee_00/'/>
        </Sns>
      </Me>
    {GameOver()}
  </App>
)
}

export default Game;