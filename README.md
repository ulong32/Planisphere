# Planisphere
Unofficial database for World Dai Star.

## About
ワールドダイスターの非公式データベース（予定）

## Data Structure
データベースはJSONで記入されています。

値のない項目はすべて`null`で埋めます。

現在データベース構築中のため、データ構造が変化する可能性もあります。

### データ例
```js
{
    "label": "Otori_Kokona",        //ラベル。一意の値をつける。
    "name": {                       //フルネーム。日本語、英語を記入。
        "ja": "鳳ここな",
        "en": "Otori Kokona"
    },
    "nameKana": "おおとりここな",    //フルネームの仮名。
    "familyName": {                 //苗字。
        "ja": "鳳",
        "en": "Otori"
    },
    "familyNameKana": "おおとり",   //苗字の仮名。
    "givenName": {                  //名前。
        "ja": "ここな",
        "en": "Kokona"
    },
    "givenNameKana": "ここな",      //名前の仮名。
    "age": 16,                      //年齢。
    "birthday": null,               //誕生日。MM-DDで記入。
    "grade": 11,                    //学年。小学校から通算した値。
    "birthPlace": null,             //出身地。日本語、英語を記入。
    "troupe": "シリウス",           //所属している劇団。
    "sense": "一人二役",            //センス。
    "senseRuby": "ダブルロール",    //センスのルビ。
    "cast": "Iwami_Manaka"         //キャストのラベル。
}
```
