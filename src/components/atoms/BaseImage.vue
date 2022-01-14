<template>
  
    <div class="base_item">
        <slot name="control" />
    </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    name: "BaseImage",
    inheritAttrs: false,
});
</script>



<style scoped>

.base_item {

}
</style>
