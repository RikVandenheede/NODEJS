let msg1 = document.getElementById("msg1");
let msg2 = document.getElementById("msg2");

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const userInput = document.getElementById("userInput").value;
    msg1.innerText = "loading...";
    msg2.innerText = "";
    
    fetch(`http://localhost:3000/weather?address=${userInput}`)
    .then((response) => response.json())
    .then((data) => {
        if(data.error) {
           return msg1.innerText = data.error;
        }
        msg1.innerText = data.forecast;
        msg2.innerText = data.location;
    })
    .catch((error) => console.log(error));
})

