import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  const {waiting,loading, questions, index, correct, nextQuestion, checkAnswer} = useGlobalContext()
  if(waiting) {
    return <SetupForm/>
  }
  if(loading) {
    return <Loading/>
  }
  //desctructuring the question 
  const {question, correct_answer, incorrect_answers} = questions[index]
  const answers = [...incorrect_answers, correct_answer]
  //shuffle array
  const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  shuffleArray(answers)
  return (
    <main>
       <Modal />
      <section className='quiz'>

        <p className='correct-answers'>
          correct answer: {correct}/{index}
        </p>

        <article className='container'>
          <h2 dangerouslySetInnerHTML={{__html: question}}></h2>
        </article>

        <div className='btn-container'>
          {answers.map((answer,index) => {
            return(
              <button
              key={index}
              className='answer-btn'
              onClick={() => checkAnswer(correct_answer === answer)} //passing in booolean
              dangerouslySetInnerHTML={{__html: answer}}
              >
              </button>
            )
          })}
        </div>
        <button className='next-question' onClick={nextQuestion}> 
          Next Question
        </button>
      </section>
    </main>
  )
}

export default App
