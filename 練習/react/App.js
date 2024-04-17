import logo from './logo.svg';
import './App.css';

/*
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
const styleArgument = {fontSize: '100px', color:'red'};

const changeText=(event)=>{
  console.log(event.target)
  event.target.innerText = event.target.innerText + "被點了"
 }
 function App() {
  return (
  <div className="App">
 <h1 style = { styleArgument } onClick= {changeText}> hello CGU!!
 </h1>
  </div>
  );
 }

export default App;
