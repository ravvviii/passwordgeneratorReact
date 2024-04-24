import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'


function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);

  const [pass, setPass] = useState("")

  const passwordRef = useRef(null)

  // ----------------Usecallback-------------
  const passwordGenereator = useCallback(()=>{
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    

    if(numberAllowed ) str+="0123456789"
    if(charAllowed ) str+="!@#$%^&*()"


    for (let i = 1; i <= length; i++) {
     let char = Math.floor(Math.random()*str.length +1)
     pass = pass+str.charAt(char);
      
    }

    setPass(pass)
  }, [length, numberAllowed, charAllowed, setPass])







  // ----------------UseEffect-------------
useEffect(()=>{
  passwordGenereator()
},[length, numberAllowed, charAllowed, passwordGenereator])






// Useref-------------------------------


const copyPasswordToClip = useCallback(()=>{
  passwordRef.current?.select()
  window.navigator.clipboard.writeText(pass)
},[pass])

  return (
    <> 
      
      

      <div className=' w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-300  bg-gray-600'>
        
      <h1 className='  text-white text-center my-3 mx-3'>Password Genertor</h1>


        <div className='  flex shadow-sm rounded-lg  overflow-hidden mb-5'> <input

        type="text" 
        value={pass}  
        className=' outline-none w-full py-1 px-3'
        placeholder='pass'
        readOnly
        ref={passwordRef}
        
        
        
        />


        <button onClick={copyPasswordToClip} className=' outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        
        >copy</button>
        
        </div>
        <div className=' flex text-sm gap-x-3'>

          <div className='  flex items-center gap-x-1'>

            <input 

            type="range" 
            min={6}
            max={100}
            value={length}
            className=' cursor-pointer'
            onChange={(e) =>{setLength(e.target.value)}}
            />
            <label htmlFor="">Length :({length})</label>
          </div>
          <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev);
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Characters</label>
      </div>
        </div>


      </div>








      </>
  )
}

export default App
