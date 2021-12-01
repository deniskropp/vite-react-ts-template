import React from 'react';
import Redirect from '@/router/Redirect';

interface IAuth {
  validator: () => boolean | string | React.ReactNode | undefined;
}

const Auth: React.FC<IAuth> = ({children, validator}) => {
  if (!validator) return <>{children}</>;
  const result = validator();
  if (typeof result === 'boolean') {
    return result ? <>{children}</> : <Redirect to='/unauthorized'/>;
  }
  if (typeof result === 'string' && result.length > 0) return <Redirect to={result}/>;
  return <>{result}</>;
};

export default Auth;
