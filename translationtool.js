import React, { useState } from 'react';
import axios from 'axios';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'zh-CN', name: 'Chinese (Simplified)' },
  // Add more as needed
];

export default function Translator() {
  const [text, setText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('hi');

  const translateText = async () => {
    try {
      const res = await axios.post(
        'https://libretranslate.de/translate',
        {
          q: text,
          source: sourceLang,
          target: targetLang,
          format: 'text',
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      setTranslatedText(res.data.translatedText);
    } catch (err) {
      setTranslatedText('Error translating text.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
  };

  const speakText = () => {
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLang;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-4">🌐 Language Translator</h2>
      
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text to translate..."
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        rows={4}
      />

      <div className="flex justify-between mb-4">
        <select
          value={sourceLang}
          onChange={(e) => setSourceLang(e.target.value)}
          className="p-2 border rounded-md w-1/2 mr-2"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              From: {lang.name}
            </option>
          ))}
        </select>

        <select
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
          className="p-2 border rounded-md w-1/2 ml-2"
        >
          {languages.map((lang) => (
            <option key={lang.code} value={lang.code}>
              To: {lang.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={translateText}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full mb-4"
      >
        Translate
      </button>

      {translatedText && (
        <div className="bg-gray-100 p-4 rounded-lg relative">
          <p className="mb-2">{translatedText}</p>
          <div className="flex gap-2">
            <button onClick={copyToClipboard} className="text-sm text-blue-600 underline">
              Copy
            </button>
            <button onClick={speakText} className="text-sm text-green-600 underline">
              Speak
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
