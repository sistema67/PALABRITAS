/* Palabritas - juego educativo infantil */
const $ = (id) => document.getElementById(id);
const STORAGE_KEY = "palabritas_v1";
const alphabet = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const vowels = ["A","E","I","O","U"];

const simpleSyllables = ["ba","be","bi","bo","bu","ca","ce","ci","co","cu","cha","che","chi","cho","chu","da","de","di","do","du","fa","fe","fi","fo","fu","ga","ge","gi","go","gu","ja","je","ji","jo","ju","ka","ke","ki","ko","ku","la","le","li","lo","lu","lla","lle","lli","llo","llu","ma","me","mi","mo","mu","na","ne","ni","no","nu","ña","ñe","ñi","ño","ñu","pa","pe","pi","po","pu","que","qui","ra","re","ri","ro","ru","rra","rre","rri","rro","rru","sa","se","si","so","su","ta","te","ti","to","tu","va","ve","vi","vo","vu","wa","we","wi","wo","wu","xa","xe","xi","xo","xu","ya","ye","yi","yo","yu","za","ze","zi","zo","zu"];

const directSyllables = ["bla","ble","bli","blo","blu","bra","bre","bri","bro","bru","cla","cle","cli","clo","clu","cra","cre","cri","cro","cru","dra","dre","dri","dro","dru","fla","fle","fli","flo","flu","fra","fre","fri","fro","fru","gla","gle","gli","glo","glu","gra","gre","gri","gro","gru","pla","ple","pli","plo","plu","pra","pre","pri","pro","pru","tra","tre","tri","tro","tru"];

const otherSyllables = ["al","el","il","ol","ul","an","en","in","on","un","ar","er","ir","or","ur","as","es","is","os","us","am","em","im","om","um","ai","au","ei","eu","ia","ie","io","iu","oi","ou","ua","ue","ui","uo"];

const icons = {
  gato:"🐱", perro:"🐶", sol:"☀️", luna:"🌙", casa:"🏠",
  flor:"🌸", mesa:"🪑", pato:"🦆", pez:"🐠", uva:"🍇",
  oso:"🐻", mano:"✋", pala:"🪏", nube:"☁️", rana:"🐸",
  libro:"📚", niño:"🧒", niña:"👧", mariposa:"🦋",
  pelota:"⚽", escuela:"🏫", familia:"👨‍👩‍👧",
  conejo:"🐰", estrella:"⭐", jirafa:"🦒", barco:"⛵",
  manzana:"🍎", arbol:"🌳"
};

const easyTasks = [
  ...alphabet.map((letter,i)=>({
    type:"key",
    prompt:letter,
    answer:letter,
    icon:["🍎","🐸","⭐","🦋","🚀"][i%5],
    instruction:"Encuentra la letra",
    hint:"Presiona la letra indicada en tu teclado."
  })),
  ...["MA","PA","LA","SA","ME","PI","TO","LU","CA","RO","BRA","PLA","TRE","GLO","FLO","CHI","QUE","ÑU","LLA","GRA"].map((s,i)=>({
    type:"key",
    prompt:s.toUpperCase(),
    answer:s.toUpperCase(),
    icon:["🐼","🌻","🦊","🐝"][i%4],
    instruction:"¡Busca la sílaba!",
    hint:"Presiona en tu teclado las letras de la sílaba, en orden."
  }))
];

const mediumTasks = [
  {type:"write",word:"gato",icon:"🐱",instruction:"Escribe el nombre del dibujo",hint:"Escucha la palabra y escríbela correctamente."},
  {type:"read",text:"El sol brilla.",icon:"☀️",instruction:"Lee la oración en voz alta",hint:"Después de leerla, pulsa “¡Ya lo leí!”."},
  {type:"write",word:"mariposa",icon:"🦋",instruction:"Escribe el nombre del dibujo",hint:"¡Despacio y con atención!"},
  {type:"read",text:"Mi casa es bonita.",icon:"🏠",instruction:"Lee la oración en voz alta",hint:"Observa cada palabra y léela completa."},
  {type:"write",word:"pelota",icon:"⚽",instruction:"Escribe el nombre del dibujo",hint:"¿Cómo se llama este objeto?"},
  {type:"read",text:"El pato nada en el agua.",icon:"🦆",instruction:"Lee la oración en voz alta",hint:"Sigue la oración de izquierda a derecha."},
  {type:"write",word:"estrella",icon:"⭐",instruction:"Escribe el nombre del dibujo",hint:"Recuerda escuchar el sonido de cada letra."},
  {type:"read",text:"La niña juega con su perro.",icon:"🐶",instruction:"Lee la oración en voz alta",hint:"¡Tú puedes leerla!"},
  {type:"write",word:"manzana",icon:"🍎",instruction:"Escribe el nombre del dibujo",hint:"Escribe el nombre de la fruta."},
  {type:"read",text:"Mi familia cuida las plantas.",icon:"🌱",instruction:"Lee la oración en voz alta",hint:"Lee con calma y buena voz."},
  {type:"write",word:"conejo",icon:"🐰",instruction:"Escribe el nombre del dibujo",hint:"¿Qué animalito aparece?"},
  {type:"read",text:"La mariposa vuela sobre la flor.",icon:"🌸",instruction:"Lee la oración en voz alta",hint:"¡Cada palabra es un pequeño paso!"}
];

const hardTasks = [
  {type:"write",word:"mariposa",icon:"🦋",instruction:"Escribe el nombre del dibujo",hint:"Tienes 10 minutos para completar esta aventura."},
  {type:"read",text:"La pequeña mariposa vuela entre las flores del jardín.",icon:"🌺",instruction:"Lee esta oración en voz alta",hint:"Lee despacio, respeta los espacios y las pausas."},
  {type:"write",word:"biblioteca",icon:"📚",instruction:"Escribe el nombre del dibujo",hint:"¡Observa y escribe todas las letras!"},
  {type:"read",text:"Mi familia visita la biblioteca para elegir cuentos divertidos.",icon:"👨‍👩‍👧",instruction:"Lee esta oración en voz alta",hint:"Pronuncia cada palabra con claridad."},
  {type:"write",word:"helicóptero",icon:"🚁",instruction:"Escribe el nombre del dibujo",hint:"Recuerda colocar la tilde."},
  {type:"read",text:"El conejo blanco salta alegremente por el campo verde.",icon:"🐰",instruction:"Lee esta oración en voz alta",hint:"Haz una pequeña pausa al terminar."},
  {type:"write",word:"maravilloso",icon:"✨",instruction:"Escribe la palabra que escuchas",hint:"Escucha con atención y escribe."},
  {type:"read",text:"Cada mañana, los niños llegan contentos a la escuela para aprender algo nuevo.",icon:"🏫",instruction:"Lee esta oración en voz alta",hint:"¡Ya eres un gran lector!"},
  {type:"write",word:"computadora",icon:"💻",instruction:"Escribe el nombre del dibujo",hint:"Escribe la palabra completa."},
  {type:"read",text:"Después de ordenar sus juguetes, Mateo ayuda a su hermana a preparar la mochila.",icon:"🎒",instruction:"Lee esta oración en voz alta",hint:"Lee sin apurarte y disfruta la historia."},
  {type:"write",word:"naturaleza",icon:"🌳",instruction:"Escribe la palabra que escuchas",hint:"Piensa en las letras que forman la palabra."},
  {type:"read",text:"Cuidar el agua, los animales y las plantas ayuda a mantener nuestro planeta saludable.",icon:"🌎",instruction:"Lee esta oración en voz alta",hint:"¡Un último gran esfuerzo!"}
];

mediumTasks.push(
  {type:"write",word:"jirafa",icon:"🦒",instruction:"Escribe el nombre del animal",hint:"Mira bien el dibujo y escribe su nombre."},
  {type:"read",text:"La jirafa tiene un cuello muy largo.",icon:"🦒",instruction:"Lee la oración en voz alta",hint:"¡Lee con voz clara!"},
  {type:"write",word:"mar",icon:"🌊",instruction:"Escribe lo que aparece en el dibujo",hint:"Es una palabra cortita."},
  {type:"read",text:"Las olas llegan hasta la arena.",icon:"🏖️",instruction:"Lee la oración en voz alta",hint:"Sigue las palabras con tus ojos."},
  {type:"write",word:"queso",icon:"🧀",instruction:"Escribe el nombre del alimento",hint:"Escucha y escribe cada letra."},
  {type:"read",text:"El ratón pequeño come queso.",icon:"🐭",instruction:"Lee la oración en voz alta",hint:"¡Muy bien, sigue así!"},
  {type:"write",word:"bicicleta",icon:"🚲",instruction:"Escribe el nombre del objeto",hint:"¿Con qué puedes pasear?"},
  {type:"read",text:"Ana pasea en bicicleta con su papá.",icon:"🚲",instruction:"Lee la oración en voz alta",hint:"Pronuncia cada palabra con calma."},
  {type:"write",word:"zapato",icon:"👟",instruction:"Escribe el nombre del objeto",hint:"Escribe lo que usamos en los pies."},
  {type:"read",text:"Mis zapatos nuevos son de color azul.",icon:"👟",instruction:"Lee la oración en voz alta",hint:"¡Ya estás leyendo frases!"},
  {type:"write",word:"tortuga",icon:"🐢",instruction:"Escribe el nombre del animal",hint:"Piensa en sus letras."},
  {type:"read",text:"La tortuga camina muy despacio.",icon:"🐢",instruction:"Lee la oración en voz alta",hint:"Lee sin correr."},
  {type:"write",word:"campana",icon:"🔔",instruction:"Escribe el nombre del objeto",hint:"Escucha la palabra con atención."},
  {type:"read",text:"La campana suena al comenzar la clase.",icon:"🔔",instruction:"Lee la oración en voz alta",hint:"¡Un reto más superado!"},
  {type:"write",word:"sandía",icon:"🍉",instruction:"Escribe el nombre de la fruta",hint:"Recuerda la tilde."},
  {type:"read",text:"La sandía roja está muy dulce.",icon:"🍉",instruction:"Lee la oración en voz alta",hint:"Lee todas las palabras."},
  {type:"write",word:"ventana",icon:"🪟",instruction:"Escribe el nombre del objeto",hint:"¿Por dónde entra la luz?"},
  {type:"read",text:"Abro la ventana para mirar el cielo.",icon:"🪟",instruction:"Lee la oración en voz alta",hint:"¡Tú puedes hacerlo!"},
  {type:"write",word:"estrella",icon:"⭐",instruction:"Escribe el nombre del dibujo",hint:"Recuerda cada letra."},
  {type:"read",text:"Por la noche veo estrellas brillantes.",icon:"🌟",instruction:"Lee la oración en voz alta",hint:"Lee con una sonrisa."}
);

hardTasks.push(
  {type:"write",word:"murciélago",icon:"🦇",instruction:"Escribe el nombre del animal",hint:"Recuerda colocar la tilde."},
  {type:"read",text:"Al caer la tarde, los murciélagos salen de sus refugios para buscar alimento.",icon:"🦇",instruction:"Lee la oración en voz alta",hint:"Haz pausas donde encuentres comas."},
  {type:"write",word:"maravillosa",icon:"🌈",instruction:"Escribe la palabra que escuchas",hint:"Escucha cada sílaba."},
  {type:"read",text:"La profesora contó una historia maravillosa sobre una pequeña estrella viajera.",icon:"📖",instruction:"Lee la oración en voz alta",hint:"Lee con ritmo y claridad."},
  {type:"write",word:"ferrocarril",icon:"🚂",instruction:"Escribe la palabra que escuchas",hint:"Presta atención a las letras repetidas."},
  {type:"read",text:"El tren recorre largos caminos y conecta pueblos con grandes ciudades.",icon:"🚆",instruction:"Lee la oración en voz alta",hint:"No olvides hacer una pausa al final."},
  {type:"write",word:"marinero",icon:"⚓",instruction:"Escribe el nombre de la profesión",hint:"Piensa quién trabaja en un barco."},
  {type:"read",text:"El marinero observa el horizonte mientras el barco navega por el océano.",icon:"⛵",instruction:"Lee la oración en voz alta",hint:"Pronuncia claramente las palabras largas."},
  {type:"write",word:"biblioteca",icon:"📚",instruction:"Escribe el nombre del lugar",hint:"Es un lugar lleno de libros."},
  {type:"read",text:"En la biblioteca encontramos cuentos, poemas y libros para descubrir nuevos mundos.",icon:"📚",instruction:"Lee la oración en voz alta",hint:"¡Lee con atención hasta el punto!"},
  {type:"write",word:"mariposas",icon:"🦋",instruction:"Escribe el nombre en plural",hint:"¿Qué cambia cuando hay más de una?"},
  {type:"read",text:"Durante la primavera, muchas mariposas de colores visitan las flores del parque.",icon:"🌷",instruction:"Lee la oración en voz alta",hint:"Respeta las pausas y disfruta la lectura."},
  {type:"write",word:"computadora",icon:"💻",instruction:"Escribe el nombre del equipo",hint:"Escribe la palabra completa."},
  {type:"read",text:"La computadora permite aprender, crear dibujos y buscar información con ayuda de un adulto.",icon:"💻",instruction:"Lee la oración en voz alta",hint:"¡Estás cerca de terminar!"},
  {type:"write",word:"aventura",icon:"🧭",instruction:"Escribe la palabra que escuchas",hint:"Cada letra cuenta."},
  {type:"read",text:"Los exploradores prepararon sus mochilas antes de comenzar una emocionante aventura por el bosque.",icon:"🧭",instruction:"Lee la oración en voz alta",hint:"Lee con seguridad y buena entonación."},
  {type:"write",word:"responsable",icon:"🌱",instruction:"Escribe la palabra que escuchas",hint:"Escucha y piensa antes de escribir."},
  {type:"read",text:"Ser responsable significa cumplir nuestras tareas y cuidar los materiales que compartimos con los demás.",icon:"🤝",instruction:"Lee la oración en voz alta",hint:"¡Último esfuerzo, campeón!"},
  {type:"write",word:"maravilloso",icon:"✨",instruction:"Escribe la palabra que escuchas",hint:"¡Tú puedes escribirla!"},
  {type:"read",text:"Cada libro que leemos nos enseña algo nuevo y nos invita a imaginar lugares extraordinarios.",icon:"📘",instruction:"Lee la oración en voz alta",hint:"Disfruta la lectura hasta el final."}
);

let db = loadDB();
let currentUser = null;
let difficulty = "easy";
let tasks = [];
let taskIndex = 0;
let scoreAtStart = 0;
let timerInterval = null;
let secondsLeft = 600;
let typedKeys = "";
let soundOn = true;
let musicOn = false;
let musicInterval = null;
let speechAvailable = "speechSynthesis" in window;

function loadDB() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (data && data.users) return data;
  } catch(e) {}
  return { users: {} };
}

function saveDB() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch(e) {
    console.error("No se pudo guardar en localStorage", e);
  }
}

function newUser(name) {
  const id = "u_" + Date.now() + "_" + Math.random().toString(36).slice(2,6);

  db.users[id] = {
    id,
    name,
    score:0,
    completed:0,
    progress:{easy:0,medium:0,hard:0},
    best:{easy:0,medium:0,hard:0}
  };

  saveDB();
  return id;
}

function showScreen(id) {
  ["welcomeScreen","loadingScreen","gameScreen","finishScreen"].forEach(x => {
    $(x).classList.toggle("hidden", x !== id);
  });
}

function showToast(msg) {
  const t = $("toast");
  t.textContent = msg;
  t.classList.add("show");
  setTimeout(() => t.classList.remove("show"), 2200);
}

function playTone(freq=600,duration=.12,type="sine") {
  if(!soundOn) return;

  try {
    const C = window.AudioContext || window.webkitAudioContext;
    if(!C) return;

    const c = new C();
    const o = c.createOscillator();
    const g = c.createGain();

    o.type = type;
    o.frequency.value = freq;

    g.gain.setValueAtTime(.08,c.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,c.currentTime+duration);

    o.connect(g);
    g.connect(c.destination);

    o.start();
    o.stop(c.currentTime+duration);

    o.onended = () => c.close();
  } catch(e) {}
}

function successSound() {
  playTone(660,.12);
  setTimeout(() => playTone(880,.18),110);
}

function errorSound() {
  playTone(210,.2,"triangle");
}

function toggleMusic() {
  musicOn = !musicOn;
  $("musicToggle").textContent = musicOn ? "🎵" : "🔇";
  showToast(musicOn ? "Música tranquila activada" : "Música desactivada");
  if(musicOn) {
    startAmbientMusic();
  } else {
    stopAmbientMusic();
  }
}

function startAmbientMusic() {
  stopAmbientMusic();
  const chordFrequencies = [261.63, 329.63, 392.00, 523.25];
  let chordIdx = 0;

  musicInterval = setInterval(() => {
    if(!musicOn) return;
    try {
      const C = window.AudioContext || window.webkitAudioContext;
      if(!C) return;
      const c = new C();
      const o = c.createOscillator();
      const g = c.createGain();

      o.type = "sine";
      o.frequency.value = chordFrequencies[chordIdx];
      chordIdx = (chordIdx + 1) % chordFrequencies.length;

      g.gain.setValueAtTime(0.005, c.currentTime);
      g.gain.linearRampToValueAtTime(0.03, c.currentTime + 1.5);
      g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 4.0);

      o.connect(g);
      g.connect(c.destination);

      o.start();
      o.stop(c.currentTime + 4.0);
      o.onended = () => c.close();
    } catch(e) {}
  }, 4000);
}

function stopAmbientMusic() {
  if(musicInterval) {
    clearInterval(musicInterval);
    musicInterval = null;
  }
}

function setMascotReaction(state) {
  const mascot = $("exerciseMascot");
  const face = $("mascotFace");
  if(!mascot || !face) return;

  mascot.className = "mascot-companion " + state;
  if(state === "happy") {
    face.textContent = "🦊✨";
  } else if(state === "sad") {
    face.textContent = "🦊💧";
  } else {
    face.textContent = "🦊";
  }
}

let speechRequestId = 0;

function speak(text) {
  if(!speechAvailable || !text) {
    showToast("No se encontró una voz disponible en este navegador.");
    return;
  }

  const synth = window.speechSynthesis;
  const requestId = ++speechRequestId;

  synth.cancel();

  setTimeout(() => {
    if(requestId !== speechRequestId) return;

    const utterance = new SpeechSynthesisUtterance(String(text));

    utterance.lang = "es-PE";
    utterance.rate = 0.88;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    const voices = synth.getVoices();

    const spanish =
      voices.find(v => v.lang && v.lang.toLowerCase() === "es-pe") ||
      voices.find(v => v.lang && v.lang.toLowerCase().startsWith("es-mx")) ||
      voices.find(v => v.lang && v.lang.toLowerCase().startsWith("es"));

    if(spanish) utterance.voice = spanish;

    utterance.onerror = event => {
      if(event.error !== "canceled" && event.error !== "interrupted") {
        showToast("No se pudo reproducir la voz. Revisa el audio del navegador.");
      }
    };

    try {
      synth.resume();
      synth.speak(utterance);
    } catch(error) {
      showToast("No se pudo activar la voz. Inténtalo nuevamente.");
    }
  }, 120);
}

function refreshProfiles() {
  const sel = $("profileSelect");
  if (!sel) return;
  sel.innerHTML = "";

  const entries = Object.values(db.users);

  if(!entries.length) {
    const op = document.createElement("option");
    op.value = "";
    op.textContent = "Aún no hay usuarios";
    sel.append(op);
  } else {
    entries.forEach(u => {
      const op = document.createElement("option");
      op.value = u.id;
      op.textContent = "🌟 " + u.name;
      sel.append(op);
    });
  }

  if (currentUser && db.users[currentUser]) {
    sel.value = currentUser;
  } else if (entries.length > 0) {
    currentUser = entries[0].id;
    sel.value = currentUser;
  }
}

function startLoading() {
  const selected = $("profileSelect").value;

  if(!currentUser && selected) currentUser = selected;

  if(!currentUser || !db.users[currentUser]) {
    showToast("Primero crea un usuario con tu nombre.");
    return;
  }

  showScreen("loadingScreen");

  const messages = [
    "Las letras están despertando...",
    "Los animalitos preparan sus pistas...",
    "¡Casi listo, explorador!"
  ];

  let p = 0;

  $("loadingMessage").textContent = messages[0];
  $("loadingBar").style.width = "0%";

  const tick = setInterval(() => {
    p += 4;
    $("loadingBar").style.width = p + "%";

    if(p % 32 === 0) {
      $("loadingMessage").textContent = messages[Math.min(2,Math.floor(p/36))];
    }

    if(p >= 100) {
      clearInterval(tick);
      $("playerName").textContent = db.users[currentUser].name;
      showScreen("gameScreen");
      openPanel("playPanel");
      updateStats();
    }
  },55);
}

function openPanel(id) {
  document.querySelectorAll(".panel").forEach(p => p.classList.add("hidden"));
  $(id).classList.remove("hidden");

  document.querySelectorAll(".nav-btn").forEach(b => {
    b.classList.toggle("active",b.dataset.panel === id);
  });

  if(id === "profilePanel") renderProgress();
  if(id === "syllablePanel") renderSyllables();
  if(id === "alphabetPanel") renderAlphabet();
}

function updateStats() {
  if (!currentUser || !db.users[currentUser]) return;
  $("scoreValue").textContent = db.users[currentUser].score;
  $("levelValue").textContent = (db.users[currentUser].progress[difficulty] || 0) + 1;
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - .5);
}

function startDifficulty(level) {
  difficulty = level;

  tasks = level === "easy"
    ? shuffle(easyTasks)
    : shuffle(level === "medium" ? mediumTasks : hardTasks);

  taskIndex = 0;
  scoreAtStart = db.users[currentUser].score;
  typedKeys = "";

  $("difficultyPicker").classList.add("hidden");
  $("exerciseArea").classList.remove("hidden");
  $("timerBox").classList.toggle("hidden",level !== "hard");

  $("difficultyTag").textContent = {
    easy:"FÁCIL",
    medium:"MEDIO",
    hard:"DIFÍCIL"
  }[level];

  if(level === "hard") startTimer();
  else stopTimer();

  renderTask();
}

function startTimer() {
  stopTimer();
  secondsLeft = 600;
  updateTimer();

  timerInterval = setInterval(() => {
    secondsLeft--;
    updateTimer();

    if(secondsLeft <= 0) {
      stopTimer();
      finishGame(true);
    }
  },1000);
}

function stopTimer() {
  if(timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function updateTimer() {
  $("timerValue").textContent =
    Math.floor(secondsLeft/60) + ":" +
    String(secondsLeft%60).padStart(2,"0");

  $("timerBox").style.color = secondsLeft < 60 ? "#e35b70" : "";
}

function renderTask() {
  if(taskIndex >= tasks.length) {
    finishGame(false);
    return;
  }

  typedKeys = "";
  setMascotReaction("neutral");

  const t = tasks[taskIndex];

  $("levelTitle").textContent = "Nivel " + (Math.floor(taskIndex/4)+1);
  $("exerciseNumber").textContent = "Reto " + (taskIndex+1) + " de " + tasks.length;
  $("progressText").textContent = "¡Sigue avanzando!";
  $("progressCount").textContent = (taskIndex+1) + " / " + tasks.length;
  $("progressBar").style.width = (taskIndex/tasks.length*100) + "%";

  $("exerciseIcon").textContent = t.icon || "🌟";
  $("exerciseInstruction").textContent = t.instruction;
  $("exerciseHint").textContent = t.hint || "";

  $("feedback").textContent = "";
  $("feedback").className = "feedback";

  $("nextExercise").classList.add("hidden");
  $("answerChoices").classList.add("hidden");
  $("answerChoices").innerHTML = "";
  $("typingArea").classList.add("hidden");
  $("readArea").classList.add("hidden");
  $("answerInput").value = "";

  if(t.type === "key") {
    $("exercisePrompt").textContent = t.prompt;
    $("answerChoices").classList.remove("hidden");

    const distractorPool = shuffle([...alphabet, "MA", "PA", "LA", "SA", "FLO", "TRE", "LLA", "PLA"])
      .filter(item => item !== t.answer)
      .slice(0, 3);

    const opts = shuffle([t.answer, ...distractorPool]);

    opts.forEach(v => {
      const b = document.createElement("button");
      b.className = "choice-btn";
      b.textContent = v;
      b.onclick = () => checkKeyChoice(v);
      $("answerChoices").append(b);
    });

    speak(t.answer);
  }
  else if(t.type === "write") {
    $("exercisePrompt").textContent = "¿Qué ves o escuchas?";
    $("typingArea").classList.remove("hidden");
    $("answerInput").placeholder = "Escribe la palabra...";
    $("repeatWordButton").onclick = () => speak(t.word);
    speak(t.word);
  }
  else {
    $("exercisePrompt").textContent = t.text;
    $("readArea").classList.remove("hidden");
    $("listenButton").onclick = () => speak(t.text);
    speak(t.text);
  }
}

function normalize(s) {
  return s.trim()
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .replace(/[.,!?¿¡]/g,"")
    .replace(/\s+/g," ");
}

function correctFeedback() {
  const u = db.users[currentUser];

  u.score += 10;
  u.completed++;

  successSound();
  setMascotReaction("happy");

  $("feedback").textContent = shuffle([
    "¡Excelente! ¡Eres genial! 🌟",
    "¡Lo lograste! Sigue brillando. ✨",
    "¡Muy bien! Cada día aprendes más. 🦋",
    "¡Fantástico, explorador! 🚀"
  ])[0];

  $("feedback").className = "feedback good";
  $("nextExercise").classList.remove("hidden");

  $("answerChoices").querySelectorAll("button").forEach(b => {
    b.disabled = true;
  });

  saveDB();
  updateStats();
}

function wrongFeedback() {
  errorSound();
  setMascotReaction("sad");

  $("feedback").textContent = shuffle([
    "¡Casi lo consigues! Inténtalo de nuevo. 💪",
    "¡No te rindas! Aprender es practicar. 🌈",
    "¡Tú puedes! Respira y vuelve a intentarlo. 🐣",
    "Cada intento te hace más fuerte. ¡Vamos! ⭐"
  ])[0];

  $("feedback").className = "feedback try";
}

function checkKeyChoice(v) {
  if(v === tasks[taskIndex].answer) correctFeedback();
  else wrongFeedback();
}

function checkTyped() {
  const t = tasks[taskIndex];

  if(normalize($("answerInput").value) === normalize(t.word)) {
    correctFeedback();
  } else {
    wrongFeedback();
  }
}

function completeRead() {
  correctFeedback();
}

function finishGame(timeUp) {
  stopTimer();

  const u = db.users[currentUser];

  u.progress[difficulty] = Math.max(
    u.progress[difficulty] || 0,
    Math.floor(taskIndex/4)+1
  );

  u.best[difficulty] = Math.max(
    u.best[difficulty] || 0,
    taskIndex
  );

  saveDB();

  $("progressBar").style.width = "100%";

  $("finishTitle").textContent = timeUp
    ? "¡Se acabó el tiempo!"
    : "¡Excelente trabajo, " + u.name + "!";

  $("finishMessage").textContent = timeUp
    ? "¡Lo importante es que practicaste! Puedes volver a intentarlo."
    : "Has completado " + tasks.length + " retos. ¡Eres un explorador increíble!";

  $("finishPoints").textContent = u.score - scoreAtStart;

  showScreen("finishScreen");
  successSound();
}

function resetToDifficulty() {
  stopTimer();
  $("exerciseArea").classList.add("hidden");
  $("difficultyPicker").classList.remove("hidden");
  $("timerBox").classList.add("hidden");
}

/* Renderizar el Abecedario A-Z con sonido interactivo */
function renderAlphabet() {
  const grid = $("alphabetGrid");
  if (!grid || grid.children.length > 0) return; // Evita recrearlo si ya está listo

  grid.innerHTML = "";
  alphabet.forEach((letter, i) => {
    const btn = document.createElement("button");
    btn.className = "alphabet-card";
    
    const iconSample = ["🍎","🐸","⭐","🦋","🚀","📚","🐶","🐱","🌻","🎨"][i % 10];
    
    btn.innerHTML = `
      <span class="alpha-letter">${letter}</span>
      <span class="alpha-icon">${iconSample}</span>
    `;

    btn.onclick = () => {
      speak(letter);
      playTone(550 + i * 15, 0.1);
    };

    grid.append(btn);
  });
}

function renderSyllables() {
  const groups = [
    {name:"Sílabas simples",data:simpleSyllables,kind:"simple"},
    {name:"Sílabas trabadas",data:directSyllables,kind:"direct"},
    {name:"Sílabas inversas y otras",data:otherSyllables,kind:"special"}
  ];

  const q = normalize($("syllableSearch").value);
  const filter = $("syllableFilter").value;
  const root = $("syllableGroups");

  root.innerHTML = "";

  groups
    .filter(g => filter === "all" || filter === g.kind)
    .forEach(g => {
      const values = g.data.filter(s => normalize(s).includes(q));

      if(!values.length) return;

      const card = document.createElement("div");
      card.className = "syllable-group";

      const h = document.createElement("h3");
      h.textContent = g.name;
      card.append(h);

      const list = document.createElement("div");
      list.className = "syllable-list";

      values.forEach(s => {
        const b = document.createElement("button");
        b.className = "syllable-btn";
        b.textContent = s.toUpperCase();

        b.onclick = () => {
          speak(s);
          playTone(500,.08);
        };

        list.append(b);
      });

      card.append(list);
      root.append(card);
    });

  if(!root.children.length) {
    root.textContent = "No encontramos esa sílaba. Prueba otra búsqueda.";
  }
}

function renderProgress() {
  const u = db.users[currentUser];
  if (!u) return;

  $("totalScore").textContent = u.score;
  $("totalDone").textContent = u.completed;

  $("unlockedLevels").textContent =
    Object.values(u.progress).reduce((a,b) => a+b,0)+3;

  $("progressByDifficulty").innerHTML = "";

  [
    {id:"easy",name:"🐣 Fácil"},
    {id:"medium",name:"🦋 Medio"},
    {id:"hard",name:"🦁 Difícil"}
  ].forEach(d => {
    const row = document.createElement("div");
    row.className = "progress-line";

    row.innerHTML =
      `<span>${d.name}</span><small>${u.progress[d.id]||0} niveles registrados · mejor reto ${u.best[d.id]||0}</small>`;

    $("progressByDifficulty").append(row);
  });
}

function deleteCurrentProfile() {
  const id = $("profileSelect").value;
  if(!id) return;

  const u = db.users[id];

  if(!confirm("¿Eliminar el usuario " + u.name + " y todo su avance de este dispositivo?")) {
    return;
  }

  delete db.users[id];
  currentUser = null;

  saveDB();
  refreshProfiles();
  showToast("Usuario eliminado.");
}

function resetCurrentProgress() {
  if(!confirm("¿Seguro que quieres reiniciar todos tus puntos y avances?")) {
    return;
  }

  const u = db.users[currentUser];
  if (!u) return;

  u.score = 0;
  u.completed = 0;
  u.progress = {easy:0,medium:0,hard:0};
  u.best = {easy:0,medium:0,hard:0};

  saveDB();
  renderProgress();
  updateStats();
  showToast("Tu avance se ha reiniciado.");
}

$("createProfile").onclick = () => {
  const name = $("newName").value.trim();

  if(!name) {
    showToast("Escribe tu nombre primero.");
    return;
  }

  currentUser = newUser(name);
  $("newName").value = "";

  refreshProfiles();
  showToast("¡Hola, " + name + "! Usuario creado.");
};

$("profileSelect").onchange = e => {
  currentUser = e.target.value || null;
};

$("deleteProfile").onclick = deleteCurrentProfile;

$("startButton").onclick = () => {
  if(!currentUser) currentUser = $("profileSelect").value || null;
  startLoading();
};

$("homeButton").onclick = () => {
  stopTimer();
  stopAmbientMusic();
  musicOn = false;
  $("musicToggle").textContent = "🎵";
  refreshProfiles();
  showScreen("welcomeScreen");
};

$("backLevels").onclick = resetToDifficulty;

document.querySelectorAll(".difficulty-card").forEach(b => {
  b.onclick = () => startDifficulty(b.dataset.difficulty);
});

document.querySelectorAll(".nav-btn").forEach(b => {
  b.onclick = () => openPanel(b.dataset.panel);
});

$("checkAnswer").onclick = checkTyped;
$("readDone").onclick = completeRead;

/* Botón de Escritura Libre para reproducir texto */
$("speakFreeTextBtn").onclick = () => {
  const textToWrite = $("freeTextArea").value.trim();
  if(!textToWrite) {
    showToast("Escribe algo en el bloc primero.");
    return;
  }
  speak(textToWrite);
  playTone(700, 0.15);
};

function advanceExercise() {
  if($("nextExercise").classList.contains("hidden")) return;

  taskIndex++;
  renderTask();
}

$("nextExercise").onclick = advanceExercise;

$("playAgain").onclick = () => {
  showScreen("gameScreen");
  openPanel("playPanel");
  resetToDifficulty();
  updateStats();
};

$("switchUser").onclick = () => {
  stopTimer();
  refreshProfiles();
  showScreen("welcomeScreen");
};

$("resetProgress").onclick = resetCurrentProgress;

$("syllableSearch").oninput = renderSyllables;
$("syllableFilter").onchange = renderSyllables;

$("themeToggle").onclick = () => {
  document.body.classList.toggle("dark");

  $("themeToggle").textContent =
    document.body.classList.contains("dark") ? "☀️" : "🌙";

  localStorage.setItem(
    "palabritasTheme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
};

$("soundToggle").onclick = () => {
  soundOn = !soundOn;

  $("soundToggle").textContent = soundOn ? "🔊" : "🔇";

  showToast(soundOn ? "Sonido activado" : "Sonido silenciado");

  if(soundOn) successSound();
};

$("musicToggle").onclick = toggleMusic;

document.addEventListener("keydown",e => {
  if(
    $("gameScreen").classList.contains("hidden") ||
    $("exerciseArea").classList.contains("hidden")
  ) return;

  if(e.key === "Enter") {
    if(!$("nextExercise").classList.contains("hidden")) {
      e.preventDefault();
      advanceExercise();
      return;
    }

    if(e.target === $("answerInput")) {
      e.preventDefault();
      checkTyped();
      return;
    }
  }

  if(
    difficulty !== "easy" ||
    e.ctrlKey ||
    e.altKey ||
    e.metaKey ||
    e.key.length !== 1
  ) return;

  const t = tasks[taskIndex];

  if(!t || t.type !== "key" || !$("nextExercise").classList.contains("hidden")) {
    return;
  }

  const expected = t.answer;
  const k = e.key.toLocaleUpperCase("es");

  if(expected.length === 1) {
    if(k === expected) correctFeedback();
    else wrongFeedback();
  } else {
    typedKeys += k;

    if(expected.startsWith(typedKeys)) {
      playTone(450,.05);

      if(typedKeys === expected) {
        correctFeedback();
      }
    } else {
      typedKeys = "";
      wrongFeedback();
    }
  }
});

window.addEventListener("beforeunload",() => stopTimer());

(function init() {
  const savedTheme = localStorage.getItem("palabritasTheme");

  if(savedTheme === "dark") {
    document.body.classList.add("dark");
    $("themeToggle").textContent = "☀️";
  }

  refreshProfiles();

  if(speechAvailable) {
    window.speechSynthesis.getVoices();
  }
})();