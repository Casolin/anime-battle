import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCharacters from "../../hooks/useCharacters";
import { toast } from "react-toastify";
import Loader from "../Loader";

// This is a mock function. You need to replace this with your actual file upload logic.
// This should upload the file and return the URL of the uploaded image.
const uploadFileToServer = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  // Replace this URL with your actual file upload endpoint
  const response = await fetch("https://your-server.com/upload", {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data.imageUrl; // Return the URL after the file is uploaded
};

export const CharacterForm = () => {
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();
  const { addNewCharacter } = useCharacters();
  const [character, setCharacter] = useState({
    image: "", // This will store either the URL or base64 string for the image
    name: "",
    strength: "",
    speed: "",
    skill: "",
  });
  const [imageSource, setImageSource] = useState("url"); // Tracks whether user wants to provide URL or File

  useEffect(() => {
    const timer = setTimeout(() => setLoader(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loader) return <Loader />;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Handle file input: Upload the file and get the URL
      const file = files[0];
      if (file) {
        uploadFileToServer(file) // Upload the file to server/cloud and get the URL
          .then((url) => {
            setCharacter((prev) => ({
              ...prev,
              [name]: url, // Set the image as the URL returned from the upload
            }));
          })
          .catch((err) => {
            toast.error(err.message || "File upload failed");
          });
      }
    } else {
      setCharacter((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure we have a valid image URL
    if (!character.image) {
      toast.error("Image is required");
      return;
    }

    try {
      await addNewCharacter({
        image: character.image, // This will be a URL (either from URL input or file upload)
        name: character.name,
        stats: {
          strength: character.strength,
          speed: character.speed,
          skill: character.skill,
        },
      });

      toast.success("Character added successfully!");

      setCharacter({
        image: "",
        name: "",
        strength: "",
        speed: "",
        skill: "",
      });
    } catch (err) {
      toast.error(err?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <button
        className="btn btn-outline-primary position-absolute top-0 start-0 m-3"
        style={{ zIndex: 2 }}
        onClick={() => navigate("/dashboard")}
      >
        <i className="bi bi-arrow-left"></i> Back
      </button>
      <div className="card shadow-lg p-4" style={{ width: "380px" }}>
        <h3 className="text-center mb-4">
          <i className="bi bi-person-circle me-2 text-primary"></i>
          Add Character
        </h3>

        <form onSubmit={handleSubmit}>
          {/* Name Input */}
          <div className="mb-3">
            <label className="form-label">Name</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person"></i>
              </span>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Enter character name"
                value={character.name}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Image Source Selection */}
          <div className="mb-3">
            <label className="form-label">Image Source</label>
            <div className="d-flex justify-content-start mb-3">
              <div className="form-check me-4">
                <input
                  className="form-check-input"
                  type="radio"
                  name="imageSource"
                  value="url"
                  checked={imageSource === "url"}
                  onChange={() => setImageSource("url")}
                />
                <label className="form-check-label">URL</label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="imageSource"
                  value="file"
                  checked={imageSource === "file"}
                  onChange={() => setImageSource("file")}
                />
                <label className="form-check-label">File Upload</label>
              </div>
            </div>
          </div>

          {/* Conditionally render input based on imageSource */}
          {imageSource === "url" ? (
            <div className="mb-3">
              <label className="form-label">Image URL</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-image"></i>
                </span>
                <input
                  type="url"
                  name="image"
                  className="form-control"
                  placeholder="Enter image URL"
                  value={character.image}
                  onChange={handleChange}
                />
              </div>
            </div>
          ) : (
            <div className="mb-3">
              <label className="form-label">Image File</label>
              <div className="input-group">
                <span className="input-group-text">
                  <i className="bi bi-image"></i>
                </span>
                <input
                  type="file"
                  name="image"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* Strength Input */}
          <div className="mb-4">
            <label className="form-label">Strength</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-shield"></i>
              </span>
              <input
                type="number"
                name="strength"
                className="form-control"
                placeholder="Enter character strength"
                value={character.strength}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Speed Input */}
          <div className="mb-4">
            <label className="form-label">Speed</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-lightning"></i>
              </span>
              <input
                type="number"
                name="speed"
                className="form-control"
                placeholder="Enter character speed"
                value={character.speed}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Skill Input */}
          <div className="mb-4">
            <label className="form-label">Skill</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-tools"></i>
              </span>
              <input
                type="number"
                name="skill"
                className="form-control"
                placeholder="Enter character skill"
                value={character.skill}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};
