
// import Category from "../components/SellAnItem/Category/Section.vue";
// import ItemName from "../components/SellAnItem/ItemName/Section.vue";
// import ImageUpload from "../components/SellAnItem/ImageUpload/Section.vue";
// import ItemCondition from "../components/SellAnItem/ItemCondition/Section.vue";
// import ItemPrice from "../components/SellAnItem/ItemPrice/Section.vue";
// import ItemSalePeriod from "../components/SellAnItem/ItemSalePeriod/Section.vue";


const CreateItem = () => {
    return (
        <main id="main-section">
            <div className="mb-3">
                <h4 className="link-offset-3">Sell your Item (<span id="sell-an-item-position" className="sell-an-item-position fw-lighter">1</span>/6)</h4>
                <p className="text-danger d-none create-item-error"></p>
            </div>

            {/* <Category></Category>
            <ItemName></ItemName>
            <ImageUpload></ImageUpload>
            <ItemCondition></ItemCondition>
            <ItemPrice></ItemPrice>
            <ItemSalePeriod></ItemSalePeriod> */}

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

export default CreateItem;
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