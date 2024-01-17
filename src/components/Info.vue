<template>
    <Button  class="p-button-xs" icon="pi pi-info" rounded severity="secondary" size="small" @click="visible = true" v-tooltip.top="'Info'"></Button>
    <Dialog v-model:visible="visible" modal header="Harmonograph" :dismissableMask="true" class="info-dialog" :style="{ width: 'calc(100% - 2rem)', maxWidth: '50rem' }">
        <p class="m-0 line-height-3">
            Harmonographs are simple but interesting devices that display some of the complex, mysterious, and beautiful patterns hidden in simple harmonic motion, such as pendulums and spinning wheels. This is a form of harmonograph that operates on the rotation of two wheels. 
            This model is inspired by <a href="https://www.youtube.com/watch?v=2DjvtjgRdGA" target="_blank">Alfred Hoehn</a>.
        </p>
        <p class="font-medium text-lg mt-4 mb-0 line-height-3">Usage: </p>
        <ul class="pl-3 mb-0 mt-2 line-height-3">
            <li>
                There is a Setting button at the bottom right corner. 
            </li>
            <li>
                Open the setting panel, you will see seperate settings for both Left and Right Motor. And some other common setting in "Others" section. 
                There are information about every setting after the label.
            </li>
            <li>
                At the bottom of setting panel you will see a "Presets" button. There are few settings set there, you can select one to draw.
            </li>
            <li>
                You can choose you own setting, ot can select a Preset. Even after selecting a preset, you can change that setting onwards. Then click "Draw" button.
            </li>
            <li>
                You can hide the Machine while drawing.
            </li>
            <li>
                In hidden machine state, you can enable Auto rotating. Except that you can Pan the drawing to rotate horizontally and vertically with Mouse Left button, Move the drawing with Mouse Right button, Zoom in or out with mouse wheel. 
                There will be a "Reset Position" button and some other options to reset Angle, Zoom after you control the movement of the drawing.
            </li>
            <li>
                There will be a "Pause" button to pause the drawing, besides you can press "Space" bar in you keyboard to pause the drawing.
            </li>
            <li>
                You can Export in JPEG, PNG and GIF format. You will see the Export options in Setting panel.
            </li>
            <li>
                GIF export won't have a Gradient background to keep a good quality. There are 2 colors for the background gradient, GIF export will have first color as it's background.
            </li>
            <li>
                Adjust the position and size before any export.
            </li>
            <li>
                Settings adjusted by you will be cached in your browser for your future usage.
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