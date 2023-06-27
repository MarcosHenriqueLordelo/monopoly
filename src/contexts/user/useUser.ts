import { useContext } from 'react';
import UserContext from './index';

const useUser = () => {
  const context = useContext(UserContext);
  return context;
};

export default useUser;
