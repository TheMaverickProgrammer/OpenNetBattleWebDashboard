<template>
    <div>
        <CardTable 
        selectable 
        :busy="busy"
        @submit-cards="handleAddCards"
        :cards="$store.state.cards.list"/>
    </div>
</template>

<script>
import CardTable from '@/components/CardTable'
import { mapGetters } from 'vuex'

export default {
    name: "FolderAddFromLibraryPage",
    components: {
        CardTable
    },
    computed: {
        ...mapGetters('folders', ['getFolderById']),
    },
    data() {
        return {
            busy: false,
            lastUpdated: 0
        }
    },
    created() {
        this.fetchFolder();
        this.fetchCards(this.lastUpdated);
    },
    methods: {
        handleAddCards(cards) {
             // set folder to new cards
            let folderId = this.$route.params.id;
            let folder = this.getFolderById(folderId);
            let cardIdsOnly = [];
            let cardLimitCounter = {};

            cards.forEach(card=> {
                let counter = cardLimitCounter[card.id];

                if(counter == null) {
                    cardLimitCounter[card.id] = card.limit;
                } else {
                    cardLimitCounter = counter - 1;
                }

                if(cardLimitCounter[card.id] <= 0) {
                    const alert = { message: "Card " + card.name + " duplicates over the limit of " + card.limit, type: 'danger' }
                    this.$store.dispatch('alerts/addAlert', alert);
                }

                cardIdsOnly = [...cardIdsOnly, card.id];
            });

            let folderSize = folder.cards.length;
            let newFolder = { cards: [...folder.cards, ...cardIdsOnly], id: folder.id };

            this.$api.update.folder(newFolder).then(payload => {
                this.$store.dispatch('folders/updateFolder', payload.data.data);
                
                let count = payload.data.data.cards.length - folderSize;
                const alert = { message:  String(count) + " cards added!", type: count==0?'warning':'success', title:"Complete"};
                this.$store.dispatch('alerts/addAlert', alert);
            }).catch(err=>{
                // An error occurred
                const alert = { message: err.response.error, type: 'danger', title:"Internal Error"};
                this.$store.dispatch('alerts/addAlert', alert);
            });
        },
        fetchCards(timestamp) {
            this.busy = true;

            // First time loading table get everything, then `updated` will be set to Date.now()
            this.$api.get.cardsAfterDate(timestamp).then(response => {
                let payload = response.data;

                payload.data.forEach(card => {
                    this.$api.prefetchCardById(card._id)
                });
            }).catch(err => {
                let alert = { message: err, type: "danger", title: "Internal Error" };
                this.$store.dispatch('alerts/addAlert', alert, { namespaced: true});
            }).finally(()=> {
                this.busy = false; // Done
                this.lastUpdated = Date.now();
            });
        },
        fetchFolder() {
            // Refresh folders
            let folderId = this.$route.params.id;
            let folder = this.getFolderById(folderId);

            if(typeof folder === 'undefined') {
                this.$api.get.prefetchFolderById(folderId);
            }
        }
    }
}
</script>