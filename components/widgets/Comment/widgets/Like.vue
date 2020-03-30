<template>
    <vue-like-dislike-buttons v-if="canbeliked" :likes="likes" :dislikes="dislikes" :isDisabled="!logged"
         @like="sendLike" @dislike="sendDislike" />
</template>

<script>

    export default {
        name: 'Like',
        components: {
            VueLikeDislikeButtons: () => import('vue-like-dislike-buttons')
        },
        created: function () {
            this.likes = this.item.total_likes
            this.dislikes = this.item.total_dislikes
        },
        data() {
            return {
                likes: 0,
                dislikes: 0
            }
        },
        props: {
            item: {
                type: Object,
                required: true
            },
            logged: {
                type: Boolean,
                default: false
            },
            canbeliked: {
                type: Boolean,
                default: false
            },
            postlikeurl: String,
            postdislikeurl: String,
        },
        methods: {
            sendLike(){
                const data = {
                    'id': this.item.id,
                    'type': this.item.type,
                }

                let response = axios({
                    url: this.postlikeurl,
                    method: 'post',
                    data: data
                }).then((response) => {
                    this.likes = response.data.likes
                    this.dislikes = response.data.dislikes
                })

            },
            sendDislike(){
                const data = {
                    'id': this.item.id,
                    'type': this.item.type,
                }

                let response = axios({
                    url: this.postdislikeurl,
                    method: 'post',
                    data: data
                }).then((response) => {
                    this.likes = response.data.likes
                    this.dislikes = response.data.dislikes
                })
            }
        }
    }
</script>

