var player = {
    "name": "Anonymus",
    "level": 1,
    "start": "",
    "end": ""
};

var level2 = {
    "selected": "none",
    "solutionR": ["level2fluorit", "level2aragonit", "level2anhidrit", "level2pirrhotin"],
    "solutionM": ["level2kalkopirit", "level2pirit", "level2kvarc", "level2kalcit", "level2szfalerit", "level2galenit"],
    "solutionGy": ["level2wurtzit", "level2barit", "level2antimonit", "level2dolomit", "level2markazit"]
}

var level3 = {
    "selected": "none",
    "solution": { "level3kalkopirit": "level3tetragonalis", "level3galenit": "level3szabalyos", "level3kvarc": "level3trigonalis", "level3albit": "level3triklin", "level3wurtzit": "level3hexagonalis", "level3gipsz": "level3monoklin", "level3barit": "level3rombos" },
    "currentm": { "level3kalkopirit": "level3asvanyok", "level3galenit": "level3asvanyok", "level3kvarc": "level3asvanyok", "level3albit": "level3asvanyok", "level3wurtzit": "level3asvanyok", "level3gipsz": "level3asvanyok", "level3barit": "level3asvanyok" },
    "currentc": { "level3tetragonalis": "none", "level3szabalyos": "none", "level3trigonalis": "none", "level3triklin": "none", "level3hexagonalis": "none", "level3monoklin": "none", "level3rombos": "none", "level3asvanyok": "none" }
}

var level9 = {
    "selected": ["none", "none", "none", "none", "none"],
    "group": [["level9answer1", "level9answer2", "level9answer3"], ["level9answer4", "level9answer5", "level9answer6"], ["level9answer7", "level9answer8", "level9answer9"], ["level9answer10", "level9answer11", "level9answer12"], ["level9answer13", "level9answer14", "level9answer15"]]
}

var letter = {
    "selected": "none",
    "order": ["letter1", "letter2", "letter3", "letter4", "letter5", "letter6", "letter7", "letter8", "letter9", "letter10", "letter11",],
    "solution": ["letter6", "letter1", "letter7", "letter8", "letter9", "letter2", "letter11", "letter5", "letter3", "letter10", "letter4"],
    "dict": { "letter9": "letter10", "letter10": "letter9", "letter11": "letter2", "letter2": "letter11" }
}

function letterClick(id) {
    if (player.level == 14) { return; }
    if (letter.selected == "none") {
        letter.selected = id;
        document.getElementById(id).classList.add("fontsize25");
        return;
    }
    if (letter.selected == id) {
        letter.selected = "none";
        document.getElementById(id).classList.remove("fontsize25");
    } else {
        let select = 0;
        let replace = 0;
        for (let i = 0; i < letter.order.length; i++) {
            if (letter.selected == letter.order[i]) {
                select = i;
            }
            if (id == letter.order[i]) {
                replace = i;
            }
        }
        letter.order[select] = id;
        letter.order[replace] = letter.selected;
        document.getElementById(letter.selected).classList.remove("fontsize25");
        letter.selected = "none";
        for (let i = 0; i < letter.order.length; i++) {
            document.getElementById("containerLetters").appendChild(document.getElementById(letter.order[i]));
        }
    }
    if (player.level == 13) {
        let score = 0;
        for (let i = 0; i < letter.order.length; i++) {
            if (letter.order[i] == letter.solution[i]) {
                score++;
            } else {
                if (letter.order[i] in letter.dict) {
                    if (letter.dict[letter.order[i]] == letter.solution[i]) {
                        score++;
                    }
                }
            }
        }
        if (score == 11) {
            player.end = new Date();
            let time = Math.round((player.end - player.start) / 60000);
            document.getElementById("level14Time").innerHTML = time;
            nextLevel();
        }
    }
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
    if (name.trim().toUpperCase() == "HIALIT") {
        nextLevel();
    } else {
        document.getElementById("level7Error").classList.remove("none");
    }
}

function level8Click() {
    let name = document.getElementById("level8Name").value;
    if (name.trim().toUpperCase() == "V") {
        nextLevel();
    } else {
        document.getElementById("level8Error").classList.remove("none");
    }
}

function level9answerClick(id) {
    let question = 0;
    for (let i = 0; i < level9.group.length; i++) {
        if (level9.group[i].includes(id)) {
            for (let j = 0; j < level9.group[i].length; j++) {
                document.getElementById(level9.group[i][j]).classList.remove("borderbrown");
            }
            question = i;
            break;
        }
    }
    level9.selected[question] = id;
    document.getElementById(id).classList.add("borderbrown");
}

function level9Click() {
    let score = 0;
    if (level9.selected[0] == "level9answer1") { score++; }
    if (level9.selected[1] == "level9answer5") { score++; }
    if (level9.selected[2] == "level9answer9") { score++; }
    if (level9.selected[3] == "level9answer10") { score++; }
    if (level9.selected[4] == "level9answer13") { score++; }
    if (score == 5) {
        nextLevel();
    } else {
        score = 5 - score;
        document.getElementById("level9Score").innerHTML = score;
        document.getElementById("level9Error").classList.remove("none");
    }
}

function level10Click() {
    let name = document.getElementById("level10Name").value;
    if ((name.trim().toUpperCase() == "ORMÁNYOSOK") || (name.trim().toUpperCase() == "ORMANYOSOK") || (name.trim().toUpperCase() == "ORMÁNYOS") || (name.trim().toUpperCase() == "ORMANYOS")) {
        nextLevel();
    } else {
        document.getElementById("level10Error").classList.remove("none");
    }
}

function level11Click() {
    let name = document.getElementById("level11Name").value;
    if (name.trim().toUpperCase() == "O") {
        nextLevel();
    } else {
        document.getElementById("level11Error").classList.remove("none");
    }
}

function level12Click() {
    let name = document.getElementById("level12Name").value;
    if ((name.trim().toUpperCase() == "MADAGASZKÁR") || (name.trim().toUpperCase() == "MADAGASZKAR") || (name.trim().toUpperCase() == "MADAGASCAR")) {
        nextLevel();
    } else {
        document.getElementById("level12Error").classList.remove("none");
    }
}

function level13Click() {
    let name = document.getElementById("level13Name").value;
    if ((name.trim().toUpperCase() == "HÉVFORRÁSOK") || (name.trim().toUpperCase() == "HEVFORRASOK") || (name.trim().toUpperCase() == "HÉVFORRASOK") || (name.trim().toUpperCase() == "HEVFORRÁSOK")) {
        nextLevel();
        player.end = new Date();
        let time = Math.round((player.end - player.start) / 60000);
        document.getElementById("level14Time").innerHTML = time;
    } else {
        document.getElementById("level13Error").classList.remove("none");
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
    if (player.level == 14) {
        for (let i = 0; i < letter.solution.length; i++) {
            document.getElementById("containerLetters").appendChild(document.getElementById(letter.solution[i]));
            document.getElementById(letter.solution[i]).classList.remove("fontsize25");
        }
    }
}

function addLetter(id) {
    document.getElementById("containerLetters").appendChild(document.getElementById(id));
    document.getElementById(id).classList.remove("none");
}