'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from '../../styles/PromptContact.module.css';

export default function PromptContact() {
  const [prompt, setPrompt] = useState('');
  const router = useRouter();

  function submit() {
    const q = prompt.trim();
    if (!q) return;
    router.push(`/contact?prompt=${encodeURIComponent(q)}`);
  }

  return (
    <div className={`neon-card ${styles.wrap}`}>
      <div className={styles.overline}>Prompt de contacto</div>
      <h2 className={styles.title}>Cuéntame qué necesitas</h2>

      <div className={styles.row}>
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
          placeholder="Ej: Necesito convertir 7 Excels en un SQL robusto para SINA…"
          className={styles.input}
          aria-label="Prompt de contacto"
        />
        <button className="btn-primary" onClick={submit}>Enviar</button>
      </div>

      <div className={styles.tip}>
        Tip: añade contexto, plazos y ejemplo de salida esperada. Yo me encargo del resto.
      </div>
    </div>
  );
}