<template>
    <button v-if="canbedeleted && logged"
            type="button"
            class="delete btn btn-link"
            @click="onDelete">
        <i class="lar la-trash-alt"></i> Supprimer
    </button>
</template>

<script>
 import {mapActions} from 'vuex'

    export default {
        name: "Delete",
        props: {
            canbedeleted: {
                type: Boolean,
                default: false
            },
            logged: {
                type: Boolean,
                default: false
            },
            item: {
                type: Object,
                required: true
            },
        },
        methods: {
            ...mapActions([
                'comments/deleteComment',
            ]),
            onDelete() {
                if(confirm('Supprimer cet élément ?')) {
                    this.$emit('item-deleted', {
                        type: this.item.type,
                        id: this.item.id
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
