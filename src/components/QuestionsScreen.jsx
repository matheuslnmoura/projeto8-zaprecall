import React from 'react'
import Logo from "./Logo"
import Footer from './Footer'





export default function QuestionsScreen(props) {
    const [answersValue, setAnswersValue] = React.useState([])
    const{activeDeck, setDeck, setScreen} = props
    return(
        <div className="question-screen">
            <div className="container">
                <Logo />
                <div className="questions">
                    {renderQuestions(activeDeck, answersValue, setAnswersValue)}
                </div>
            </div>
            <Footer answersValue = {answersValue} activeDeck = {activeDeck} setDeck = {setDeck} setScreen = {setScreen} />
        </div>
    )
}

function renderQuestions(activeDeck, answersValue, setAnswersValue) {
    const deck = activeDeck[0]  
    let {questions} = deck
    questions = questions.sort(comparator)
    return questions.map((element, index)=>{
        return (
            <>
                <Question index = {index} question = {element.question} answer = {element.answer} answersValue = {answersValue} setAnswersValue = {setAnswersValue}  />

            </>

        )
    })
}

function comparator() { 
	return Math.random() - 0.5; 
}

function Question(props) {
    const {index, question, answer, answersValue, setAnswersValue} = props
    const[questionState, setQuestionState] = React.useState("closed")
    if (questionState === "closed"){
        return (  
            <ClosedQuestion state = {setQuestionState} index = {index}  question = {question}  answer = {answer}  />
        )

    } else if (questionState === 'open') {
        return (
            <OpenQuestion currentState = {questionState} state = {setQuestionState} answersValue = {answersValue} setAnswersValue = {setAnswersValue} index = {index}  question = {question}  answer = {answer} />
        )
    } else {
        return (  
            <AnsweredQuestion currentState = {questionState} state = {setQuestionState} setAnswersValue = {setAnswersValue} index = {index}  question = {question}  answer = {answer}  />
        )
    }

}

function ClosedQuestion(props) {
    return (
        <div className="card-container" key = {(props.index + 1) + props.question}>
            <div className="question" onClick = {()=>{
                props.state("open")
                }}>
                <span>Question {props.index + 1}</span>
                <ion-icon className="ion-icon" name="play-outline"></ion-icon>
            </div>
        </div>
    )
}

function OpenQuestion(props) {
    const {answersValue, setAnswersValue} = props
    return(
        <>
        <div className="card-container">
            <div className="question open front" onClick={()=> {
                    props.state("closed")
                }}>

                <span>{props.question}</span>
                <div className="turn-icon-click-area" onClick={(event)=>{
                        event.stopPropagation()
                        turnCard(event.target)
                    }}>
                   
                    <img src="assets/media/turnIcon.svg" alt="turn card icon" />
                </div>

            </div>
            <div className="question open back">
                <span>{props.answer}</span>
                <div className="actions">
                    <div className="action red" onClick = {(event)=>{
                        event.stopPropagation()
                        props.state("answered-red")

                        setAnswersValue([...answersValue, 'close-circle'])
                        }}>Didn't Remember
                    </div>
                    <div className="action orange" onClick = {(event)=>{
                        event.stopPropagation()
                        props.state("answered-orange")

                        setAnswersValue([...answersValue, 'help-circle'])
                        }}>
                        Almost Didn't Remember
                    </div>
                    <div className="action green" onClick = {(event)=>{
                        event.stopPropagation()
                        props.state("answered-green")

                        setAnswersValue([...answersValue, 'checkmark-circle'])
                        }}>Zap!
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}



function AnsweredQuestion(props) {
    let iconName

    if(props.currentState === 'answered-red') {
        
        iconName = "close-circle"
    } else if(props.currentState === 'answered-orange') {
        
        iconName = "help-circle"
    } else if(props.currentState === 'answered-green') {
        
        iconName = "checkmark-circle"
    }
    return (
        <div className="card-container">
            <div className={"question " + props.currentState}>
                <span>Pergunta {props.index + 1}</span>
                <ion-icon  className="ion-icon" name={iconName}></ion-icon>
            </div>
        </div>
    )
}

function turnCard(event) {
    const card = event.parentNode.parentNode
    card.querySelector('.question.front').classList.toggle('front-turn')
    card.querySelector('.question.back').classList.toggle('back-turn')
    card.style.height = `${card.querySelector('.back').clientHeight}px`
}


