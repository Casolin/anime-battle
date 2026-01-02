import useCharacters from "../hooks/useCharacters";
import { CharacterFightCard } from "../components/characters/CharacterFightCard";
import "../styles/battle.css";

export const Battle = () => {
  const { selectedCharacter, selectedEnemyCharacter } = useCharacters();

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
