<template>
    <div v-if="!loggedIn">
        <a href="#" @click.prevent="login">Connectez-vous</a>
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    import {AuthorizationMixin} from 'vuejs-estarter/mixins/AuthorizationMixin'

    export default {
        name: 'ConnectionRedirect',
        mixins: [AuthorizationMixin],
        data() {
            return { }
        },
        methods: {
            ...mapActions([
                'auth/setPreviousPath'
            ]),
            login() {
                this['auth/setPreviousPath']({name : this.$route.name, params: this.$route.params})
                this.$router.push({ name: 'login', params: {}});
            }
        }
    }
</script>
