document.addEventListener("DOMContentLoaded", function () {
    const appendItemDetailsToOffer = (e) => {
        const index            = getTagIndex("place-bid", e.target);

        // we might use "index" to get the "item id" instead and use the id, to retrieve the item's details from the DB
        // selected item name
        const selectedItemName = getTargetTagText("item-name", index);

        // selected item price
        const selectedItemPrice = getTargetTagText("item-price", index);

        getElementById("bid-offer-title").innerHTML = selectedItemName;
        getElementById("bid-offer-price").innerHTML = selectedItemPrice;
    }

    const getTargetTagText = (name, index) => {
        const targetTagList   = getByClassNames(name); // item name
        const selectedTagText = targetTagList[index].innerHTML;

        return selectedTagText;
    }

    // get item details from selected item
    const getItemDetails = () => {
        // when user clicks on "place bid"
        createOnClickEvent("place-bid", appendItemDetailsToOffer);
        // const itemNames = getByClassNames("item-name");

        // console.log();

        // const item = {
        //     const itemNames = document.getElementsByClassName("item-name");
        // };

        // return item;
    }

    getItemDetails();

    // const appendItemDetails = () => {

    // }
});

const getTagIndex = (tagName, target) => {
    const index = Array.from(getByClassNames(tagName)).indexOf(target);

    return index;
}

const getByClassNames = (name) => {
    return document.getElementsByClassName(name);
}

const getElementById = (name) => {
    return document.getElementById(name);
}

const createOnClickEvent = (targetName, fn) => {
    let targetList = getByClassNames(targetName);

    for (const target of targetList) {
        target.addEventListener("click", fn);
    }
}

const performActionOnClassNames = (targetName, fn) => {
    let targetList = getByClassNames(targetName);

    for (const target of targetList) {
        fn(target);
    }
}
