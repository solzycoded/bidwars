import Category from "../components/SellAnItem/Category/Section.jsx";
import ItemName from "../components/SellAnItem/ItemName/Section.jsx";
import ImageUpload from "../components/SellAnItem/ImageUpload/Section.jsx";
import ItemCondition from "../components/SellAnItem/ItemCondition/Section.jsx";
import ItemPrice from "../components/SellAnItem/ItemPrice/Section.jsx";
import ItemSalePeriod from "../components/SellAnItem/ItemSalePeriod/Section.jsx";

import "../assets/css/sell-an-item.css";

const SellAnItem = () => {
    return (
        <main id="main-section">
            <div className="mb-3">
                <h3 className="link-offset-3">Sell your Item (<span id="sell-an-item-position" className="sell-an-item-position fw-lighter">1</span>/6)</h3>
                <p className="text-danger d-none create-item-error"></p>
            </div>

            <Category />
            <ItemName />
            <ImageUpload />
            <ItemCondition />
            <ItemPrice />
            <ItemSalePeriod />

            <div className="mt-4">
                <input type="hidden" id="user-id" value="$userId}" />
                <div className="d-inline">
                    <button type="button" id="prev-section" className="btn btn-dark disabled fs-4" onClick="prevSection()">Prev</button>
                </div>
                <div className="d-inline float-end" id="next-item-section">
                    <button type="button" id="next-section" className="btn btn-dark fs-4" onClick="nextSection()">Next</button>
                </div>
                <div className="d-inline float-end d-none" id="submit-item-section">
                    <button type="submit" id="submit-item" className="btn btn-dark fs-4" onClick="createItem()">Finish</button>
                </div>
            </div>
        </main>
    )
}

export default SellAnItem;
{/* 
<script>
    export default {
        computed: {
            userId(){
                return this.$store.state.auth.id;
            },
            userIsLoggedIn(){
                return this.$store.getters.isLoggedIn;
            },
            userIsAdmin(){
                return this.$store.state.auth.role=='admin';
            }
        },
        mounted() {
            if(!this.userIsLoggedIn){
                this.$router.push("login");
            }
            if(this.userIsLoggedIn && this.userIsAdmin){
                this.$router.push("");
            }

            // change the position of the current body to 0
            pos = 0;
        }
    }
</script> */}