import { useNavigate } from "react-router-dom";

export const Characters = () => {
  const navigate = useNavigate();
  return (
    <div className="container my-5">
      <div className="row g-4 justify-content-center align-items-stretch">
        <div className="col-md-3 col-12 d-flex">
          <div className="card text-white w-100 h-100 character-card border-0">
            <img
              src="https://w0.peakpx.com/wallpaper/961/507/HD-wallpaper-sung-jin-woo-solo-leveling.jpg"
              className="card-img h-100 object-fit-cover"
              alt="Add Character"
            />
            <div className="card-img-overlay d-flex flex-column justify-content-end align-items-center text-center bg-dark bg-opacity-50 p-3">
              <h4 className="fw-bold mb-3">Add Character</h4>
              <button
                className="btn btn-light fw-semibold px-4"
                onClick={() => navigate("/add-character")}
              >
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-12 d-flex">
          <div className="card text-white w-100 h-100 character-card border-0">
            <img
              src="https://w0.peakpx.com/wallpaper/78/864/HD-wallpaper-golden-goku-goku-ssj3-artwork-dragon-ball-super-manga-dbs-son-goku.jpg"
              className="card-img h-100 object-fit-cover"
              alt="Character List"
            />
            <div className="card-img-overlay d-flex flex-column justify-content-end align-items-center text-center bg-dark bg-opacity-50 p-3">
              <h4 className="fw-bold mb-3">Character List</h4>
              <button
                className="btn btn-outline-light fw-semibold px-4"
                onClick={() => navigate("characters-list")}
              >
                View
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3 col-12 d-flex">
          <div className="card text-white w-100 h-100 character-card border-0">
            <img
              src="https://w0.peakpx.com/wallpaper/498/958/HD-wallpaper-goku-dragon-ball-z-goku-nigth-goku-space-night-night-goku-space-goku.jpg"
              className="card-img h-100 object-fit-cover"
              alt="My Anime Characters"
            />
            <div className="card-img-overlay d-flex flex-column justify-content-end align-items-center text-center bg-dark bg-opacity-50 p-3">
              <h4 className="fw-bold mb-3">My Anime Characters</h4>
              <button
                className="btn btn-warning fw-semibold px-4"
                onClick={() => navigate("/user-characters")}
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
