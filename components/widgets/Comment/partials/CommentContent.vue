<template>
    <p class="card-text mt-3">
        {{item.content}}
    </p>
</template>

<script>
export default {
    name: "CommentContent",
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
