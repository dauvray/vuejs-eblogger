<template>
    <div class="card-text mt-3" v-html="item.content"></div>
</template>

<script>
export default {
    name: "CommentBody",
    props: {
        item: {
            type: Object,
            required: true
        }
    }
}
</script>

<style scoped>

</style>
