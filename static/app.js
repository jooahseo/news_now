// ************ carousel ************
let items = document.querySelectorAll('.carousel .carousel-item')

items.forEach((el) => {
    const minPerSlide = 4
    let next = el.nextElementSibling
    for (var i=1; i<minPerSlide; i++) {
        if (!next) {
            // wrap carousel by using first child
        	next = items[0]
      	}
        let cloneChild = next.cloneNode(true)
        el.appendChild(cloneChild.children[0])
        next = next.nextElementSibling
    }
})

/** Add event listeners to buttons in the main ('/') page */

const btns = document.querySelectorAll('.saveBtnHome')

for(let i=0; i<btns.length; i++){
    btns[i].addEventListener("click", function(e){
        // window.location.reload();
        if(e.target.classList.contains("saved")){ //news already saved. 
            removeNewsFromHome(e)
            e.target.innerHTML= "Save"
            e.target.classList.toggle("saved")
        }else{ // needs to save news
            saveNewsFromHome(e)
            e.target.innerHTML= "Saved"
            e.target.classList.toggle("saved")
        }
    })
}


/** Add event listeners to buttons in the search ('/news') page */

const searchBtns = document.querySelectorAll('.saveBtnSearch')

for(let i=0; i< searchBtns.length; i++){
    searchBtns[i].addEventListener("click", function(e){
        if(e.target.classList.contains("saved")){ //news already saved. 
            removeNewsFromSearch(e)
            e.target.innerHTML= "Save"
            e.target.classList.toggle("saved")
        }else{ // needs to save news
            saveNewsFromSearch(e)
            e.target.innerHTML= "Saved"
            e.target.classList.toggle("saved")
        }
    })
}

/** Functions to request to server: saving news data for user */

async function saveNewsFromHome(e){
    const cardBody = e.target.nextElementSibling.nextElementSibling;

    const url = cardBody.children[3].href;
    const title = cardBody.children[0].innerHTML;
    const description = cardBody.children[2].innerHTML.trim();
    const date = cardBody.children[1].innerHTML;
    const image = e.target.nextElementSibling.src;

    res = await axios.post('/save-news', {url, title, description, date, image})
}

async function removeNewsFromHome(e){
    const cardBody = e.target.nextElementSibling.nextElementSibling;
    const url = cardBody.children[3].href;

    await axios.post('/unsave-news',{url})
}

async function saveNewsFromSearch(e){
    const cardBody = e.target.nextElementSibling.children[1].children[0];

    const url = cardBody.children[3].href;
    const title = cardBody.children[0].innerHTML;
    const description = cardBody.children[1].innerHTML;
    const date = cardBody.children[2].innerHTML;
    const image = e.target.nextElementSibling.children[0].children[0].src;

    res = await axios.post('/save-news', {url, title, description, date, image})
}

async function removeNewsFromSearch(e){
    const cardBody = e.target.nextElementSibling.children[1].children[0];
    const url = cardBody.children[3].href;

    await axios.post('/unsave-news',{url})
}
