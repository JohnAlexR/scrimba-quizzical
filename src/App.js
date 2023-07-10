import './App.css';
import React from 'react';
import Title from "./Title.js"
import Quiz from "./Quiz.js"

function App() {

  const [onTitlePage, setOnTitlePage] = React.useState(()=>{
    console.log('state ran - on title page')
    return true})

  function changePage() {
    setOnTitlePage(prevPage => !prevPage)
  }

  return (
    <main className="main">
        {onTitlePage ? 
        <Title 
          navigate={changePage}

        /> : 
        <Quiz 
          onTitlePage={onTitlePage}
        
        />}
    </main>
  );
}

export default App;
