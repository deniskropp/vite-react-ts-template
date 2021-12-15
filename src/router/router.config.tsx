import React, {lazy} from 'react';
import {RouteObject} from 'react-router-dom';
import Auth from '@/router/Auth';
import {isLoginValidator, isAdminValidator} from '@/router/router.validator';


// ------------------------------------------------------------------------------------------
// ======================================== Layout ======================================== ↓
import BasicLayout from '@/layout/BasicLayout';
import * as path from '@/router/path';
// ^ New layout to here...
// ======================================== Layout ======================================== ↑
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// =================================== Pages(lazy load) =================================== ↓
const NotFound = lazy(() => import('@/pages/NotFound'));
const Unauthorized = lazy(() => import('@/pages/Unauthorized'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const Home = lazy(() => import('@/pages/Home'));
const Admin = lazy(() => import('@/pages/Admin'));
const Foo = lazy(() => import('@/pages/Foo'));
const Authorization = lazy(() => import('@/pages/Authorization'));
// ^ New page to here...
// =================================== Pages(lazy load) =================================== ↑
// ------------------------------------------------------------------------------------------


// ------------------------------------------------------------------------------------------
// ===================================== Route config ===================================== ↓
const routes: RouteObject[] = [
  {
    path: path.HOME,
    element: <Auth validator={isLoginValidator}><BasicLayout/></Auth>,
    children: [
      {
        path: path.HOME,
        element: <Home/>,
      },
      {
        path: path.ADMIN,
        element: <Auth validator={isAdminValidator}><Admin/></Auth>,
      },
      {
        path: path.FOO,
        element: <Foo/>,
      },
      {
        path: path.AUTHORIZATION,
        element: <Authorization/>,
      },
    ],
  },
  {
    path: path.LOGIN,
    element: <Login/>,
  },
  {
    path: path.REGISTER,
    element: <Register/>,
  },
  {
    path: path.UNAUTHORIZED,
    element: <Unauthorized/>,
  },
  {
    path: path.ANY,
    element: <NotFound/>,
  },
];
// ===================================== Route config ===================================== ↑
// ------------------------------------------------------------------------------------------


export default routes;
