import styled from 'styled-components'
// import { IconSpinner } from '../assets/image';

const Loadingspin = styled.div`
    user-select: none;
    cursor: wait;
    display: none;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: #000000aa;
    z-index: 20000;
    color: ${({theme})=>theme.colorPrimary};

    svg{
        width: 80px;
        height: 80px;
        path, circle{
            fill: ${({theme})=>theme.colorPrimary};
        }
    }
    
	.cs-loader-inner {
		transform: translateY(-30%);
		width: calc(100% - 200xpx);
	}

	.cs-loader-inner label {
		font-size: 20px;
		opacity: 0;
		display:inline-block;
		color:${({theme})=>theme.colorPrimary};
	}

@keyframes lol {
  0% {
    opacity: 0;
    transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    transform: translateX(0px);
  }
  66% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(300px);
  }
}

@-webkit-keyframes lol {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-300px);
  }
  33% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  66% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(300px);
  }
}

.cs-loader-inner label:nth-child(6) {
  -webkit-animation: lol 3s infinite ease-in-out;
  animation: lol 3s infinite ease-in-out;
}

.cs-loader-inner label:nth-child(5) {
  -webkit-animation: lol 3s 100ms infinite ease-in-out;
  animation: lol 3s 100ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(4) {
  -webkit-animation: lol 3s 200ms infinite ease-in-out;
  animation: lol 3s 200ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(3) {
  -webkit-animation: lol 3s 300ms infinite ease-in-out;
  animation: lol 3s 300ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(2) {
  -webkit-animation: lol 3s 400ms infinite ease-in-out;
  animation: lol 3s 400ms infinite ease-in-out;
}

.cs-loader-inner label:nth-child(1) {
  -webkit-animation: lol 3s 500ms infinite ease-in-out;
  animation: lol 3s 500ms infinite ease-in-out;
}
`;


export const displaySpinner=({mask})=>{
    const spin = document.getElementById("loadingBar")
    const text = document.getElementById("loadingText") 

    if (spin == null ) {
        alert("Spin or msgSpan is not initialized")
        return
    }

    if (mask) {
        spin.style.display = "flex"
        text.innerText = mask
    } else {
        spin.style.display = "none"
        text.innerText = ''
    }

}

const LoadingBar=()=>{
    return <Loadingspin id={'loadingBar'}>
        {/* <IconSpinner /> */}
        <b id={'loadingText'}></b>
        <div className="cs-loader-inner">
            <label>●</label>
            <label>●</label>
            <label>●</label>
            <label>●</label>
            <label>●</label>
            <label>●</label>
        </div>
        <br/><br/><br/><br/>
    </Loadingspin>
}

export default LoadingBar