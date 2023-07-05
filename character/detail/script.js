window.addEventListener("DOMContentLoaded", () => {
    const param = new URLSearchParams(window.location.search);
    if (param.has("p")) {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", "../../data/characters.json");
        xhr.onload = function () {
            const charaData = JSON.parse(this.responseText);
            console.log(param.get("p"));
            charaData.forEach(data => {
                if (data["label"] === param.get("p")) {
                    buildCharaDetail(data);
                }
            })

        }
        xhr.send();
    }

})

function buildCharaDetail(charaData) {
    console.log("build");
    const charaDetailArea = document.createElement("div");
    charaDetailArea.innerText = JSON.stringify(charaData);
    document.getElementById("chara-container").appendChild(charaDetailArea);
}