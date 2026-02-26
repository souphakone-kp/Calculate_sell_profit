import React from "react";

const fmt = (n) =>
  Number.isFinite(Number(n)) ? Number(n).toLocaleString() : "-";

export default function Summary({ data }) {
  if (!data) return null;
   

  return (
    <div className="summaryWrapper">
      <div className="summaryTitle">SUMMARY</div>

      <div className="summaryGrid">
        {/* ---------------- THB TABLE ---------------- */}
        <div className="summaryTable">
          <div className="currencyTitle">THB (฿)</div>
          <table>
            <tbody>
              <tr>
                <td>Total Cost</td>
                <td>฿{fmt(data.costTotalTHB)}</td>
              </tr>
              <tr>
                <td>Total Profit</td>
                <td>฿{fmt(data.profitTotalTHB)}</td>
              </tr>
              <tr>
                <td>Total Revenue</td>
                <td>฿{fmt(data.totalRevenueTHB)}</td>
              </tr>
              <tr>
                <td>Cost / piece</td>
                <td>฿{fmt(data.costPerPieceTHBRound)}</td>
              </tr>
              <tr>
                <td>Set price / piece</td>
                <td>฿{fmt(data.sellPerPieceTHB)}</td>
              </tr>
              <tr>
                <td>Profit / piece</td>
                <td>฿{fmt(data.profitPerPieceTHB)}</td>
              </tr>
              <tr>
                <td>Profit %</td>
                <td>{data.getProfitPercent.toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ---------------- KIP TABLE ---------------- */}
        <div className="summaryTable">
          <div className="currencyTitle">KIP (₭)</div>
          <table>
            <tbody>
              <tr>
                <td>Total Cost</td>
                <td>₭{fmt(data.costTotalKIP)}</td>
              </tr>
              <tr>
                <td>Total Profit</td>
                <td>₭{fmt(data.profitTotalKIP)}</td>
              </tr>
               <tr>
                <td>Total Revenue</td>
                <td>₭{fmt(data.totalRevenueKIP)}</td>
              </tr>
              <tr>
                <td>Cost / piece</td>
                <td>₭{fmt(data.costPerPieceKIPRound)}</td>
              </tr>
              <tr>
                <td>Set price / piece</td>
                <td>₭{fmt(data.sellPerPieceKIP)}</td>
              </tr>
              <tr>
                <td>Profit / piece</td>
                <td>₭{fmt(data.profitPerPieceKIP)}</td>
              </tr>
                            <tr>
                <td>Profit %</td>
                <td>{data.getProfitPercent.toFixed(2)}%</td>
              </tr> 
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}