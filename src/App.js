import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("/repositories").then((res) => setRepositories(res.data));
  }, []);

  async function handleAddRepository() {
    const { data: newRepo } = await api.post("repositories", {
      title: `Aprendendo-React-fundamentos ${Date.now()}`,
      url: "https://github.com/Locke23/rsb-fundamentos-reactjs",
      techs: ["React", "axios"],
    });
    setRepositories([...repositories, newRepo]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repo) => repo.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
          repositories.map((repo) => (
            <li key={repo.id}>
              {repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
                Remover
              </button>
            </li>
          ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
