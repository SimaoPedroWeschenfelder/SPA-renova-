import { useEffect, useRef, useState } from 'react';
import Seo from '../components/Seo';
import { supabase } from '../lib/supabaseClient';
import { GOOGLE_REVIEW_URL } from '../lib/constants';
import styles from './Avaliar.module.css';

const MIN_LENGTH = 3;
const MAX_LENGTH = 1000;
const COOLDOWN_SECONDS = 60;

export default function Avaliar() {
  const [reviewClicked, setReviewClicked] = useState(false);
  const [texto, setTexto] = useState('');
  const [nome, setNome] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  useEffect(() => () => clearInterval(cooldownRef.current), []);

  const startCooldown = () => {
    setCooldown(COOLDOWN_SECONDS);
    cooldownRef.current = setInterval(() => {
      setCooldown((c) => {
        if (c <= 1) {
          clearInterval(cooldownRef.current);
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const handleGoogleClick = () => {
    setReviewClicked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (honeypot) {
      // Bot preencheu o campo invisível: finge sucesso sem gravar nada.
      setStatus('success');
      return;
    }

    const trimmed = texto.trim();
    if (trimmed.length < MIN_LENGTH || trimmed.length > MAX_LENGTH) {
      setErrorMsg(`O texto precisa ter entre ${MIN_LENGTH} e ${MAX_LENGTH} caracteres.`);
      return;
    }

    if (cooldown > 0 || status === 'submitting') return;

    setStatus('submitting');

    if (!supabase) {
      setStatus('error');
      setErrorMsg('Envio indisponível no momento. Tente novamente mais tarde.');
      return;
    }

    const { error } = await supabase.from('sugestoes').insert({
      texto: trimmed,
      nome: nome.trim() || null,
    });

    if (error) {
      setStatus('error');
      setErrorMsg('Não foi possível enviar agora. Tente novamente em instantes.');
      return;
    }

    setStatus('success');
    setTexto('');
    setNome('');
    startCooldown();
  };

  return (
    <div className={styles.page}>
      <Seo
        title="Avalie o Spaço Renova"
        description="Deixe sua avaliação e sugestões para o Spaço Renova."
        path="/avaliar"
        noindex
      />

      <div className={styles.card}>
        <p className={styles.logo}>Spaço Renova</p>
        <h1 className={styles.title}>Sua opinião renova a gente</h1>

        <a
          href={GOOGLE_REVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn btn-primary ${styles.googleBtn}`}
          onClick={handleGoogleClick}
        >
          Avaliar no Google
        </a>

        {reviewClicked && (
          <div className={styles.reveal}>
            {status === 'success' ? (
              <p className={styles.thanks} role="status">
                Obrigada por avaliar! Se quiser, você pode enviar outra sugestão em instantes.
              </p>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <label htmlFor="texto" className={styles.label}>
                  Quer sugerir alguma melhoria? Conta pra gente (opcional)
                </label>
                <textarea
                  id="texto"
                  className={styles.textarea}
                  value={texto}
                  onChange={(e) => setTexto(e.target.value)}
                  minLength={MIN_LENGTH}
                  maxLength={MAX_LENGTH}
                  rows={4}
                  placeholder="Escreva aqui sua sugestão..."
                />

                <label htmlFor="nome" className={styles.label}>
                  Nome (opcional)
                </label>
                <input
                  id="nome"
                  type="text"
                  className={styles.input}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  maxLength={120}
                />

                <div className="visually-hidden" aria-hidden="true">
                  <label htmlFor="empresa">Não preencha este campo</label>
                  <input
                    id="empresa"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {errorMsg && <p className={styles.error} role="alert">{errorMsg}</p>}

                <button
                  type="submit"
                  className="btn btn-outline"
                  disabled={status === 'submitting' || cooldown > 0}
                >
                  {cooldown > 0 ? `Aguarde ${cooldown}s` : status === 'submitting' ? 'Enviando…' : 'Enviar'}
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
