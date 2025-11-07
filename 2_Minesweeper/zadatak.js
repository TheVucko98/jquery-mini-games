$(document).ready(function (){
    let tdS = $("td");
    tdS.css({"pointer-events":"auto"});

    for (let i = 0; i < tdS.length; i++) {
        $(tdS[i]).attr("id", i);
    }
    
    let brojBombi = prompt("Broj bombi?");
    while(isNaN(parseInt(brojBombi)) || parseInt(brojBombi) < 1 || parseInt(brojBombi) >16){
        brojBombi = prompt("Broj bombi?");
    }
    let brojOpolja = 16 - parseInt(brojBombi);
    // Niz bombi
    let nizCelija = new Array(16).fill(0);
    popuniCelijaBrojBombi(nizCelija, brojBombi)
    ispisiMatricuConsole(nizCelija);

    tdS.click(function (){

        if(nizCelija[parseInt($(this).attr("id"))] === 1){
            for (let i = 0; i < tdS.length; i++) {
                $(tdS[i]).css("background-color", "red");
            }
            setTimeout(function (){
                alert("Izgubili ste!")
                location.reload()
            }, 1000)
        }else{
            let id = parseInt($(this).attr("id"));
            $(tdS[id]).css("background-color", "green");
            let br = 0;
            let celijaOff = id % 4;
            let red = id - celijaOff % 4;

            for (let i = red; i < red + 4; i++) {
                if(nizCelija[i] === 1 ){
                    br++;
                }
            }
            for (let i = 0; i <  4; i++) {
                if(nizCelija[i*4+celijaOff] === 1){
                    br++;
                }
            }
            // dijagonalno
            // levo gore
            for (let i = 0; i <  red/4 ; i++) {
                if(id - red > i){ // Da li ima  levo
                    if(nizCelija[id - (i  + 1)*5] === 1){
                        br++;
                    }
                }
            }
            // desno gore
            for (let i = 0; i <  red/4 ; i++) {
                if(id - red + i < 3 ){ // Da li ima  desno
                    if(nizCelija[id - (i  + 1)*3] === 1){
                        br++;
                    }
                }
            }
            // dole levo
            for (let i = 0; i < 3 - red/4 ; i++) {
                if(id - red > i){ // Da li ima  levo
                    if(nizCelija[id + (i  + 1)*3] === 1){
                        br++;
                    }
                }
            }

             // dole desno
            for (let i = 0; i < 3 - red/4 ; i++) {
                if(id - red + i < 3 ) { // Da li ima  desno
                    if(nizCelija[id + (i  + 1)*5] === 1){
                        br++;
                    }
                }
            }
            $(tdS[id]).text(br);
            brojOpolja--;
            if(brojOpolja === 0){
                setTimeout(function (){
                    alert("Pobedili ste!")
                    location.reload()
                }, 0)
            }

        }

    })


    function popuniCelijaBrojBombi(nizCelija, brojBombi){
        let izabranaMesta = []
        while(izabranaMesta.length < brojBombi){
            let broj = Math.floor(Math.random() * 16) ;
            let ima = false;
            for (let i = 0; i < izabranaMesta.length; i++) {
                if(izabranaMesta[i] === broj){
                    ima = true;
                }
            }
            if(ima !== true){
                izabranaMesta.push(broj);
            }
        }
        for (let i = 0; i < izabranaMesta.length; i++) {
            nizCelija[izabranaMesta[i]] = 1;
        }
    }

    function ispisiMatricuConsole(nizCelija){
        for (let i = 0; i <= 3; i++) {
            for (let j = 0; j <= 3; j++) {
                if(nizCelija[i*4 + j] === 1){
                    console.log("X");
                }else{
                    console.log("O");
                }
            }
            console.log("\n");
        }
    }


})