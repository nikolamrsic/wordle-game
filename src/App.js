
import './App.css';
import React from 'react';
import { useEffect,useState } from 'react';
function App() {
  let formRef = React.useRef(null);

  let [arrWord, setArrWord] = React.useState([
    "horse",
    "house",
    "world",
    "worse"
  ]);
  let [word, setWord] = React.useState(
    arrWord[Math.floor(Math.random() * arrWord.length)]
  );

  let [polja, setPolja] = React.useState([1, 2, 3, 4, 5]);
  let [vrste, setVrste] = React.useState([1, 2, 3, 4, 5]);
  let [inputs, setInputs] = React.useState([]);
  let [isEnd, setEnd] = React.useState(false);

  useEffect(() => {
    if (word !== "") {
      if (inputs.length > 0) {
        if (inputs.join("") === word) {
          setEnd(true);
        }
        if (inputs.length === 5) {
          setInputs([]);
        }
      }
    }
  }, [inputs]);

  useEffect(() => {
    if (formRef.current.elements[24].value !== "") {
      setEnd(true);
    }
  }, [inputs]);

  return (
    <div className="App relative h-screen w-full overflow-auto  ">
      <div className='w-full h-full absolute top-0 left-0  bg-gradient-to-b z-[-1] animaton from-gray-900 to-orange-500'></div>
      <div className="p-2 w-8/12 mx-auto m-8">
        <h1 className="text-3xl text-white font-bold">Wordle </h1>

        {isEnd && (
          <h1 className="text-white mb-8">
            Word Was <span className="text-orange-500">{word}</span>
          </h1>
        )}
      </div>
      <form className='border border-white/25 rounded drop-shadow-xl w-fit mx-auto  backdrop-blur-lg bg-white/10' ref={formRef}>
        {vrste.map((vrsta, indexV) => {
          return (
            <div
              key={indexV + 1}
              className="w-full justify-center flex gap-5 p-3 "
            >
              {polja.map((polje, index) => {
                return (
                  <input
                    disabled={isEnd && true}
                    key={index}
                    onInput={(event) => {
                      setInputs([...inputs, event.target.value]);

                      if (word.split("")[index] === event.target.value) {
                        event.target.style.background = "green";
                      } else if (
                        word.split("").some((i) => i === event.target.value)
                      ) {
                        event.target.style.background = "yellow";
                      } else {
                        event.target.style.background = "gray";
                      }

                      const form = event.target.form;
                      const innd = [...form].indexOf(event.target);

                      form.elements[innd + 1]?.focus();
                      event.preventDefault();
                    }}
                    minLength={1}
                    maxLength={1}
                    className="h-24 outline-purple-500 flex items-center justify-center text-center text-3xl font-bold w-24 bg-white"
                  />
                );
              })}
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default App;
