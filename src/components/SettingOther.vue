<template>
    <div class="setting-gear">
        <!-- <div class="setting-gear-title"><strong>Others</strong></div> -->
        <div class="flex flex-column gap-3">
            <div>
                <InputGroup class="input-range-group">
                    <InputGroupAddon class="gap-2">
                        Arm length
                        <span 
                            v-tooltip.left="`Length of the Arm starts from Disk 2 (small) in both Motors. Its relative to screen and there is a minimum requirement of this length, it won't go less than that.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.arm.length" :step="1" :min="5" :max="100" suffix=" %" showButtons class="w-full" @update:modelValue="updateModel(); updatePosition()" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.arm.length" :step="1"  :min="5" :max="100" class="w-full" @update:modelValue="updateModel(); updatePosition()" />
                            </div>
                            <div>
                                <Button class="range-aling-btn" icon="pi pi-chevron-down"></Button>
                            </div>
                        </div>
                    </div>
                </InputGroup>
            </div>
            <div>
                <InputGroup class="input-range-group">
                    <InputGroupAddon class="gap-2">
                        Forearm length 
                        <span 
                            v-tooltip.left="`Length of the Forearm, starts from where both Arms connect. Its relative to Arm's length.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.forearm.length" :step="1" :min="10" :max="50" suffix=" %" showButtons class="w-full" @update:modelValue="updateModel(); updatePosition()" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.forearm.length" :step="1"  :min="10" :max="50" class="w-full" @update:modelValue="updateModel(); updatePosition()" />
                            </div>
                            <div>
                                <Button class="range-aling-btn" icon="pi pi-chevron-down"></Button>
                            </div>
                        </div>
                    </div>
                </InputGroup>
            </div>
            <div>
                <InputGroup class="input-range-group">
                    <InputGroupAddon class="gap-2">
                        Palm length 
                        <span 
                            v-tooltip.left="`Length of the Palm starts from both Forearms and connects each other. Its relative to Forearm's length.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.palm.length" :step="1" :min="100" :max="130" suffix=" %" showButtons class="w-full" @update:modelValue="updateModel(); updatePosition()" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.palm.length" :step="1"  :min="100" :max="130" class="w-full" @update:modelValue="updateModel(); updatePosition()" />
                            </div>
                            <div>
                                <Button class="range-aling-btn" icon="pi pi-chevron-down"></Button>
                            </div>
                        </div>
                    </div>
                </InputGroup>
            </div>
            <div>
                <InputGroup class="input-range-group">
                    <InputGroupAddon class="gap-2">
                        Accuracy
                        <span 
                            v-tooltip.left="`The fractional part of the Degree, each time it rotates. The more it is, the longer it takes to repeat the drawing, and the more random the outcome.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="accuracy" :step="1" :min="0" :max="8" showButtons class="w-full" @update:modelValue="updateModel" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="accuracy" :step="1"  :min="0" :max="8" class="w-full" @update:modelValue="updateModel" />
                            </div>
                            <div>
                                <Button class="range-aling-btn" icon="pi pi-chevron-down"></Button>
                            </div>
                        </div>
                    </div>
                </InputGroup>
            </div>
            <div>
                <InputGroup class="input-range-group">
                    <!-- <InputGroupAddon class="gap-2">
                        Depth
                        <span 
                            v-tooltip.left="`Determines how much it draws in Z axis to make a 3D like object.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon> -->
                    <div class="flex-none">
                        <Dropdown v-model="depthDir" :options="depthDirOptions" optionLabel="name" optionValue="value" placeholder="Depth direction" class="w-full border-noround-right" @update:modelValue="updateModel(); updatePosition()" />
                    </div>
                    <div class="flex-grow-1">
                        <InputNumber v-model="depth" :step="1" :min="0" :max="12" showButtons class="w-full" @update:modelValue="updateModel(); updatePosition()" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="depth" :step="1"  :min="0" :max="12" class="w-full" @update:modelValue="updateModel(); updatePosition()" />
                            </div>
                            <div>
                                <Button class="range-aling-btn" icon="pi pi-chevron-down"></Button>
                            </div>
                        </div>
                    </div>
                </InputGroup>
            </div>
            <div>
                <InputGroup class="input-range-group">
                    <InputGroupAddon class="gap-2">
                        Opacity
                        <span 
                            v-tooltip.left="`The transparency of the colors.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="opacity" :step=".1" :min=".1" :max="1" showButtons class="w-full" @update:modelValue="updateModel" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="opacity" :step=".1"  :min=".1" :max="1" class="w-full" @update:modelValue="updateModel" />
                            </div>
                            <div>
                                <Button class="range-aling-btn" icon="pi pi-chevron-down"></Button>
                            </div>
                        </div>
                    </div>
                </InputGroup>
            </div>
            <div>
                <InputGroup class="input-color-group">
                    <InputGroupAddon class="gap-2">
                        Colors
                        <span 
                            v-tooltip.left="`Choose different color in both selector to get a gradient.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1 flex border-1 surface-border border-round-right">
                        <div class="flex-grow-1 color-container border-right-1 surface-border">
                            <ColorPicker v-model="colorStart"  @update:modelValue="updateColor($event, 1)" />
                        </div>
                        <div class="flex-grow-1 color-container">
                            <ColorPicker v-model="colorEnd"  @update:modelValue="updateColor($event, 2)" />
                        </div>
                    </div>
                </InputGroup>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, reactive } from 'vue'
    import type { PropType } from 'vue'
    import type { HandType, ColorType } from '@/types/Setting';
    import SelectButton from 'primevue/selectbutton';
    import Slider from 'primevue/slider';
    import InputNumber from 'primevue/inputnumber';
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import Button from 'primevue/button';
    import ColorPicker from 'primevue/colorpicker';
    import Dropdown from 'primevue/dropdown';
    import helper from '@/helpers/helper';

    var currentValue = ref<HandType>({
        arm: {
            length: 5, // percent of board
            px: 0,
            bridge: {
                column: {
                    height: 0,
                    initialHeight: 0,
                }
            },
        },
        forearm:{
            length: 10, // percent of arm
            px: 0,
            
        },
        palm:{
            length: 100, // percent of forearm
            px: 0,
        },
    })

    const props = defineProps({
        modelValue: {
            type: Object as PropType<HandType | null>,
            default: null
        },
        color: {
            type: Object as PropType<ColorType>,
            default: null
        },
        accuracy: {
            type: Number,
            default: 2
        },
        depthDir: {
            type: Number,
            default: 1, // rounded = 1, spiral = 2
        },
        depth: {
            type: Number,
            default: 2
        },
        opacity: {
            type: Number,
            default: .5
        },
    })

    const emit = defineEmits([
        'update:modelValue',
        'update:position',
        'update:color',
        'update:accuracy',
        'update:depth',
        'update:depthDir',
        'update:opacity',
    ])

    const depthDirOptions = ref([
        { name: 'Depth - Rounded', value: 1 },
        { name: 'Depth - Spiral', value: 2 },
    ])

    const accuracy = ref(props.accuracy);
    const depth = ref(props.depth);
    const depthDir = ref(props.depthDir);
    const color = ref(props.color);
    const opacity = ref(props.opacity);
    
    
    const removeColorHash = (value: string) => {
        return (value.charAt(0) == '#') ? value.substring(1, 7) : value;
    }

    const colorStart = ref(removeColorHash(color.value.start));
    const colorEnd = ref(removeColorHash(color.value.end));

    const updateModel = () => {
        emit('update:accuracy', accuracy)
        emit('update:depth', depth)
        emit('update:depthDir', depthDir)
        emit('update:opacity', opacity)
        emit('update:modelValue', currentValue)
    }

    const updateColor = (e: any, no: number) => {
        // console.log(e, no)
        color.value.start = `#${colorStart.value}`;
        if(no == 1){
            colorEnd.value = colorStart.value;
        }
        color.value.end = `#${colorEnd.value}`;
        emit('update:color', color);
    }

    const updatePosition = () => {
        emit('update:position')
    }

    const onColorStartInput = (e: any) => {
        console.log(e)
        colorEnd.value = e.value;
    }

    onMounted(() => {
        console.log('SettingOther mounted')
        if(props.modelValue){
            currentValue.value = props.modelValue;
        }
        
        updateModel();
    })

    watch(() => [props.color.start, props.color.end], () => {
        color.value = props.color;
        colorStart.value = removeColorHash(color.value.start);
        colorEnd.value = removeColorHash(color.value.end);
    })
    

</script>