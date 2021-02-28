<template>
    <div>
        <!-- app contents begin -->
        <div class="app-background scrollable">
            <h1>Your Shop&nbsp;<b-icon-bag/></h1>
            <b-container fluid class="action-panel">
                <b-row>
                    <b-col align-self="start" cols="2">
                        <b-button variant="outline-success" block @click="toggleCreateProduct"><b-icon icon="plus"/>New Product</b-button>
                    </b-col>
                    <b-col cols="2">
                        <b-button :disabled="checkedList.length == 0" variant="outline-danger" block @click="handleDelete"><b-icon icon="trash"/>Delete</b-button>
                    </b-col>
                </b-row>
                <b-collapse id="product-collapse" v-model="showCreateProduct">
                        <b-card>
                            <b-form @submit.stop.prevent="handleProductCreate">
                                <b-row>
                                    <b-col cols="3">
                                        <b-form-input placeholder="ItemId" required/>
                                    </b-col>
                                    <b-col cols="3">
                                        <b-form-input placeholder="Cost" required/>
                                    </b-col>
                                    <b-col cols="2">
                                        <b-button variant="outline-success" type="submit"><b-icon-check/>Create</b-button>
                                    </b-col>
                                </b-row>
                            </b-form>
                        </b-card>
                </b-collapse>
            </b-container>

            <hr>
            <ul :style="gridStyle" v-if="getProductsList.length>0" class="product-card-list">
                <li v-bind:key="product.id" v-for="product in getProductsList">
                    <ProductItem 
                    checkable
                    :id="product.id"
                    :itemId="product.itemId"
                    :monies="product.monies" 
                    :type="product.type"
                    />
                </li>
            </ul>
            <b-card v-if="getProductsList.length == 0">This place is empty</b-card>
        </div>
    </div>
</template>

<script>
import ProductItem from "@/components/ProductItem";
// import { mapGetters } from 'vuex'

export default {
    name: "ProductEditPage",
    data() {
        return {
            numberOfColumns: 4,
            lastUpdated: 0,
            showCreateProduct: false,
            checkedList: []
        }
    },
    components: {
        ProductItem
    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumns}, minmax(100px, 1fr))`
            }
        },
        getProductsList() {
            return this.$store.state.products.list;
        }
        //...mapGetters('products', ['getProductsList'])
    },
    methods: {
        toggleCreateProduct() {
            this.showCreateProduct = !this.showCreateProduct;
        },
        hideCreateProduct() {
            this.showCreateProduct = false;
        },
        handleDelete() {
            const size = this.checkedList.length;
            if(size > 0) {
                let msg = 'Are you sure to want to delete these ' + size + ' products? There is no undo.';

                if(size == 1) msg = 'Are you sure you want to delete this product? There is no undo.';

                this.$bvModal.msgBoxConfirm(
                    msg,
                    {
                        title: 'Are you sure?',
                        okVariant: 'danger',
                        okTitle: 'YES',
                        cancelTitle: 'NO',
                        footerClass: 'p-2',
                        hideHeaderClose: false,
                        centered: true
                    }
                ).then(value => {
                    if(value) {
                        /*this.checkedList.forEach((id) => {
                            this.$api.delete.folder(id).then(payload=>{
                                this.$store.dispatch('folders/removeFolder', id);
                                const alert = { message: payload.data.data.message, type: 'info'};
                                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
                            }).catch(err=>{
                                // An error occurred
                                // We want to catch individual errors here so the loop is uninterrupted
                                const alert = { message: err.response.data.error, type: 'danger', title: 'Error Deleting'};
                                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
                            }).finally(()=>{
                                this.checkedList = [];
                            });
                        });*/
                    }
                })
                .catch(err => {
                    // An error occurred
                    const alert = { message: err, type: 'danger', title: 'Internal Error'};
                    this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
                })
            }
        },
        handleProductCreate() {
            this.busy = false; // true;

            /*this.$api.add.folder({name: this.newFolderName}).then(payload=>{
                this.$store.dispatch('folders/addFolder', payload.data.data, {namespaced: true})
                this.hideCreateFolderModal();
                const alert = { message: "New Folder '" + payload.data.data.name + "' added!", type: 'success'};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            }).catch(err=>{
                // An error occurred
                const alert = { message: err.response.data.error, type: 'danger', title:'Could Not Create'};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            }).finally(()=>{ this.busy = false; });*/
        }
    },
    mounted() {
        console.log("mounted");
        
        // Refresh folders
        this.$api.get.productsList()
        .then(response => {
            let payload = response.data;

            // products aren't shared across accounts in the same way
            // a plethroa of folders and cards are...
            // just to a fresh grab
            this.$store.dispatch('products/clearProducts');
            
            payload.data.forEach( element => {
                this.$store.dispatch('products/addProduct', element, { namespaced: true});
            });
        }).catch(err => {
            let alert = { message: err, type: "danger", title: "Internal Error" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        }).finally(()=>{
            this.lastUpdated = Date.now();
        });
    }
}
</script>

<style scoped>
.product-card-list {
  display: grid;
  grid-gap: 1em;
  padding-bottom: 20px;
  padding-top: 20px;
}

.scrollable {
    overflow-y: scroll;
}

ul {
  list-style-type: none;
}
</style>