import { createContext, useContext, useEffect, useState } from 'react';
import { getContract, Contract } from '../api/funds';
import { toast } from 'react-toastify';

interface ContractContextType {
  contract: Contract | null;
  loading: boolean;
  error: string | null;
}

export const ContractContext = createContext<ContractContextType | undefined>(undefined);

export const ContractProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContract = async () => {
      try {
        setLoading(true);
        const data = await getContract();
        setContract(data);
      } catch (err: any) {
        setError(err.message);
        toast.error(`获取合约地址失败: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchContract();
  }, []);

  return (
    <ContractContext.Provider value={{ contract, loading, error }}>
      {children}
    </ContractContext.Provider>
  );
};

export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error('useContract must be used within a ContractProvider');
  }
  return context;
};