import { StoreProvider } from './contexts/Store.context'
import Home from "./pages/Home"
import Toolbar from './components/Toolbar';

function App() {
  // console.log("App rendering...")

  return (
    <StoreProvider>
      <div className="App">
        <Toolbar />
        <Home />
      </div>
    </StoreProvider>
  );

}

export default App;
