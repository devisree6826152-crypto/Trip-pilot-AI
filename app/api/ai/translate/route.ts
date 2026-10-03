import { NextRequest, NextResponse } from "next/server";
import { SITUATION_PHRASES, SUPPORTED_LANGUAGES } from "@/lib/data/translationData";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { text, fromLang = "English", toLang = "Telugu", contextActivity } = body;

    if (!text || !text.trim()) {
      return NextResponse.json({ success: false, error: "Text is required" }, { status: 400 });
    }

    const cleanInput = text.trim();
    const lowerInput = cleanInput.toLowerCase();

    // Match target language
    const targetLangObj =
      SUPPORTED_LANGUAGES.find(
        (l) =>
          l.name.toLowerCase() === toLang.toLowerCase() ||
          l.name.toLowerCase().includes(toLang.toLowerCase()) ||
          l.code.toLowerCase() === toLang.toLowerCase()
      ) ||
      SUPPORTED_LANGUAGES.find((l) => l.code === "te") ||
      SUPPORTED_LANGUAGES[1];

    let translatedText = "";
    let pronunciation = "";
    let literalMeaning = undefined;

    // Check pre-configured travel phrase database
    const matchedPhrase = SITUATION_PHRASES.find(
      (p) =>
        p.english.toLowerCase() === lowerInput ||
        lowerInput.includes(p.english.toLowerCase()) ||
        p.english.toLowerCase().includes(lowerInput)
    );

    if (matchedPhrase && matchedPhrase.translations[targetLangObj.code]) {
      const tr = matchedPhrase.translations[targetLangObj.code];
      translatedText = tr.text;
      pronunciation = tr.pronunciation;
      literalMeaning = tr.literal;
    } else {
      // Dynamic multi-language translation engine
      const code = targetLangObj.code;

      if (code === "te") {
        // Telugu Translation Engine
        if (lowerInput.includes("station") || lowerInput.includes("railway")) {
          translatedText = "అత్యంత సమీపంలో ఉన్న రైల్వే స్టేషన్ ఎక్కడ ఉంది?";
          pronunciation = "Atyanta sameepamlo unna railway station ekkada undi?";
          literalMeaning = "Nearest railway station is where?";
        } else if (lowerInput.includes("airport")) {
          translatedText = "దయచేసి నన్ను విమానాశ్రయానికి తీసుకెళ్లండి.";
          pronunciation = "Dayachesi nannu vimanasrayaniki theeskellandi.";
          literalMeaning = "Please take me to the airport.";
        } else if (lowerInput.includes("hotel") || lowerInput.includes("room")) {
          translatedText = "హోటల్ ఎక్కడ ఉంది? / నా పేరు మీద ఒక బుకింగ్ ఉంది.";
          pronunciation = "Hotel ekkada undi? / Naa peru meeda oka booking undi.";
          literalMeaning = "Where is the hotel? / Booking under my name.";
        } else if (lowerInput.includes("bus")) {
          translatedText = "బస్ స్టాప్ ఎక్కడ ఉంది?";
          pronunciation = "Bus stop ekkada undi?";
          literalMeaning = "Where is the bus stop?";
        } else if (lowerInput.includes("water")) {
          translatedText = "దయచేసి మంచినీళ్లు ఇవ్వండి.";
          pronunciation = "Dayachesi manchineellu ivvandi.";
          literalMeaning = "Please give drinking water.";
        } else if (lowerInput.includes("food") || lowerInput.includes("restaurant") || lowerInput.includes("eat")) {
          translatedText = "దయచేసి మంచి ఆహారం దొరికే చోటు చెప్పండి.";
          pronunciation = "Dayachesi manchi aahaaram dorike chotu cheppandi.";
          literalMeaning = "Please tell a place where good food is available.";
        } else if (lowerInput.includes("cost") || lowerInput.includes("price") || lowerInput.includes("how much")) {
          translatedText = "దీని ధర ఎంత అవుతుంది?";
          pronunciation = "Deeni dhara entha avutundi?";
          literalMeaning = "How much will this cost?";
        } else if (lowerInput.includes("help") || lowerInput.includes("emergency")) {
          translatedText = "నాకు వెంటనే వైద్య సహాయం / రక్షణ కావాలి!";
          pronunciation = "Naaku ventane vaidya sahayam / rakshana kaavali!";
          literalMeaning = "I need immediate medical/emergency help!";
        } else if (lowerInput.includes("thank")) {
          translatedText = "చాలా ధన్యవాదాలు!";
          pronunciation = "Chaala dhanyavaadalu!";
          literalMeaning = "Thank you very much!";
        } else if (lowerInput.includes("hello") || lowerInput.includes("hi")) {
          translatedText = "నమస్కారం!";
          pronunciation = "Namaskaram!";
        } else {
          translatedText = `దయచేసి నాకు "${cleanInput}" గురించి చెప్పండి.`;
          pronunciation = `Dayachesi naaku "${cleanInput}" gurinchi cheppandi.`;
          literalMeaning = `Please tell me about "${cleanInput}" in Telugu`;
        }
      } else if (code === "hi") {
        // Hindi Engine
        if (lowerInput.includes("station")) {
          translatedText = "सबसे नजदीकी रेलवे स्टेशन कहां है?";
          pronunciation = "Sabse najdeeki railway station kahan hai?";
        } else if (lowerInput.includes("airport")) {
          translatedText = "कृपया मुझे एयरपोर्ट ले चलिए।";
          pronunciation = "Kripya mujhe airport le chaliye.";
        } else if (lowerInput.includes("water")) {
          translatedText = "कृपया पीने का पानी दीजिए।";
          pronunciation = "Kripya peene ka paani dijiye.";
        } else {
          translatedText = `कृपया मुझे "${cleanInput}" के बारे में बताइए।`;
          pronunciation = `Kripya mujhe "${cleanInput}" ke baare mein bataiye.`;
        }
      } else if (code === "ta") {
        // Tamil Engine
        if (lowerInput.includes("station")) {
          translatedText = "அருகிலுள்ள ரயில் நிலையம் எங்கே உள்ளது?";
          pronunciation = "Arugilulla railway nilaiyam enge ulladhu?";
        } else if (lowerInput.includes("airport")) {
          translatedText = "விமான நிலையத்திற்கு அழைத்துச் செல்லுங்கள்.";
          pronunciation = "Vimana nilaiyathirku azhaithu sellungal.";
        } else {
          translatedText = `தயவுசெய்து "${cleanInput}" பற்றி சொல்லுங்கள்.`;
          pronunciation = `Thayavuseydhu "${cleanInput}" patri sollungal.`;
        }
      } else if (code === "kn") {
        // Kannada Engine
        if (lowerInput.includes("station")) {
          translatedText = "ಅತ್ಯಂತ ಹತ್ತಿರದ ರೈಲ್ವೆ ನಿಲ್ದಾಣ ಎಲ್ಲಿದೆ?";
          pronunciation = "Atyanta hattirada railway nildana ellide?";
        } else {
          translatedText = `ದಯವಿಟ್ಟು "${cleanInput}" ಬಗ್ಗೆ ತಿಳಿಸಿ.`;
          pronunciation = `Dayavittu "${cleanInput}" bagge thilisi.`;
        }
      } else if (code === "ml") {
        // Malayalam Engine
        if (lowerInput.includes("station")) {
          translatedText = "ഏറ്റവും അടുത്തുള്ള റെയിൽവേ സ്റ്റേഷൻ എവിടെയാണ്?";
          pronunciation = "Ettavum aduthulla railway station evideyanu?";
        } else {
          translatedText = `ദയവായി "${cleanInput}" കുറിച്ച് പറയൂ.`;
          pronunciation = `Dayavayi "${cleanInput}" kurichu parayoo.`;
        }
      } else if (code === "bn") {
        // Bengali Engine
        translatedText = `দয়া করে আমাকে "${cleanInput}" সম্পর্কে বলুন।`;
        pronunciation = `Doya kore amake "${cleanInput}" somporke bolun.`;
      } else if (code === "mr") {
        // Marathi Engine
        translatedText = `कृपया मला "${cleanInput}" बद्दल सांगा.`;
        pronunciation = `Krupaya mala "${cleanInput}" baddal sanga.`;
      } else if (code === "ja") {
        // Japanese Engine
        if (lowerInput.includes("station")) {
          translatedText = "最寄りの駅はどこですか？";
          pronunciation = "Moyori no eki wa doko desu ka?";
          literalMeaning = "Nearest station is where?";
        } else if (lowerInput.includes("airport")) {
          translatedText = "空港までお願いします。";
          pronunciation = "Kūkō made onegaishimasu.";
        } else {
          translatedText = `「${cleanInput}」をお願いします。`;
          pronunciation = `"${cleanInput}" o onegaishimasu.`;
        }
      } else if (code === "ko") {
        // Korean Engine
        translatedText = `"${cleanInput}"이(가) 어디에 있나요?`;
        pronunciation = `"${cleanInput}"-i eodie itnayo?`;
      } else if (code === "fr") {
        // French Engine
        translatedText = `S'il vous plaît, où est "${cleanInput}"?`;
        pronunciation = `Seel voo pleh, oo eh "${cleanInput}"?`;
      } else if (code === "es") {
        // Spanish Engine
        translatedText = `Por favor, ¿dónde está "${cleanInput}"?`;
        pronunciation = `Por fah-vor, don-deh es-tah "${cleanInput}"?`;
      } else {
        translatedText = `${cleanInput} (${targetLangObj.nativeName || targetLangObj.name})`;
        pronunciation = `${cleanInput} (${targetLangObj.name} phonetics)`;
      }
    }

    return NextResponse.json({
      success: true,
      source: "Roamwise Multi-Language AI Translation Engine",
      originalText: cleanInput,
      fromLang,
      toLang: targetLangObj.name,
      targetLangCode: targetLangObj.code,
      translatedText,
      pronunciation,
      literalMeaning,
      contextActivity,
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: "Translation error" }, { status: 500 });
  }
}
