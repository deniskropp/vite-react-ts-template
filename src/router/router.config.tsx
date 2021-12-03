import React, {lazy} from 'react';
import {RouteObject} from 'react-router-dom';
import Auth from '@/router/Auth';
import {isLoginValidator, isAdminValidator} from '@/router/router.validator';

// layout
import BasicLayout from '@/layout/BasicLayout';

// pages(lazy load)
const NotFound = lazy(() => import('@/pages/NotFound'));
const Unauthorized = lazy(() => import('@/pages/Unauthorized'));
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const Admin = lazy(() => import('@/pages/Admin'));
const Foo = lazy(() => import('@/pages/Foo'));

// route config
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
        path: '/admin',
        element: <Auth validator={isAdminValidator}><Admin/></Auth>,
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
