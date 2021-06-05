<template>
    <span class="image main" v-if="content.image && content.image._url">
        <img :src="backendUrl + content.image._url + '?width=1920&height=1080'" :alt="content.image._name" />
    </span>
</template>

<script>
export default {
    props: { content: Object, settings: Object },
    data: function() {
        return {
            backendUrl: process.env.GRIDSOME_API_BACKEND_URL
        };
    }
}
</script>

<style scoped>

</style>