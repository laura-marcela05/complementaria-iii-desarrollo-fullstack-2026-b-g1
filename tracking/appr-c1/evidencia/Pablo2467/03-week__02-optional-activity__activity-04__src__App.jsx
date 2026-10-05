import React from "react";
import { useState, useEffect } from "react";
import DataList from "./components/DataList";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Usuarios</h1>
      <DataList
        url="https://jsonplaceholder.typicode.com/users"
        renderItem={(usuario) => (
          <div>
            <strong>{usuario.name}</strong> — {usuario.email}
          </div>
        )}
      />
    </div>
  );
}

export default App;