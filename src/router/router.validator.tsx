import React from 'react';

// You can return a Boolean or a string of route path or a ReactNode.
type Validator = () => boolean | string | React.ReactNode;

// Login authentication
export const isLoginValidator: Validator = () => {
  console.error('[router.validator.tsx]: If you want to verify login, please modify the code here');
  return true;
  // return false;
  // return '/login';
  // return <h1>I don't have authority</h1>;
  // return <Login/>;
};

// Administrator authentication
export const isAdminValidator: Validator = () => {
  // logic here
  return true;
};

// You can also combine multiple validators together, like middleware.
export const isAllPassValidator: Validator = () => {
  // For example:
  // First step: verify login
  const isLoginRet = isLoginValidator();
  if (isLoginRet !== true) return isLoginRet;

  // Second step: verify admin
  const isAdminRet = isAdminValidator();
  if (isAdminRet !== true) return isAdminRet;

  // If all passed, return true or a path string or a ReactNode.
  return true;
};
