<template>
    <div class="tag-list">
        <tag-link v-for="(tag, idx) in tags" :key="idx" :tag="tag"/>
    </div>
</template>

<script>
    export default {
        name: 'TagList',
        components: {
            TagLink: () => import('vuejs-eblogger/components/widgets/links/TagLink'),
        },
        data() {
            return {}
        },
        props: {
            tags: Array
        },
    }
</script>
