<template>
    <div>
        <CardTable removable 
        @remove-cards="handleRemoveCards"
        :cards="getCardsFromFolderId($route.params.id)"/>
        <hr>
        <b-button variant="warning" @click="handleAddCards"><b-icon-box-arrow-in-down/>Add Cards From Library</b-button>
    </div>
</template>

<script>
import CardTable from './CardTable'
import { mapGetters } from 'vuex'

export default {
    components: {
        CardTable
    },
    computed: {
        ...mapGetters('folders', ['getFolderById']),
        ...mapGetters('cards', ['getCardById']),
        getCardsFromFolderId()  {
            let self = this;
            return (folderId) => {
                let folder = self.getFolderById(folderId);
                let cards = [];

                folder.cards.forEach(element => {
                    cards = [self.getCardById(element), ...cards];
                });

                return cards;
            }
        }
    },
    methods: {
        handleAddCards() {
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
                    // TODO: delete via API

                    if(value) {
                        // set folder to new cards
                    }
                })
                .catch(err => {
                    // An error occurred
                    const alert = { message: err, type: 'danger'};
                    this.$store.dispatch('alerts/addAlert', alert);
                })
            }
        }
    }
}
</script>