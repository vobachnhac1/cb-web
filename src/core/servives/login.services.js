// import { HttpRequest } from '../../../src/core/http';
import { HttpRequest } from '@/core/http';

export const signinByUser = ({username, password}) => {
    return HttpRequest({
      url: 'auth/signin',
      method: 'POST',
      data: { username, password },
    });
  };
  