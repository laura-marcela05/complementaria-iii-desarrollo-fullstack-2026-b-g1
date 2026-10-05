/* ========================================
   CONFIGURACIÓN DE LA API
   ======================================== */
const API_URL = 'https://rickandmortyapi.com/api/character';
const MAX_RESULTS = 20;

/* ========================================
   ESTADO DE LA APLICACIÓN
   ======================================== */
let state = {
    currentSearch: '',
    isLoading: false,
    characters: [],
    hasError: false
};

/* ========================================
   REFERENCIAS AL DOM
   ======================================== */
const DOM = {
    searchInput: document.getElementById('searchInput'),
    searchBtn: document.getElementById('searchBtn'),
    clearBtn: document.getElementById('clearBtn'),
    characterList: document.getElementById('characterList'),
    resultCount: document.getElementById('resultCount'),
    loadingState: document.getElementById('loadingState'),
    errorState: document.getElementById('errorState'),
    emptyState: document.getElementById('emptyState'),
    errorMessage: document.getElementById('errorMessage'),
    emptyMessage: document.getElementById('emptyMessage'),
    retryBtn: document.getElementById('retryBtn'),
    apiStatus: document.getElementById('apiStatus')
};

/* ========================================
   FUNCIONES PRINCIPALES
   ======================================== */

/**
   Busca personajes en la API de Rick y Morty
   @param {string} query - Nombre del personaje
   */
async function searchCharacters(query) {
    // Validación
    if (!query || query.trim().length < 2) {
        showEmptyState('👀 Ingresa al menos 2 caracteres para buscar');
        return;
    }

    const searchTerm = query.trim();
    state.currentSearch = searchTerm;

    // Mostrar estado de carga
    showLoading();

    try {
        // Petición a la API
        const response = await fetch(
            `${API_URL}/?name=${encodeURIComponent(searchTerm)}`
        );

        // Verificar respuesta
        if (!response.ok) {
            if (response.status === 404) {
                showEmptyState(`🔭 No se encontraron personajes para "${searchTerm}"`);
                return;
            }
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        // Parsear JSON
        const data = await response.json();

        // Verificar resultados
        if (!data.results || data.results.length === 0) {
            showEmptyState(`🔭 No se encontraron personajes para "${searchTerm}"`);
            return;
        }

        // Procesar y mostrar
        const characters = processCharactersData(data.results);
        displayCharacters(characters);
        updateResultCount(characters.length);
        updateApiStatus(true);

    } catch (error) {
        console.error('Error en la búsqueda:', error);
        handleApiError(error);
    } finally {
        hideLoading();
    }
}

/**
   Procesa los datos de los personajes
   @param {Array} results - Datos crudos de la API
   @returns {Array} Personajes procesados
   */
function processCharactersData(results) {
    return results.map(char => ({
        id: char.id,
        name: char.name || 'Sin nombre',
        status: char.status || 'Desconocido',
        species: char.species || 'Desconocida',
        type: char.type || '',
        gender: char.gender || 'Desconocido',
        origin: char.origin?.name || 'Desconocido',
        location: char.location?.name || 'Desconocido',
        image: char.image || '',
        episodeCount: char.episode?.length || 0,
        created: char.created || ''
    }));
}

/**
   Muestra los personajes en el DOM
   @param {Array} characters - Lista de personajes procesados
   */
function displayCharacters(characters) {
    if (characters.length === 0) {
        showEmptyState('No se encontraron personajes');
        return;
    }

    hideAllStates();

    const charactersHTML = characters.map(char => {
        // Determinar clase de estado
        let statusClass = 'status-unknown';
        if (char.status === 'Alive') statusClass = 'status-alive';
        else if (char.status === 'Dead') statusClass = 'status-dead';

        // Emoji según estado
        let statusEmoji = '❓';
        if (char.status === 'Alive') statusEmoji = '🟢';
        else if (char.status === 'Dead') statusEmoji = '💀';
        
        // Emoji según especie
        let speciesEmoji = '👾';
        if (char.species === 'Human') speciesEmoji = '👨‍🔬';
        else if (char.species === 'Alien') speciesEmoji = '👽';
        else if (char.species === 'Robot') speciesEmoji = '🤖';
        else if (char.species === 'Animal') speciesEmoji = '🐾';
        else if (char.species === 'Disease') speciesEmoji = '🦠';
        else if (char.species === 'Mythological') speciesEmoji = '🧚';

        return `
            <li>
                <img src="${char.image}" alt="${escapeHTML(char.name)}" class="character-avatar">
                <div class="character-info">
                    <span class="character-name">${escapeHTML(char.name)}</span>
                    <div class="character-meta">
                        <span>${statusEmoji} <span class="status-badge ${statusClass}">${escapeHTML(char.status)}</span></span>
                        <span>${speciesEmoji} ${escapeHTML(char.species)}</span>
                        <span>🧬 ${escapeHTML(char.gender)}</span>
                    </div>
                    <div class="character-location">
                        📍 ${escapeHTML(char.location)}
                    </div>
                    <div class="character-episodes">
                        📺 Aparece en ${char.episodeCount} episodio${char.episodeCount !== 1 ? 's' : ''}
                    </div>
                    ${char.type ? `<div class="character-location">🔖 ${escapeHTML(char.type)}</div>` : ''}
                </div>
            </li>
        `;
    }).join('');

    DOM.characterList.innerHTML = charactersHTML;
}

/**
   Actualiza el contador de resultados
   @param {number} count - Número de personajes
   */
function updateResultCount(count) {
    DOM.resultCount.textContent = `${count} personaje${count !== 1 ? 's' : ''}`;
}

/**
   Actualiza el estado de la API en el footer
   @param {boolean} isOnline - Estado de la conexión
   */
function updateApiStatus(isOnline) {
    if (isOnline) {
        DOM.apiStatus.textContent = '✅ API Activa';
        DOM.apiStatus.className = 'status-online';
    } else {
        DOM.apiStatus.textContent = '⚠️ API con problemas';
        DOM.apiStatus.className = 'status-offline';
    }
}

/* ========================================
   MANEJO DE ESTADOS
   ======================================== */

function showLoading() {
    hideAllStates();
    DOM.loadingState.style.display = 'block';
    state.isLoading = true;
    DOM.searchBtn.disabled = true;
    DOM.searchBtn.textContent = '⏳ Cargando...';
}

function hideLoading() {
    DOM.loadingState.style.display = 'none';
    state.isLoading = false;
    DOM.searchBtn.disabled = false;
    DOM.searchBtn.textContent = '🔍 Buscar';
}

function showError(message) {
    hideAllStates();
    DOM.errorState.style.display = 'block';
    DOM.errorMessage.textContent = message;
    updateApiStatus(false);
}

function showEmptyState(message) {
    hideAllStates();
    DOM.emptyState.style.display = 'block';
    DOM.emptyMessage.textContent = message;
    DOM.characterList.innerHTML = `
        <li class="empty-message">
            <span class="icon-large">🔭</span>
            <p>${escapeHTML(message)}</p>
            <small>Prueba con otro nombre del multiverso</small>
        </li>
    `;
    updateResultCount(0);
}

function hideAllStates() {
    DOM.loadingState.style.display = 'none';
    DOM.errorState.style.display = 'none';
    DOM.emptyState.style.display = 'none';
}

function handleApiError(error) {
    let userMessage = 'Error al cargar los personajes';
    
    if (error.message.includes('Failed to fetch')) {
        userMessage = '❌ Error de conexión. Verifica tu internet.';
    } else if (error.message.includes('HTTP')) {
        userMessage = `❌ Error del servidor: ${error.message}`;
    } else if (error.message.includes('NetworkError')) {
        userMessage = '❌ Problema de red. Intenta nuevamente.';
    }
    
    showError(userMessage);
}

/* ========================================
   FUNCIONES UTILITARIAS
   ======================================== */

/**
   Escapa caracteres HTML para prevenir XSS
   */
function escapeHTML(str) {
    if (!str) return '';
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return str.replace(/[&<>"']/g, m => map[m]);
}

/**
   Limpia la interfaz
   */
function clearResults() {
    hideAllStates();
    DOM.characterList.innerHTML = `
        <li class="empty-message">
            <span class="icon-large">👽</span>
            <p>Busca personajes para explorar el multiverso</p>
            <small>Usa el campo de búsqueda de arriba</small>
        </li>
    `;
    updateResultCount(0);
    DOM.searchInput.value = '';
    state.currentSearch = '';
    updateApiStatus(true);
}

/* ========================================
   EVENT LISTENERS
   ======================================== */

// Botón de búsqueda
DOM.searchBtn.addEventListener('click', () => {
    const query = DOM.searchInput.value.trim();
    if (query) {
        searchCharacters(query);
    } else {
        showEmptyState('👀 Por favor, ingresa un nombre de personaje');
    }
});

// Botón de limpiar
DOM.clearBtn.addEventListener('click', clearResults);

// Botón de reintentar
DOM.retryBtn.addEventListener('click', () => {
    if (state.currentSearch) {
        searchCharacters(state.currentSearch);
    } else {
        clearResults();
    }
});

// Buscar con Enter
DOM.searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        DOM.searchBtn.click();
    }
});

// Debounce para búsqueda automática (opcional)
let debounceTimer;
DOM.searchInput.addEventListener('input', (e) => {
    clearTimeout(debounceTimer);
    const query = e.target.value.trim();
    if (query.length >= 3) {
        debounceTimer = setTimeout(() => {
            searchCharacters(query);
        }, 600);
    }
});

/* ========================================
   DETECCIÓN DE CONEXIÓN
   ======================================== */

window.addEventListener('online', () => {
    updateApiStatus(true);
    if (state.currentSearch) {
        searchCharacters(state.currentSearch);
    }
});

window.addEventListener('offline', () => {
    showError('📡 Sin conexión a internet. Verifica tu red.');
});

/* ========================================
   INICIALIZACIÓN
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    console.log('👽 Portal de Rick y Morty iniciado');
    console.log('🔗 Consumiendo API de Rick and Morty');
    console.log('💡 Busca personajes como: "rick", "morty", "summer"');
    
    // Cargar búsqueda inicial
    setTimeout(() => {
        searchCharacters('rick');
    }, 300);
});