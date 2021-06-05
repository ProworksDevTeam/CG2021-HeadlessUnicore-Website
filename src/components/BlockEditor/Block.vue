<template>
    <section v-if="content">
        <hr class="major" v-if="content.breakBeforeSection" />
        <header class="major" v-if="content.title">
            <h2>{{ content.title }}</h2>
        </header>
        <component :is="content._contentType.alias" :content="content" :settings="settings"></component>
    </section>
</template>

<script>
import BannerImage from './BannerImage';
import TextBlock from './TextBlock';

export default {
    components: { BannerImage, TextBlock },
    props: { content: Object, settings: Object }
}
</script>

<style scoped>

</style>