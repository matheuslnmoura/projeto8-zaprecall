import React from 'react';
import Logo from "./Logo"
import data from "./content.json"

let decks = data.decks


export default function HomeScreen(props) {
    const {activeDeck, setDeck} = props
    const [input, setInput] = React.useState('dropDown')
    const [buttonAction, setButtonAction] = React.useState("next")
    const [buttonContent, setButtonContent] = React.useState("Next")

    function InputControl() {
        if(input === "dropDown") {
            return(
                <DropDownList />
            )
        } else if(input === "zapGoals"){
            return (
                <Goals />
            )
        }
    }

    function ControlButton() {

        if(buttonAction === "next"){
            return(
                <button action={buttonAction} className="control-button" onClick={()=>{
                    checkDeck(setInput, setButtonAction, setButtonContent)    
                }}>{buttonContent}</button>
            )
        } else if(buttonAction === "start") {
            return (
                <button action={buttonAction} className="control-button" onClick={()=>{
                    updadeDeckJSON(activeDeck, setDeck)
                    props.setScreen("questions")
                    

                }}>{buttonContent}</button>
            )
        }
    }

    return(
        <div className="home-screen">
            <Logo />
            <InputControl />
            <ControlButton />
        </div>
    )

}



function DropDownList() {
    return(
        <div className="dropdown">
            <div className="select" onClick={toggleVisibility}>
                <span>Choose your deck</span>
                <ion-icon name="chevron-down-outline"></ion-icon>
            </div>
            <div className="expand hidden" onClick={toggleVisibility}>
                <ul>
                    {DecksList(decks)}
                </ul>
            </div>
        </div>
    )
}



function DecksList(props) {
    const decks = props;
    return decks.map((deck, index) => {
        return (
            <li key = {deck.name + deck.index} onClick = {()=> selectDecks(deck.name)}>{deck.name}</li>
        )
    })
}


function toggleVisibility() {
    document.querySelector('.expand').classList.toggle('hidden')
}


function selectDecks(deckName) {
    document.querySelector(".dropdown .select span").innerHTML = deckName
}

function checkDeck(setInput, setButtonAction, setButtonContent) {
    const selectedDeck = document.querySelector(".dropdown .select span").innerHTML
    if (selectedDeck === "Choose your deck") { 
        alert('Please, choose a deck.')
    } else {
        setButtonAction("start")
        setButtonContent("Start Recall!")
        setInput("zapGoals")
        chooseDeckJSON(selectedDeck);
    }
}

function Goals() {
    return(
        <input className="zaps-input" type="number"  placeholder="How many Zaps you wanna get?"/>
    )
}

function chooseDeckJSON(selectedDeck) {
    decks.forEach(deck => {
        if (deck.name === selectedDeck) {
            deck.isChosen = true
        } else {
            deck.isChosen = false
        }
    })
}

function updadeDeckJSON(activeDeck, setDeck) {
    let zapGoals = document.querySelector('.zaps-input').value
    if(zapGoals === "") {
        zapGoals = 0
    } else if (zapGoals < 0) {
        zapGoals = zapGoals * (-1)
    }
    zapGoals = parseInt(zapGoals)

    decks.forEach(deck => {
        if (deck.isChosen === true) {
            deck.goal = zapGoals
            setDeck([...activeDeck,deck])
        }
    })
}
