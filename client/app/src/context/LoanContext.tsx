import React, { Dispatch, SetStateAction } from 'react';
import { Requirement } from '../api/graphql/generated/graphql';

export interface Loan {
  loanId?: String;
  setLoanId: Dispatch<SetStateAction<undefined>>;
  amount?: Number;
  setAmount: Dispatch<SetStateAction<undefined>>;
  totalInstallments?: Number;
  setTotalInstallments: Dispatch<SetStateAction<undefined>>;
  loanType?: String;
  setLoanType: Dispatch<SetStateAction<undefined>>;
  requirementType?: String;
  setRequirementType: Dispatch<SetStateAction<undefined>>;
}

const LoanContext = React.createContext({} as Loan);

export function useLoan() {
  return React.useContext(LoanContext);
}

function LoanProvider({ children }: React.PropsWithChildren<any>) {
  const [loanId, setLoanId] = React.useState();
  const [amount, setAmount] = React.useState();
  const [totalInstallments, setTotalInstallments] = React.useState();
  const [loanType, setLoanType] = React.useState();
  const [requirementType, setRequirementType] = React.useState();

  const values = {
    loanId,
    setLoanId,
    amount,
    setAmount,
    totalInstallments,
    setTotalInstallments,
    loanType,
    setLoanType,
    requirementType,
    setRequirementType,
  };

  return (
    <LoanContext.Provider value={{ ...values }}>
      {children}
    </LoanContext.Provider>
  );
}

export default React.memo(LoanProvider);
