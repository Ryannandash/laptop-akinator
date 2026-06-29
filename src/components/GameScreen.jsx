import { useState, useEffect } from 'react';
import { getNextQuestion, getDiagnosis, shouldConclude } from '../engine/forwardChaining';
import { LuHouse, LuArrowLeft } from "react-icons/lu";

const ANSWERS = [
  { value: 'yes', label: 'Ya' },
  { value: 'probably_yes', label: 'Mungkin Ya' },
  { value: 'dont_know', label: 'Tidak Tahu' },
  { value: 'probably_not', label: 'Mungkin Tidak' },
  { value: 'no', label: 'Tidak' },
];

export default function GameScreen({ onResult, onHome }) {
  const [answers, setAnswers] = useState({});
  const [currentSymptom, setCurrentSymptom] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const next = getNextQuestion({});
    setCurrentSymptom(next);
  }, []);

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [currentSymptom.id]: value };
    setAnswers(newAnswers);
    setHistory([...history, { symptom: currentSymptom, answer: value }]);
    setQuestionCount(questionCount + 1);
    setAnimKey(animKey + 1);

    if (shouldConclude(newAnswers)) {
      const diagnosis = getDiagnosis(newAnswers);
      setTimeout(() => onResult(diagnosis, questionCount + 1), 300);
      return;
    }

    const next = getNextQuestion(newAnswers);
    if (!next) {
      const diagnosis = getDiagnosis(newAnswers);
      setTimeout(() => onResult(diagnosis, questionCount + 1), 300);
      return;
    }
    setCurrentSymptom(next);
  };

  const handleBack = () => {
    if (history.length === 0) return;
    const prev = [...history];
    const last = prev.pop();
    const newAnswers = { ...answers };
    delete newAnswers[last.symptom.id];
    setAnswers(newAnswers);
    setHistory(prev);
    setCurrentSymptom(last.symptom);
    setQuestionCount(Math.max(0, questionCount - 1));
  };

  if (!currentSymptom) return null;

  return (
    <div className="game-screen">
      <div className="game-topbar">
        <button
          className="glass-btn home-btn"
          onClick={onHome}
        >
          <LuHouse size={24} />
        </button>

        {history.length > 0 && (
          <button
            className="glass-btn back-btn"
            onClick={handleBack}
          >
            <LuArrowLeft size={22} />
            <span>Kembali</span>
          </button>
        )}
      </div>

      <div className="game-genie-area">
        <div className="game-genie-laptop">
          <svg width="90" height="90" viewBox="0 0 90 90" fill="none">
            <rect x="12" y="18" width="66" height="44" rx="5" fill="#6b21a8" stroke="#f5c518" strokeWidth="2" />
            <rect x="18" y="24" width="54" height="32" rx="3" fill="#1a0530" />
            <rect x="5" y="62" width="80" height="8" rx="4" fill="#4c1d95" stroke="#f5c518" strokeWidth="1.5" />
            <circle cx="45" cy="66" r="2" fill="#f5c518" opacity="0.6" />
            <circle cx="45" cy="36" r="6" fill="none" stroke="#f5c518" strokeWidth="1.5" opacity="0.5" />
            <path d="M39 36 L45 30 L51 36 L45 42 Z" stroke="#f5c518" strokeWidth="1.5" fill="none" opacity="0.7" />
          </svg>
        </div>
        <p className="game-genie-caption">Apakah laptop kamu mengalami gejala berikut?</p>
      </div>

      <div className="game-question-card">
        <div className="question-badge">
          <span className="q-label">Pertanyaan No. {questionCount + 1}</span>
          <span className="q-id">Gejala {currentSymptom.id}</span>
        </div>

        <p key={animKey} className="question-text anim-fadein">
          {currentSymptom.text}
        </p>
      </div>

      <div className="answer-grid">
        {ANSWERS.map((ans) => (
          <button
            key={ans.value}
            className={`btn-answer btn-answer--${ans.value}`}
            onClick={() => handleAnswer(ans.value)}
          >
            {ans.label}
          </button>
        ))}
      </div>

      <div className="game-progress">
        <span className="progress-text">{questionCount} gejala telah diperiksa</span>
        <div className="progress-dots">
          {Array.from({ length: Math.min(questionCount, 12) }).map((_, i) => (
            <span key={i} className="dot dot--done" />
          ))}
          <span className="dot dot--current" />
        </div>
      </div>
    </div>
  );
}
