import { StoreProvider } from './contexts/Store.context'
import Toolbar from './components/Toolbar';
import Home from "./pages/Home"
import { FiHeart } from 'react-icons/fi';


export default function App() {
  // console.log("App rendering...")
  document.title = "Shaperr"

  return (
    <div className="App">
      <main>
        <StoreProvider>
          <Toolbar />
          <Home />
        </StoreProvider>
      </main>
      <div className="footer">
        <p>Made with <FiHeart /> by <span>Elduwani</span></p>
      </div>
    </div>
  );

}