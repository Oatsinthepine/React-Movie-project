// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import {useState, useEffect} from "react";

// function App() {
//   const [count, setCount] = useState(0)
//
//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }
//
// export default App

const Card = ({title}) => {
    // useState is a React hook that allows you to add state to functional components
    const [hasLiked, setHasLiked] = useState(false);

    // useEffect is a React hook that allows you to perform side effects in functional components
    const [count, setCount] = useState(0);
    useEffect(() => {
        console.log(`${title} has been liked: ${hasLiked}`);
    }, [hasLiked]); // The second argument is the dependency array, which means this effect will run when hasLiked changes

    useEffect(() => {
        console.log('Card rendered')
    }, []);


    return (
        // This is the inline style object for the card
        <div className="card" onClick={() => setCount((prevState) => prevState+1)}
             style = {
            {
                boarder: '1px solid #4b5362',
                padding: '10px',
                margin: '10px',
                backgroundColor: '#2c2f38',
                boarderRadius: '5px',
                minHeight: '100px',
            }
        }>
            <h2>Card title is: {title} <br/> {count ? count : null} </h2>
            <button onClick={() => {return setHasLiked(!hasLiked)}}>
                {hasLiked ? 'Liked' : 'Like'}
            </button>
        </div>
    )
}

const App2 = () => {

    return (
        <div className={'card-container'}>
            <h2> Function arrow component</h2>
            <Card title = 'Star Wars' rating = {5} isCool={true} actors = {[{name: "Someone"}]}/>
            <Card title = 'Avatar'/>
            <Card title = 'Lion king'/>
        </div>
    )
}

export { App2 } // Exporting App2 component