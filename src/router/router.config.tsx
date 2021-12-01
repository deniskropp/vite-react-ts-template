import React, {lazy} from 'react';
import {RouteObject} from 'react-router-dom';
import Auth from '@/router/Auth';
import {isLoginValidator} from '@/router/router.validator';

const BasicLayout = lazy(() => import('@/layout/BasicLayout'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Unauthorized = lazy(() => import('@/pages/Unauthorized'));
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const Foo = lazy(() => import('@/pages/Foo'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Auth validator={isLoginValidator}><BasicLayout/></Auth>,
    children: [
      {
        path: '/',
        element: <Home/>,
      },
      {
        path: '/foo',
        element: <Foo/>,
      },
    ],
  },
  {
    path: '/login',
    element: <Login/>,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized/>,
  },
  {
    path: '*',
    element: <NotFound/>,
  },
];

export default routes;
