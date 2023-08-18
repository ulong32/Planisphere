function buildMusicList () {
    let music;
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
        staminaMulti = parseInt(document.getElementById("selMulti").value)
        divMusicStamina.textContent = "消費:" + (music.stamina * staminaMulti).toString();

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

        divMusics.appendChild(divMusicItem);
    }
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


const xhr = new XMLHttpRequest();
xhr.open("GET","../data/musics.json", false);
xhr.send();
let musicData = JSON.parse(xhr.responseText);
const musicData_Original = JSON.parse(xhr.responseText);
buildMusicList();