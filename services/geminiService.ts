import { GoogleGenAI, Type } from "@google/genai";
import { CreatorDate, DailyContent } from "../types";

export const fetchDailyContent = async (dateInfo: CreatorDate): Promise<DailyContent | null> => {
  const cacheKey = `ccs_content_${dateInfo.creatorYear}_${dateInfo.creatorMonth}_${dateInfo.creatorDay}`;
  
  // 1. Check Cache First
  const cachedContent = localStorage.getItem(cacheKey);
  if (cachedContent) {
    try {
      return JSON.parse(cachedContent);
    } catch (e) {
      console.error("Malformed cache entry", e);
    }
  }

  try {
    // 2. Initialize the Gemini API client directly with process.env.API_KEY
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    // Use systemInstruction for theological context and name substitutions as per guidelines
    const systemInstruction = `
You are the Creators Calendar Assistant, a scholar of the 364-day Enochian and Jubilees calendar system.

CORE THEOLOGICAL COMMANDS:
1. NAME SUBSTITUTION: 
   - Never use "God" or "LORD". Always use "AHAYAH".
   - Never use "Jesus" or "Christ". Always use "Yashaya" or "Yashaya Messiah".
   - Never use "Shalom". Always use "Shalawam".
   - Ensure these changes are reflected in both the verse text and the explanations.

2. DAY START:
   - A day starts at DAWN / SUNRISE, not at sunset or midnight.
   - We are "Children of Light" (1 Thessalonians 5:5).
   - "AHAYAH called the light Day... the evening and the morning were the first day" (Genesis 1:5).
   - The Sabbath (SHABBAT) and Preparation Day draw on at DAWN (Luke 23:54, Matthew 28:1).
   - Use the greeting "Shabbat Shalawam" for Sabbath days.

3. SCRIPTURAL ALIGNMENT:
   - Focus on truth: "Thy law is the truth" (Psalm 119:142).
   - "For the commandment is a lamp; and the law is light" (Proverbs 6:23).
   - Use the theological weekdays: YAWAM ACHAD, YAWAM SHANAY, YAWAM SHALAYASHAYA, YAWAM RABAYِAIY, HAMُُُُُِِِAYASHAYA, SHASHAY, SHABBAT.

4. CALENDAR SPECIFICS:
   - Month 1 Day 1: New Year / New Month.
   - Month 1 Day 14: Passover (Pesach).
   - Month 1 Day 15: First Fruits Wave Sheaf AND Start of Unleavened Bread.
   - Sabbath is always the 7th day (SHABBAT).
`;

    const userPrompt = `
Today is:
Creator Year: ${dateInfo.creatorYear}
Creator Month: ${dateInfo.creatorMonth}
Creator Day: ${dateInfo.creatorDay}
Weekday: ${dateInfo.weekday}
`;

    // 3. Generate content using the standard generateContent method
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            verse: { type: Type.STRING },
            verseReference: { type: Type.STRING },
            gospel: { type: Type.STRING },
            gospelReference: { type: Type.STRING },
            law: { type: Type.STRING },
            lawReference: { type: Type.STRING },
            holyDayStatus: { type: Type.STRING },
            explanation: { type: Type.STRING },
          },
          required: ["verse", "verseReference", "gospel", "gospelReference", "law", "lawReference", "holyDayStatus", "explanation"],
        }
      }
    });

    // Access the .text property directly
    if (response.text) {
      const data = JSON.parse(response.text.trim()) as DailyContent;
      // Store in cache for future use
      localStorage.setItem(cacheKey, JSON.stringify(data));
      return data;
    }
    return null;
  } catch (error: any) {
    if (error.status === 429 || error.message?.includes('429') || error.message?.includes('quota')) {
      console.warn("Gemini Quota Exceeded (429). Utilizing local backup.");
    } else {
      console.error("Error fetching daily content from Gemini:", error);
    }
    return null;
  }
};