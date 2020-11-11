import { useState } from "react"
import Rect from './components/Rect'

function App() {
  return (
    <div className="App">
      <section className="toolbar-wrapper"></section>
      <section className="content-wrapper">
        <Rect />
      </section>
    </div>
  );
}

export default App;
