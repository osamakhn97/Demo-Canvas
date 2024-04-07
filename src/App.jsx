import './App.css'
import './Styles/master.css';
import LeftPanel from "./Components/LeftPanel";
import RightPanel from "./Components/RightPanel";
import Editor from "./Components/Editor";
import React from "react";
function App() {
  return (
    <>
     <div className='root-container'>
      <LeftPanel/>
      <Editor/>
       {/*<RightPanel/>*/}
     </div>
    </>
  )
}

export default App
