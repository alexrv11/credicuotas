import React, { Dispatch, SetStateAction } from 'react';

export interface Loan {
  loanId?: String;
  setLoanId: Dispatch<SetStateAction<undefined>>;
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
  const [loanId, setLoanId] = React.useState();
  const [amount, setAmount] = React.useState();
  const [totalInstallments, setTotalInstallments] = React.useState();
  const [incomeType, setIncomeType] = React.useState();

  const values = {
    loanId,
    setLoanId,
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
