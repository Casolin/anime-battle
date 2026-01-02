import { useState, useEffect } from "react";
import { CharacterCard } from "./CharacterCard";
import useCharacters from "../../hooks/useCharacters";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader"; // Bootstrap spinner

export const UserCharacterList = () => {
  const [loading, setLoading] = useState(true); // Track loading state
  const navigate = useNavigate();
  const { characterList, getUserCharacter } = useCharacters();
  const { user } = useAuth();

  useEffect(() => {
    // Fetch characters only when `user` is available
    const fetchCharacters = async () => {
      if (!user) return; // Don't fetch if no user is available
      try {
        await getUserCharacter(); // Fetch user characters
      } catch (error) {
        console.error("Failed to fetch user characters:", error);
      } finally {
        setLoading(false); // Stop the loader after fetch is complete
      }
    };

    if (user) {
      // Only run fetch when `user` exists
      fetchCharacters();
    }
  }, [user, getUserCharacter]); // Re-run when `user` or `getUserCharacter` changes

  if (loading) return <Loader />; // Show loader spinner while loading

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
