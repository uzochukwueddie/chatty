import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './routes';
import './App.scss';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </>
  );
};
export default App;
