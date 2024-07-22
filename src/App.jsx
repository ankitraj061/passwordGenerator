import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (numbers) {
      charset += '0123456789';
    }
    if (symbols) {
      charset += '!@#$%^&*()_+[]{}|;:,.<>?';
    }

    let generatedPassword = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
  };

  useEffect(() => {
    generatePassword();
  }, [length, numbers, symbols]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password).then(() => {
      alert('Password copied to clipboard!');
    }, () => {
      alert('Failed to copy password.');
    });
  };

  return (
    <div className="flex items-center justify-center ">
      <form className="bg-slate-700 p-6 w-[500px] rounded-lg shadow-lg">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">Password Generator</h2>
        
        <div className="mb-4">
          <input 
            type="text" 
            value={password} 
            readOnly
            placeholder="Generated Password" 
            className="w-full p-2 mb-2 bg-gray-300 rounded-lg text-gray-800"
          />
          <button 
            type="button" 
            onClick={copyToClipboard}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Copy
          </button>
        </div>

        <div className="mb-4">
          <label className="text-white block mb-1">Password Length: {length}</label>
          <input 
            type="range" 
            min="5" 
            max="100" 
            value={length}
            onChange={(e) => setLength(e.target.value)}  
            className="w-full"
          />
        </div>

        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            id="numbers" 
            checked={numbers}
            onChange={(e) => setNumbers(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="numbers" className="text-white">Include Numbers</label>
        </div>

        <div className="flex items-center mb-4">
          <input 
            type="checkbox" 
            id="symbols" 
            checked={symbols}
            onChange={(e) => setSymbols(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="symbols" className="text-white">Include Symbols</label>
        </div>
      </form>
    </div>
  );
}

export default App;
