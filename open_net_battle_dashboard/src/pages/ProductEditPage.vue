<template>
    <div class="app-background">
        <!-- app contents begin -->
        <b-tabs >
            <b-tab title="Shop" active>
                <div class="scrollable">
                <h1>Server Shop&nbsp;<b-icon-bag/></h1>
                <b-container fluid class="action-panel">
                    <b-row>
                        <b-col align-self="start" cols="2">
                            <b-button variant="outline-success" block @click="toggleCreateProduct"><b-icon icon="plus"/><div class="no-mobile-text">New Product</div></b-button>
                        </b-col>
                        <b-col cols="2">
                            <b-button :disabled="checkedList.length == 0" variant="outline-danger" block @click="handleDelete"><b-icon icon="trash"/><div class="no-mobile-text">Delete</div></b-button>
                        </b-col>
                    </b-row>
                    <b-collapse id="product-collapse" v-model="showCreateProduct">
                            <b-card>
                                <b-form @submit.stop.prevent="handleProductCreate">
                                    <b-row>
                                        <b-col cols="3">
                                            <b-form-select v-model="selectedProduct" :options="newProductOptions" required></b-form-select>
                                        </b-col>
                                        <b-col cols="3">
                                            <b-form-input v-model="newProductCost" placeholder="Cost" required/>
                                        </b-col>
                                        <b-col cols="2">
                                            <b-button
                                                :disabled="selectedProduct==null"
                                                v-on:click="createNewProduct()"  
                                                variant="outline-success" 
                                                type="submit">
                                                <b-icon-check/>Create
                                            </b-button>
                                        </b-col>
                                    </b-row>
                                </b-form>
                            </b-card>
                    </b-collapse>
                </b-container>

                <hr>
                <ul :style="gridStyle" v-if="getProductsList.length>0" class="product-card-list row md-6">
                    <li v-bind:key="product.id" v-for="product in getProductsList">
                        <ProductItem 
                        checkable
                        :id="product.id"
                        :itemId="product.itemId"
                        :monies="product.monies" 
                        :type="product.type"
                        @check-product="handleCheck"
                        />
                    </li>
                </ul>
                <b-card v-if="getProductsList.length == 0">This place is empty</b-card>
                </div>
            </b-tab>
            <b-tab title="Tx">
                <h1>Server Transactions&nbsp;<b-icon-arrow-left-right/></h1>
                <b-card v-if="txs.length == 0">The server has no transactions</b-card>
                <b-table striped hover caption-top :items="txs" :fields="txFields"/>
            </b-tab>
            <b-tab title="KeyItems"> 
                <h1>Server KeyItems&nbsp;<b-icon-puzzle/></h1>
                <b-card v-if="myCreatedKeyItems.length == 0">You have no created key items</b-card>
                <b-table striped hover caption-top :items="myCreatedKeyItems" :fields="['name', 'description', 'id']"/>
                <b-button class="btn-margin" variant="primary" v-b-toggle="'collapse-data-entry'">Create a new KeyItem</b-button>
                <b-container>
                    <b-collapse id="collapse-data-entry">
                        <p>You can create key items to make players progress in quests or enter your server's restricted areas.</p>
                        <b-row>
                            <b-col sm="1">
                                <label for="newKeyItemName">Name:</label>
                            </b-col>
                            <b-col sm="4">
                                <b-form-input 
                                    id="newKeyItemName" 
                                    v-model="newKeyItem.name"
                                    :state="newKeyItemNameState"
                                    aria-describedby="name-feedback"
                                    placeholder="Your new item name"
                                    trim
                                ></b-form-input>

                                <!-- This will only be shown if the preceding input has an invalid state -->
                                <b-form-invalid-feedback id="name-feedback">
                                    Enter at least 3 letters
                                </b-form-invalid-feedback>
                            </b-col>
                            <b-col sm="1">
                                <label for="newKeyItemDesc">Description:</label>
                            </b-col>
                            <b-col sm="4">
                                <b-form-input 
                                    id="newKeyItemDesc" 
                                    v-model="newKeyItem.description"
                                    :state="newKeyItemDescState"
                                    aria-describedby="desc-feedback"
                                    placeholder="Your item's description"
                                    trim
                                ></b-form-input>

                                <!-- This will only be shown if the preceding input has an invalid state -->
                                <b-form-invalid-feedback id="desc-feedback">
                                    Enter at least 5 descriptive words
                                </b-form-invalid-feedback>
                            </b-col>
                            <b-col>
                                <b-button 
                                    v-on:click="addKeyItem()" 
                                    variant="success" 
                                    class="btn-margin"
                                    :disabled="!(newKeyItemDescState && newKeyItemNameState)">
                                Create
                                </b-button>
                            </b-col>
                        </b-row>
                    </b-collapse>
                </b-container>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import ProductItem from "@/components/ProductItem";
// import { mapGetters } from 'vuex'

export default {
    name: "ProductEditPage",
    data() {
        let fields = [
            { key: 'created', sortable: true },
            { key: 'monies', sortable: false, class: "d-none d-md-table-cell" },
            { key: 'name', sortable: false },
            { key: 'from', sortable: false },
            { key: 'to', sortable: false, class: "d-none d-md-table-cell"}
        ];

        return {
            userNameHash: [],
            numberOfColumns: 4,
            lastUpdated: 0,
            showCreateProduct: false,
            checkedList: [],
            selectedProduct: null,
            myCreatedKeyItems: [],
            cardsForSale: [],
            txs: [],
            txFields: fields,
            newProductOptions: [],
            newProductCost: 1,
            newProductType: "",
            newKeyItem: {name:"", description:""}
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
        },
        newKeyItemNameState() {
            // at least 3 letters
            return this.newKeyItem.name.length > 2 ? true : false;
        },
        newKeyItemDescState() {
            let str = this.newKeyItem.description;
            let arr = str.split(/[ ,]+/);

            // at least 5 descriptive words
            return arr.length > 4 ? true : false;
        }
        //...mapGetters('products', ['getProductsList'])
    },
    methods: {
        getDate(tmz) {
            let dateObj = new Date(tmz);
            let month = dateObj.getUTCMonth() + 1; //months from 1-12
            let day = dateObj.getUTCDate();
            let year = dateObj.getUTCFullYear();

            return month + "/" + day + "/" + year;
        },
        handleCheck(product, checked) {
            let id = product.id;
            let index = this.checkedList.findIndex(productId => productId == id);

            if(index > -1 && !checked) {
                this.checkedList.splice(index, 1);
            } else if(index == -1 && checked) {
                this.checkedList = [...this.checkedList, id];
            }
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
                        this.checkedList.forEach((id) => {
                            this.$api.delete.product(id).then(payload=>{
                                this.$store.dispatch('products/removeProduct', id);
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
                        });
                    }
                })
                .catch(err => {
                    // An error occurred
                    const alert = { message: err, type: 'danger', title: 'Internal Error'};
                    this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
                })
            }
        },
        createNewProduct() {
            this.busy = true;

            if(this.newProductCost < 1) {
                const alert = { message: "Cost most be a nonzero positive number", type: 'danger', title: 'Bad Cost'};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
                return;
            }

            let newProductItem = {
                itemId: this.selectedProduct.id,
                monies: this.newProductCost,
                type: this.selectedProduct.type
            };

            let self = this;

            this.$api.add.product(newProductItem)
            .then(response =>{
                let value = response.data.data;

                const alert = { message: "Product created successfully!", type: 'success', title: 'Product Created'};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});

                self.newProductCost = 1;
                self.selectedProduct = null;

                this.$store.dispatch('products/addProduct', value, {namespaced: true});
            }).catch(err => {
                console.log(JSON.stringify(err.response.data.error));
                // An error occurred
                const alert = { message: err.response.data.error, type: 'danger', title: 'Internal Error'};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            }).finally( () => {
                self.busy = false;
            });
        },
        addKeyItem() {
            let self = this;

            this.$api.add.keyItem(this.newKeyItem)
            .then(response =>{
                let value = response.data.data;

                const alert = { message: value.name + " created successfully!", type: 'success', title: 'KeyItem Created'};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});

                self.myCreatedKeyItems.push(value);
                self.newKeyItem = {name:"", description:""};
            }).catch(err => {
                console.log(JSON.stringify(err.response.data.error));
                // An error occurred
                const alert = { message: err.response.data.error, type: 'danger', title: 'Internal Error'};
                this.$store.dispatch('alerts/addAlert', alert, {namespaced: true});
            });
        },
        toggleCreateProduct() {
            this.showCreateProduct = !this.showCreateProduct;
        },
        hideCreateProduct() {
            this.showCreateProduct = false;
        },
        rebuildProductOptions() {
            // reset product options list
            this.newProductOptions = [{value: null, text: "Please select an item to sell", disabled: true}];

            // Refresh CREATED key items
            let keyItemGroup = {
                label: "KeyItems",
                options: []
            };

            this.myCreatedKeyItems.forEach(keyitem => {
                keyItemGroup.options.push({
                    text: keyitem.name,
                    value: keyitem
                });
            });

            this.newProductOptions.push(keyItemGroup);

            // Refresh cards
            let cardItemGroup = {
                label: "Cards",
                options: []
            };

            this.cardsForSale.forEach(item => {
                cardItemGroup.options.push({
                    text: item.name,
                    value: item
                });
            });

            this.newProductOptions.push(cardItemGroup);
        }
    },
    watch: {
        myCreatedKeyItems() {
            this.rebuildProductOptions();
        },
        cardsForSale() {
            this.rebuildProductOptions();
        }
    },
    mounted() {        
        let self = this;

        // refresh created key items list
        this.$api.get.keyItemsCreated()
        .then(response => {
            let payload = response.data;

            payload.data.forEach(item=>{
                let keyitem = {
                    id: item._id,
                    name: item.name,
                    description: item.description,
                    type: "KeyItem"
                };

                self.myCreatedKeyItems.push(keyitem);
            });
        }).catch(err => {
            let alert = { message: err, type: "danger", title: "Internal Error" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        });

        // refresh library list
        this.$api.get.cardsAfterDate(0).then(response=> {
            response.data.data.forEach(card=>{
                // cache this card info
                this.$api.prefetchCardById(card._id, detail=>{
                    self.cardsForSale.push({
                        name: detail.name + " " + card.code,
                        id: detail.id,
                        type: "Card"
                    });
                });
            });
        }).catch(err => {
            console.log(err);
            let alert = { message: err, type: "danger", title: "Internal Error" };
            this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
        });

        // Refresh products list
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

        // Refresh txs list
        // NOTE: THIS IS VERY UNOPTIMIZED!
        this.$api.get.txAfterDate(0).then(response=>{
            response.data.data.forEach(tx=>{
                self.$api.prefetchProductName(tx.product, name=>{
                    tx.name = name;
                    tx.created = self.getDate(tx.created);

                    let needsPrefetch = typeof self.userNameHash[tx.from] == 'undefined'
                                        || typeof self.userNameHash[tx.to] == 'undefined';

                    if(needsPrefetch) {
                        // we need to ask the api fror this user name and cache it
                        let promise1 = self.$api.get.user(tx.from);
                        let promise2 = self.$api.get.user(tx.to);
                        
                        Promise.all([promise1, promise2]).then(arr=>{
                            // cache these values
                            self.userNameHash[tx.from] = arr[0].data.data.username;
                            tx.from = self.userNameHash[tx.from];
                            
                            self.userNameHash[tx.to] = arr[1].data.data.username;
                            tx.to = self.userNameHash[tx.to];

                            // now add to the list
                            self.txs.push(tx);
                        });
                    } else {
                        // use the cache
                        tx.from = self.userNameHash[tx.from];
                        tx.to = self.userNameHash[tx.to];
                        self.txs.push(tx);
                    }
                });
            });
        });
    }
}
</script>

<style scoped>
@media (max-width: 800px) {
    .no-mobile-text { display:none; }  
}

.product-card-list {
  display: flex;
  grid-gap: 1em;
  padding-bottom: 20px;
}

.scrollable {
    overflow-y: scroll;
}

.btn-margin {
    margin-bottom: 10px;
    margin-top: 10px;
}

ul {
  list-style-type: none;
}

h1 {
    padding: 10px;
}
</style>