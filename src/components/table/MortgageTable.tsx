import { Accessor, Component, For, ParentComponent } from "solid-js";
import { CustomPartial } from "solid-js/store/types/store.js";
import { Mortgage, MortgageTableRow } from "~/lib/mortgage";
import MortgageEdit from "./MortgageEdit";

const TD: ParentComponent<{ class?: string; section?: boolean }> = ({
  children,
  section,
  ...props
}) => (
  <td
    class={`px-1 text-right ${
      section ? "border-l border-neutral-300 border-solid" : ""
    } ${props.class}`}
  >
    {children}
  </td>
);

const MortgageTable: Component<{
  mortgage: Mortgage;
  onChange: (m: CustomPartial<Mortgage>) => void;
  highestPrincipal: Accessor<number>;
  highestMonthly: Accessor<number>;
  table: Accessor<MortgageTableRow[]>;
  baseTable: Accessor<MortgageTableRow[]>;
}> = ({
  mortgage,
  onChange,
  highestPrincipal,
  highestMonthly,
  table,
  baseTable,
}) => {
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
            <th>interest</th>
            <th>new</th>
            <th>total</th>
            <th>balance</th>
            <th>diff</th>
          </tr>
        </thead>
        <tbody>
          <For each={table()}>
            {(row, index) => {
              const compareBalance = row.balance - baseTable()[index()].balance;
              return (
                <tr>
                  <TD>{row.period}</TD>
                  <TD section>${row.interestPayment.toFixed(2)}</TD>
                  <TD>${row.principalPayment.toFixed(2)}</TD>
                  <TD>${row.principalLeft.toFixed(2)}</TD>
                  <TD section>${row.investmentInterest.toFixed(2)}</TD>
                  <TD>${row.newInvestment.toFixed(2)}</TD>
                  <TD>${row.investmentTotal.toFixed(2)}</TD>
                  <TD section>${row.balance.toFixed(2)}</TD>
                  <TD
                    class={
                      compareBalance > 0
                        ? "bg-green-300"
                        : compareBalance < 0
                        ? "bg-red-300"
                        : ""
                    }
                  >
                    {compareBalance !== 0 && ` $${compareBalance.toFixed(2)}`}
                  </TD>
                </tr>
              );
            }}
          </For>
        </tbody>
      </table>
    </div>
  );
};

export default MortgageTable;
