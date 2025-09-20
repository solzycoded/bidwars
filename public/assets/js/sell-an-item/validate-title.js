let titleErrorEl = null;

const validateTitle = (target) => {
    let title = target.value;

    if(title){
        titleErrorEl = target.nextSibling;

        new FetchRequest("GET", `api/items/check-title/${title}`).send(success, failure);
    }
    else{
        success(null);
    }
}

const success = (data) => {
    toggleErrMessage("");
    toggleBtns("next", true);
}

const failure = (data) => {
    toggleErrMessage(data.message);
    toggleBtns("next", false);
}

const toggleErrMessage = (message) => {
    titleErrorEl.innerHTML = message;
}