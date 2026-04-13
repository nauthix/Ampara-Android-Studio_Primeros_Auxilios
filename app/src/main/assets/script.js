// ============================================
// CONFIGURACIÓN GLOBAL
// ============================================
const CONFIG = {
  audioSections: [
    'rcp', 'heridas-leves', 'heridas-graves',
    'quemaduras-leves', 'quemaduras-graves',
    'fracturas-cerradas', 'fracturas-abiertas', 'envenenamiento',
    'infarto', 'asfixia',
    'desmayo', 'convulsiones', 'glosario', 'sangrado-nasal', 'intoxicacion'
  ],
  sectionMap: ['rcp', 'heridas', 'quemaduras', 'fracturas', 'emergencias', 'botiquin', 'glosario', 'envenenamiento'],
  // Qué botones de audio tiene cada sección de contenido
  sectionAudioMap: {
    'rcp':            ['rcp'],
    'heridas':        ['heridas-leves', 'heridas-graves'],
    'quemaduras':     ['quemaduras-leves', 'quemaduras-graves'],
    'fracturas':      ['fracturas-cerradas', 'fracturas-abiertas'],
    'envenenamiento': ['envenenamiento'],
    'emergencias':    ['infarto', 'asfixia', 'desmayo', 'convulsiones', 'sangrado-nasal', 'intoxicacion'],
    'botiquin':       [],
    'glosario':       ['glosario']
  },
  buttonTexts: {
    'rcp': {
      play: { es: 'Reproducir RCP', qu: 'RCP Waqyachiy', ay: "RPC Ist'ayaña" },
      pause: { es: 'Pausar RCP', qu: 'RCP Sayachiy', ay: "RPC Sayt'ayaña" }
    },
    'heridas-leves': {
      play: { es: 'Reproducir Heridas Leves', qu: 'Heridas Pisiyaq Waqyachiy', ay: "Heridas Jisk'a Ist'ayaña" },
      pause: { es: 'Pausar Heridas Leves', qu: 'Heridas Pisiyaq Sayachiy', ay: "Heridas Jisk'a Sayt'ayaña" }
    },
    'heridas-graves': {
      play: { es: 'Reproducir Heridas Graves', qu: 'Heridas Llakiy Waqyachiy', ay: "Heridas Jach'a Ist'ayaña" },
      pause: { es: 'Pausar Heridas Graves', qu: 'Heridas Llakiy Sayachiy', ay: "Heridas Jach'a Sayt'ayaña" }
    },
    'quemaduras-leves': {
      play: { es: 'Reproducir Quemaduras Leves', qu: 'Ruphasqa Pisiyaq Waqyachiy', ay: "K'añuskaña Jisk'a Ist'ayaña" },
      pause: { es: 'Pausar Quemaduras Leves', qu: 'Ruphasqa Pisiyaq Sayachiy', ay: "K'añuskaña Jisk'a Sayt'ayaña" }
    },
    'quemaduras-graves': {
      play: { es: 'Reproducir Quemaduras Graves', qu: 'Ruphasqa Llakiy Waqyachiy', ay: "K'añuskaña Jach'a Ist'ayaña" },
      pause: { es: 'Pausar Quemaduras Graves', qu: 'Ruphasqa Llakiy Sayachiy', ay: "K'añuskaña Jach'a Sayt'ayaña" }
    },
    'fracturas-cerradas': {
      play: { es: 'Reproducir Fracturas Cerradas', qu: 'Wisq\'asqa T\'aqasqa Waqyachiy', ay: "Ist'ata P'akita Ist'ayaña" },
      pause: { es: 'Pausar Fracturas Cerradas', qu: 'Wisq\'asqa T\'aqasqa Sayachiy', ay: "Ist'ata P'akita Sayt'ayaña" }
    },
    'fracturas-abiertas': {
      play: { es: 'Reproducir Fracturas Abiertas', qu: 'Kichasqa T\'aqasqa Waqyachiy', ay: "Jist'ata P'akita Ist'ayaña" },
      pause: { es: 'Pausar Fracturas Abiertas', qu: 'Kichasqa T\'aqasqa Sayachiy', ay: "Jist'ata P'akita Sayt'ayaña" }
    },
    'infarto': {
      play: { es: 'Reproducir Infarto', qu: 'Sonqo Nanay Waqyachiy', ay: "Chuyma Usuntaña Ist'ayaña" },
      pause: { es: 'Pausar Infarto', qu: 'Sonqo Nanay Sayachiy', ay: "Chuyma Usuntaña Sayt'ayaña" }
    },
    'asfixia': {
      play: { es: 'Reproducir Asfixia', qu: "Samay Hark'ay Waqyachiy", ay: "Samsuña Ist'ayaña" },
      pause: { es: 'Pausar Asfixia', qu: "Samay Hark'ay Sayachiy", ay: "Samsuña Sayt'ayaña" }
    },
    'desmayo': {
      play: { es: 'Reproducir Desmayo', qu: 'Urmay Waqyachiy', ay: "Jayp'uña Ist'ayaña" },
      pause: { es: 'Pausar Desmayo', qu: 'Urmay Sayachiy', ay: "Jayp'uña Sayt'ayaña" }
    },
    'envenenamiento': {
      play: { es: 'Reproducir Envenenamiento', qu: 'Hampikusqa Unquyta Waqyachiy', ay: "Qollasir Usuña Ist'ayaña" },
      pause: { es: 'Pausar Envenenamiento', qu: 'Hampikusqa Unquyta Sayachiy', ay: "Qollasir Usuña Sayt'ayaña" }
    },
    'convulsiones': {
      play: { es: 'Reproducir Convulsiones', qu: 'Khatatay Waqyachiy', ay: "K'añutaña Ist'ayaña" },
      pause: { es: 'Pausar Convulsiones', qu: 'Khatatay Sayachiy', ay: "K'añutaña Sayt'ayaña" }
    },
    'intoxicacion': {
      play: { es: 'Reproducir Intoxicaciones', qu: 'Maqanakuypa yanapayta waqyachiy', ay: "Maqt'asiwir yanapawi ist'ayaña" },
      pause: { es: 'Pausar Intoxicaciones', qu: 'Maqanakuypa sayachiy', ay: "Maqt'asiwir sayt'ayaña" }
    },
    'glosario': {
      play: { es: 'Reproducir Glosario', qu: 'Qillqata Waqyachiy', ay: "Qillqawi Ist'ayaña" },
      pause: { es: 'Pausar Glosario', qu: 'Qillqata Sayachiy', ay: "Qillqawi sayt'ayaña" }
    },
    'sangrado-nasal': {
      play: { es: 'Reproducir Sangrado Nasal', qu: 'Sinqa Yawar Lluqsiyta Waqyachiy', ay: "Sinqa Wila Mistuñaru Ist'ayaña" },
      pause: { es: 'Pausar Sangrado Nasal', qu: 'Sinqa Yawar Lluqsiyta Sayachiy', ay: "Sinqa Wila Mistuñaru Sayt'ayaña" }
    }
  }
};

// ============================================
// GESTOR DE SCROLL INDEPENDIENTE
// ============================================
class ScrollManager {
  constructor() {
    this.mainScreen = null;
    this.sectionsList = null;
    this.sectionContent = null;
    this.menuScrollPosition = 0;
  }

  // Inicializar referencias a contenedores
  init() {
    this.mainScreen = dom.get('main-screen');
    this.sectionsList = dom.get('sections-list');
    this.sectionContent = dom.get('section-content');

    // Hacer que el body no tenga scroll
    this.disableBodyScroll();

    // Scroll-to-top: mostrar botón al bajar más de 250px
    const scrollTopBtn = dom.get('scroll-top-btn');
    if (this.mainScreen && scrollTopBtn) {
      this.mainScreen.addEventListener('scroll', () => {
        scrollTopBtn.classList.toggle('visible', this.mainScreen.scrollTop > 250);
      }, { passive: true });

      scrollTopBtn.addEventListener('click', () => this.scrollToTop());
    }
  }

  // Deshabilitar scroll del body
  disableBodyScroll() {
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100vh';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.documentElement.style.overflow = 'hidden';
  }

  // Habilitar scrolling en el contenedor principal
  enableMainScreenScroll() {
    if (this.mainScreen) {
      this.mainScreen.style.overflow = 'auto';
      this.mainScreen.style.height = '100vh';
      this.mainScreen.style.overflowX = 'hidden';
      this.mainScreen.style.WebkitOverflowScrolling = 'touch';
    }
  }

  // Guardar posición del scroll del menú
  saveMenuScroll() {
    if (this.mainScreen) {
      this.menuScrollPosition = this.mainScreen.scrollTop;
    }
  }

  // Restaurar posición del scroll del menú
  restoreMenuScroll() {
    if (this.mainScreen && this.menuScrollPosition >= 0) {
      this.mainScreen.scrollTop = this.menuScrollPosition;
    }
  }

  // Resetear scroll del contenedor principal a cero
  resetMainScroll() {
    if (this.mainScreen) {
      this.mainScreen.scrollTop = 0;
    }
    window.scrollTo(0, 0);
  }

  // Scroll a top suave en el contenedor principal
  scrollToTop() {
    if (this.mainScreen) {
      this.mainScreen.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
    window.scrollTo(0, 0);
  }
}

const scrollManager = new ScrollManager();

// ============================================
// GESTOR DE AUDIO CON PROGRESO
// ============================================
class AudioManager {
  constructor() {
    this.audioMap = new Map();
    this.currentPlaying = null;
    this.progressIntervals = new Map();
    this.playHistory = []; // Historial de reproducción
    this.audioStates = new Map(); // Estados de cada audio
  }

  getAudio(section, lang) {
    const key = `${section}_${lang}`;
    if (!this.audioMap.has(key)) {
      const audio = new Audio(`audio/${section}_${lang}.mp3`); // Corregido: paréntesis en lugar de backticks
      audio.volume = 1.0;
      audio.addEventListener('ended', () => this.onEnded(section));
      audio.addEventListener('loadedmetadata', () => this.updateDuration(section));
      this.audioMap.set(key, audio);
      
      // Inicializar estado del audio
      this.audioStates.set(key, {
        lastPosition: 0,
        playCount: 0,
        totalPlayTime: 0,
        lastPlayDate: null
      });
    }
    return this.audioMap.get(key);
  }

  play(section, lang) {
    // Avisar si el volumen del sistema está en 0
    if (typeof AndroidAudio !== 'undefined' && typeof AndroidAudio.getSystemVolume === 'function') {
      const vol = AndroidAudio.getSystemVolume();
      const current = parseInt(vol.split('/')[0], 10);
      if (current === 0) {
        showToast('🔇 Volumen en 0 — sube el volumen para escuchar', 4000);
      }
    }

    // Solo detener otros audios, no el actual
    const currentKey = `${section}_${lang}`;
    this.audioMap.forEach((audio, key) => {
      if (key !== currentKey && !audio.paused) {
        const [otherSection] = key.split('_');
        this.pause(otherSection, lang);
      }
    });

    const audio = this.getAudio(section, lang);
    const state = this.audioStates.get(currentKey);

    // Restaurar posición si existe
    if (state && state.lastPosition > 0 && audio.currentTime === 0) {
      audio.currentTime = state.lastPosition;
    }

    return audio.play()
      .then(() => {
        this.currentPlaying = section;
        this.startProgressTracking(section);
        
        // Agregar al historial si es la primera vez o si había terminado
        if (!state.lastPlayDate || audio.currentTime < 1) {
          this.addToHistory(section, lang);
        }
        
        // Actualizar contador de reproducciones
        state.playCount++;
        state.lastPlayDate = new Date();
        
        return true;
      })
      .catch(err => {
        console.error('Error reproduciendo audio:', err);
        return false;
      });
  }

  pause(section, lang) {
    const audio = this.getAudio(section, lang);
    const key = `${section}_${lang}`;
    const state = this.audioStates.get(key);
    
    // Guardar posición actual antes de pausar
    if (state) {
      state.lastPosition = audio.currentTime;
      state.totalPlayTime += audio.currentTime;
      this.saveHistory(); // Guardar estado
    }
    
    audio.pause();
    this.stopProgressTracking(section);
    this.currentPlaying = null;
  }

  stopAll() {
    const lang = getCurrentLanguage();
    
    this.audioMap.forEach((audio, key) => {
      const [section] = key.split('_');
      const state = this.audioStates.get(key);
      
      // Guardar posición antes de detener
      if (state && !audio.paused) {
        state.lastPosition = audio.currentTime;
      }
      
      audio.pause();
      // NO reiniciar currentTime para mantener la posición
    });
    
    this.progressIntervals.forEach((interval) => {
      clearInterval(interval);
    });
    this.progressIntervals.clear();
    this.currentPlaying = null;
    
    this.saveHistory(); // Guardar estado al detener
  }

  // Método para reiniciar un audio específico
  resetAudio(section, lang) {
    const audio = this.getAudio(section, lang);
    const key = `${section}_${lang}`;
    const state = this.audioStates.get(key);
    
    audio.currentTime = 0;
    if (state) {
      state.lastPosition = 0;
      this.saveHistory();
    }
    this.updateProgress(section, 0);
  }

  isPlaying(section) {
    return this.currentPlaying === section;
  }

  onEnded(section) {
    const lang = getCurrentLanguage();
    const key = `${section}_${lang}`;
    const state = this.audioStates.get(key);
    
    this.currentPlaying = null;
    this.stopProgressTracking(section);
    updateButtonText(section, 'play');
    this.updateProgress(section, 100);
    
    // Marcar como completado en el historial
    if (state) {
      state.lastPosition = 0; // Reiniciar para la próxima vez
      this.updateHistoryCompletion(section, lang);
    }
  }

  // Agregar al historial
  addToHistory(section, lang) {
    const entry = {
      section,
      lang,
      timestamp: new Date().toISOString(),
      completed: false
    };
    
    this.playHistory.unshift(entry);
    
    // Mantener solo los últimos 50 registros
    if (this.playHistory.length > 50) {
      this.playHistory.pop();
    }
    
    this.saveHistory();
  }

  // Marcar como completado en el historial
  updateHistoryCompletion(section, lang) {
    const entry = this.playHistory.find(
      e => e.section === section && e.lang === lang && !e.completed
    );
    
    if (entry) {
      entry.completed = true;
      entry.completedAt = new Date().toISOString();
      this.saveHistory();
    }
  }

  // Obtener historial
  getHistory(limit = 10) {
    return this.playHistory.slice(0, limit);
  }

  // Guardar historial en localStorage
  saveHistory() {
    try {
      localStorage.setItem('ampara-audio-history', JSON.stringify(this.playHistory));
      const states = {};
      this.audioStates.forEach((value, key) => {
        states[key] = {
          ...value,
          lastPlayDate: value.lastPlayDate ? value.lastPlayDate.toISOString() : null
        };
      });
      localStorage.setItem('ampara-audio-states', JSON.stringify(states));
    } catch(e) {
      console.error('Error guardando historial:', e);
    }
  }

  // Cargar historial desde localStorage
  loadHistory() {
    try {
      const historyData = localStorage.getItem('ampara-audio-history');
      if (historyData) {
        this.playHistory = JSON.parse(historyData);
      }
      
      const statesData = localStorage.getItem('ampara-audio-states');
      if (statesData) {
        const states = JSON.parse(statesData);
        Object.entries(states).forEach(([key, value]) => {
          this.audioStates.set(key, {
            ...value,
            lastPlayDate: value.lastPlayDate ? new Date(value.lastPlayDate) : null
          });
        });
      }
    } catch(e) {
      console.error('Error cargando historial:', e);
    }
  }

  // Limpiar historial
  clearHistory() {
    this.playHistory = [];
    this.audioStates.clear();
    try {
      localStorage.removeItem('ampara-audio-history');
      localStorage.removeItem('ampara-audio-states');
    } catch(e) {
      console.error('Error limpiando historial:', e);
    }
  }

  // Obtener estadísticas de un audio
  getAudioStats(section, lang) {
    const key = `${section}_${lang}`;
    return this.audioStates.get(key) || {
      lastPosition: 0,
      playCount: 0,
      totalPlayTime: 0,
      lastPlayDate: null
    };
  }

  updateDuration(section) {
    const lang = getCurrentLanguage();
    const audio = this.getAudio(section, lang);
    const durationEl = document.getElementById(`duration-${section}`); // Corregido: paréntesis
    
    if (durationEl && !isNaN(audio.duration)) {
      durationEl.textContent = this.formatTime(audio.duration);
    }
  }

  startProgressTracking(section) {
    this.stopProgressTracking(section);
    
    const lang = getCurrentLanguage();
    const audio = this.getAudio(section, lang);
    
    const interval = setInterval(() => {
      if (!audio.paused) {
        const progress = (audio.currentTime / audio.duration) * 100;
        this.updateProgress(section, progress, audio.currentTime);
      }
    }, 100);
    
    this.progressIntervals.set(section, interval);
  }

  stopProgressTracking(section) {
    if (this.progressIntervals.has(section)) {
      clearInterval(this.progressIntervals.get(section));
      this.progressIntervals.delete(section);
    }
  }

  updateProgress(section, percentage, currentTime = 0) {
    const progressBar = document.getElementById(`progress-${section}`); // Corregido: paréntesis
    const currentTimeEl = document.getElementById(`current-time-${section}`); // Corregido: paréntesis
    
    if (progressBar) {
      progressBar.style.width = `${percentage}%`;
    }
    
    if (currentTimeEl) {
      currentTimeEl.textContent = this.formatTime(currentTime);
    }
  }

  seekTo(section, percentage) {
    const lang = getCurrentLanguage();
    const audio = this.getAudio(section, lang);
    const key = `${section}_${lang}`;
    const state = this.audioStates.get(key);
    
    if (!isNaN(audio.duration)) {
      const newTime = (percentage / 100) * audio.duration;
      audio.currentTime = newTime;
      
      // Actualizar estado
      if (state) {
        state.lastPosition = newTime;
        this.saveHistory();
      }
      
      this.updateProgress(section, percentage, newTime);
    }
  }

  formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }
}

const audioManager = new AudioManager();

// ============================================
// GESTIÓN DE DOM
// ============================================
const dom = {
  get(id) { return document.getElementById(id); },
  getAll(selector) { return document.querySelectorAll(selector); }
};

// ============================================
// CARGADOR LAZY DE SECCIONES HTML
// ============================================
const sectionLoader = {
  loaded: new Set(),

  /**
   * Carga una sección desde assets/sections/<id>.html usando el puente Android.
   * Inyecta el HTML en #section-content y configura sus botones de audio.
   * Retorna true si tuvo éxito (o ya estaba cargada), false si falló.
   */
  load(sectionId) {
    if (this.loaded.has(sectionId)) return true;

    if (typeof AndroidAudio === 'undefined' || typeof AndroidAudio.readAsset !== 'function') {
      showToast('Error: interfaz nativa no disponible');
      return false;
    }

    const html = AndroidAudio.readAsset(`sections/${sectionId}.html`);
    if (!html || html.length === 0) {
      showToast('No se pudo cargar la sección');
      return false;
    }

    const container = dom.get('section-content');
    container.insertAdjacentHTML('beforeend', html);

    // Animación de entrada en la primera carga
    const newEl = dom.get(`${sectionId}-content`);
    if (newEl) {
      newEl.classList.add('section-new');
      newEl.addEventListener('animationend', () => newEl.classList.remove('section-new'), { once: true });
    }

    // Configurar botones de audio de esta sección
    const audioSections = CONFIG.sectionAudioMap[sectionId] || [];
    audioSections.forEach(s => setupAudioButton(s));

    // Inicializar pestañas que haya en esta sección
    initializeTabs();

    this.loaded.add(sectionId);
    return true;
  }
};

// ============================================
// IDIOMA Y TEMA
// ============================================
function getCurrentLanguage() {
  return document.body.getAttribute('data-lang') || 'es';
}

function setLanguage(lang) {
  audioManager.stopAll();
  document.body.setAttribute('data-lang', lang);

  try { localStorage.setItem('ampara-lang', lang); } catch(e) {}

  dom.getAll('.language-selector-home, .language-selector').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-lang') === lang);
  });

  CONFIG.audioSections.forEach(section => updateButtonText(section, 'play'));
}

function setDarkMode(isDark) {
  document.body.classList.toggle('dark-mode', isDark);
  const toggle = dom.get('dark-mode-toggle');
  if (toggle) {
    toggle.querySelector('.emoji-icon').textContent = isDark ? '☀️' : '🌙';
  }
  try { localStorage.setItem('ampara-dark-mode', isDark); } catch(e) {}
}

// ============================================
// NAVEGACIÓN CON SCROLL INDEPENDIENTE
// ============================================
const navigation = {
  toMain() {
    dom.get('home-screen').classList.add('hidden');
    dom.get('main-screen').classList.remove('hidden');
    
    // Habilitar scroll en main-screen
    scrollManager.enableMainScreenScroll();
    scrollManager.resetMainScroll();
  },

  toSectionsList() {
    audioManager.stopAll();
    
    // Ocultar contenido de sección
    dom.get('section-content').classList.add('hidden');
    dom.get('back-btn').classList.add('hidden');
    
    CONFIG.sectionMap.forEach(id => {
      const el = dom.get(`${id}-content`);
      if (el) el.classList.add('hidden');
    });

    // Mostrar lista de secciones
    dom.get('sections-list').classList.remove('hidden');
    
    // Restaurar posición del scroll del menú
    requestAnimationFrame(() => {
      scrollManager.restoreMenuScroll();
    });
  },

  toSection(sectionId) {
    scrollManager.saveMenuScroll();

    // Cargar la sección si aún no está en el DOM
    if (!dom.get(`${sectionId}-content`)) {
      const ok = sectionLoader.load(sectionId);
      if (!ok) return; // showToast ya fue llamado dentro de load()
    }

    // Mostrar solo la sección solicitada
    CONFIG.sectionMap.forEach(id => {
      const el = dom.get(`${id}-content`);
      if (el) el.classList.toggle('hidden', id !== sectionId);
    });

    dom.get('sections-list').classList.add('hidden');
    dom.get('section-content').classList.remove('hidden');
    dom.get('back-btn').classList.remove('hidden');

    scrollManager.resetMainScroll();
  }
};

// ============================================
// PESTAÑAS
// ============================================
function initializeTabs() {
  dom.getAll('.tab-container').forEach(container => {
    const tabs = container.querySelectorAll('.tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = `${tab.getAttribute('data-tab')}-tab`;
        const section = container.closest('.section-card');

        if (!section) return;

        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        section.querySelectorAll('.tab-content').forEach(c => c.classList.add('hidden'));

        const target = dom.get(targetId);
        if (target) {
          target.classList.remove('hidden');
        }
      });
    });
  });
}

// ============================================
// BOTONES DE AUDIO
// ============================================
function updateButtonText(section, state) {
  const button = dom.get(`play-${section}-btn`);
  if (!button || !CONFIG.buttonTexts[section]) return;

  const lang = getCurrentLanguage();
  const icon = state === 'play' ? '▶️' : '⏸️';
  const text = CONFIG.buttonTexts[section][state][lang];

  button.innerHTML = `<span class="emoji-icon mr-2">${icon}</span><span class="lang-${lang}">${text}</span>`;
}

function setupAudioButton(section) {
  const button = dom.get(`play-${section}-btn`);
  if (!button) {
    console.warn(`Botón no encontrado: play-${section}-btn`);
    return;
  }

  button.addEventListener('click', async () => {
    const lang = getCurrentLanguage();
    const isPlaying = audioManager.isPlaying(section);

    if (isPlaying) {
      audioManager.pause(section, lang);
      updateButtonText(section, 'play');
    } else {
      const success = await audioManager.play(section, lang);
      if (success) {
        updateButtonText(section, 'pause');
      }
    }
  });

  // Configurar barra de progreso clickeable
  const progressContainer = dom.get(`progress-container-${section}`);
  if (progressContainer) {
    progressContainer.addEventListener('click', (e) => {
      const rect = progressContainer.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = (clickX / rect.width) * 100;
      audioManager.seekTo(section, percentage);
    });
  }
}

// ============================================
// EMERGENCIAS
// ============================================
function toggleEmergencyDropdown() {
  dom.get('emergency-dropdown').classList.toggle('hidden');
}

window.toggleEmergencyDropdown = toggleEmergencyDropdown;

// ============================================
// INICIALIZACIÓN
// ============================================
function initializeApp() {
  let savedLang = 'es';
  let savedDarkMode = false;
  
  try {
    savedLang = localStorage.getItem('ampara-lang') || 'es';
    savedDarkMode = localStorage.getItem('ampara-dark-mode') === 'true';
  } catch(e) {
    console.error('Error cargando preferencias:', e);
  }
  
  setLanguage(savedLang);
  setDarkMode(savedDarkMode);
  
  // Inicializar gestor de scroll
  scrollManager.init();
  
  // Cargar historial de audio al iniciar
  audioManager.loadHistory();
  
  // Inicializar modal de contacto
  initializeContactModal();
  
  // Botón de inicio
  dom.get('start-btn')?.addEventListener('click', navigation.toMain);
  
  // Botón de retroceso
  dom.get('back-btn')?.addEventListener('click', navigation.toSectionsList);
  
  // Toggle de modo oscuro
  dom.get('dark-mode-toggle')?.addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark-mode');
    setDarkMode(!isDark);
  });
  
  // Selectores de idioma
  dom.getAll('.language-selector-home, .language-selector').forEach(btn => {
    btn.addEventListener('click', () => {
      setLanguage(btn.getAttribute('data-lang'));
    });
  });
  
  // Botones de tarjetas de navegación
  dom.getAll('.card-button').forEach(btn => {
    btn.addEventListener('click', () => {
      navigation.toSection(btn.getAttribute('data-section'));
    });
  });
  
  // Cerrar dropdown de emergencias al hacer clic fuera
  document.addEventListener('click', (e) => {
    const dropdown = dom.get('emergency-dropdown');
    const btn = dom.get('emergency-dropdown-btn');
    
    if (dropdown && btn && !btn.contains(e.target) && !dropdown.classList.contains('hidden')) {
      dropdown.classList.add('hidden');
    }
  });
  
  // Las pestañas y botones de audio se inicializan al cargar cada sección (lazy loading)
  
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
// ========================================
// MODAL DE CONTACTO E INFORMACIÓN
// ========================================

function initializeContactModal() {
  const contactBtn = document.getElementById('contact-btn');
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('close-modal');

  // Abrir modal
  if (contactBtn && modal) {
    contactBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Cerrar modal con botón X
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    });
  }

  // Cerrar modal al hacer clic fuera
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
}

// ============================================
// TOAST DE NOTIFICACIÓN (usado por AndroidAudio para errores)
// ============================================
function showToast(message, duration = 3000) {
  const existing = document.getElementById('ampara-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'ampara-toast';
  toast.textContent = message;
  toast.style.cssText = [
    'position:fixed',
    'bottom:24px',
    'left:50%',
    'transform:translateX(-50%)',
    'background:rgba(30,30,30,0.9)',
    'color:#fff',
    'padding:12px 20px',
    'border-radius:24px',
    'z-index:99999',
    'font-size:14px',
    'max-width:80%',
    'text-align:center',
    'pointer-events:none',
    'box-shadow:0 4px 12px rgba(0,0,0,0.3)'
  ].join(';');

  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), duration);
}

window.showToast = showToast;