import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { useAccount, useSignMessage } from 'wagmi';
import { toast } from 'react-toastify';
import { getUser, isLogin, walletLogin, loginOut } from '../api/user';

// 用户数据类型
interface UserVo {
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

// Context 类型
interface UserContextType {
  user: UserVo | null;
  isLoggedIn: boolean;
  error: string | null;
  handleWalletLogin: () => Promise<void>;
  handleLogout: () => Promise<void>;
  checkLogin: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
  updateUserData: () => Promise<void>; // 新增 updateUserData 方法
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserVo | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // 检查登录状态
  const checkLogin = async (): Promise<void> => {
    try {
      const token = localStorage.getItem('token');
      if (token && address) {
        const loggedIn = await isLogin();
        if (loggedIn) {
          const userData = await getUser();
          if (userData.account.toLowerCase() === address.toLowerCase()) {
            setUser(userData);
            setIsLoggedIn(true);
            localStorage.setItem('token', userData.token);
          } else {
            localStorage.removeItem('token');
            setIsLoggedIn(false);
            setUser(null);
          }
        } else {
          localStorage.removeItem('token');
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast.error(`Check login failed: ${err.message}`);
    }
  };

  // 钱包登录
  const handleWalletLogin = async (): Promise<void> => {
    try {
      if (!isConnected || !address) {
        throw new Error('Please connect your wallet');
      }
      const message = 'dapp:EGE';
      const sign = await signMessageAsync({ message });
      const userData = await walletLogin(sign, address);
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('token', userData.token);
      setError(null);
      toast.success('Login successful');
    } catch (err: any) {
      setError(err.message);
      toast.error(`Login failed: ${err.message}`);
    }
  };

  // 退出登录
  const handleLogout = async (): Promise<void> => {
    try {
      await loginOut();
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem('token');
      setError(null);
      toast.success('Logged out successfully');
    } catch (err: any) {
      setError(err.message);
      toast.error(`Logout failed: ${err.message}`);
    }
  };

  // 签名消息
  const signMessage = async (message: string): Promise<string> => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }
    return signMessageAsync({ message });
  };

  // 更新用户数据
  const updateUserData = async (): Promise<void> => {
    try {
      const userData = await getUser();
      setUser(userData);
      localStorage.setItem('token', userData.token);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      toast.error(`Failed to update user data: ${err.message}`);
    }
  };

  // 初始化检查登录状态
  useEffect(() => {
    checkLogin();
  }, [address]);

  // 监听钱包连接状态
  useEffect(() => {
    if (isConnected && address && !isLoggedIn) {
      checkLogin();
    }
  }, [isConnected, address, isLoggedIn]);

  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        error,
        handleWalletLogin,
        handleLogout,
        checkLogin,
        signMessage,
        updateUserData, // 提供 updateUserData 方法
      }}
    >
      {children}
    </UserContext.Provider>
  );
};