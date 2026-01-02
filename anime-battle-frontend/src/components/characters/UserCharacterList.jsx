import { useState, useEffect } from "react";
import { CharacterCard } from "./CharacterCard";
import useCharacters from "../../hooks/useCharacters";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";

export const UserCharacterList = () => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { characterList, getUserCharacter } = useCharacters();
  const { user } = useAuth();

  useEffect(() => {
    // Check if user exists and only run the fetch once if the user is available
    if (!user) return;

    const fetchCharacters = async () => {
      try {
        await getUserCharacter();
      } catch (error) {
        console.error("Failed to fetch user characters:", error);
      } finally {
        setLoader(false); // stop loading
      }
    };

    fetchCharacters();
  }, [user]); // The effect will only rerun if `user` changes

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
      <h2 className="text-center mb-4">Your Characters</h2>
      {characterList.length !== 0 ? (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {characterList.map((character) => (
            <div key={character._id} className="col">
              <CharacterCard character={character} />
            </div>
          ))}
        </div>
      ) : (
        <div className="col-12 text-center">
          <p className="text-muted">No characters found. Add one!</p>
        </div>
      )}
    </div>
  );
};
