import { useNavigate } from "react-router-dom";
import useCharacters from "../../hooks/useCharacters";
import { toast } from "react-toastify";

export const EnemyCharacterCard = ({ character }) => {
  const { selectEnemyCharacter, selectedCharacter } = useCharacters();
  const navigate = useNavigate();

  const handleBattle = () => {
    if (!selectedCharacter) {
      toast.error("You must select a character");
      return;
    }

    selectEnemyCharacter(character);
    toast.success("Battle starting!");
    navigate("/battle");
  };

  return (
    <div className="card h-100 shadow-lg border-0 rounded-3 overflow-hidden mt-3">
      <img
        src={character.image}
        className="card-img-top"
        alt={character.name}
        style={{
          height: "280px",
          objectFit: "cover",
        }}
      />

      <div className="card-body d-flex flex-column p-3">
        <h5 className="card-title mb-3 text-center">{character.name}</h5>

        <div className="stats">
          <div className="mb-2">
            <strong>STR:</strong> {character.stats.strength}
          </div>
          <hr className="m-1" />
          <div className="mb-2">
            <strong>SPD:</strong> {character.stats.speed}
          </div>
          <hr className="m-1" />
          <div className="mb-2">
            <strong>SKL:</strong> {character.stats.skill}
          </div>
          <hr className="m-1" />
        </div>

        {character.owner?.username && (
          <p className="text-muted text-center mb-2">
            <strong>Owner:</strong> {character.owner.username}
          </p>
        )}

        <button
          className="btn btn-warning mt-auto w-100"
          style={{ borderRadius: "20px" }}
          onClick={handleBattle}
        >
          ⚔️ Battle
        </button>
      </div>
    </div>
  );
};
