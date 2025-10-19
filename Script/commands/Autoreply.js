const fs = global.nodemodule["fs-extra"];
const path = global.nodemodule["path"];

module.exports.config = {
  name: "autoreplybot",
  version: "6.0.2",
  hasPermssion: 0,
  credits: "𝐄𝐕𝐀𝐍 𝐌𝐀𝐋𝐋𝐈𝐊",
  description: "Auto-response bot with specified triggers",
  commandCategory: "No Prefix",
  usages: "[any trigger]",
  cooldowns: 3,
};

module.exports.handleEvent = async function ({ api, event, Users }) {
  const { threadID, messageID, senderID, body } = event;
  if (!body) return; 
  const name = await Users.getNameUser(senderID);
  const msg = body.toLowerCase().trim();

  const responses = {
    "miss you": "আরেক বেডারে 𝐌𝐢𝐬𝐬 না করে 𝐗𝐚𝐧 মেয়ে হলে 𝐁𝐨𝐬𝐬 𝐄𝐯𝐚𝐧 রে হাঙ্গা করো😶👻😘",
    "kiss de": "কিস দিস না তোর মুখে দূর গন্ধ কয়দিন ধরে দাঁত ব্রাশ করিস নাই🤬",
    "👍": "সর এখান থেকে লাইকার আবাল..!🐸🤣👍⛏️",
    "help": "𝐏𝐫𝐞𝐟𝐢𝐱 দে হুমন্দি",
    "hi": "এত হাই-হ্যালো কর ক্যান পিয়..!😜🫵",
    "bc": "𝐒𝐀𝐌𝐄 𝐓𝐎 𝐘𝐎𝐔 😊",
    "pro": "𝐊𝐡𝐮𝐝 𝐤𝟎𝐨 𝐊𝐘𝐚 𝐋𝐞𝐆𝐞𝐧𝐝 𝐒𝐦𝐉𝐡𝐓𝐢 𝐇𝐚𝐢 😂",
    "good morning": "𝐆𝐎𝐎𝐃 𝐌𝐎𝐑𝐍𝐈𝐍𝐆 দাত ব্রাশ করে খেয়ে নেও😚",
    "tor ball": "~ এখনো বাল উঠে নাই নাকি তোমার?? 🤖",
    "Evan": "উনি এখন কাজে বিজি আছে কি বলবেন আমাকে বলতে পারেন..!😘",
    "owner": "‎[𝐎𝐖𝐍𝐄𝐑:☞ 𝐄𝐕𝐀𝐍 𝐌𝐀𝐋𝐋𝐈𝐊☜\nFacebook: https://www.facebook.com/ev4u.mallik\nWhatsApp: +8801400465471",
    "admin": "He is 𝐄𝐕𝐀𝐍 𝐌𝐀𝐋𝐋𝐈𝐊 তাকে সবাই 𝐄𝐃𝐈𝐓𝐎𝐑 হিসেবে চিনে😘☺️",
    "babi": "এ তো হাছিনা হে মেরে দিলকি দারকান হে মেরি জান হে😍.",
    "chup": "তুই চুপ চুপ কর পাগল ছাগল",
    "assalamualaikum": "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ وَبَرَكَاتُهُ 💖",
    "fork": "𝐄𝐕𝐀𝐍 𝐌𝐀𝐋𝐋𝐈𝐊 এর 𝐈𝐍𝐁𝐎𝐗 গুতা দেহ'হহ",
    "kiss me": "তুমি পঁচা তোমাকে কিস দিবো না 🤭",
    "thanks": "এতো ধন্যবাদ না দিয়ে আমার বস 𝐄𝐕𝐀𝐍 𝐌𝐀𝐋𝐋𝐈𝐊 রে তোর গার্লফ্রেন্ড টা দিয়ে দে..!🐸🥵",
    "i love you": "মেয়ে হলে আমার বস 𝐄𝐕𝐀𝐍 𝐌𝐀𝐋𝐋𝐈𝐊 এর ইনবক্সে এখুনি গুঁতা দিন🫢😻",
    "by": "কিরে তুই কোথায় যাস কোন মেয়ের সাথে চিপায় যাবি..!🌚🌶️",
    "ami Evan": "হ্যা বস কেমন আছেন..?☺️",
    "bot er baccha": "আমার বাচ্চা তো তোর গার্লফ্রেন্ডের পেটে..!!🌚⛏️",
    "tor nam ki": "MY NAME IS ─꯭─⃝‌‌𝐄𝐕𝐀𝐍 𝐌𝐀𝐋𝐋𝐈𝐊🩷🪽",
    "pic de": "এন থেকে সর দুরে গিয়া মর😒",
    "cudi": "এত চোদা চুদি করস কেনো..!🥱🌝🌚",
    "bal": "রাগ করে না সোনা পাখি 🥰",
    "heda": "এতো রাগ শরীরের জন্য ভালো না 🥰",
    "boda": "𝐁𝐋𝐀𝐂𝐊 𝐕𝐔𝐃𝐀 𝐈 𝐃𝐎𝐍'𝐓 𝐋𝐈𝐊𝐄 𝐎𝐍𝐋𝐘 𝐏𝐈𝐍𝐊..!🌚👅💦",
    "love you": "ভালোবাসা নামক নষ্টামি করতে চাইলে 𝐁𝐨𝐬𝐬 𝐄𝐕𝐀𝐍 𝐌𝐀𝐋𝐋𝐈𝐊 এর ইনবক্সে গুতা দিন 😘",
    "kire ki koros": "তোমার কথা ভাবতে ছি জানু",
    "kire bot": "হ্যাঁ সবাই কেমন আছেন 😘😽"
  };

  if (responses[msg]) {
    return api.sendMessage(responses[msg], threadID, messageID);
  }
};

module.exports.run = async function ({ api, event, args, Users }) {
  return this.handleEvent({ api, event, Users });
};
