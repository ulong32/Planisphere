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
        divMusicStamina.classList.add("music-item_stamina")
        divMusicStamina.textContent = "消費:" + music.stamina.toString();

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

let musicData = [];

const xhr = new XMLHttpRequest();
xhr.open("GET","../data/musics.json");
xhr.onload = function () {
    musicData = JSON.parse(this.responseText)
    buildMusicList();
}
xhr.send()

document.getElementById("selOrder").addEventListener("change", function () {
    const mode = this.value.split("_")
    if(mode[1] === "asc") {
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

