import React from 'react'
import Logo from "./Logo"
import Footer from './Footer'





export default function QuestionsScreen(props) {
    const [answers, setAnswers] = React.useState([{wrong: 0, medium: 0, right: 0}])
    // function updateAnswers(newAnswers) {
    //     setAnswers(newAnswers)
    // }
    console.log(answers)
    const{activeDeck} = props
    return(
        <div className="question-screen">
            <div className="container">
                <Logo />
                <div className="questions">
                    {renderQuestions(activeDeck, setAnswers)}
                </div>
            </div>
            <Footer />
        </div>
    )
}

function renderQuestions(activeDeck, setAnswers) {
    const deck = activeDeck[0]
    console.log(deck)
        const {questions} = deck
        return questions.map((element, index)=>{
            return (
                <>
                    <Question index = {index} question = {element.question} answer = {element.answer} setAnswers = {setAnswers} key = {element.question + index} />

                </>

            )
        })
}

function Question(props) {
    const {index, question, answer, setAnswers} = props
    const[questionState, setQuestionState] = React.useState("closed")
    if (questionState === "closed"){
        return (  
            <ClosedQuestion state = {setQuestionState} index = {index}  question = {question}  answer = {answer}  />
        )

    } else if (questionState === 'open') {
        return (
            <OpenQuestion currentState = {questionState} state = {setQuestionState} index = {index}  question = {question}  answer = {answer} />
        )
    } else {
        return (  
            <AnsweredQuestion currentState = {questionState} state = {setQuestionState} setAnswers = {setAnswers} index = {index}  question = {question}  answer = {answer}  />
        )
    }

}

function ClosedQuestion(props) {
    return (
        <div className="card-container">
            <div className="question" onClick = {()=>{
                props.state("open")
                }}>
                <span>Pergunta {props.index + 1}</span>
                <ion-icon className="ion-icon" name="play-outline"></ion-icon>
            </div>
        </div>
    )
}

function OpenQuestion(props) {
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
                        }}>Didn't Remember
                    </div>
                    <div className="action orange" onClick = {(event)=>{
                        event.stopPropagation()
                        props.state("answered-orange")
                        }}>
                        Almost Didn't Remember
                    </div>
                    <div className="action green" onClick = {(event)=>{
                        event.stopPropagation()
                        props.state("answered-green")
                        }}>Zap!
                    </div>
                </div>
            </div>
        </div>

        </>
    )
}



function AnsweredQuestion(props) {
    const {setAnswers} = props
    let answersObj = {wrong: 0, medium: 0, right: 0}
    let iconName

    if(props.currentState === 'answered-red') {
        answersObj.wrong ++
        setAnswers(answersObj)
        iconName = "close-circle"
    } else if(props.currentState === 'answered-orange') {
        answersObj.medium ++
        setAnswers(answersObj)
        iconName = "help-circle"
    } else if(props.currentState === 'answered-green') {
        answersObj.right ++
        setAnswers(answersObj)
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


