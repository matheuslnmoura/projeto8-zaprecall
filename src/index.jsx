import ReactDOM from "react-dom"
import React from 'react'
import HomeScreen from "./components/HomeScreen"
import QuestionsScreen from "./components/QuestionsScreen"

function App() {
    const [activeScreen, setActiveScreen] = React.useState("HomeScreen")
    const [activeDeck, setActiveDeck] = React.useState([])
    let questions
    
    if (activeDeck.length !== 0) {
        questions = activeDeck[0].questions
        questions = questions.sort(comparator)
    }

    function comparator() { 
        return Math.random() - 0.5; 
    }

    return(
        <div className="app-container">
            {activeScreen === "HomeScreen" ? 
                <HomeScreen setScreen = {setActiveScreen} activeDeck = {activeDeck} setDeck = {setActiveDeck} /> :

                <QuestionsScreen activeDeck = {activeDeck} questions = {questions} setDeck = {setActiveDeck} setScreen = {setActiveScreen}  />
            }

        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('.root'))