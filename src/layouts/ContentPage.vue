<template>
    <layout>
        <block-editor :blocks="$context.content" />
        <slot/>
    </layout>
</template>

<script>
import BlockEditor from '../components/BlockEditor';

export default {
    components: { BlockEditor }
}
</script>

<style scoped>

</style>