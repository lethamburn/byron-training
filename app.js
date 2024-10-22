document.addEventListener("DOMContentLoaded", () => {
  const trainingForm = document.getElementById("training-form");
  const sessionControls = document.getElementById("session-controls");
  const timerDisplay = document.getElementById("timer-display");
  const endSessionButton = document.getElementById("end-session");
  const resultsContainer = document.getElementById("training-results");

  let currentTraining = {};
  let sessionInterval;
  let currentSession = [];
  let sessionIndex = 0;
  let startTime;

  trainingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("training-name").value;
    const time = parseInt(document.getElementById("session-time").value);
    const repetitions = parseInt(
      document.getElementById("num-repetitions").value
    );

    currentTraining = { name, time, repetitions, sessions: [] };
    sessionIndex = 0;

    startNewSession();
  });

  document
    .getElementById("stick-btn")
    .addEventListener("click", () => addBehavior("Palo"));
  document
    .getElementById("circle-btn")
    .addEventListener("click", () => addBehavior("Círculo"));
  document
    .getElementById("cross-btn")
    .addEventListener("click", () => addBehavior("X"));

  endSessionButton.addEventListener("click", () => {
    endSession();
    if (sessionIndex < currentTraining.repetitions) {
      startNewSession();
    } else {
      saveTraining();
      showResults();
      reset();
    }
  });

  function startNewSession() {
    sessionControls.classList.remove("hidden");
    currentSession = [];
    startTime = new Date();
    sessionIndex++;
    updateTimer();
    sessionInterval = setInterval(updateTimer, 1000);
  }

  function addBehavior(behavior) {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    currentSession.push({ behavior, time: elapsedTime });
  }

  function updateTimer() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    if (elapsedTime >= currentTraining.time) {
      clearInterval(sessionInterval);
    }
    timerDisplay.textContent = formatTime(elapsedTime);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  function endSession() {
    clearInterval(sessionInterval);
    currentTraining.sessions.push(currentSession);
  }

  function saveTraining() {
    const savedTrainings = JSON.parse(localStorage.getItem("trainings")) || [];
    savedTrainings.push(currentTraining);
    localStorage.setItem("trainings", JSON.stringify(savedTrainings));
  }

  function showResults() {
    resultsContainer.innerHTML = "";
    const title = document.createElement("h3");
    title.textContent = `Entrenamiento: ${currentTraining.name} - ${currentTraining.date} ${currentTraining.startTime}`;
    resultsContainer.appendChild(title);

    currentTraining.sessions.forEach((session, index) => {
      const sessionTable = document.createElement("table");
      sessionTable.classList.add("training-table");

      // Crear cabecera para cada tanda
      const headerRow = document.createElement("tr");
      const header = document.createElement("th");
      header.setAttribute("colspan", session.length);
      header.textContent = `Tanda ${index + 1}`;
      headerRow.appendChild(header);
      sessionTable.appendChild(headerRow);

      // Crear fila para los símbolos
      const symbolRow = document.createElement("tr");
      session.forEach((entry) => {
        const symbolCell = document.createElement("td");
        const symbolSpan = document.createElement("span");
        symbolSpan.classList.add("behavior-symbol");
        symbolSpan.textContent = entry.behavior;
        symbolCell.appendChild(symbolSpan);
        symbolRow.appendChild(symbolCell);
      });
      sessionTable.appendChild(symbolRow);

      // Crear fila para los tiempos
      const timeRow = document.createElement("tr");
      session.forEach((entry) => {
        const timeCell = document.createElement("td");
        const timeSpan = document.createElement("span");
        timeSpan.classList.add("behavior-time");
        timeSpan.textContent = `(${entry.time}s)`;
        timeCell.appendChild(timeSpan);
        timeRow.appendChild(timeCell);
      });
      sessionTable.appendChild(timeRow);

      resultsContainer.appendChild(sessionTable);
    });
  }

  function reset() {
    trainingForm.reset();
    sessionControls.classList.add("hidden");
    timerDisplay.textContent = "00:00";
    currentTraining = {};
  }
});
document.addEventListener("DOMContentLoaded", () => {
  const trainingForm = document.getElementById("training-form");
  const sessionControls = document.getElementById("session-controls");
  const timerDisplay = document.getElementById("timer-display");
  const endSessionButton = document.getElementById("end-session");
  const resultsContainer = document.getElementById("training-results");

  let currentTraining = {};
  let sessionInterval;
  let currentSession = [];
  let sessionIndex = 0;
  let startTime;

  trainingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("training-name").value;
    const time = parseInt(document.getElementById("session-time").value);
    const repetitions = parseInt(
      document.getElementById("num-repetitions").value
    );
    const date = new Date();
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString();

    currentTraining = {
      name,
      time,
      repetitions,
      date: formattedDate,
      startTime: formattedTime,
      sessions: [],
    };
    sessionIndex = 0;

    startNewSession();
  });

  document
    .getElementById("stick-btn")
    .addEventListener("click", () => addBehavior("✅"));
  document
    .getElementById("circle-btn")
    .addEventListener("click", () => addBehavior("⭕️"));
  document
    .getElementById("cross-btn")
    .addEventListener("click", () => addBehavior("❌"));

  endSessionButton.addEventListener("click", () => {
    endSession();
    if (sessionIndex < currentTraining.repetitions) {
      startNewSession();
    } else {
      saveTraining();
      showResults();
      reset();
    }
  });

  function startNewSession() {
    sessionControls.classList.remove("hidden");
    currentSession = [];
    startTime = new Date();
    sessionIndex++;
    updateTimer();
    sessionInterval = setInterval(updateTimer, 1000);
  }

  function addBehavior(behavior) {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    currentSession.push({ behavior, time: elapsedTime });
  }

  function updateTimer() {
    const elapsedTime = Math.floor((new Date() - startTime) / 1000);
    if (elapsedTime >= currentTraining.time) {
      clearInterval(sessionInterval);
    }
    timerDisplay.textContent = formatTime(elapsedTime);
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  }

  function endSession() {
    clearInterval(sessionInterval);
    currentTraining.sessions.push(currentSession);
  }

  function saveTraining() {
    const savedTrainings = JSON.parse(localStorage.getItem("trainings")) || [];
    savedTrainings.push(currentTraining);
    localStorage.setItem("trainings", JSON.stringify(savedTrainings));
  }

  function showResults() {
    resultsContainer.innerHTML = "";
    const title = document.createElement("h3");
    title.textContent = `Entrenamiento: ${currentTraining.name} - ${currentTraining.date} ${currentTraining.startTime}`;
    resultsContainer.appendChild(title);

    currentTraining.sessions.forEach((session, index) => {
      const sessionDiv = document.createElement("div");
      sessionDiv.innerHTML = `<h4>Tanda ${index + 1}</h4>`;
      session.forEach((entry) => {
        const entrySpan = document.createElement("span");
        entrySpan.textContent = `${entry.behavior} (${entry.time}s) `;
        sessionDiv.appendChild(entrySpan);
      });
      resultsContainer.appendChild(sessionDiv);
    });
  }

  function reset() {
    trainingForm.reset();
    sessionControls.classList.add("hidden");
    timerDisplay.textContent = "00:00";
    currentTraining = {};
  }
});
