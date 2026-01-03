import { useLocation, useNavigate } from "react-router-dom"; // To get the winner data passed from Battle page

export const BattleResult = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { winner, score1, score2 } = location.state || {}; // Destructure winner and scores from state

  return (
    <div
      className="battle-result-container"
      style={{
        backgroundImage: "url('/path-to-your-image.jpg')", // You can replace this with your actual image URL
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="card shadow-lg"
        style={{ width: "60%", maxWidth: "600px" }}
      >
        <div className="card-body text-center p-5">
          <h2 className="card-title mb-4">Battle Result</h2>

          <div className="winner-section mb-4">
            <h3 className="text-primary">
              {winner ? `${winner} Wins!` : "It's a Tie!"}
            </h3>
          </div>

          <div className="score-section mb-3">
            <h4>Scores</h4>
            <p className="text-muted">Your Character: {score1}</p>
            <p className="text-muted">Enemy Character: {score2}</p>
          </div>

          <div className="button-section">
            <button
              className="btn btn-warning mt-3"
              style={{ borderRadius: "20px", padding: "10px 30px" }}
              onClick={() => navigate("/user-characters")}
            >
              🏆 Play Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
