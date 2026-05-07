import { useState, useEffect, useRef } from 'react';

/**
 * useTypewriter — cycles through an array of strings with a typing / deleting effect
 * @param {string[]} phrases   - Array of strings to type
 * @param {number}   typeSpeed - Milliseconds per character when typing   (default 80)
 * @param {number}   delSpeed  - Milliseconds per character when deleting (default 40)
 * @param {number}   pauseMs   - Milliseconds to pause on a complete word  (default 1800)
 */
export function useTypewriter(phrases = [], typeSpeed = 80, delSpeed = 40, pauseMs = 1800) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState('typing'); // 'typing' | 'pausing' | 'deleting'
  const [phraseIdx, setPhraseIdx] = useState(0);
  const frameRef = useRef(null);

  useEffect(() => {
    if (!phrases.length) return;

    const current = phrases[phraseIdx];

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        frameRef.current = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, typeSpeed);
      } else {
        frameRef.current = setTimeout(() => setPhase('pausing'), pauseMs);
      }
    } else if (phase === 'pausing') {
      setPhase('deleting');
    } else if (phase === 'deleting') {
      if (displayed.length > 0) {
        frameRef.current = setTimeout(() => {
          setDisplayed(prev => prev.slice(0, -1));
        }, delSpeed);
      } else {
        setPhraseIdx(i => (i + 1) % phrases.length);
        setPhase('typing');
      }
    }

    return () => clearTimeout(frameRef.current);
  }, [displayed, phase, phraseIdx, phrases, typeSpeed, delSpeed, pauseMs]);

  return displayed;
}
