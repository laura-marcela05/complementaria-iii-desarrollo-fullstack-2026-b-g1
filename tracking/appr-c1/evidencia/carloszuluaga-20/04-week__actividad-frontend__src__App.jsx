import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simula el consumo del endpoint /api/games usando fetch
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al conectar con el servidor');
        }
        return respuesta.json();
      })
      .then(() => {
        const listaJuegos = [
          { id: 1, nombre: "Assassin's Creed Origins", estado: "Jugando", progreso: "65%" },
          { id: 2, nombre: "Cyberpunk 2077", estado: "Pendiente", progreso: "0%" },
          { id: 3, nombre: "Monster Hunter: World", estado: "Completado", progreso: "100%" },
          { id: 4, nombre: "Kingdom Come: Deliverance", estado: "Jugando", progreso: "30%" },
          { id: 5, nombre: "Red Dead Redemption 2", estado: "Pendiente", progreso: "0%" },
          { id: 6, nombre: "Ghost Recon Wildlands", estado: "Completado", progreso: "100%" },
          { id: 7, nombre: "The Witcher 3: Wild Hunt", estado: "Pendiente", progreso: "0%" },
          { id: 8, nombre: "God of War", estado: "Jugando", progreso: "45%" },
          { id: 9, nombre: "Horizon Zero Dawn", estado: "Pendiente", progreso: "0%" },
          { id: 10, nombre: "Grand Theft Auto V", estado: "Completado", progreso: "100%" },
          { id: 11, nombre: "Uncharted 4: El desenlace del ladrón", estado: "Pendiente", progreso: "0%" },
          { id: 12, nombre: "Batman: Arkham City", estado: "Jugando", progreso: "20%" },
          { id: 13, nombre: "The Last of Us Part I", estado: "Completado", progreso: "100%" }
        ];
        setJuegos(listaJuegos);
        setCargando(false);
      })
      .catch((err) => {
        setError(err.message);
        setCargando(false);
      });
  }, []);

  if (cargando) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#fff', background: '#121212', height: '100vh' }}>Cargando biblioteca de juegos...</div>;
  }

  if (error) {
    return <div style={{ padding: '40px', textAlign: 'center', color: '#ff6b6b', background: '#121212', height: '100vh' }}>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '30px', maxWidth: '700px', margin: '0 auto', fontFamily: 'Arial, sans-serif', color: '#fff', background: '#121212', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '25px', color: '#4dabf7' }}>Mi Biblioteca de Juegos</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {juegos.map((juego) => (
          <div key={juego.id} style={{ background: '#1e1e1e', padding: '15px 20px', borderRadius: '8px', border: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <strong style={{ fontSize: '1.1rem', color: '#f8f9fa' }}>{juego.nombre}</strong>
            </div>
            <div style={{ textAlign: 'right', fontSize: '0.9rem', color: '#adb5bd' }}>
              <span>Estado: <strong style={{ color: juego.estado === 'Jugando' ? '#3bc9db' : juego.estado === 'Completado' ? '#40c057' : '#fab005' }}>{juego.estado}</strong></span><br />
              <span>Progreso: {juego.progreso}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
