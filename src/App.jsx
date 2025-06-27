import React from 'react'
import Search from "./components/Search.jsx";

function App() {

    // here we will add the useState
    const [searchTerm, setSearchTerm] = React.useState("");

    return (
        <main>
            <div className="pattern"/>
                <div className="wrapper">
                    <header>
                        <img src="./hero.png" alt="Hero Banner"/>
                        <h1>Find <span className="text-gradient">Movies</span> you like!</h1>
                    </header>
                    <Search searchTerm = {searchTerm} setSearchTerm = {setSearchTerm}/>
                    <h1>{searchTerm}</h1>
            </div>
        </main>
    )
}

export default App // Exporting the App component
