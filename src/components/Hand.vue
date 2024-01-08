<template>
    <div class="machine_hand invisible_if_show_drawing_only">
        <div class="machine_hand_arm" ref="machine_hand_arm_0">
            <div class="machine_hand_arm_display" ref="machine_hand_arm_0_display"></div>
            <div class="machine_hand_forearm" ref="machine_hand_forearm_0">
                <div class="machine_hand_forearm_tip" ref="machine_hand_forearm_0_tip"></div>
            </div>
        </div>
        <div class="machine_hand_arm" ref="machine_hand_arm_1">
            <div class="machine_hand_arm_display" ref="machine_hand_arm_1_display"></div>
            <div class="machine_hand_forearm" ref="machine_hand_forearm_1">
                <div class="machine_hand_forearm_tip" ref="machine_hand_forearm_1_tip"></div>
            </div>
        </div>
        <div class="machine_hand_arm_bridge" ref="machine_hand_arm_bridge">
            <div class="machine_hand_arm_bridge_column" ref="machine_hand_arm_bridge_column">
                <div class="machine_hand_arm_bridge_column_tip" ref="machine_hand_arm_bridge_column_tip"></div>
            </div>
        </div>
        <div class="machine_hand_palm" ref="machine_hand_palm_0"></div>
        <div class="machine_hand_palm" ref="machine_hand_palm_1"></div>
        <div class="machine_hand_palm_bridge" ref="machine_hand_palm_bridge">
            <div class="machine_hand_palm_bridge_column" ref="machine_hand_palm_bridge_column">
                <div class="machine_hand_palm_bridge_column_tip" ref="machine_hand_palm_bridge_column_tip">
                    <div class="pen_con">
                        <div class="machine_hand_pen" ref="machine_hand_pen"></div>
                        <img class="pen hidden" src="./assets/icons/pencil.svg">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'

    const machine_hand_arm_0 = ref();
    const machine_hand_arm_0_display = ref();
    const machine_hand_forearm_0 = ref();
    const machine_hand_forearm_0_tip = ref();
    const machine_hand_arm_1 = ref();
    const machine_hand_arm_1_display = ref();
    const machine_hand_forearm_1 = ref();
    const machine_hand_forearm_1_tip = ref();
    const machine_hand_arm_bridge = ref();
    const machine_hand_arm_bridge_column = ref();
    const machine_hand_arm_bridge_column_tip = ref();
    const machine_hand_palm_0 = ref();
    const machine_hand_palm_1 = ref();
    const machine_hand_palm_bridge = ref();
    const machine_hand_palm_bridge_column = ref();
    const machine_hand_palm_bridge_column_tip = ref();
    const machine_hand_pen = ref();

    defineExpose({
        machine_hand_arm_0,
        machine_hand_arm_0_display,
        machine_hand_forearm_0,
        machine_hand_forearm_0_tip,
        machine_hand_arm_1,
        machine_hand_arm_1_display,
        machine_hand_forearm_1,
        machine_hand_forearm_1_tip,
        machine_hand_arm_bridge,
        machine_hand_arm_bridge_column,
        machine_hand_arm_bridge_column_tip,
        machine_hand_palm_0,
        machine_hand_palm_1,
        machine_hand_palm_bridge,
        machine_hand_palm_bridge_column,
        machine_hand_palm_bridge_column_tip,
        machine_hand_pen,
    })

    onMounted(() => {
        console.log('Hand mounted')
    })
</script>