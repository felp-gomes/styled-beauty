import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import RegisterUser from '../pages/RegisterUser/RegisterUser';
import Store from '../pages/Store/Store';
import RegisterStore from '../pages/RegisterStore/RegisterStore';

const Routers = () => {
  return (
    <Routes>
      <Route element={<Login />} path="/" exact />
      <Route element={<RegisterUser />} path="/cadastrar-se" />
      <Route element={<Home />} path="/home" />
      <Route element={<Store />} path="/loja/:id" />
      <Route element={<RegisterStore />} path="/cadastrar-loja" />
    </Routes>
  );
};

export default Routers;
