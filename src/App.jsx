import { MyProvider } from './context/MyContext';
import GeneralRoute from './routes';

function App() {
  return (
    <div className="App bg-primary-900">
      <MyProvider>
        <GeneralRoute />
      </MyProvider>
    </div>
  );
}

export default App;
