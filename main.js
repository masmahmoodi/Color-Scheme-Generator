let colorsContainer = document.querySelector(".color-container")
let chooseColor = document.querySelector(".color-input")
let form = document.querySelector(".header-container")


form.addEventListener("submit",(e)=>{
    e.preventDefault()
    const colorMode = document.querySelector(".color-mode").value
    fetch(`https://www.thecolorapi.com/scheme?hex=${chooseColor.value.substr(1)}&mode=${colorMode}`)
    .then(response => response.json())
    .then(data =>{
        placingHtml(data)
    })
})

fetch(`https://www.thecolorapi.com/scheme?hex=${chooseColor.value.substr(1)}`)
.then(response => response.json())
.then(data => {
   placingHtml(data)

})


function placingHtml(data){
    let html = ``
    for (let i of data.colors){
       html +=`
            <div data-color="${i.hex.value}">
                <img src="${i.image.bare}"  >
                <p>${i.hex.value}</p>
            </div>
       `
    }

    colorsContainer.innerHTML = html
}



function copyColorValue(colorValue) {
    navigator.clipboard.writeText(colorValue)
}


colorsContainer.addEventListener("click", (e) => {
    const colorValue = e.target.closest("div").dataset.color;
    if (colorValue) {
        copyColorValue(colorValue);
        colorValuePopup();
    }
})

function colorValuePopup() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Color copied!',
        showConfirmButton: false,
        timer: 1500
    })
}
