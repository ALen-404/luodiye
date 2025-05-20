import { request, ApiResponse } from './common';

// 用户数据类型
export interface UserVo {
  account: string;
  egeBalance: number;
  powerBlindbox: number;
  powerEge: number;
  registerTime: string;
  superior: string;
  superiors: string;
  token: string;
  usdtBalance: number;
  directPushNft: number;
  teamBlindbox: number;
  teamNft: number;
  todayTeamBlindbox: number;
  vip: number;
  powerDynamic: number;
  powerStatic: number;
  fuTouBlindbox: number;
}

// 获取用户信息
export const getUser = async (): Promise<UserVo> => {
  return request<UserVo>('GET', '/user/getUser');
};

// 判断是否登录
export const isLogin = async (): Promise<boolean> => {
  return request<boolean>('POST', '/user/isLogin');
};

// 退出登录
export const loginOut = async (): Promise<boolean> => {
  return request<boolean>('POST', '/user/loginOut');
};

// 钱包登录
export const walletLogin = async (
  sign: string,
  walletAddress: string
): Promise<UserVo> => {
  return request<UserVo>(
    'POST',
    '/user/walletLogin',
    { sign, walletAddress },
    'application/json'
  );
};
// 获取直推用户信息
export const getZhiTuiUser = async (): Promise<UserVo[]> => {
  return request<UserVo[]>('GET', '/user/getZhiTuiUser', null, 'application/json');
};
// 设置用户复投单数
export const setFuTouBlindbox = async (fuTouBlindbox: number): Promise<ApiResponse<boolean>> => {
  return request<ApiResponse<boolean>>(
    'POST',
    `/funds/setFuTouBlindbox/${fuTouBlindbox}`,
    null,
    'application/json'
  );
};