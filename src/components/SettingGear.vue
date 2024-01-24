<template>
    <div class="setting-gear">
        <!-- <div class="setting-gear-title"><strong>{{ side }} Motor</strong></div> -->
        <div class="flex flex-column gap-3">
            <div>
                <InputGroup class="direction-group">
                    <InputGroupAddon class="gap-2">
                        Disk 1 Direction 
                        <span 
                            v-tooltip.left="`The direction of Disk 1 (large) rotation in ${side} Motor`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <SelectButton v-model="currentValue.parent.dir" :options="dirOptions" optionValue="value" optionLabel="label" @update:modelValue="updateModel" />
                    </div>
                </InputGroup>
            </div>
            <div>
                <InputGroup class="direction-group">
                    <InputGroupAddon class="gap-2">
                        Disk 2 Direction 
                        <span 
                            v-tooltip.left="`The direction of Disk 2 (small) rotation in ${side} Motor`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <SelectButton v-model="currentValue.child.dir" :options="dirOptions" optionValue="value" optionLabel="label" @update:modelValue="updateModel" />
                    </div>
                </InputGroup>
            </div>
            <div>
                <InputGroup class="input-range-group">
                    <InputGroupAddon class="gap-2">
                        Move
                        <span 
                            v-tooltip.left="`The position of the ${side} Motor horizontally relative to screen and ${alterSide} Motor.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.wallDistance" :step="1" :min="0" :max="40" suffix=" %" showButtons class="w-full" @input="currentValue.wallDistance = ($event.value ?? 0) as number; updateModel(); updatePosition();"/>
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.wallDistance" :step="1"  :min="0" :max="40" class="w-full" @update:modelValue="updateModel(); updatePosition()" />
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
                        Disk 1 Angle 
                        <span 
                            v-tooltip.left="`Initial angle of Disk 1 (large) in ${side} Motor.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.deg" :step="1" :min="0" :max="360" suffix=" Deg" showButtons class="w-full" @input="currentValue.deg = ($event.value ?? 0) as number; updateModel(); updatePosition();"  />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.deg" :step="1"  :min="0" :max="360" class="w-full" @update:modelValue="updateModel(); updatePosition()" />
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
                        Disk 2 Angle 
                        <span 
                            v-tooltip.left="`Initial angle of Disk 2 (small) in ${side} Motor.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.child.conDeg" :step="1" :min="0" :max="360" suffix=" Deg" showButtons class="w-full" @input="currentValue.child.conDeg = ($event.value ?? 0) as number; updateModel(); updatePosition();" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.child.conDeg" :step="1"  :min="0" :max="360" class="w-full" @update:modelValue="updateModel(); updatePosition()" />
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
                        Disk 1 Speed 
                        <span 
                            v-tooltip.left="`How many seconds it takes to make a rotation for Disk 1 (large) in ${side} Motor. (SPR = Seconds to make a rotation)`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.parent.speed" :step=".10" :min="0" :max="300" suffix=" SPR" showButtons class="w-full" @input="currentValue.parent.speed = ($event.value ?? 0) as number; updateModel()" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.parent.speed" :step=".10" :min="0" :max="300" class="w-full" @update:modelValue="updateModel" />
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
                        Disk 2 Speed 
                        <span 
                            v-tooltip.left="`How many seconds it takes to make a rotation for Disk 2 (small) in ${side} Motor. (SPR = Seconds to make a rotation)`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.child.speed" :step=".10" :min="0" :max="300" suffix=" SPR" showButtons class="w-full" @input="currentValue.child.speed = ($event.value ?? 0) as number; updateModel()" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.child.speed" :step=".10" :min="0" :max="300" class="w-full" @update:modelValue="updateModel" />
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
                        Disk 1 Size 
                        <span 
                            v-tooltip.left="`The size of Disk 1 (large) in ${side} Motor relative to screen width.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.parent.size" :step=".5" :min="5" :max="40" suffix=" %" showButtons class="w-full" @input="currentValue.parent.size = ($event.value ?? 0) as number; updateModel(); updatePosition();"  />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.parent.size" :step=".5" :min="5" :max="40" class="w-full" @update:modelValue="updateModel(); updatePosition()" />
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
                        Disk 2 Size 
                        <span 
                            v-tooltip.left="`The size of Disk 2 (small) in ${side} Motor relative to screen width.`">
                            <span class="pi pi-info-circle"></span>
                        </span>
                    </InputGroupAddon>
                    <div class="flex-grow-1">
                        <InputNumber v-model="currentValue.child.size" :step=".5" :min="20" :max="80" suffix=" %" showButtons class="w-full"  @input="currentValue.child.size = ($event.value ?? 0) as number; updateModel(); updatePosition();" />
                        <div class="flex range-container">
                            <div class="flex-grow-1">
                                <Slider v-model="currentValue.child.size" :step=".5" :min="20" :max="80" class="w-full" @update:modelValue="updateModel(); updatePosition()" />
                            </div>
                            <div>
                                <Button class="range-aling-btn" icon="pi pi-chevron-down"></Button>
                            </div>
                        </div>
                    </div>
                </InputGroup>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted } from 'vue'
    import type { PropType } from 'vue'
    import type { SettingGearType } from '@/types/Setting';
    import SelectButton from 'primevue/selectbutton';
    import Slider from 'primevue/slider';
    import InputNumber from 'primevue/inputnumber';
    import InputGroup from 'primevue/inputgroup';
    import InputGroupAddon from 'primevue/inputgroupaddon';
    import Button from 'primevue/button';

    var currentValue = ref<SettingGearType>({
        side: 'left',
        deg: 0,
        wallDistance: 34,
        parent: {
            dir: -1,
            speed: 30,
            deg: 0,
            size: 14,
        },
        child: {
            dir: 1,
            speed: 2,
            deg: 0,
            size: 35,
            conDeg: 0,
        },
    })

    const props = defineProps({
        modelValue: {
            type: Object as PropType<SettingGearType | null>,
            default: null
        },
        side:{
            type: String,
            default: 'left'
        }
    })

    const emit = defineEmits(['update:modelValue', 'update:position'])

    const dirOptions = ref([
        {label: 'Negative', value: -1},
        {label: 'Positive', value: 1},
    ])

    var gearSide = ref('left');
    const side = ref<string>('Left');
    const alterSide = ref<string>('Right');

    const updateModel = () => {
        emit('update:modelValue', currentValue.value)
    }

    const updatePosition = () => {
        emit('update:position')
    }

    const tempDir = 1

    onMounted(() => {
        // console.log('SettingGear mounted')
        if(props.modelValue){
            currentValue.value = props.modelValue;
        }
        gearSide.value = props.side;
        currentValue.value.side = gearSide.value;
        side.value = gearSide.value == 'right' ? 'Right' : 'Left';
        alterSide.value = gearSide.value == 'right' ? 'Left' : 'Right';
        updateModel()
    })

</script>