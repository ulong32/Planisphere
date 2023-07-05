window.addEventListener("DOMContentLoaded", () => {
    console.log("init");
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../data/characters.json");
    xhr.onload = function () {
        buildCharaData(JSON.parse(this.responseText));
    };
    xhr.send();
});

function buildCharaData(charaData) {
    const divCharaContainer = document.getElementById("characters-container");
    let divCharaArea, divCharaName, divCharaNameKana;
    charaData.forEach(chara => {
        divCharaArea = document.createElement("a");
        divCharaName = document.createElement("div");
        divCharaNameKana = document.createElement("div");
        divCharaName.innerText = chara["name"]["ja"];
        divCharaNameKana.innerText = chara["nameKana"];
        divCharaArea.classList.add("characters-container_item");
        divCharaName.classList.add("characters-container_name");
        divCharaNameKana.classList.add("characters-container_nameKana");
        divCharaArea.href = `./detail?p=${chara["label"]}`
        console.log(chara["label"])
        divCharaArea.appendChild(divCharaNameKana);
        divCharaArea.appendChild(divCharaName);
        divCharaContainer.appendChild(divCharaArea);
    })

}