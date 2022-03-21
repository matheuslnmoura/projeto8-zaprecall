import React from "react"

let rightAnswers = 0
let mediumAnswers = 0
let wrongAnswers = 0

export default function Footer(props) {
    const {activeDeck, answersValue, setDeck, setScreen} = props
    const questions = activeDeck[0].questions
    const answeredQuestions = answersValue.length
    const totalQuestions = questions.length
    const goal = activeDeck[0].goal

    const[gameStatus, setGameStatus] = React.useState("onGoing")

    if (answeredQuestions === questions.length && gameStatus !== "finished") {
        setGameStatus('finished')
    }

    return (
        <footer>
            <span className="answers-counter">{answeredQuestions}/{totalQuestions} Concluded</span>
            <div className="icons-container"> <RenderIcons iconsObj = {answersValue} /> </div>
            <EndGameMessage gameStatus = {gameStatus} answersValue = {answersValue}  goal = {goal} />
            <RestartButton gameStatus = {gameStatus} setGameStatus = {setGameStatus} setDeck = {setDeck} setScreen = {setScreen} />
        </footer>
    )


}

function RenderIcons(iconsObject){
    const {iconsObj: iconsArray} = iconsObject

    return iconsArray.map (iconName =>{
        return (
            <div className={iconName}>
                <ion-icon className="ion-icon" name={iconName}></ion-icon>
            </div>
        )
    })
}

function EndGameMessage(props) {
    const {gameStatus, goal, answersValue} = props

    answersValue.map(icon => {
        if (icon === "checkmark-circle") {
            rightAnswers++
        } else if (icon === "help-circle") {
            mediumAnswers++
        } else if (icon === 'close-circle') {
            wrongAnswers++
        }
        return <></>
    })
    
    if (gameStatus === "finished") {
        if(rightAnswers >= goal && wrongAnswers === 0) {
            return (
                <div className="end-game-container">
                    <div className="title">
                        <img src="assets/media/party 2.svg" alt="" />
                        <span>Aeehoo!</span>
                    </div>
                    <span>Congratulations!!! You reached your zap goals!</span>
                </div> 
            )
        } else if (wrongAnswers === 0) {
            return (
                <div className="end-game-container">
                    <div className="title">
                        <img src="assets/media/party 2.svg" alt="" />
                        <span>Congrats!</span>
                    </div>
                    <span>You didn't miss a single Flash Card</span>
                </div> 
            )
        } else {
            return (
                <div className="end-game-container">
                    <div className="title">
                        <img src="assets/media/sad 7.svg" alt="" />
                        <span>Oh no</span>
                    </div>
                    <span>You missed a few :( <br/>But keep going!</span>
                </div> 
            )
        }

    } else {
        return(
            <></>
        )
    }

}

function RestartButton(props) {
    const {gameStatus, setGameStatus, setDeck, setScreen} = props

    if(gameStatus === "finished"){
        return(
            <button onClick={()=>{restartRecall(gameStatus, setGameStatus, setDeck, setScreen)}}>Restart Recall</button>
        )
    } else {
        return <></>
    }
}

function restartRecall(gameStatus, setGameStatus, setDeck, setScreen) {
    setScreen("HomeScreen")
    setDeck([])
    setGameStatus("onGoing")
}