import { useState, useCallback, useEffect, useRef } from 'react'
import Connect from './Connect';


function App() {

  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [PassWord, setPassWord] = useState("");
  const [login, setLogin] = useState(false);


  //useRef Hook

  const PassWordRef = useRef(null)

  const PassWordGenerator = useCallback(() => {

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let pass = "";
    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*(){}~";

    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassWord(pass);
  }, [length, numberAllowed, characterAllowed, setLength])

  const copyPassWordToClipboard = useCallback(() => {
    PassWordRef.current?.select()
    window.navigator.clipboard.writeText(PassWord)
  }, [PassWord])

  // PassWordGenerator(); 

  useEffect(() => {
    PassWordGenerator();
  }, [length, numberAllowed, characterAllowed, setLength])

  return (
    <>
      {login ? (
        <div
          className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-8 bg-gray-800 text-orange-500'
        >
          <div
            className='text-2xl text-center text-white mb-4'
          >
            PassWord Generator
          </div>

          <div
            className='flex shadow rounded-lg overflow-hidden mb-4'
          >
            <input type="text"
              value={PassWord}
              className='outline-none w-full py-1 px-3'
              placeholder='PassWord'
              readOnly
              ref={PassWordRef}
            />
            <button
              className='outline-none bg-blue-700 px-3 py-0.5 shrink-0 text-white'
              onClick={copyPassWordToClipboard}
            >Copy</button>
          </div>

          <div
            className='flex text-sm gap-x-2'
          >
            <div
              className='flex items-center gap-x-1'
            >
              <input type="range"
                value={length}
                min={8}
                max={28}
                className='cursor-pointer'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label >Length:{length}</label>


              <div
                className='ml-2'
              >
                <input type="checkbox"
                  className='mx-1'
                  value={numberAllowed}
                  onChange={(e) => {
                    setNumberAllowed(e.target.checked)
                  }}
                />
                <label>Number</label>
              </div>


              <div
                className='ml-2'
              >

                <input type="checkbox"
                  className='mx-1'
                  value={characterAllowed}
                  onChange={(e) => { setCharacterAllowed(e.target.checked) }}
                />
                <label>Characters</label>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div>
          <Connect login={login} setLogin={setLogin}/>
        </div>
      )}
    </>
  )
}

export default App
