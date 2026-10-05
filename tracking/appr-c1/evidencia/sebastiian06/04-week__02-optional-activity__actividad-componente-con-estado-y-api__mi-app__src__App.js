import React, { useState, useEffect } from 'react';

function App() {
  // Estado: lista de personajes
  const [personajes, setPersonajes] = useState([]);
  // Estado: carga
  const [cargando, setCargando] = useState(false);
  // Estado: error
  const [error, setError] = useState(null);

  // Función que consulta la API
  const cargarPersonajes = async () => {
    setCargando(true);
    setError(null);
    
    try {
      const respuesta = await fetch(
        'https://rickandmortyapi.com/api/character/?name=rick'
      );
      
      if (!respuesta.ok) {
        throw new Error('Error al cargar los datos');
      }
      
      const datos = await respuesta.json();
      setPersonajes(datos.results);
    } catch (err) {
      setError(err.message);
      setPersonajes([]);
    } finally {
      setCargando(false);
    }
  };

  // Cargar al iniciar
  useEffect(() => {
    cargarPersonajes();
  }, []);

  // Renderizado del componente
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>👽 Personajes de Rick y Morty</h1>
      
      {/* Botón para recargar */}
      <button 
        onClick={cargarPersonajes}
        style={{
          padding: '10px 20px',
          background: '#6B4EFF',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        🔄 Recargar
      </button>

      {/* Estado: Cargando */}
      {cargando && <p>⏳ Cargando personajes...</p>}

      {/* Estado: Error */}
      {error && (
        <div style={{ color: 'red', padding: '10px', background: '#ffe6e6', borderRadius: '8px' }}>
          ❌ {error}
        </div>
      )}

      {/* Lista de personajes */}
      {!cargando && !error && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {personajes.length === 0 ? (
            <p>No se encontraron personajes</p>
          ) : (
            personajes.map((personaje) => (
              <li
                key={personaje.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '15px',
                  padding: '10px',
                  borderBottom: '1px solid #eee',
                  marginBottom: '10px'
                }}
              >
                <img
                  src={personaje.image}
                  alt={personaje.name}
                  style={{ width: '60px', height: '60px', borderRadius: '50%' }}
                />
                <div>
                  <strong>{personaje.name}</strong>
                  <p style={{ margin: 0, color: '#666' }}>
                    {personaje.status} - {personaje.species}
                  </p>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default App;