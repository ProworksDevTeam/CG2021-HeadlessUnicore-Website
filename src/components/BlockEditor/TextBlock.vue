<template>
    <div v-if="content.content" v-html="content.content">
    </div>
</template>

<script>
export default {
    props: { content: Object, settings: Object }
}
</script>

<style scoped>

</style>