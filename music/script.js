function buildMusicList () {
    let music = {};
    const divMusics = document.getElementById("divMusics");
    let divMusicItem;
    let divMusicTitle, divMusicStamina, divMusicSingers,divMusicDifficulties;

    while(divMusics.firstChild) {
        divMusics.removeChild(divMusics.firstChild);
    }
    for(let i=0; i < musicData.length; i++) {
        music = musicData[i];
        divMusicTitle = document.createElement("div");
        divMusicTitle.classList.add("music-item_title")
        divMusicTitle.textContent = music.title;

        divMusicStamina = document.createElement("div");
        divMusicStamina.classList.add("music-item_stamina");
        staminaMulti = parseInt(document.getElementById("selMulti").value);
        staminaVal = parseInt(document.getElementById("numStamina").value);
        divMusicStamina.textContent = "消費:" + (music.stamina * staminaMulti).toString() + " ("+Math.floor(staminaVal / (music.stamina * staminaMulti)) + "回)"

        divMusicSingers = document.createElement("div");
        divMusicSingers.classList.add("music-item_singer")
        divMusicSingers.textContent = music.singer.join(",");

        divMusicDifficulties = document.createElement("div");
        divMusicDifficulties.textContent = "難易度:" + music.difficulty.join(",");

        divMusicItem = document.createElement("div");
        divMusicItem.classList.add("music-container_item");
        divMusicItem.appendChild(divMusicTitle);
        divMusicItem.appendChild(divMusicSingers);
        divMusicItem.appendChild(divMusicStamina);
        divMusicItem.appendChild(divMusicDifficulties);

        console.table(music);
        divMusicItem.addEventListener("click", (e) => {
            if(document.getElementById("divDetail").classList.contains("activeElm") === false) {
                showDetail(musicData[i]);
                e.stopPropagation();
            }
        })

        divMusics.appendChild(divMusicItem);
    }
}

function showDetail(songInfo) {
    const divDetail = document.getElementById("divDetail");
    document.getElementById("detailTitle").textContent = songInfo.title;
    document.getElementById("detailSinger").textContent = songInfo.singer.join(",");
    document.getElementById("detailLylicist").textContent = "作詞: " + songInfo.lylicist;
    document.getElementById("detailComposer").textContent = "作曲: " + songInfo.composer;
    document.getElementById("detailArranger").textContent = "編曲: " + songInfo.arranger;
    document.getElementById("detailBPM").textContent = "BPM: " + songInfo.bpm.toString();
    document.getElementById("detailStamina").textContent = "スタミナ消費: " + songInfo.stamina.toString();
    document.getElementById("detailDifficulty").textContent = "難易度: " + songInfo.difficulty.join(",");

    console.log("activate")
    divDetail.classList.add("activeElm");
    divDetail.animate(
        {
            transform: ["scale(0.05)", "scale(1)"],
            visibility: ["hidden", "visible"],
            opacity: [0,1]
        },
        {
            duration: 150,
            fill: "both",
            easing: "ease"
        }
    )
    window.addEventListener("click",(e) => {
        const divDetail = document.getElementById("divDetail")
        if(e.target.closest("#divDetail") === null && divDetail.classList.contains("activeElm")) {
            divDetail.classList.remove("activeElm");
            divDetail.animate(
                {
                    transform: ["scale(1)","scale(0.05)"],
                    visibility: ["visible", "hidden"],
                    opacity: [1,0]
                },
                {
                    duration: 150,
                    fill: "both",
                    easing: "ease-out"
                }
            )

        }
    });
}

document.getElementById("selOrder").addEventListener("change", function () {
    const mode = this.value.split("_");
    if(this.value === "default") {
        console.log("a");
        musicData = musicData_Original.concat();
    }else if(mode[1] === "asc") {
        musicData.sort((a,b) => {
            return (a[mode[0]] < b[mode[0]]) ? -1 : 1;
        })
    }else if(mode[1] === "dsc") {
        musicData.sort((a,b) => {
            return (a[mode[0]] > b[mode[0]]) ? -1 : 1;
        })
    }
    buildMusicList();
})



document.getElementById("selMulti").addEventListener("change", () => {
    buildMusicList();
})

document.getElementById("numStamina").addEventListener("input", () => {
    buildMusicList();
})

document.getElementById("btnDetailClose").addEventListener("click", () => {
    document.getElementById("divDetail").classList.remove("activeElm");
    divDetail.animate(
        {
            transform: ["scale(1)","scale(0.05)"],
            visibility: ["visible", "hidden"],
            opacity: [1,0]
        },
        {
            duration: 150,
            fill: "both",
            easing: "ease-out"
        }
    )
})

const xhr = new XMLHttpRequest();
xhr.open("GET","../data/musics.json", false);
xhr.send();
let musicData = JSON.parse(xhr.responseText);
const musicData_Original = JSON.parse(xhr.responseText);
buildMusicList();