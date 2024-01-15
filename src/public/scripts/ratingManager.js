let currentRating = 0;

function makeEmpty(starNo) {
    let star = document.getElementById(`star-${starNo}`);
    star.innerHTML = `star`;
    star.className = `material-symbols-outlined star`;
}

function makeHalf(starNo) {
    let star = document.getElementById(`star-${starNo}`);
    star.innerHTML = `star_half`;
    star.className = `material-symbols-outlined star`;
}

function makeFilled(starNo) {
    let star = document.getElementById(`star-${starNo}`);
    star.innerHTML = `star`;
    star.className = `material-symbols-outlined star filled`;
}

function displayRating(rating){
    
    if (rating == currentRating){ 
        return; 
    }

    currentRating = rating;
    document.getElementById(`hiddenRating`).value = rating;
    rating -= 1;
    for(let i = 0 ; i < 5 ; i++){
        if(rating - i == -0.5){
            makeHalf(i);
        } else if (rating < i){
            makeEmpty(i);
        } else {
            makeFilled(i);
        }
    }
}

let stars = [];

for (let i = 0; i < 5 ; i++) {
    let star = document.getElementById(`star-${i}`);
    stars.push(star);
    star.addEventListener('mousemove', e => {
        let width = star.clientWidth;
        let firstHalf = width / 2;
        let mouseX = e.offsetX;
        if(mouseX > firstHalf){
            // console.log(i + 1);
            displayRating(i + 1);
        } else {
            // console.log(i + 0.5);
            displayRating(i + 0.5);
        }
    });

    star.addEventListener(`click`, e =>{
        // alert(`rated for ${currentRating}`);
        document.getElementById(`ratingForm`).submit();
    });
}
