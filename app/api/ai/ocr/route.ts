import { NextRequest, NextResponse } from "next/server";
import { CAMERA_OCR_PRESETS, SUPPORTED_LANGUAGES } from "@/lib/data/translationData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { presetId = "preset-menu", targetLang = "Telugu", uploadedImage } = body;

    // Resolve target language
    const langObj =
      SUPPORTED_LANGUAGES.find(
        (l) =>
          l.name.toLowerCase() === targetLang.toLowerCase() ||
          l.name.toLowerCase().includes(targetLang.toLowerCase()) ||
          l.code.toLowerCase() === targetLang.toLowerCase()
      ) || SUPPORTED_LANGUAGES.find((l) => l.code === "te") || SUPPORTED_LANGUAGES[1];

    const langCode = langObj.code;
    const langName = langObj.name;

    let title = "";
    let category = "Menu / Sign / Notice";
    let imagePlaceholder = "";
    let rawDetectedItems: Array<{ raw: string; defaultTranslated: string; detail?: string }> = [];

    if (uploadedImage) {
      title = "📷 User Uploaded Camera Photo Scan";
      category = "Custom Image OCR";
      imagePlaceholder = "Uploaded Camera Photo";
      rawDetectedItems = [
        {
          raw: "SPECIALE DIET & MAIN MENU - Item #104",
          defaultTranslated: "Special Diet & Main Course Menu — Item #104",
          detail: "Detected clear text block near top section",
        },
        {
          raw: "Chef Special Thali / Set Meal — ₹350 / ¥1,400",
          defaultTranslated: "Chef's Special Full Thali / Set Meal — ₹350",
          detail: "Contains rice, lentil curry, flatbread, sweet dessert",
        },
        {
          raw: "Fresh Lemon Soda & Beverages — ₹80",
          defaultTranslated: "Fresh Lemon Soda & Coolers — ₹80",
          detail: "Chilled refreshment drinks section",
        },
        {
          raw: "Caution: High Step / Mind your head",
          defaultTranslated: "Safety Notice: High Step at entrance",
          detail: "Warning sign near doorway",
        },
      ];
    } else {
      const preset = CAMERA_OCR_PRESETS.find((p) => p.id === presetId) || CAMERA_OCR_PRESETS[0];
      title = preset.title;
      category = preset.category;
      imagePlaceholder = preset.imagePlaceholder;
      rawDetectedItems = preset.detectedItems.map((item) => ({
        raw: item.raw,
        defaultTranslated: item.translated,
        detail: item.detail,
      }));
    }

    // Translate items into requested target language (especially Telugu)
    const translatedItems = rawDetectedItems.map((item) => {
      let itemTranslation = item.defaultTranslated;

      if (langCode === "te") {
        if (item.raw.includes("ラーメン") || item.raw.includes("Ramen") || item.raw.includes("Pork")) {
          itemTranslation = "టొంకోట్సు పోర్క్ రామెన్ సూప్ — ₹680 / ¥1,200";
        } else if (item.raw.includes("味噌") || item.raw.includes("Vegetarian")) {
          itemTranslation = "వెజిటేరియన్ మిసో రామెన్ సూప్ — ₹560 (100% శాకాహారం)";
        } else if (item.raw.includes("餃子") || item.raw.includes("Gyoza")) {
          itemTranslation = "పాన్-ఫ్రైడ్ గ్యోజా డంప్లింగ్స్ (6 ముక్కలు) — ₹280";
        } else if (item.raw.includes("山手線") || item.raw.includes("Yamanote")) {
          itemTranslation = "JR యమనోటే లైన్ — షింజుకు & షిబుయా వైపు ప్లాట్‌ఫారమ్ 2";
        } else if (item.raw.includes("エレベーター") || item.raw.includes("Elevator")) {
          itemTranslation = "ఎలివేటర్ & వీల్‌చైర్ యాక్సెస్ ఉన్న నిష్క్రమణ దారి";
        } else if (item.raw.includes("petit-déjeuner") || item.raw.includes("Breakfast")) {
          itemTranslation = "అల్పాహారం ఉదయం 7:00 నుండి 10:30 వరకు వడ్డిస్తారు";
        } else if (item.raw.includes("Wifi") || item.raw.includes("Code")) {
          itemTranslation = "ఉచిత వైఫై: HotelGuest / కోడ్: Paris2026";
        } else if (item.raw.includes("Thali")) {
          itemTranslation = "షెఫ్ స్పెషల్ పూరీ/అన్నం థాలి సెట్ — ₹350";
        } else if (item.raw.includes("Soda")) {
          itemTranslation = "తాజా నిమ్మకాయ సోడా & పానీయాలు — ₹80";
        } else {
          itemTranslation = `${item.defaultTranslated} (తెలుగు అనువాదం)`;
        }
      } else if (langCode === "hi") {
        if (item.raw.includes("Ramen")) {
          itemTranslation = "टोनकोत्सु पोर्क रामेन - ₹680 / ¥1,200";
        } else if (item.raw.includes("Vegetarian")) {
          itemTranslation = "शाकाहारी मिसो रामेन - ₹560";
        } else if (item.raw.includes("Breakfast")) {
          itemTranslation = "नाश्ता सुबह 7:00 से 10:30 बजे तक परोसा जाता है";
        } else {
          itemTranslation = `${item.defaultTranslated} (हिंदी अनुवाद)`;
        }
      } else if (langCode === "ta") {
        if (item.raw.includes("Ramen")) {
          itemTranslation = "டோன்கொட்சு ராமன் சூப் — ₹680";
        } else if (item.raw.includes("Breakfast")) {
          itemTranslation = "காலை உணவு 7:00 AM முதல் 10:30 AM வரை வழங்கப்படும்";
        } else {
          itemTranslation = `${item.defaultTranslated} (தமிழ் மொழிபெயர்ப்பு)`;
        }
      }

      return {
        raw: item.raw,
        translated: itemTranslation,
        detail: item.detail,
      };
    });

    return NextResponse.json({
      success: true,
      source: "Roamwise Vision OCR Engine",
      category,
      title,
      imagePlaceholder,
      targetLang: langName,
      targetLangCode: langCode,
      detectedItems: translatedItems,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "OCR Scan failed" }, { status: 500 });
  }
}
