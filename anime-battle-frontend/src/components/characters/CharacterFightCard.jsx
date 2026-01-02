export const CharacterFightCard = ({ character }) => {
  return (
    <div
      className="card h-100 shadow-lg border-0 rounded-3 overflow-hidden mt-3 mx-auto"
      style={{ maxWidth: "350px" }}
    >
      <img
        src={character.image}
        className="card-img-top"
        alt={character.name}
        style={{
          height: "350px",
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
      </div>
    </div>
  );
};
