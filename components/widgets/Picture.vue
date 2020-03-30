<template>
    <div v-if="picture != undefined">
        <v-lazy-image
            :srcset="`${urls.join(',')}, ${base64svg}`"
            :src="src"
            :alt="alt" class="card-img-top img-fluid"
        />
    </div>
</template>

<script>
    export default {
        name: 'Picture',
        components: {
            VLazyImage: () => import('v-lazy-image'),
        },
        data() {
            return {
                urls: [],
                base64svg: null,
                src: null,
                alt: null,
            }
        },
        props: {
            picture: Object
        },
        created() {
            if(this.picture != undefined) {
                this.defineSrcSet()
            }
        },
        methods: {
            defineSrcSet() {
                this.urls = this.picture.responsive_images.medialibrary_original.urls.map( item => {
                    // get size
                    let size = item.match(/([\d]+)_([\d]+)/);
                    let port = window.location.port ? `:${window.location.port}` : ''
                    return `${window.location.protocol}//${window.location.hostname}${port}/storage/${this.picture.id}/responsive-images/${item} ${size[1]}w`
                })

                this.base64svg = `${this.picture.responsive_images.medialibrary_original.base64svg} 32w`

                this.src = `/storage/${this.picture.id}/${this.picture.file_name}`

                this.alt = this.picture.custom_properties.alt
            }
        }
    }
</script>
