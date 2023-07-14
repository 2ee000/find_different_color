import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom';

import Home from './pages/Home';
import Game from './pages/Game';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/game',
      element: <Game />
    },
  ])
  return (
    <RouterProvider router={router} />
  );
}

export default App;