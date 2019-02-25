const inpuForm = document.querySelector(".js-textInput"),
    userInput = inpuForm.querySelector("input"),
    buttonForm = document.querySelector(".js-startButton");

function handleClick(){
    console.log("in handleClick");
}

function handleSubmit(event){
    event.preventDefault();
    console.log(userInput.value);
    handleClick();
}

function init(){
    inpuForm.addEventListener("submit", handleSubmit);
    buttonForm.addEventListener("click", handleClick)
}

init()
