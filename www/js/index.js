var player = {
    "name": "Anonymus",
    "level": 1,
    "start": "",
    "end": ""
};

var level2 = {
    "selected": "none",
    "solutionR": ["level2kalkopirit", "level2fluorit", "level2aragonit", "level2anhidrit", "level2pirrhotin"],
    "solutionM": ["level2pirit", "level2kvarc", "level2kalcit", "level2szfalerit", "level2galenit"],
    "solutionGy": ["level2wurtzit", "level2barit", "level2antimonit", "level2dolomit", "level2markazit"]
}

var level3 = {
    "selected": "none",
    "solution": { "level3kalkopirit": "level3tetragonalis", "level3galenit": "level3szabalyos", "level3kvarc": "level3trigonalis", "level3albit": "level3triklin", "level3wurtzit": "level3hexagonalis", "level3gipsz": "level3monoklin", "level3barit": "level3rombos" },
    "currentm": { "level3kalkopirit": "level3asvanyok", "level3galenit": "level3asvanyok", "level3kvarc": "level3asvanyok", "level3albit": "level3asvanyok", "level3wurtzit": "level3asvanyok", "level3gipsz": "level3asvanyok", "level3barit": "level3asvanyok" },
    "currentc": { "level3tetragonalis": "none", "level3szabalyos": "none", "level3trigonalis": "none", "level3triklin": "none", "level3hexagonalis": "none", "level3monoklin": "none", "level3rombos": "none", "level3asvanyok": "none"}
}

function level1Click() {
    let name = document.getElementById("level1Name").value;
    if (name.trim().length > 1) {
        player.name = name.trim();
        player.start = new Date();
        document.getElementById("level14Name").innerHTML = player.name;
        nextLevel();
    } else {
        document.getElementById("level1Error").classList.remove("none");
    }
}

function level2Click() {
    let score = 0;
    for (let i = 0; i < level2.solutionR.length; i++) {
        if (document.getElementById(level2.solutionR[i]).parentElement.id == "level2R") {
            score++;
        }
    }
    for (let i = 0; i < level2.solutionM.length; i++) {
        if (document.getElementById(level2.solutionM[i]).parentElement.id == "level2M") {
            score++;
        }
    }
    for (let i = 0; i < level2.solutionGy.length; i++) {
        if (document.getElementById(level2.solutionGy[i]).parentElement.id == "level2Gy") {
            score++;
        }
    }
    if (score == 15) {
        nextLevel();
    } else {
        score = 15 - score;
        document.getElementById("level2Score").innerHTML = score;
        document.getElementById("level2Error").classList.remove("none");
    }
}

function level2ClickMinerals(id) {
    if (!(level2.selected == "none")) {
        document.getElementById(level2.selected).classList.remove("borderblue");
    }
    document.getElementById(id).classList.add("borderblue");
    level2.selected = id;
}

function level2ClickContainer(id) {
    if (!(level2.selected == "none")) {
        document.getElementById(id).appendChild(document.getElementById(level2.selected));
        document.getElementById(level2.selected).classList.remove("borderblue");
        level2.selected = "none";
    }
}

function level3ClickMinerals(id) {
    if (!(level3.selected == "none")) {
        document.getElementById(level3.selected).classList.remove("borderblue");
    }
    document.getElementById(id).classList.add("borderblue");
    level3.selected = id;
}

function level3ClickContainer(id) {
    if (!(level3.selected == "none")) {
        if (level3.currentm[level3.selected] != "level3asvanyok") {
            level3.currentc[level3.currentm[level3.selected]] = "none";
        }
        if (level3.currentc[id] != "none") {
            document.getElementById("level3asvanyok").appendChild(document.getElementById(level3.currentc[id]));
            level3.currentm[level3.currentc[id]] = "level3asvanyok";
            level3.currentc[id] = "none";
        }
        if (id != "level3asvanyok") {
            level3.currentc[id] = level3.selected;
        }
        level3.currentm[level3.selected] = id;
        document.getElementById(id).appendChild(document.getElementById(level3.selected));
        document.getElementById(level3.selected).classList.remove("borderblue");
        level3.selected = "none";
    }
}

function level3Click() {
    let score = 0;
    for (let i in level3.solution) {
        if (level3.solution[i] == level3.currentm[i]) {
            score++;
        }
    }
    if (score == 7) {
        nextLevel();
    } else {
        score = 7 - score;
        document.getElementById("level3Score").innerHTML = score;
        document.getElementById("level3Error").classList.remove("none");
    }
}

function level4Click() {
    let name = document.getElementById("level4Name").value;
    if (name.trim().toUpperCase() == "S") {
        nextLevel();
    } else {
        document.getElementById("level4Error").classList.remove("none");
    }
}

function level5Click() {
    let name = document.getElementById("level5Name").value;
    if (name.trim().toUpperCase() == "K") {
        nextLevel();
    } else {
        document.getElementById("level5Error").classList.remove("none");
    }
}

function level6Click() {
    let name = document.getElementById("level6Name").value;
    if ((name.trim().toUpperCase() == "YUCATÁN") || (name.trim().toUpperCase() == "YUCATAN") || (name.trim().toUpperCase() == "YUCATÁN-FÉLSZIGET") || (name.trim().toUpperCase() == "YUCATAN-FELSZIGET")) {
        nextLevel();
    } else {
        document.getElementById("level6Error").classList.remove("none");
    }
}

function level7Click() {
    let name = document.getElementById("level7Name").value;
    if (name.trim().toUpperCase() == "HIALIT")  {
        nextLevel();
    } else {
        document.getElementById("level7Error").classList.remove("none");
    }
}

function nextLevel() {
    if (player.level < 14) {
        document.getElementById("level" + player.level).classList.add("none");
        player.level++;
        document.getElementById("level" + player.level).classList.remove("none");
        let status = "● ";
        let i = 1;
        for (i; i < player.level; i++) {
            status += "●";
            if ((i % 3) == 0) {
                status += " ";
            }
        }
        for (i; i < 14; i++) {
            status += "○";
            if ((i % 3) == 0) {
                status += " ";
            }
        }
        document.getElementById("status").innerHTML = status;
        if ((player.level > 2) && (player.level < 14)) {
            addLetter("letter" + (player.level - 2));
        }
    }
}

function addLetter(id) {
    document.getElementById("containerLetters").appendChild(document.getElementById(id));
    document.getElementById(id).classList.remove("none");
}