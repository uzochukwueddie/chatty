import { AppRouter } from '@root/routes';
import { BrowserRouter } from 'react-router-dom';
import '@root/App.scss';

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
