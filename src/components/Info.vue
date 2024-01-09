<template>
    <Button  class="p-button-xs" icon="pi pi-info" rounded severity="secondary" size="small" @click="visible = true" v-tooltip.top="'Info'"></Button>
    <Dialog v-model:visible="visible" modal header="Harmonographs" :dismissableMask="true" class="info-dialog" :style="{ width: 'calc(100% - 2rem)', maxWidth: '50rem' }">
        <p class="m-0 line-height-3">
            Harmonographs are simple but interesting devices that display some of the complex, mysterious, and beautiful patterns hidden in simple harmonic motion, such as pendulums and spinning wheels. This is a form of harmonograph that operates on the rotation of two wheels. 
            This model is inspired by <a href="https://www.youtube.com/watch?v=2DjvtjgRdGA" target="_blank">Alfred Hoehn</a>.
        </p>
        <p class="font-medium text-lg mt-4 mb-0">Usage: </p>
        <ul class="pl-3 mb-0 mt-2">
            <li>
                There is a Setting button at the bottom right corner. 
            </li>
        </ul>
    </Dialog>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, reactive } from 'vue'
    import helper from '@/helpers/helper';
    import Button from 'primevue/button';
    import Dialog from 'primevue/dialog';
    import Fieldset from 'primevue/fieldset';

    const visible = ref(false);
</script>