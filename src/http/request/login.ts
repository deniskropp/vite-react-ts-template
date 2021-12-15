import http from '@/http/http';
import API from '@/http/api';

interface ILoginParam {
  email: string;
  password: string;
}
interface IHttpResponse {
  data: ILoginResponse;
}
interface ILoginResponse {
  token: string|null; // 用户token c46b11c5f0d04d3c126803f694b15938
}

interface ILogin   {
  (param: ILoginParam): Promise<ILoginResponse>;
}
export const login: ILogin = async (param) => {
  try {
    const res = await http.post<IHttpResponse>(API.LOGIN, param);
    return res.data.data;
  } catch (error) {
    return {token: null};
  }
};
