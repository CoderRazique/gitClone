import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CreateRepo.css";

const CreateRepo = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    visibility: false,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");

    if (!userId) return setMessage("User not logged in");

    try {
      setLoading(true);

      await axios.post("http://52.90.203.90:3000/repo/create", {
        ...form,
        owner: userId,
      });

      navigate("/", { replace: true });
    } catch (err) {
      setMessage(err.response?.data?.error || "Error creating repo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="repo-container">
      <h2 className="repo-title">Create a new repository</h2>

      <div className="repo-box">
        <form onSubmit={handleSubmit}>
          <div className="repo-row">
            <label className="repo-label">Repository name *</label>
            <input
              className="repo-input"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="my-project"
            />
          </div>

          <div className="repo-row">
            <label className="repo-label">Description (optional)</label>
            <textarea
              className="repo-textarea"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Write a short description"
            />
          </div>

          <div className="repo-row repo-checkbox">
            <input
              type="checkbox"
              name="visibility"
              checked={form.visibility}
              onChange={handleChange}
            />
            <label>Make this repository private</label>
          </div>

          <button className="repo-button" disabled={loading}>
            {loading ? "Creating..." : "Create repository"}
          </button>

          {message && <p className="repo-message">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateRepo;
