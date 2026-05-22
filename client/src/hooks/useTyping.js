import { useEffect, useState } from 'react';

export default function useTyping(texts = [], speed = 100, pause = 1400) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [text, setText] = useState('');

  useEffect(() => {
    if (!texts || texts.length === 0) return;

    if (subIndex === texts[index].length) {
      // pause then move to next text
      const timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % texts.length);
        setSubIndex(0);
      }, pause);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setText(texts[index].slice(0, subIndex + 1));
      setSubIndex((s) => s + 1);
    }, speed);

    return () => clearTimeout(timeout);
  }, [subIndex, index, texts, speed, pause]);

  useEffect(() => {
    setText(texts[index].slice(0, subIndex));
  }, [index, subIndex, texts]);

  return text;
}
