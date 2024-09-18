import { pmt } from "./calc";

export type MortgageBase = {
  principal: number;
  yearlyInterest: number;
  months: number;
  extraMonthlyPayment: number;
  investmentYearlyInterest: number;
};

export type MortgageTableRow = {
  period: number;
  principalPayment: number;
  interestPayment: number;
  principalLeft: number;
  totalPaid: number;
  newInvestment: number;
  investmentInterest: number;
  investmentTotal: number;
  balance: number;
};

export type Mortgage = MortgageBase & {
  monthlyPayment: number;
  monthlyInvested: number;
  initialInvested: number;
};

export const calcMonthlyPayment = (m: MortgageBase) => {
  return pmt(m.principal, m.yearlyInterest / 12, m.months);
};

export const calcTable = (
  m: Mortgage,
  maxPrincipal: number,
  maxPayment: number,
  maxPeriod: number
): MortgageTableRow[] => {
  const investment = maxPayment - m.monthlyPayment;
  const initialCondition: MortgageTableRow = {
    period: -1,
    principalPayment: 0,
    interestPayment: 0,
    principalLeft: m.principal,
    totalPaid: 0,
    newInvestment: 0,
    investmentInterest: 0,
    investmentTotal: maxPrincipal - m.principal,
    balance: maxPrincipal - m.principal - m.principal,
  };

  return new Array(maxPeriod).fill(0).reduce((all, _, index) => {
    all.push(
      calcTableRow(
        index,
        m,
        all[all.length - 1] ?? initialCondition,
        investment
      )
    );
    return all;
  }, []);
};

export const calcTableRow = (
  period: number,
  m: Mortgage,
  previousRow: MortgageTableRow,
  investment: number
): MortgageTableRow => {
  const interestPayment = (previousRow.principalLeft * m.yearlyInterest) / 12;
  const principalPayment = Math.min(
    m.monthlyPayment - interestPayment,
    previousRow.principalLeft
  );
  const monthTotalPayment = interestPayment + principalPayment;
  const principalLeft = previousRow.principalLeft - principalPayment;
  const totalPaid = previousRow.totalPaid + monthTotalPayment;

  const newInvestment = investment + (m.monthlyPayment - monthTotalPayment); // any extra goes to investment
  const investmentInterest =
    (previousRow.investmentTotal * m.investmentYearlyInterest) / 12;
  const investmentTotal =
    previousRow.investmentTotal + newInvestment + investmentInterest;

  const balance = investmentTotal - principalLeft;

  return {
    period,
    principalPayment,
    interestPayment,
    principalLeft,
    totalPaid,
    newInvestment,
    investmentInterest,
    investmentTotal,
    balance,
  };
};
