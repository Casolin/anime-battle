import { useState, useEffect } from "react";
import useCharacters from "../../hooks/useCharacters";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { EnemyCharacterCard } from "./EnemyCharacterCard";

export const EnemyCharacterList = () => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { characterList, getEnemyCharacters } = useCharacters();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setLoader(false);
      return;
    }

    const fetchCharacters = async () => {
      try {
        await getEnemyCharacters();
      } catch (error) {
        console.error("Failed to fetch enemy characters:", error);
      } finally {
        setLoader(false);
      }
    };

    fetchCharacters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (loader) return <Loader />;

  return (
    <div className="container my-5">
      <button
        className="btn btn-outline-primary position-absolute top-0 start-0 m-3"
        style={{ zIndex: 2 }}
        onClick={() => navigate("/dashboard")}
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>

      <h2 className="text-center mb-4">Enemy Characters</h2>

      {characterList.length > 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {characterList.map((character) => (
            <div key={character._id} className="col">
              <EnemyCharacterCard character={character} />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted">No enemy characters available.</p>
      )}
    </div>
  );
};
