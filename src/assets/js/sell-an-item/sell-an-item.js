let sections = document.getElementsByClassName("sell-your-item-section");
let pos      = 0;

const changePos = (increase = false) => {
    let posIndicator = document.getElementById("sell-an-item-position");

    pos = increase ? pos + 1 : pos - 1;

    if(pos >= sections.length - 1){
        pos = sections.length - 1;
        // disable next button
        toggleBtns("next", false);
    }
    else if(pos <= 0){
        pos = 0;
        // disable next button
        toggleBtns("prev", false);
    }
    else{
        // enable next and prev buttons
        toggleBtns("next", true);
        toggleBtns("prev", true);
    }

    posIndicator.innerHTML = pos + 1;
}

const changeDisplay = () => {
    sections[pos].classList.add("active-section");

    for (let index = 0; index < sections.length; index++) {
        if(index==pos)
            continue;

        sections[index].classList.remove("active-section");
    }
}

const nextSection = () => {
    changePos(true);
    changeDisplay();
}

const prevSection = () => {
    changePos(false);
    changeDisplay();
}

const toggleBtns = (prefix, enable) => {
    let target   = document.getElementById(`${prefix}-section`);

    let targetClassList = target.classList;

    if(enable){
        targetClassList.remove("disabled");
    }
    else{
        targetClassList.add("disabled");
    }
}