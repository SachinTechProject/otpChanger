import { useState, useCallback, useEffect,useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllwored, setNumberAllwred] = useState(false)
  const [charAllwed, setCharAllwed] = useState(true);
  const [password, setPassword] = useState("")

  //useRef hook

  const passwordRef = useRef(null)

  const passwordGererator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllwored) str += "0123456789"
    if(charAllwed) str += "!@#$%&"

    for(var i = 1; i<= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }

    setPassword(pass )


  },[length, numberAllwored,charAllwed,setPassword])
  
   const copyPasswordtoClipbord = useCallback(()=>{
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
   },[password])

  useEffect(()=>{
   passwordGererator()
  },[length, numberAllwored,charAllwed, passwordGererator])

  return (
    <>
     {/* */}
   <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800'>
   <h1 className='text-4xl text-white text-center'>Password generator</h1>
     <div className='flex shadow rounded-lg overflow-hidden mt-3 mb-4'>
       <input type="text" ref={passwordRef} value={password} className='outline-none w-full py-2  px-3' placeholder='password' readOnly />
       <button onClick={copyPasswordtoClipbord} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
     </div>
     <div className='flex text-sm gap-x-2'>
      <div className='flex item-center gap-x-1'>
        <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} /><label>Lenght: {length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={numberAllwored} id='numberInput' onChange={()=>{setNumberAllwred((prev)=> !prev)}}/> <label htmlFor="">Number</label>
      </div>
      <div className='flex items-center gap-x-1'>
        <input type="checkbox" defaultChecked={charAllwed} id='numberInput' onChange={()=>{setCharAllwed((prev)=> !prev)}}/> <label htmlFor="">Char</label>
      </div>
     </div>
   </div>


  
    </>

    
  )
}

export default App
