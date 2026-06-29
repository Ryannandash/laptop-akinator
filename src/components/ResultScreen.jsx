import { LuArrowLeft } from "react-icons/lu";
export default function ResultScreen({ diagnosis, questionCount, onPlayAgain, onHome }) {
  if (!diagnosis) {
    return (
      <div className="result-screen">
        <div className="result-genie-area">
          <div className="result-genie-emoji">😅</div>
        </div>
        <div className="result-card result-card--fail">
          <h2 className="result-card-title">Aku Menyerah!</h2>
          <p className="result-card-subtitle">
            Masalah laptopmu sangat unik! Aku tidak berhasil mendiagnosanya setelah {questionCount} pertanyaan.
            Coba konsultasikan ke teknisi langsung ya.
          </p>
          <div className="result-actions">
            <button className="btn-primary" onClick={onPlayAgain}>Coba Lagi</button>
            <button className="btn-ghost" onClick={onHome}>Kembali ke Awal</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="result-screen">
      <div className="result-genie-area">
        <div className="result-genie-thinking">🩺</div>
        <div className="result-think-text">Diagnosa Selesai</div>
      </div>

      <div className="result-card">
        <div className="result-diagnosis-icon">{diagnosis.icon}</div>
        <h2 className="result-diagnosis-name">{diagnosis.name}</h2>
        <div className="result-code-badge">Kode: {diagnosis.id}</div>

        <div className="result-divider" />

        <div className="result-solution-section">
          <div className="result-solution-label">💡 Solusi yang Disarankan</div>
          <p className="result-solution-text">{diagnosis.solution}</p>
        </div>

        <div className="result-stats">
          <div className="stat-item">
            <span className="stat-value">{questionCount}</span>
            <span className="stat-label">Pertanyaan</span>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <span className="stat-value">{diagnosis.id}</span>
            <span className="stat-label">Diagnosis</span>
          </div>
        </div>

        <div className="result-confirm-label">Apakah diagnosa sudah tepat?</div>
        <div className="result-confirm-btns">
          <button className="btn-confirm btn-confirm--yes" onClick={onPlayAgain}>
            Ya, Solusi Tepat!
          </button>
          <button className="btn-confirm btn-confirm--no" onClick={onPlayAgain}>
            Tidak
          </button>
        </div>
      </div>

      <button className="back-home-btn" onClick={onHome}>
        <LuArrowLeft size={18} />
        <span>Kembali ke Awal</span>
      </button>
    </div>
  );
}
