import { useEffect } from "react";
import useCharacters from "../../hooks/useCharacters";
import { toast } from "react-toastify";

export const CharacterCard = ({ character }) => {
  const { deleteCharacter, selectCharacter, selectedCharacter } =
    useCharacters();

  const handleDeleteCharacter = async () => {
    try {
      await deleteCharacter(character);
      toast.success("Character deleted successfully!");
    } catch (error) {
      toast.error(error.message || "Unable to delete character!");
    }
  };

  useEffect(() => {
    if (selectedCharacter) {
      console.log("Selected character updated:", selectedCharacter);
    }
  }, [selectedCharacter]);

  const handleSelection = async () => {
    try {
      selectCharacter(character);
      toast.success("Character selected succesfully!");
    } catch (err) {
      toast.error(err.message || "Error selecting character");
    }
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
          transition: "transform 0.3s ease-in-out",
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

        <div className="text-center mt-2">
          <button
            className="btn btn-danger btn-sm"
            onClick={() => handleDeleteCharacter()}
            style={{
              borderRadius: "20px",
              padding: "5px 20px",
              transition: "background-color 0.3s ease",
            }}
          >
            <i className="bi bi-trash"></i> Delete
          </button>
          <button
            className="btn btn-primary btn-sm"
            style={{
              borderRadius: "20px",
              padding: "5px 20px",
              transition: "background-color 0.3s ease",
              marginLeft: "10px",
            }}
            onClick={() => handleSelection()}
          >
            <i className="bi bi-check-circle"></i> Select
          </button>
        </div>
      </div>
    </div>
  );
};
