import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCharacters from "../hooks/useCharacters";
import useBattles from "../hooks/useBattles";
import { CharacterFightCard } from "../components/characters/CharacterFightCard";
import "../styles/battle.css";

export const Battle = () => {
  const { selectedCharacter, selectedEnemyCharacter } = useCharacters();
  const { startBattle, battleInProgress } = useBattles();
  const [battleStatus, setBattleStatus] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const initiateBattle = async () => {
      if (selectedCharacter && selectedEnemyCharacter && !battleInProgress) {
        setBattleStatus("Analyzing fight...");

        setTimeout(() => {
          setBattleStatus("Preparing for battle...");
        }, 3000);

        setTimeout(() => {
          setBattleStatus("Calculating results...");
        }, 6000);

        setTimeout(async () => {
          const battleInfo = {
            user: selectedCharacter.owner,
            character1Id: selectedCharacter._id,
            character2Id: selectedEnemyCharacter._id,
          };

          try {
            const battleResult = await startBattle(battleInfo);

            if (battleResult) {
              const { winner, score1, score2 } = battleResult.battle;
              navigate("/battle-winner", { state: { winner, score1, score2 } });
            } else {
              setBattleStatus("No battle result returned.");
            }
          } catch (error) {
            setBattleStatus("Something went wrong during battle.");
            console.error("Error during battle:", error);
          }
        }, 10000);
      }
    };

    initiateBattle();
  }, [
    selectedCharacter,
    selectedEnemyCharacter,
    navigate,
    startBattle,
    battleInProgress,
  ]);

  return (
    <div className="battle-container">
      <div className="row align-items-center justify-content-center battle-row">
        <div className="col-md-4 text-center">
          <h4 className="player">You</h4>
          {selectedCharacter ? (
            <CharacterFightCard character={selectedCharacter} />
          ) : (
            <p className="player">Select your character first!</p>
          )}
        </div>

        <div className="col-md-2 text-center">
          <img
            src="/versus.png"
            alt="VS"
            style={{ width: "150px", height: "150px" }}
          />
          {battleStatus && (
            <div
              className="text-center mt-3 p-3"
              style={{
                backgroundColor: "#f8f9fa",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                color: "#6c757d",
                fontSize: "18px",
                fontWeight: "500",
                textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)",
              }}
            >
              <p>{battleStatus}</p>
            </div>
          )}
        </div>

        <div className="col-md-4 text-center">
          <h4 className="player">Enemy</h4>
          {selectedEnemyCharacter ? (
            <CharacterFightCard character={selectedEnemyCharacter} />
          ) : (
            <p className="player">Select an enemy first!</p>
          )}
        </div>
      </div>
    </div>
  );
};
