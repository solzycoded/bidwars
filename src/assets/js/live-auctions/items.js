import { createApp, ref } from 'vue/dist/vue.esm-bundler'

createApp({
    data() {
        return {
            liveAuctionItems: [],
            hasLiveItems: false
        }
    },
    methods: {
        loadItems() {
            new FetchRequest("GET", "api/items/live").send(this.listOfItems, this.listOfItems);
        },
        listOfItems(items) {
            this.liveAuctionItems = items;
            this.hasLiveItems     = items.length > 0;
        }
    },
    mounted: function(){
        this.loadItems();
    }
}).mount('#main-section');

// document.addEventListener("DOMContentLoaded", function () {
//     const loadItems = () => {
//         new FetchRequest("GET", "api/items/live").send(listOfItems, listOfItems);
//     }

//     const listOfItems = (items) => {
//         // console.log(items);
//         // const liveAuctionItemsSection = getElementById("live-auctions-items-section");
//         // const classList               = liveAuctionItemsSection.classList;

//         // if(items.length > 0){
//         //     classList.remove("d-none");
//         // }
//         // else{
//         //     classList.add("d-none");
//         // }
//     }

//     loadItems();
// });