<template>
    <div>
        <CardTable removable 
        @remove-cards="handleRemoveCards"
        :cards="cards"/>
        <b-card>
            <b-button variant="warning" @click="handleAddCardsFromLibrary"><b-icon-box-arrow-in-down/>Add More Cards</b-button>
        </b-card>
    </div>
</template>

<script>
import CardTable from '@/components/CardTable'
import { mapGetters } from 'vuex'

export default {
    name: "FolderEditPage",
    components: {
        CardTable
    },
    data() {
        return {
            cards: []
        }
    },
    computed: {
        ...mapGetters('folders', ['getFolderById']),
        ...mapGetters('cards', ['getCardById']),
    },
    methods: {
        fetchCards() {
            this.cards = [];
            // current cards in store
            let folderId = this.$route.params.id;
            let folder = this.getFolderById(folderId);

            if(typeof folder.id === 'undefined')
                throw new Error("Folder data missing for this folder!");

            this.$api.prefetchFolderById(folderId, folder=>{
                for(let id of folder.cards) {
                    this.$api.prefetchCardById(id, card=>{
                        card.id = id;
                        this.cards = [...this.cards, card];
                    });
                }
            });
        },
        handleAddCardsFromLibrary() {
            this.$router.push('add-cards-from-library');
        },
        handleRemoveCards(cards) {
            const size = cards.length;
            if(size > 0) {
                let msg = 'Are you sure to want to delete these ' + size + ' cards? There is no undo.';

                if(size == 1) msg = 'Are you sure you want to delete this card? There is no undo.';

                this.$bvModal.msgBoxConfirm(
                    msg,
                    {
                        title: 'Remove from folder?',
                        okVariant: 'danger',
                        okTitle: 'YES',
                        cancelTitle: 'NO',
                        footerClass: 'p-2',
                        hideHeaderClose: false,
                        centered: true
                    }
                ).then(async value => {
                    if(value) {
                        // set folder to new cards
                        let folderId = this.$route.params.id;
                        let folder = this.getFolderById(folderId);

                        if(typeof folder.id === 'undefined')
                            throw new Error("Folder data missing for this folder!");

                        let cardIdsOnly = [];

                        cards.forEach(card=> {
                            console.log(card.name + " " + card.id);
                            cardIdsOnly = [...cardIdsOnly, card.id];
                        });

                        cardIdsOnly.forEach(x => folder.cards.splice(folder.cards.indexOf(x), 1));

                        let payload = await this.$api.update.folder(folder);
                        let newFolder = payload.data.data;
                        this.$store.dispatch('folders/updateFolder', newFolder);
                        this.fetchCards();

                        // outer catch will catch any errors
                    }
                })
                .catch(err => {
                    // An error occurred
                    const alert = { message: err, type: 'danger', title: "Internal Error"};
                    this.$store.dispatch('alerts/addAlert', alert);
                })
            }
        }
    }, 
    mounted() {
        this.fetchCards();
    }
}
</script>