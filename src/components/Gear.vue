<template>
    <div class="machine-gear-con" ref="machine_gear">
        <div class="machine-gear-parent" ref="machine_gear_parent">
            <div class="machine-gear-child-con" ref="machine_gear_child_con">
                <div class="machine-gear-child" ref="machine_gear_child">
                    <div class="machine_gear_handle_con" ref="machine_gear_handle_con">
                        <div class="machine_gear_handle" ref="machine_gear_handle"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue'
    import type { PropType } from 'vue'
    import type { SettingGearType, BoardType, CanvasType, HandType, ColorType } from '@/types/Setting';

    const props = defineProps({
        modelValue: {
            type: Object as PropType<SettingGearType>,
            default: null
        }
    })

    const machine_gear = ref();
    const machine_gear_parent = ref();
    const machine_gear_child_con = ref();
    const machine_gear_child = ref();
    const machine_gear_handle_con = ref();
    const machine_gear_handle = ref();

    defineExpose({
        machine_gear,
        machine_gear_parent,
        machine_gear_child_con,
        machine_gear_child,
        machine_gear_handle_con,
        machine_gear_handle,
    })

    onMounted(() => {
        console.log('Gear mounted')
    })

    // watch(() => [
    //     props.modelValue.parent.deg,  
    //     props.modelValue.child.deg,  
    // ], () => {
    //     machine_gear_parent.value.style.transform = `rotate(${ props.modelValue.parent.deg }deg)`;
    //     machine_gear_child.value.style.transform = `rotate(${ props.modelValue.child.deg }deg)`;
    // })
</script>