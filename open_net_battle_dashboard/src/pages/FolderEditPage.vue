<template>
    <div>
        <CardTable removable 
        @remove-cards="handleRemoveCards"
        :cards="getCards"/>
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
        getCards() {
            return this.cards
        }
    },
    methods: {
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
                ).then(value => {
                    if(value) {
                        // set folder to new cards
                        let folderId = this.$route.params.id;
                        let folder = this.getFolderById(folderId);
                        let cardIdsOnly = [];

                        cards.forEach(card=> {
                            cardIdsOnly = [...cardIdsOnly, card.id];
                        });

                        folder.cards.remove(cardIdsOnly);

                        this.$api.update.folder(folder).then(payload => {
                            this.$store.dispatch('folders/updateFolder', payload.data.data);
                        }); // outer catch will catch any errors
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
        let folderId = this.$route.params.id;
        this.$api.prefetchFolderById(folderId, folder=>{
            console.log(folderId, folder)
            for(let id of folder.cards) {
                 this.$api.prefetchCardById(id, card=>{
                    this.cards = [...this.cards,card];
                 });
            }
        });
    }
}
</script>