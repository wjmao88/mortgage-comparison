import { Accessor, Component, For } from "solid-js";
import { CustomPartial } from "solid-js/store/types/store.js";
import { Mortgage, MortgageTableRow } from "~/lib/mortgage";
import MortgageEdit from "./MortgageEdit";

const MortgageTable: Component<{
  mortgage: Mortgage;
  onChange: (m: CustomPartial<Mortgage>) => void;
  highestPrincipal: Accessor<number>;
  highestMonthly: Accessor<number>;
  table: Accessor<MortgageTableRow[]>;
}> = ({ mortgage, onChange, highestPrincipal, highestMonthly, table }) => {
  return (
    <div class="rounded border border-neutral-300 border-solid p-2">
      <MortgageEdit mortgage={mortgage} onChange={onChange} />
      <div>Monthly Payment: {mortgage.monthlyPayment.toFixed(2)}</div>
      <div>
        Initial Investment:{" "}
        {(highestPrincipal() - mortgage.principal).toFixed(2)}
      </div>
      <div>
        Monthly Investment:{" "}
        {(highestMonthly() - mortgage.monthlyPayment).toFixed(2)}
      </div>

      <table>
        <thead>
          <tr>
            <th></th>
            <th colspan={4}>payment</th>
            <th colspan={3}>investment</th>
            <th></th>
          </tr>
          <tr>
            <th>period</th>
            <th>interest</th>
            <th>principal</th>
            <th>remaining</th>
            <th>total paid</th>
            <th>interest</th>
            <th>new</th>
            <th>total</th>
            <th>balance</th>
          </tr>
        </thead>
        <tbody>
          <For each={table()}>
            {(row) => (
              <tr>
                <td>{row.period}</td>
                <td>${row.interestPayment.toFixed(2)}</td>
                <td>${row.principalPayment.toFixed(2)}</td>
                <td>${row.principalLeft.toFixed(2)}</td>
                <td>${row.totalPaid.toFixed(2)}</td>
                <td>${row.investmentInterest.toFixed(2)}</td>
                <td>${row.newInvestment.toFixed(2)}</td>
                <td>${row.investmentTotal.toFixed(2)}</td>
                <td>${row.balance.toFixed(2)}</td>
              </tr>
            )}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default MortgageTable;
