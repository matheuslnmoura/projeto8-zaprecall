import ReactDOM from "react-dom"
import React from 'react'
import HomeScreen from "./components/HomeScreen"
import QuestionsScreen from "./components/QuestionsScreen"

function App() {
    const [activeScreen, setActiveScreen] = React.useState("HomeScreen")
    const [activeDeck, setActiveDeck] = React.useState([])

    return(
        <div className="app-container">
            {activeScreen === "HomeScreen" ? 
                <HomeScreen setScreen = {setActiveScreen} activeDeck = {activeDeck} setDeck = {setActiveDeck}/> :

                <QuestionsScreen activeDeck = {activeDeck} />
            }

        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('.root'))