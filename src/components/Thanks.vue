<template>
    <Dialog v-model:visible="visible" modal :dismissableMask="true" class="bg-white" :style="{ width: 'calc(100% - 2rem)', maxWidth: '30rem' }">
        <template #container="{ closeCallback }">
            <div class="p-dialog-header justify-content-end p-2" :style="{borderBottom: 'none'}">
                <div class="p-dialog-header-icons" data-pc-section="icons">
                    <Button @click="closeCallback" icon="pi pi-times" text size="small" severity="secondary" class="w-2rem h-2rem"></Button>
                </div>
            </div>
            <div class="p-dialog-content">
                <div :style="{
                    textAlign: 'center',
                    padding: '10px 30px'
                }">
                    <img :src="smile.href" alt="smile-icon" :style="{
                        width: '150px',
                        maxWidth: '100%'
                    }">
                </div>
                <div :style="{
                    textAlign: 'center',
                    fontSize: '120%',
                    fontWeight: 'medium',
                    paddingTop: '10px'
                }">
                    Hope you loved the illustration.
                </div>
                <div :style="{
                    textAlign: 'center',
                    fontSize: '100%',
                    fontWeight: 'medium',
                    paddingTop: '10px'
                }">
                    Feel free to provide any feedback on <a target="_blank" href="https://github.com/jamshedhossan9/harmonograph-3d/discussions/1">Github discussion.</a>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import Button from 'primevue/button';
    import Dialog from 'primevue/dialog';

    const visible = ref(false);
    const smile = new URL('../assets/icons/happy-emoji-svgrepo-com.svg', import.meta.url);

    const openPopup = (autoClose: boolean = false) => {
        visible.value = true;
        if(autoClose){
            setTimeout(() => {
                visible.value = false;
            }, 3000)
        }
    }

    const closePopup = () => {
        visible.value = false;
    }

    defineExpose({
        visible,
        openPopup,
        closePopup
    })
</script>