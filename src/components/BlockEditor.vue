<template>
    <div>
        <block v-for="item in blocks" :key="item.contentUdi" :content="item.content" :settings="item.settings"></block>
    </div>
</template>

<script>
import Block from './BlockEditor/Block';

export default {
    components: { Block },
    props: { blocks: Array }
}
</script>

<style scoped>

</style>