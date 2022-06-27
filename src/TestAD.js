import react, {useState} from 'react';

const HOBBIES = [
  { question: 'How many times did you run?', stateName: 'running' },
  { question: 'How many manga comics did you read?', stateName: 'manga' },
  {
    question: 'How many hours did you spend on the drums?',
    stateName: 'drums',
  },
]

const questionOrder = HOBBIES.map((hobby) => {
  return hobby.stateName
})

export const HobbyForm: React.FC = () => {
  // set up 1st state hook for the first question, so that it displays a "show" state
  const [hobbyState, setHobbyState] = useState('show')

  // create a hobbyStates object that will store all the individual hobbyState variables.
  // set the first key-value pair for running
  const hobbyStates = {
    [questionOrder[0]] }

  // similarly, do the same by setting up a setHobbyStates object
  const setHobbyStates = {
    [questionOrder[0]]  }

  // now set up the remaining questions' state hooks as ''. This hides the question as you'll
  // see in the HobbyQuestion component below.
  for (let i = 1; i < questionOrder.length; i++) {
    const [hobbyState, setHobbyState] = useState('')
    hobbyStates[questionOrder[i]] = hobbyState
    setHobbyStates[questionOrder[i]] = setHobbyState
  }

  return (
    <>
        <p>
      {HOBBIES.map((hobby) => {
        return (
            key={hobby.stateName}
            question={hobby.question}
            status={hobbyStates[hobby.stateName]}
            updateStatus={setHobbyStates[hobby.stateName]}
          
        )
      })}
</p>
    </>
  )
}
