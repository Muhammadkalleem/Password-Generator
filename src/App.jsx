import { useState, useCallback, useEffect ,useRef} from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [chara, setChara] = useState(false);
  const [password, setPassword] = useState("");

  const PasswordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    
    if (number) str += "1234567890";
    if (chara) str += "!#$%&'( )*+,-/;<=>?@[]^_{|}~";

    // Generating password using the selected length
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length); // Corrected random character selection
      pass += str.charAt(char); // Appending to the pass string
    }

    setPassword(pass);
  }, [length, number, chara,setPassword]);

  useEffect(()=>{
     PasswordGenerator()

  },[length,number,chara,PasswordGenerator])

   const reference=useRef(null);

    const copycode = useCallback(()=>{
      reference.current?.select()
      reference.current?.setSelectionRange(0,20)
      window.navigator.clipboard.writeText(password)

   },[password])

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-brown-700">
        <h1 className="text-white text-center">Password Generator</h1>

        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input 
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Generated Password"
            readOnly
            ref={reference}
          />
          <button 
           onClick={copycode}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink"
          //  onClick={() => navigator.clipboard.writeText(password)}
          >
            Copy
          </button>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input 
              type="range"
              min={6}
              max={25}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-x-2">
            <input 
              type="checkbox"
              checked={number}
              onChange={() => setNumber(!number)}
            />
            <label>Include Numbers</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input 
              type="checkbox"
              checked={chara}
              onChange={() => setChara(!chara)}
            />
            <label>Include Special Characters</label>
          </div>
        </div>

        <div className="mt-4">
          <button 
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={PasswordGenerator}
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
