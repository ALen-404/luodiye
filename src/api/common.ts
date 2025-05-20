import axios, { AxiosResponse } from 'axios';

// 基础 URL
export const BASE_URL = 'https://egeapi.showinc.shop';

// 接口响应类型
export interface ApiResponse<T> {
  code: number;
  data: T;
  msg: string;
}

// 错误码映射
export const ERROR_MESSAGES: { [key: number]: string } = {
  501: 'Request failed',
  504: 'Repeated submission',
  10001: 'Invalid user',
  10002: 'Superior purchase required',
  10003: 'Sold out',
  10004: 'System error',
  10005: 'Verification code error',
  10006: 'Already bound',
  10007: 'No superior bound',
  10008: 'Invalid superior',
  10009: 'One account can only purchase one NFT',
  10010: 'Contract does not exist',
  10011: 'Incorrect wallet address bound',
  10012: 'Signature verification failed',
  10013: 'Superior team quota insufficient',
  10014: 'Order exception',
  10015: 'Invalid wallet address format',
  10016: 'Insufficient balance',
  10017: 'Invalid relationship',
  10018: 'Superior has no valid miner',
  10019: 'KMTC balance insufficient',
  10020: 'Status cannot be changed',
  10021: 'Account frozen',
  10022: 'Invalid email format',
  10023: 'Cannot transfer to the same account',
  10024: 'Not within trading hours',
  10025: 'Operation conflict, please try again later',
  10026: 'Email sending failed, please try again later',
  10027: 'Order not completed',
  10028: 'Minimum KMTC required',
  10029: 'Minimum deposit amount required',
  10030: 'Order already completed',
};

// 通用请求函数
export const request = async <T>(
  method: 'GET' | 'POST',
  url: string,
  data: any = null,
  contentType: 'application/json' = 'application/json'
): Promise<T> => {
  try {
    const response: AxiosResponse<ApiResponse<T>> = await axios({
      method,
      url: `${BASE_URL}${url}`,
      data,
      headers: {
        'Content-Type': contentType,
        Authorization: `${localStorage.getItem('token') || ''}`,
      },
    });
    const { code, data: responseData, msg } = response.data;
    if (code === 200) {
      return responseData;
    } else {
      throw new Error(ERROR_MESSAGES[code] || msg || 'Unknown error');
    }
  } catch (error: any) {
    throw new Error(error.message || 'Network error');
  }
};