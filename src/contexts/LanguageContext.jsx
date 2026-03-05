import React, { createContext, useContext, useState, useEffect } from "react";

const translations = {
  en: {
    appTitle: "⚡ SOUPHAKONE · PROFIT DASHBOARD",
    appSubtitle: "Editable: Express (THB) + KIP rate (KIP/THB)",
    themeLight: "☀ Light",
    themeDark: "🌙 Dark",
    invalidNumbers: "Please enter valid numbers (Pieces must be > 0).",
    
    // Input
    energyGel: "Energy Gel (THB)",
    pieces: "Pieces",
    setPricePieceTHB: "Set price/piece (THB)",
    kipRate: "KIP currency rate (KIP/THB)",
    expressToLaos: "Express to Laos (THB)",

    // Dashboard
    hintUnits: "units",
    hintSell: "sell",
    hintCost: "cost",
    totalsTHB: "Totals (THB ฿)",
    totalsKIP: "Totals (KIP ₭)",
    cost: "Cost",
    revenue: "Revenue",
    profit: "Profit",
    revenueSplitTHB: "Revenue Split (THB)",
    margin: "Margin",
    getProfitPct: "Get profit %",
    profitDividedByCost: "Profit ÷ Cost",
    profitPct: "Profit%",
    rest: "Rest",
    costPieceTHB: "Cost/piece (THB, rounded)",
    costPieceKIP: "Cost/piece (KIP, rounded)",
    setPricePieceTHBLabel: "Set price/piece (THB)",
    setPricePieceKIPLabel: "Set price/piece (KIP)",
    profitPieceTHB: "Profit/piece (THB)",
    profitPieceKIP: "Profit/piece (KIP)",
    cumulativePL: "Cumulative P&L by Unit (THB ฿)",
    totalProfit: "Total Profit",
    be: "B/E ≈",
    cumRevenue: "Cumulative Revenue",
    cumCost: "Cumulative Cost",
    cumProfit: "Cumulative Profit",

    // Summary
    summary: "SUMMARY",
    totalCost: "Total Cost",
    totalRevenue: "Total Revenue",
    costPiece: "Cost / piece",
    setPricePiece: "Set price / piece",
    profitPiece: "Profit / piece",
    pc: "pc",
    pcs: "pcs",
  },
  th: {
    appTitle: "⚡ SOUPHAKONE · PROFIT DASHBOARD",
    appSubtitle: "สามารถแก้ไขได้: ค่าส่ง (บาท) + เรทเงินกีบ (กีบ/บาท)",
    themeLight: "☀ สว่าง",
    themeDark: "🌙 มืด",
    invalidNumbers: "กรุณากรอกตัวเลขที่ถูกต้อง (จำนวนชิ้นต้อง > 0)",
    
    // Input
    energyGel: "เจลพลังงาน (บาท)",
    pieces: "จำนวนชิ้น",
    setPricePieceTHB: "ตั้งราคาขาย/ชิ้น (บาท)",
    kipRate: "เรทเงินกีบ (กีบ/บาท)",
    expressToLaos: "ค่าส่งไปลาว (บาท)",

    // Dashboard
    hintUnits: "ชิ้น",
    hintSell: "ขาย",
    hintCost: "ต้นทุน",
    totalsTHB: "สรุปยอดรวม (บาท ฿)",
    totalsKIP: "สรุปยอดรวม (กีบ ₭)",
    cost: "ต้นทุน",
    revenue: "รายได้",
    profit: "กำไร",
    revenueSplitTHB: "สัดส่วนรายได้ (บาท)",
    margin: "อัตรากำไร",
    getProfitPct: "สัดส่วนกำไร %",
    profitDividedByCost: "กำไร ÷ ต้นทุน",
    profitPct: "กำไร%",
    rest: "อื่นๆ",
    costPieceTHB: "ต้นทุน/ชิ้น (บาท, ปัดเศษ)",
    costPieceKIP: "ต้นทุน/ชิ้น (กีบ, ปัดเศษ)",
    setPricePieceTHBLabel: "ตั้งราคาขาย/ชิ้น (บาท)",
    setPricePieceKIPLabel: "ตั้งราคาขาย/ชิ้น (กีบ)",
    profitPieceTHB: "กำไร/ชิ้น (บาท)",
    profitPieceKIP: "กำไร/ชิ้น (กีบ)",
    cumulativePL: "กำไรขาดทุนสะสมตามจำนวนชิ้น (บาท ฿)",
    totalProfit: "กำไรรวม",
    be: "จุดคุ้มทุน ≈",
    cumRevenue: "รายได้สะสม",
    cumCost: "ต้นทุนสะสม",
    cumProfit: "กำไรสะสม",

    // Summary
    summary: "สรุป",
    totalCost: "ต้นทุนรวม",
    totalRevenue: "รายได้รวม",
    costPiece: "ต้นทุน / ชิ้น",
    setPricePiece: "ราคาขาย / ชิ้น",
    profitPiece: "กำไร / ชิ้น",
    pc: "ชิ้น",
    pcs: "ชิ้น",
  },
  la: {
    appTitle: "⚡ SOUPHAKONE · PROFIT DASHBOARD",
    appSubtitle: "ສາມາດແກ້ໄຂໄດ້: ຄ່າສົ່ງ (ບາດ) + ເຣດເງິນກີບ (ກີບ/ບາດ)",
    themeLight: "☀ ແຈ້ງ",
    themeDark: "🌙 ມືດ",
    invalidNumbers: "ກະລຸນາປ້ອນຕົວເລກທີ່ຖືກຕ້ອງ (ຈຳນວນຊິ້ນຕ້ອງ > 0)",
    
    // Input
    energyGel: "ເຈວພະລັງງານ (ບາດ)",
    pieces: "ຈຳນວນຊິ້ນ",
    setPricePieceTHB: "ຕັ້ງລາຄາຂາຍ/ຊິ້ນ (ບາດ)",
    kipRate: "ເຣດເງິນກີບ (ກີບ/ບາດ)",
    expressToLaos: "ຄ່າສົ່ງໄປລາວ (ບາດ)",

    // Dashboard
    hintUnits: "ຊິ້ນ",
    hintSell: "ຂາຍ",
    hintCost: "ຕົ້ນທຶນ",
    totalsTHB: "ສະຫຼຸບຍອດລວມ (ບາດ ฿)",
    totalsKIP: "ສະຫຼຸບຍອດລວມ (ກີບ ₭)",
    cost: "ຕົ້ນທຶນ",
    revenue: "ລາຍໄດ້",
    profit: "ກຳໄລ",
    revenueSplitTHB: "ສັດສ່ວນລາຍໄດ້ (ບາດ)",
    margin: "ອັດຕາກຳໄລ",
    getProfitPct: "ສັດສ່ວນກຳໄລ %",
    profitDividedByCost: "ກຳໄລ ÷ ຕົ້ນທຶນ",
    profitPct: "ກຳໄລ%",
    rest: "ອື່ນໆ",
    costPieceTHB: "ຕົ້ນທຶນ/ຊິ້ນ (ບາດ, ປັດເສດ)",
    costPieceKIP: "ຕົ້ນທຶນ/ຊິ້ນ (ກີບ, ປັດເສດ)",
    setPricePieceTHBLabel: "ຕັ້ງລາຄາຂາຍ/ຊິ້ນ (ບາດ)",
    setPricePieceKIPLabel: "ຕັ້ງລາຄາຂາຍ/ຊິ້ນ (ກີບ)",
    profitPieceTHB: "ກຳໄລ/ຊິ້ນ (ບາດ)",
    profitPieceKIP: "ກຳໄລ/ຊິ້ນ (ກີບ)",
    cumulativePL: "ກຳໄລຂາດທຶນສະສົມຕາມຈຳນວນຊິ້ນ (ບາດ ฿)",
    totalProfit: "ກຳໄລລວມ",
    be: "ຈຸດຄຸ້ມທຶນ ≈",
    cumRevenue: "ລາຍໄດ້ສະສົມ",
    cumCost: "ຕົ້ນທຶນສະສົມ",
    cumProfit: "ກຳໄລສະສົມ",

    // Summary
    summary: "ສະຫຼຸບ",
    totalCost: "ຕົ້ນທຶນລວມ",
    totalRevenue: "ລາຍໄດ້ລວມ",
    costPiece: "ຕົ້ນທຶນ / ຊິ້ນ",
    setPricePiece: "ລາຄາຂາຍ / ຊິ້ນ",
    profitPiece: "ກຳໄລ / ຊິ້ນ",
    pc: "ຊິ້ນ",
    pcs: "ຊິ້ນ",
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem("app_lang") || "th";
  });

  useEffect(() => {
    localStorage.setItem("app_lang", language);
  }, [language]);

  const t = (key) => {
    return translations[language][key] || translations["en"][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
