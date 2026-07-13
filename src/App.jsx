import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()`~-_=+/\|.><,;:'[]{}";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  }, [password])

  // useEffect(()=>{passwordGenerator()},[length, numAllowed, charAllowed,passwordGenerator])

  return (
    <div className='h-screen w-screen bg-black flex justify-center' style={{
      backgroundImage: `url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2r8KL4BzmUQCXZWNipk4te1esSdtVyDWrvw&s")`, height: '100vh', width: '100vw', backgroundSize: 'cover', backgroundPosition: 'center', alignItems: 'center'
    }}>
      <div className='w-full max-w-200 max-h-60 mx-auto shadow-2xl rounded-lg p-4 my-8 text-black bg-blend-color text-center mt-8'>
        <h1 className='text-4xl text-center text-black' style={{ marginTop: 10 }}>Password Generator</h1>
        <div className='flex rounded-lg overflow-hidden' style={{ margin: 20 }}>
          <input type="text" value={password} className='outline-none w-full rounded-xl font-bold' placeholder='Password' style={{ padding: 15, margin: 8 }} readOnly ref={passwordRef} />
          {/* <button onClick={copyPasswordToClipboard} className='outline-none bg-blend-color text-black px-3 py-0.5 shrink-0 rounded-xl w-25 cursor-pointer'>Copy</button> */}
          <button onClick={copyPasswordToClipboard}
            className="outline-none bg-blend-color text-black px-3 py-0.5 shrink-0 rounded-xl w-25 cursor-pointer active:scale-95 active:bg-purple-200 active:text-black transition duration-150">Copy</button>
          <button className='outline-none bg-blend-color text-black px-3 py-0.5 shrink-0 rounded-xl w-25 cursor-pointer active:scale-95 active:bg-purple-200 active:text-black transition duration-150' onClick={() => { passwordGenerator() }}>Generate Password</button>
        </div>
        <div className='flex text-l gap-x-8' style={{ padding: 10, margin: 8, justifyContent: 'center' }}>
          <div className='flex items-center gap-x-1 p-6'>
            <input type="range" min={8} max={20} value={length} className='cursor-pointer p-6' onChange={(e) => { setLength(e.target.value) }} />
            <label className='text-black'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numAllowed} id="numInput" className='cursor-pointer' onChange={() => { setNumAllowed((prev) => !prev); }} />
            <label className='text-black'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id="numInput" className='cursor-pointer' onChange={() => { setCharAllowed((prev) => !prev); }} />
            <label className='text-black'>Characters</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
