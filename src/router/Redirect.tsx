import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

interface IRedirect {
  to: string;
}

const Redirect: React.FC<IRedirect> = ({to}) => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to);
  }, []);
  return null;
};

export default Redirect;
