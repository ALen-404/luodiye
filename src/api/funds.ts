import { request } from './common';

// 价格数据类型
export interface PriceVo {
  contractPrice: number;
  exchangePrice: number;
}

// 闪兑
export const exchange = async (
  amount: number,
  sign: string
): Promise<string> => {
  return request<string>(
    'POST',
    '/funds/exchange',
    { amount, sign },
    'application/json'
  );
};

// 提币
export const extract = async (
  amount: number,
  currency: 'USDT' | 'EGE',
  sign: string
): Promise<string> => {
  return request<string>(
    'POST',
    '/funds/extract',
    { amount, currency, sign },
    'application/json'
  );
};

// 获取 EGE 价格
export const getPrice = async (): Promise<PriceVo> => {
  return request<PriceVo>('POST', '/funds/getPrice', null, 'application/json');
};

// 获取充值地址
export const getTopUpAddress = async (): Promise<string> => {
  return request<string>(
    'POST',
    '/funds/getTopUpAddress',
    null,
    'application/json'
  );
};

// 参与盲盒
export const participateBlindBox = async (
  amount: number,
  sign: string
): Promise<string> => {
  return request<string>(
    'POST',
    '/funds/participateBlindBox',
    { amount, sign },
    'application/json'
  );
};

// 获取资金配置
export interface Bis {
  blindboxMaxnumber: number;
  blindboxMinusdt: number;
  blindboxReward: number;
  exchangeMax: number;
  exchangeMin: number;
  extractMin: number;
  extract_max: number;
  id: string;
  nftDestroyCondition: string;
  nftReward: number;
  priceFluctuation: number;
}

export const getBis = async (): Promise<Bis> => {
  return request<Bis>('POST', '/funds/getBis', null, 'application/json');
};

// 获取合约地址
export interface Contract {
  blindBoxContract: string;
  egeContract: string;
  id: string;
  lastBlock: number;
  nftContract: string;
  usdtContract: string;
}

export const getContract = async (): Promise<Contract> => {
  return request<Contract>(
    'POST',
    '/funds/getContract',
    null,
    'application/json'
  );
};

// 获取全网算力
export interface Hashrate {
  hashrateDynamic: number;
  hashrateStatic: number;
}

export const getHashrate = async (): Promise<Hashrate> => {
  return request<Hashrate>(
    'POST',
    '/funds/getHashrate',
    null,
    'application/json'
  );
};

// 用户盲盒记录数据类型
export interface UserBlindbox {
  amount: number; // 参与数量
  id: string; // 主键ID
  powerReward: number; // 算力奖励值
  redeemTime: string; // 兑换/结束时间
  status: 1 | 2 | 3; // 状态: 1-进行中, 2-未中奖, 3-已中奖
  takeTime: string; // 参与时间
  userId: string; // 用户ID
}

export interface Page<T> {
  countId: string;
  current: number;
  hitCount: boolean;
  maxLimit: number;
  optimizeCountSql: boolean;
  orders: Array<{ asc: boolean; column: string }>;
  pages: number;
  records: T[];
  searchCount: boolean;
  size: number;
  total: number;
}

// 获取用户盲盒记录
export const getUserBlindbox = async (params: {
  offset: number;
  page: number;
  status?: 1 | 2 | 3;
}): Promise<Page<UserBlindbox>> => {
  return request<Page<UserBlindbox>>(
    'GET',
    `/funds/getUserBlindbox?offset=${params.offset}&page=${params.page}`,
    params,
    'application/json'
  );
};

// 用户账变记录数据类型
export interface ChangeRecords {
  amount: number; // 交易数量
  currency: 'EGE' | 'USDT'; // 币种类型
  fromAddress: string; // 转出地址
  id: string; // 主键ID
  operateTime: string; // 操作时间
  payStatus: 0 | 1 | 2; // 支付状态: 0-待确认, 1-成功, 2-失败
  toAddress: string; // 转入地址
  txId: string; // 区块链交易哈希
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13; // 交易类型
  userId: string; // 用户ID
}

// 获取用户账变记录
export const getChangeRecords = async (params: {
  offset: number;
  page: number;
  type?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;
}): Promise<Page<ChangeRecords>> => {
  // 动态构建查询字符串
  const queryParams = new URLSearchParams({
    offset: params.offset.toString(),
    page: params.page.toString(),
  });
  if (params.type !== undefined) {
    queryParams.append('type', params.type.toString());
  }
  return request<Page<ChangeRecords>>(
    'GET',
    `/funds/getChangeRecords?${queryParams.toString()}`,
    'application/json'
  );
};

// 判断是否可销毁
export const isDestroy = async (): Promise<boolean> => {
  return request<boolean>(
    'POST',
    '/funds/isDestroy',
    null,
    'application/json'
  );
};