import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
const fmt = (n) =>
  Number.isFinite(Number(n)) ? Number(n).toLocaleString() : "-";

export default function Summary({ data }) {
  if (!data) return null;

  const { t } = useLanguage();

  return (
    <div className="summaryWrapper">
      <div className="summaryTitle">{t("summary")}</div>

      <div className="summaryGrid">
        {/* THB */}
        <div className="summaryTable">
          <div className="currencyTitle">THB (฿)</div>
          <table>
            <tbody>
              <tr>
                <td>{t("totalCost")}</td>
                <td>฿{fmt(data.costTotalTHB)}</td>
              </tr>
              <tr>
                <td>{t("totalProfit")}</td>
                <td>฿{fmt(data.profitTotalTHB)}</td>
              </tr>
              <tr>
                <td>{t("totalRevenue")}</td>
                <td>฿{fmt(data.totalRevenueTHB)}</td>
              </tr>
              <tr>
                <td>{t("costPiece")}</td>
                <td>฿{fmt(data.costPerPieceTHBRound)}</td>
              </tr>
              <tr>
                <td>{t("setPricePiece")}</td>
                <td>฿{fmt(data.sellPerPieceTHB)}</td>
              </tr>
              <tr>
                <td>{t("profitPiece")}</td>
                <td>฿{fmt(data.profitPerPieceTHB)}</td>
              </tr>
              <tr>
                <td>{t("profitPct")}</td>
                <td>{data.getProfitPercent.toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* KIP */}
        <div className="summaryTable">
          <div className="currencyTitle">KIP (₭)</div>
          <table>
            <tbody>
              <tr>
                <td>{t("totalCost")}</td>
                <td>₭{fmt(data.costTotalKIP)}</td>
              </tr>
              <tr>
                <td>{t("totalProfit")}</td>
                <td>₭{fmt(data.profitTotalKIP)}</td>
              </tr>
              <tr>
                <td>{t("totalRevenue")}</td>
                <td>₭{fmt(data.totalRevenueKIP)}</td>
              </tr>
              <tr>
                <td>{t("costPiece")}</td>
                <td>₭{fmt(data.costPerPieceKIPRound)}</td>
              </tr>
              <tr>
                <td>{t("setPricePiece")}</td>
                <td>₭{fmt(data.sellPerPieceKIP)}</td>
              </tr>
              <tr>
                <td>{t("profitPiece")}</td>
                <td>₭{fmt(data.profitPerPieceKIP)}</td>
              </tr>
              <tr>
                <td>{t("profitPct")}</td>
                <td>{data.getProfitPercent.toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}