document.addEventListener("DOMContentLoaded", function () {
    const loadItems = () => {
        new FetchRequest("GET", "api/items/live").send(listOfItems, listOfItems);
    }

    const listOfItems = (items) => {
        const liveAuctionItemsSection = getElementById("live-auctions-items-section");
        const classList               = liveAuctionItemsSection.classList;

        if(items.length > 0){
            classList.remove("d-none");
        }
        else{
            classList.add("d-none");
        }
    }

    loadItems();
});