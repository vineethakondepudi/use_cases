import React, { useState } from 'react';

function Translator() {
  // Define language codes
  const languageCodes = {
    Arabic: 'ar',
    Spanish: 'es',
    French: 'fr',
    German: 'de',
    Italian: 'it',
    Chinese: 'zh-Hans',
    Hindi: 'hi',
    Japanese: 'ja',
    Korean: 'ko',
    Portuguese: 'pt',
    English: 'en',
    Telugu: 'te'
  };

  const [message, setMessage] = useState('');
  const [translatedMessage, setTranslatedMessage] = useState('');
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('es');


  const translateMessage = async () => {
    const subscriptionKey = '363b106a459e4ad5b028a1b86e924dc7'; 
    const endpoint = `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${fromLanguage}&to=${toLanguage}`;
    const location = 'northcentralus'; 

    try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Ocp-Apim-Subscription-Region': location,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([{ Text: message }]),
        });
    
        if (!response.ok) {
          const errorDetails = await response.json();
          console.error('Error details:', errorDetails); 
          throw new Error(`Translation failed: ${response.status} ${response.statusText}`);
        }
    
        const data = await response.json();
        setTranslatedMessage(data[0].translations[0].text);
      } catch (error) {
        console.error('Translation error:', error);
        alert(`Translation failed: ${error.message}`);
      }
    };
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Translator</h2>

 
      <div style={{ marginBottom: '10px' }}>
        <label>Message:</label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows="4"
          style={{ width: '100%', padding: '5px' }}
        />
      </div>

     
      <div style={{ marginBottom: '10px' }}>
        <label>From Language:</label>
        <select
          value={fromLanguage}
          onChange={(e) => setFromLanguage(e.target.value)}
          style={{ width: '100%', padding: '5px' }}
        >
          {Object.keys(languageCodes).map((lang) => (
            <option key={lang} value={languageCodes[lang]}>
              {lang}
            </option>
          ))}
        </select>
      </div>

  
      <div style={{ marginBottom: '10px' }}>
        <label>To Language:</label>
        <select
          value={toLanguage}
          onChange={(e) => setToLanguage(e.target.value)}
          style={{ width: '100%', padding: '5px' }}
        >
          {Object.keys(languageCodes).map((lang) => (
            <option key={lang} value={languageCodes[lang]}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      
      <button onClick={translateMessage} style={{ width: '100%', padding: '10px', marginBottom: '10px' }}>
        Translate
      </button>


      {translatedMessage && (
        <div>
          <h3>Translated Message:</h3>
          <p>{translatedMessage}</p>
        </div>
      )}
    </div>
  );
}

export default Translator;
