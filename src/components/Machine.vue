<template>
    <div class="machine invisible_if_show_drawing_only" id="machine">
        <div class="machine-gear-container" ref="machineGearCon">
            <Gear ref="leftRef" v-model="gear[0]" ></Gear>
            <Gear ref="rightRef" v-model="gear[1]"></Gear>
        </div>
        <Hand ref="handRef" ></Hand>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import type { PropType } from 'vue'
    import type { SettingGearType, BoardType, HandType, ColorType } from '@/types/Setting';
    import Gear from '@/components/Gear.vue';
    import Hand from '@/components/Hand.vue';
    import helper from '@/helpers/helper';

    const isMounted = ref(false);

    const props = defineProps({
        left: {
            type: Object as PropType<SettingGearType>,
            default: null
        },
        right: {
            type: Object as PropType<SettingGearType>,
            default: null
        },
        hand: {
            type: Object as PropType<HandType>,
            default: null
        },
        color: {
            type: Object as PropType<ColorType>,
            default: null
        },
        board: {
            type: Object as PropType<BoardType>,
            default: null
        },
    })

    const leftRef = ref();
    const rightRef = ref();
    const handRef = ref();
    const machineGearCon = ref();

    const gearsEl = {
        0: leftRef,
        1: rightRef
    }

    const gear = ref({
        0: props.left,
        1: props.right
    })

    const hand = ref(props.hand);
    const color = ref(props.color);

    const emit = defineEmits([
        'update:modelValue',
        'update:color',
    ])

    const setGear = (no?: 0 | 1) => {
        if(props.board){
            if(typeof no === "undefined"){
                setGear(0);
                setGear(1);
                return;
            }
            if(gear.value[no] && gearsEl[no]?.value?.machine_gear){
                let gearwidth = (props.board.size.min / 100) * gear.value[no].parent.size;
                gearsEl[no].value.machine_gear.style.width = `${gearwidth}px`;
                gearsEl[no].value.machine_gear.style.height = `${gearwidth}px`;
                
                gearsEl[no].value.machine_gear_child_con.style.width = `${(gearwidth / 100) * gear.value[no].child.size}px`;
                gearsEl[no].value.machine_gear_child_con.style.height = `${(gearwidth / 100) * gear.value[no].child.size}px`;

                let wallDistance = (props.board.size.min / 100) * gear.value[no].wallDistance;
                if(no == 0){
                    let gear1Width = (props.board.size.min / 100) * gear.value[1].parent.size;
                    let max = props.board.size.min - (((props.board.size.min / 100) * gear.value[1].wallDistance) + gearwidth + gear1Width);
                    wallDistance = Math.min(wallDistance, max);
                    if(wallDistance < 0){
                        wallDistance = 0;
                    }
                    gearsEl[no].value.machine_gear.style.left = `${wallDistance}px`;
                }
                else if(no == 1){
                    let gear0Width = (props.board.size.min / 100) * gear.value[0].parent.size;
                    let max = props.board.size.min - (((props.board.size.min / 100) * gear.value[0].wallDistance) + gearwidth + gear0Width);
                    wallDistance = Math.min(wallDistance, max);
                    if(wallDistance < 0){
                        wallDistance = 0;
                    }
                    gearsEl[no].value.machine_gear.style.right = `${wallDistance}px`;
                }

                gearsEl[no].value.machine_gear.style.transform = `rotate(${gear.value[no].deg}deg)`;
                gearsEl[no].value.machine_gear_child_con.style.transform = `rotate(${gear.value[no].child.conDeg}deg)`;
            }
        }
    }

    const setArmLength = () => {
        let gear0Bound = gearsEl[0].value.machine_gear.getBoundingClientRect();
        let gear1Bound = gearsEl[1].value.machine_gear.getBoundingClientRect();
        let armMinLen = (gear1Bound.right - gear0Bound.left) / 2;
        
        hand.value.arm.px = Math.max((props.board.size.min / 100) * hand.value.arm.length, armMinLen);

        let forearmMinLen = (hand.value.arm.px / 100) * 20;
        hand.value.forearm.px = Math.max((hand.value.arm.px / 100) * hand.value.forearm.length, forearmMinLen);

        let palmMinLen = (hand.value.forearm.px / 100) * 60;
        hand.value.palm.px = Math.max((hand.value.forearm.px / 100) * hand.value.palm.length, palmMinLen);

    }

    const setHand = () =>{
        let handle0Bound = gearsEl[0].value.machine_gear_handle.getBoundingClientRect(),
            handle1Bound = gearsEl[1].value.machine_gear_handle.getBoundingClientRect(),
            bridgeLen = Math.hypot(handle1Bound.y - handle0Bound.y, handle1Bound.right - handle0Bound.left),
            bridgeDeg    = Math.atan2(handle1Bound.y - handle0Bound.y, handle1Bound.right - handle0Bound.left) * 180 / Math.PI,
            halfParameter = (bridgeLen + (hand.value.arm.px * 2)) / 2,
            area = Math.sqrt(halfParameter * (halfParameter - bridgeLen) * (halfParameter - hand.value.arm.px) * (halfParameter - hand.value.arm.px)),
            height = (2 * area) / bridgeLen;

        
        hand.value.arm.bridge.column.height =  height;
        handRef.value.machine_hand_arm_bridge.style.width =  bridgeLen + "px";     
        handRef.value.machine_hand_arm_bridge.style.height =  1 + "px";     
        handRef.value.machine_hand_arm_bridge.style.left = handle0Bound.x + "px";   
        handRef.value.machine_hand_arm_bridge.style.top = handle0Bound.y + "px";   
        handRef.value.machine_hand_arm_bridge.style.transformOrigin = "left 50%";
        handRef.value.machine_hand_arm_bridge.style.transform = "rotate("+ bridgeDeg +"deg)";

        handRef.value.machine_hand_arm_bridge_column.style.height = `${height}px`;

        let elbowBound = handRef.value.machine_hand_arm_bridge_column_tip.getBoundingClientRect();
        var armWidth = hand.value.arm.px;
        var arm0Deg = Math.atan2(elbowBound.y - handle0Bound.y, elbowBound.right - handle0Bound.left) * 180 / Math.PI;
        var arm1Deg = Math.atan2(elbowBound.y - handle1Bound.y, elbowBound.left - handle1Bound.right) * 180 / Math.PI;
        
        handRef.value.machine_hand_arm_0.style.width = `${armWidth}px`;
        handRef.value.machine_hand_arm_0.style.left = handle0Bound.x + "px";   
        handRef.value.machine_hand_arm_0.style.top = handle0Bound.y + "px";
        handRef.value.machine_hand_arm_0.style.transformOrigin = "left 50%";
        handRef.value.machine_hand_arm_0.style.transform = "rotate("+ arm0Deg +"deg)";

        handRef.value.machine_hand_arm_1.style.width = `${armWidth}px`;
        handRef.value.machine_hand_arm_1.style.left = handle1Bound.right + "px";   
        handRef.value.machine_hand_arm_1.style.top = handle1Bound.y + "px";
        handRef.value.machine_hand_arm_1.style.transformOrigin = "left 50%";
        handRef.value.machine_hand_arm_1.style.transform = "rotate("+ arm1Deg +"deg)";

        handRef.value.machine_hand_forearm_0.style.width = `${hand.value.forearm.px}px`;
        handRef.value.machine_hand_forearm_1.style.width = `${hand.value.forearm.px}px`;
        handRef.value.machine_hand_arm_0_display.style.width = `${armWidth+hand.value.forearm.px}px`;
        handRef.value.machine_hand_arm_1_display.style.width = `${armWidth+hand.value.forearm.px}px`;

        let wrist0Bound = handRef.value.machine_hand_forearm_1_tip.getBoundingClientRect(),
            wrist1Bound = handRef.value.machine_hand_forearm_0_tip.getBoundingClientRect(),
            palmBridgLen = Math.hypot(wrist1Bound.y - wrist0Bound.y, wrist1Bound.right - wrist0Bound.left),
            palmBridgDeg    = Math.atan2(wrist1Bound.y - wrist0Bound.y, wrist1Bound.right - wrist0Bound.left) * 180 / Math.PI,
            palmHalfParameter = (palmBridgLen + (hand.value.palm.px * 2)) / 2,
            palmArea = Math.sqrt(palmHalfParameter * (palmHalfParameter - palmBridgLen) * (palmHalfParameter - hand.value.palm.px) * (palmHalfParameter - hand.value.palm.px)),
            palmHeight = (2 * palmArea) / palmBridgLen;

        handRef.value.machine_hand_palm_bridge.style.width =  palmBridgLen + "px";     
        handRef.value.machine_hand_palm_bridge.style.height =  1 + "px";     
        handRef.value.machine_hand_palm_bridge.style.left = wrist0Bound.x + "px";   
        handRef.value.machine_hand_palm_bridge.style.top = wrist0Bound.y + "px";   
        handRef.value.machine_hand_palm_bridge.style.transformOrigin = "left 50%";
        handRef.value.machine_hand_palm_bridge.style.transform = "rotate("+ palmBridgDeg +"deg)";

        handRef.value.machine_hand_palm_bridge_column.style.height = `${palmHeight}px`;


        let tipBound = handRef.value.machine_hand_palm_bridge_column_tip.getBoundingClientRect();
        var palmWidth = hand.value.palm.px;
        var palm0Deg = Math.atan2(tipBound.y - wrist0Bound.y, tipBound.right - wrist0Bound.left) * 180 / Math.PI;
        var palm1Deg = Math.atan2(tipBound.y - wrist1Bound.y, tipBound.left - wrist1Bound.right) * 180 / Math.PI;
        
        handRef.value.machine_hand_palm_0.style.width = `${palmWidth}px`;
        handRef.value.machine_hand_palm_0.style.left = wrist0Bound.x + "px";   
        handRef.value.machine_hand_palm_0.style.top = wrist0Bound.y + "px";
        handRef.value.machine_hand_palm_0.style.transformOrigin = "left 50%";
        handRef.value.machine_hand_palm_0.style.transform = "rotate("+ palm0Deg +"deg)";

        handRef.value.machine_hand_palm_1.style.width = `${palmWidth}px`;
        handRef.value.machine_hand_palm_1.style.left = wrist1Bound.right + "px";   
        handRef.value.machine_hand_palm_1.style.top = wrist1Bound.y + "px";
        handRef.value.machine_hand_palm_1.style.transformOrigin = "left 50%";
        handRef.value.machine_hand_palm_1.style.transform = "rotate("+ palm1Deg +"deg)";

    }

    const setMachine = () => {
        setArmLength();
        setHand();
    }

    const setMachineAndGear = () => {
        setGear();
        setArmLength();
        setHand();
    }


    const colorRange = (len: number = 10, opacity: number = 1) => {
        if(len < 2){
            len = 2;
        }
        len = helper.parseInt(len/2);

        var start = helper.convertToRGB (color.value.start);
        var end   = helper.convertToRGB (color.value.end); 
        var alpha = 0;
        var colors = [];
        for (let i = 0; i < len; i++) {
            var c = [];
            alpha += (1.0 / len);

            c[0] = start[0] * alpha + (1 - alpha) * end[0];
            c[1] = start[1] * alpha + (1 - alpha) * end[1];
            c[2] = start[2] * alpha + (1 - alpha) * end[2];

            c[0] = helper.parseInt(c[0]);
            c[1] = helper.parseInt(c[1]);
            c[2] = helper.parseInt(c[2]);

            colors.push([c[0], c[1], c[2]]);
        }
        var reverseColors = [...colors]
        reverseColors.reverse();
        return [...reverseColors, ...colors, ];
    }

    function setColor(){
        color.value.current = 0;
        color.value.range = colorRange(color.value.size, color.value.opacity);
        emit('update:color', color);
    }

    onMounted(() => {
        isMounted.value = true;
    })

    defineExpose({
        setColor,
        setGear,
        setArmLength,
        setHand,
        setMachine,
        setMachineAndGear,
        leftRef,
        rightRef,
        handRef,
        machineGearCon,
    })
    
</script>