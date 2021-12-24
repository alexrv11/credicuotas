import React, { Dispatch, SetStateAction } from 'react';

export interface Loan {
  amount?: Number;
  setAmount: Dispatch<SetStateAction<undefined>>;
  totalInstallments?: Number;
  setTotalInstallments: Dispatch<SetStateAction<undefined>>;
  incomeType?: String;
  setIncomeType: Dispatch<SetStateAction<undefined>>;
}

const LoanContext = React.createContext({} as Loan);

export function useLoan() {
  return React.useContext(LoanContext);
}

function LoanProvider({ children }: React.PropsWithChildren<any>) {
  const [amount, setAmount] = React.useState();
  const [totalInstallments, setTotalInstallments] = React.useState();
  const [incomeType, setIncomeType] = React.useState();

  const values = {
    amount,
    setAmount,
    totalInstallments,
    setTotalInstallments,
    incomeType,
    setIncomeType,
  };

  return (
    <LoanContext.Provider value={{ ...values }}>
      {children}
    </LoanContext.Provider>
  );
}

export default React.memo(LoanProvider);
