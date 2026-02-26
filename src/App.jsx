// src/App.jsx
import React, { useEffect, useMemo, useState } from "react";
import Input from "./components/Input";
import Dashboard from "./components/Dashboard";
import Summary from "./components/Summary";
import "./styles/theme.css";
import "./styles/layout.css";

export default function App() {
  // -----------------------
  // Inputs
  // -----------------------
  const [inputs, setInputs] = useState({
    energyGelTHB: 2808,
    pieces: 90,
    sellPerPieceTHB: 60,
  });

  // -----------------------
  // Editable settings (instead of const)
  // -----------------------
  const [settings, setSettings] = useState({
    kipCurrency: 690,
    expressToLaos: 45,
  });

  // -----------------------
  // Theme (dark/light)
  // -----------------------
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // -----------------------
  // Calculations
  // -----------------------
  const calc = useMemo(() => {
    const e = Number(inputs.energyGelTHB);
    const p = Number(inputs.pieces);
    const s = Number(inputs.sellPerPieceTHB);

    const kip = Number(settings.kipCurrency);
    const express = Number(settings.expressToLaos);

    if (
      !Number.isFinite(e) ||
      !Number.isFinite(p) ||
      !Number.isFinite(s) ||
      !Number.isFinite(kip) ||
      !Number.isFinite(express) ||
      p <= 0
    ) {
      return { ok: false, message: "Please enter valid numbers (Pieces must be > 0)." };
    }

    // totals
    const costTotalTHB = e + express;
    const costTotalKIP = costTotalTHB * kip;

    // rounded like sheet
    const costPerPieceTHBRound = Math.round(costTotalTHB / p);
    const costPerPieceKIPRound = Math.round(costTotalKIP / p);

    // sell & profit per piece
    const sellPerPieceKIP = s * kip;
    const profitPerPieceTHB = s - costPerPieceTHBRound;
    const profitPerPieceKIP = sellPerPieceKIP - costPerPieceKIPRound;

    // revenue totals
    const totalRevenueTHB = s * p;
    const totalRevenueKIP = totalRevenueTHB * kip;

    // profit totals
    const profitTotalTHB = totalRevenueTHB - costTotalTHB;
    const profitTotalKIP = profitTotalTHB * kip;

    // ratios
    const getProfitPercent = (profitTotalTHB / costTotalTHB) * 100; // Profit ÷ Cost
    const marginPercent = totalRevenueTHB !== 0 ? (profitTotalTHB / totalRevenueTHB) * 100 : 0;

    // chart datasets
    const totalsTHB = [
      { name: "Cost", value: costTotalTHB, color: "var(--coral)" },
      { name: "Revenue", value: totalRevenueTHB, color: "var(--teal)" },
      { name: "Profit", value: profitTotalTHB, color: "var(--amber)" },
    ];

    const totalsKIP = [
      { name: "Cost", value: costTotalKIP, color: "var(--coral)" },
      { name: "Revenue", value: totalRevenueKIP, color: "var(--teal)" },
      { name: "Profit", value: profitTotalKIP, color: "var(--amber)" },
    ];

    const revenueSplitTHB = [
      { name: "Cost", value: costTotalTHB, color: "var(--coral)" },
      { name: "Profit", value: profitTotalTHB, color: "var(--teal)" },
    ];

    const profitPctSplit = (() => {
      const pct = Math.max(0, Math.min(100, getProfitPercent));
      return [
        { name: "Profit%", value: pct, color: "var(--amber)" },
        { name: "Rest", value: 100 - pct, color: "var(--edge)" },
      ];
    })();

    const cumulative = Array.from({ length: p }, (_, i) => {
      const unit = i + 1;
      const cumCost = costPerPieceTHBRound * unit;
      const cumRev = s * unit;
      const cumProfit = cumRev - cumCost;
      return { unit, cumCost, cumRev, cumProfit };
    });

    const cm = s - costPerPieceTHBRound;
    const breakEven = cm > 0 ? costTotalTHB / cm : null;

    return {
      ok: true,

      // theme info (optional)
      theme,

      // settings
      kipCurrency: kip,
      expressToLaos: express,

      // inputs
      energyGelTHB: e,
      pieces: p,
      sellPerPieceTHB: s,

      // totals
      costTotalTHB,
      costTotalKIP,
      totalRevenueTHB,
      totalRevenueKIP,
      profitTotalTHB,
      profitTotalKIP,

      // per-piece
      costPerPieceTHBRound,
      costPerPieceKIPRound,
      sellPerPieceKIP,
      profitPerPieceTHB,
      profitPerPieceKIP,

      // ratios
      getProfitPercent,
      marginPercent,

      // charts
      totalsTHB,
      totalsKIP,
      revenueSplitTHB,
      profitPctSplit,
      cumulative,
      breakEven,
    };
  }, [inputs, settings, theme]);

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <div>
            <div className="title">⚡ ENERGY GEL · PROFIT DASHBOARD</div>
            <div className="subtitle">
              Editable: Express (THB) + KIP rate (KIP/THB)
            </div>
          </div>

          <button
            className="themeToggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? "☀ Light" : "🌙 Dark"}
          </button>
        </header>

        <Input
          value={inputs}
          onChange={setInputs}
          settings={settings}
          onSettingsChange={setSettings}
        />

        {!calc.ok ? (
          <div className="hint">{calc.message}</div>
        ) : (
          <>
            <Dashboard data={calc} />
            <Summary data={calc} />
          </>
        )}
      </div>
    </div>
  );
}