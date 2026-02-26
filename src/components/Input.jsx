import React from "react";

export default function Input({ value, onChange, settings, onSettingsChange }) {
  const setField = (key, v) => onChange((prev) => ({ ...prev, [key]: v }));
  const setSetting = (key, v) => onSettingsChange((prev) => ({ ...prev, [key]: v }));

  return (
    <section className="grid3">
      {/* ---- Product inputs ---- */}
      <label className="field">
        <span className="fieldLabel">Energy Gel (THB)</span>
        <input
          className="input"
          type="number"
          value={value.energyGelTHB}
          onChange={(e) => setField("energyGelTHB", e.target.value)}
          placeholder="2808"
        />
      </label>

      <label className="field">
        <span className="fieldLabel">Pieces</span>
        <input
          className="input"
          type="number"
          min={1}
          value={value.pieces}
          onChange={(e) => setField("pieces", e.target.value)}
          placeholder="90"
        />
      </label>

      <label className="field">
        <span className="fieldLabel">Set price/piece (THB)</span>
        <input
          className="input"
          type="number"
          value={value.sellPerPieceTHB}
          onChange={(e) => setField("sellPerPieceTHB", e.target.value)}
          placeholder="60"
        />
      </label>

      {/* ---- Settings inputs (NEW) ---- */}
      <label className="field">
        <span className="fieldLabel">KIP currency rate (KIP/THB)</span>
        <input
          className="input"
          type="number"
          value={settings.kipCurrency}
          onChange={(e) => setSetting("kipCurrency", e.target.value)}
          placeholder="690"
        />
      </label>

      <label className="field">
        <span className="fieldLabel">Express to Laos (THB)</span>
        <input
          className="input"
          type="number"
          value={settings.expressToLaos}
          onChange={(e) => setSetting("expressToLaos", e.target.value)}
          placeholder="45"
        />
      </label>
    </section>
  );
}