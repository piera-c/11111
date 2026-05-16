function descendSystem() {
  const descension = document.getElementById("descension");
  const fallConfirm = document.getElementById("fallConfirm");

  // reset
  descension.classList.remove("active");
  fallConfirm.classList.remove("active");

  descension.style.display = "none";
  fallConfirm.style.display = "none";

  // STEP 1: white loading screen
  descension.style.display = "flex";

  requestAnimationFrame(() => {
    descension.style.opacity = "1";
  });

  // STEP 2: after 5s → dark fall screen
  setTimeout(() => {
    descension.style.opacity = "0";

    setTimeout(() => {
      descension.style.display = "none";

      fallConfirm.style.display = "flex";
      fallConfirm.style.opacity = "0";

      requestAnimationFrame(() => {
        fallConfirm.style.opacity = "1";
      });

    }, 800);

  }, 5000);

  // STEP 3: after 7s → home page
  setTimeout(() => {
    fallConfirm.style.opacity = "0";

    setTimeout(() => {
      fallConfirm.style.display = "none";

      document.body.classList.remove("heaven-mode");

      document.querySelectorAll(".heaven-section").forEach(sec => {
        sec.classList.remove("active");
      });

      document.getElementById("h-core").classList.add("active");

      showPage("home");

    }, 800);

  }, 7000);
}


/* PAGE SWITCHING */
function showPage(id) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  if (id === "prayer") renderPrayers();
  if (id === "heaven") renderPrayers(); // 👈 add this
}
/* TERMINAL */
function openTerminal() {
  document.getElementById("terminalOverlay").style.display = "flex";
  document.getElementById("cmd").focus();
}

function closeTerminal() {
  document.getElementById("terminalOverlay").style.display = "none";
}

/* TRANSITION HELPERS */
function fadeIn(el) {
  el.style.opacity = 0;
  el.style.display = "flex";
  requestAnimationFrame(() => {
    el.style.transition = "opacity 0.8s ease";
    el.style.opacity = 1;
  });
}

function fadeOut(el, cb) {
  el.style.transition = "opacity 0.8s ease";
  el.style.opacity = 0;
  setTimeout(() => {
    el.style.display = "none";
    if (cb) cb();
  }, 800);
}

/* TERMINAL COMMANDS */
function handleCommand(event) {
  if (event.key !== "Enter") return;

  const input = event.target.value.trim();
  const output = document.getElementById("terminalOutput");

  function normal(msg) {
    output.textContent = "$ " + msg;
  }

  if (input === "systemctl status") normal("system stable (emotionally questionable)");
  else if (input === "date") normal(new Date().toString());
  else if (input === "whoami") normal("error // user not recognized");
  else if (input === "ping system") normal("signal stable // latency: 12ms");
  else if (input === "sysctl --void") {
    document.body.style.filter = "invert(1)";
    normal("void layer applied");
  }

  else if (input === "sudo get --final") {
  showAnswerPopup();
}

  else if (input === "sysctl --reset") {
    document.body.style.filter = "none";
    normal("system reset");
  }
  else if (input === "sysctl --dim") {
    document.body.style.filter = "brightness(0.7)";
    normal("dimming interface");
  }
  else if (input === "angel.exec") normal("angel protocol partially loaded");
  else if (input === "mem read") {
    const memory = [
      "you were softer then",
      "the archive remembers laughter",
      "ghost file still active",
      "something stayed behind"
    ];
    normal(memory[Math.floor(Math.random() * memory.length)]);
  }
  else if (input === "dream") {
    const dreams = [
      "he",
      "av",
      "en",
      "you already know the answer"
    ];
    normal(dreams[Math.floor(Math.random() * dreams.length)]);
  }

  /* ===========================
     HEAVEN SEQUENCE (FIXED)
  =========================== */
 else if (input === "mount --bind /heaven /system") {

  output.textContent = "$ access granted // initiating ascension";
  closeTerminal();

  const ascension = document.getElementById("ascension");
  const confirm = document.getElementById("heavenConfirm");

  // RESET EVERYTHING CLEANLY
  ascension.classList.remove("active");
  confirm.classList.remove("active");

  confirm.style.display = "none";
  confirm.style.opacity = "0";

  // STEP 1: SHOW ASCENSION
  showPage("ascension");
  ascension.classList.add("active");

  // STEP 2: AFTER 5s → WHITE SCREEN
 // STEP 2: AFTER 5s → WHITE SCREEN
setTimeout(() => {

  ascension.classList.remove("active");

  confirm.style.display = "flex";
  confirm.style.opacity = "0";

  requestAnimationFrame(() => {
    confirm.style.transition = "opacity 0.8s ease";
    confirm.style.opacity = "1";
  });

}, 5000);

// STEP 3: AFTER 7s → FINAL HEAVEN PAGE
setTimeout(() => {

  confirm.style.opacity = "0";

  setTimeout(() => {
    confirm.style.display = "none";
    document.body.classList.add("heaven-mode");
    showPage("heaven");
  }, 800);

}, 7000);
}

  else {
    output.textContent = "$ command not found";
  }

  event.target.value = "";
}

/* ARCHIVE SYSTEM */
function getLogs() {
  return JSON.parse(localStorage.getItem("archiveLogs") || "[]");
}

function saveLog() {
  const input = document.getElementById("logInput");
  const text = input.value.trim();
  if (!text) return;

  let logs = getLogs();
  logs.push(text);

  localStorage.setItem("archiveLogs", JSON.stringify(logs));
  input.value = "";
  renderLogs();
}

function renderLogs() {
  const logs = getLogs().reverse();
  document.getElementById("logs").innerHTML =
    logs.map(log => `<div class="entry">SYSTEM LOG\n\n${log}</div>`).join("");
}

/* GHOST */
function saveGhost() {
  const value = document.getElementById("ghostInput").value;
  localStorage.setItem("ghostFile", value);
  loadGhost();
}

function loadGhost() {
  document.getElementById("ghostOutput").textContent =
    localStorage.getItem("ghostFile") || "";
}

/* SIGNAL */
function saveSignal() {
  const input = document.getElementById("signalInput");
  const value = input.value.trim();
  if (!value) return;

  const output = document.getElementById("signalOutput");

  const text = value.toLowerCase();

  let leak = "";

  if (text.includes("system")) {
    leak = " // anomaly detected in system layer";
  }

  if (text.includes("heaven")) {
    leak = " // directory referenced but not mounted";
  }

  if (text.includes("mount")) {
    leak = " // syntax incomplete: mount --bind /____ /system";
  }

  const entry = document.createElement("div");
  entry.className = "entry";
 entry.innerHTML = `
  ${value}
`;

  output.appendChild(entry);

  updateEchoLeak(value);

  input.value = "";
}

function loadSignal() {
  let data = JSON.parse(localStorage.getItem("signalFile") || "[]");

  const output = data.map(entry => {

    const text = entry.toLowerCase(); // ← PUT IT HERE

    let leak = "";

    if (text.includes("system")) {
      leak = " // anomaly detected in system layer";
    }

    if (text.includes("heaven")) {
      leak = " // directory referenced but not mounted";
    }

    if (text.includes("mount")) {
      leak = " // syntax incomplete: mount --bind /____ /system";
    }

    return `
      <div class="entry">
        ${entry}
        <br>
        <span style="opacity:0.4">${leak}</span>
      </div>
    `;
  }).join("");

  document.getElementById("signalOutput").innerHTML = output;

  updateEchoLeak(); // keep this at the end
}

/* ORACLE */
function generateOracle() {
  const output = document.getElementById("oracleOutput");

  const prophecies = [
    "A winged thing remembers your name in a language that no longer compiles.",
    "Three doors will open. Only one is real. The others are memories pretending to be architecture.",
    "The cherub watches from the perimeter of your decisions.",
    "A voice made of light has already rewritten your ending.",
    "T = 'd2F0Y2hpbmc='"
  ];

  output.textContent = "requesting oracle...";

  setTimeout(() => {
    const index = Math.floor(Math.random() * prophecies.length);
    output.textContent = prophecies[index];
  }, 700);
}

function showHeaven(id) {

  document.querySelectorAll(".heaven-section").forEach(sec => {
    sec.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");

  if (id === "h-prayers") renderPrayers();
  if (id === "h-archive") renderHeavenArchive(); // 👈 add this
}

function saveHeavenArchive() {
  const text = document.getElementById("heavenArchiveInput").value;

  let data = JSON.parse(localStorage.getItem("heavenArchive") || "[]");
  data.push(text);

  localStorage.setItem("heavenArchive", JSON.stringify(data));
  renderHeavenArchive();
}

function renderHeavenArchive() {
  const data = JSON.parse(localStorage.getItem("heavenArchive") || "[]");

  document.getElementById("heavenArchiveOutput").innerHTML =
    data.map((x, index) => {

      if (typeof x === "string") {
       return `
  <div class="entry">
    ${x}
    <button class="delete-btn" onclick="deleteHeavenFragment(${index})">×</button>
  </div>
`;
      }

      if (x.type === "image") {
        return `
  <div class="entry">
    [IMAGE: ${x.name}]<br>
    <img src="${x.content}" style="max-width:100%; margin-top:10px;" />
    <button class="delete-btn" onclick="deleteHeavenFragment(${index})">×</button>
  </div>
`;
      }

      return `
  <div class="entry">
    ${x.content}
    <button class="delete-btn" onclick="deleteHeavenFragment(${index})">×</button>
  </div>
`;
    }).join("");

   
}

function importFiles(event) {
  const files = event.target.files;

  let data = JSON.parse(localStorage.getItem("heavenArchive") || "[]");

  for (let file of files) {
    const name = file.webkitRelativePath || file.name;
    const reader = new FileReader();

    if (file.type.startsWith("image/")) {
      reader.onload = (e) => {
        data.push({
          type: "image",
          name,
          content: e.target.result
        });

        localStorage.setItem("heavenArchive", JSON.stringify(data));
        renderHeavenArchive();
      };

      reader.readAsDataURL(file);
    } else {
      reader.onload = (e) => {
        data.push({
          type: "text",
          name,
          content: e.target.result
        });

        localStorage.setItem("heavenArchive", JSON.stringify(data));
        renderHeavenArchive();
      };

      reader.readAsText(file);
    }
  }
}

function renderHeavenFiles() {
  let data = JSON.parse(localStorage.getItem("heavenArchive") || "[]");

  document.getElementById("heavenFiles").innerHTML =
    data.map(x => `<div class="entry">${x}</div>`).join("");
}

function playSong(file) {
  const audio = document.getElementById("audioPlayer");

  audio.src = file;
  audio.load();
  audio.play().catch(err => {
    console.log("audio blocked or file missing:", err);
  });
}


function sendPrayer() {
  const input = document.getElementById("prayerInput");
  const text = input.value.trim();

  if (!text) return;

  let prayers = JSON.parse(localStorage.getItem("prayers") || "[]");

  prayers.push({
    text: text,
    time: new Date().toLocaleString()
  });

  localStorage.setItem("prayers", JSON.stringify(prayers));

  input.value = "";

  renderPrayers(); // 🔥 THIS is what you were missing
}

function renderPrayers() {
  let prayers = JSON.parse(localStorage.getItem("prayers") || "[]");

  prayers = [...prayers].reverse();

  document.getElementById("prayerArchive").innerHTML =
    prayers.map(p => `
      <div class="entry">
PRAYER RECEIVED

${p.text}

[${p.time}]
      </div>
    `).join("");
}

function deleteHeavenFragment(index) {
  let data = JSON.parse(localStorage.getItem("heavenArchive") || "[]");

  data.splice(index, 1);

  localStorage.setItem("heavenArchive", JSON.stringify(data));

  renderHeavenArchive();
}


function updateEchoLeak(lastInput = "") {
  const echo = document.getElementById("echo");

  const text = (lastInput || "").toLowerCase();

  const hasMount = text.includes("mount");

  echo.textContent = hasMount
    ? "memory trace: mount // syntax incomplete: mount --bind /____ /system detected in kernel echo"
    : "memory trace: subsystem logs stable";
}


function loadDominions() {
  fetch("fragment_D.txt")
    .then(res => res.text())
    .then(text => {

      const lines = text.split("\n");

      document.getElementById("dominionsOutput").innerHTML =
        lines.map(line =>
          `<div class="entry angel-fragment">${line}</div>`
        ).join("");

    });
}
function unlockFragment2() {

  const core = document.getElementById("h-core");

  // prevent duplicates
  if (document.getElementById("encryptedFragment")) return;

  const div = document.createElement("div");

  div.className = "entry";
  div.id = "encryptedFragment";

  div.innerHTML = `
    <br><br>

    aHR0cHM6Ly95b3V0dS5iZS9vRFVPbmw0NkxKbw==
  `;

  core.appendChild(div);
}
function downloadDominions(event) {
  event.preventDefault();

  unlockFragment2();

  const link = document.createElement("a");

  link.href = "fragment_D.txt";
  link.download = "fragment_D.txt";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}


function downloadSong(file) {
  const link = document.createElement("a");
  link.href = file;
  link.download = file.split("/").pop();
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function downloadTrack(file, name = "p2") {
  const audio = document.getElementById("audioPlayer");
  audio.src = file;

  const a = document.createElement("a");
  a.href = file;
  a.download = name || file.split("/").pop();

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  addToInventory("1MET93pmnPDVVYdBTvyjZwapZTMfuBrFA?usp=drive_link" );
}s

function addToInventory(text) {
  const inv = document.getElementById("inventoryLog");

  if (!inv) {
    console.log("inventoryLog not found");
    return;
  }

  const entry = document.createElement("div");
  entry.className = "entry";
  entry.textContent = text;

  inv.appendChild(entry);
}

function showAnswerPopup() {
  const popup = document.createElement("div");

  popup.style.position = "fixed";
  popup.style.top = "0";
  popup.style.left = "0";
  popup.style.width = "100%";
  popup.style.height = "100%";
  popup.style.background = "rgba(0,0,0,0.85)";
  popup.style.display = "flex";
  popup.style.alignItems = "center";
  popup.style.justifyContent = "center";
  popup.style.zIndex = "99999";

  popup.innerHTML = `
    <div style="
      background: #111;
      color: #fff;
      padding: 30px;
      border: 1px solid #333;
      max-width: 400px;
      text-align: center;
      font-family: monospace;
    ">
      <h2>system request</h2>
      <p>tell me the answer</p>
      <p style="opacity:0.7; margin-top:10px;">
        97110103101108s@gmail.com
      </p>
      <button id="closePopup" style="
        margin-top:20px;
        padding:10px;
        background:#222;
        color:white;
        border:1px solid #444;
        cursor:pointer;
      ">close</button>
    </div>
  `;

  document.body.appendChild(popup);

  popup.querySelector("#closePopup").onclick = () => {
    popup.remove();
  };
}


/* INIT */
renderLogs();
loadGhost();
loadSignal();
renderPrayers();
renderHeavenArchive();
updateEchoLeak();
