import React from 'react';

// You can return a Boolean or a string of routing addresses or a React node.
export function isLoginValidator(): boolean | string | React.ReactNode {
  console.error('[router.validator.tsx]: If you want to verify login, please modify the code here');
  return true;
  // return false;
  // return '/login';
  // return <h1>I don't have authority</h1>;
  // return <Login/>;
}
