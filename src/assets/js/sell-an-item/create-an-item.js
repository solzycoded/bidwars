const createItem = (item) => {
    const proceed = confirmAction();

    if(proceed){
        // ...
    }
}

const confirmAction = () => {
    return confirm("You won't be able to edit your item once you submit it! Do you want to proceed?");
}