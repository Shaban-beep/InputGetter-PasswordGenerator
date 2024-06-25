import { useState, useCallback, useEffect, useRef } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(""); // page jb load ho to ye line of code aik random password input mn daal de ga aur jb kuch password generaate ho to us ko set kr de ga

  // useRef hook
  const passwordRef = useRef(null); //abi koe reference ni he mery pass

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-+=[]{}~`";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1); // str.length + 1 = ye code string ki length k baraber ata he aur phir math.random se multiply ho kr randomly aik character code generate hoga
      pass += str.charAt(char); // ye line of code 'char' position waly characters ko ly k str mn daal de ga.phir is ko pass mn add kr dega.
    }
    setPassword(pass); // pass mn jo bi value ho gi wo yahan pe setPassword mn chali jaye gi
  }, [length, numberAllowed, charAllowed, setPassword]); // agr in dependencies mn koe change ata he to ye call ho jati han aur pury function mn jahan jahan koe change krna hota he,wahan wo change ho jata he

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select(); // jo bi current value passwordRef mn ho gi us ko select kr diya jaye ga
    passwordRef.current?.setSelectionRange(0,5);
    window.navigator.clipboard.writeText(password); // ye password ko clipboard pe copy kr de ga
    //'window' is tarah sirf react mn likha ja rha he
  }, [password]);

  useEffect(() => {
    // ye aik component ko external system k sath syncronize krny k liyee use hota he.
    // useEffect code ko run krny ki sense mn use kiya jata he
    // length,numberAllowed,charAllowed mn koe bbi change ho to useEffect run ho ga
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);
  return (
    <div className="w-full max-w-md mx-auto shadow-md px-4 text-orange-500 bg-gray-700 rounded-lg pb-2">
      <h1 className="text-4xl text-center font-semibold text-white my-3">
        Password Generator
      </h1>
      <div className="flex shadow-lg rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-1 px-3"
          placeholder="Password"
          readOnly
          re={passwordRef} // ab mery pass koe reference he
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-3 py-o.5 shrink-0"
        >
          copy
        </button>
      </div>

      <div className="flex text-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={100}
            value={length}
            className="cursor-pointer"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label>Length: {length}</label>
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
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>
    </div>
  );
}

export default App;
