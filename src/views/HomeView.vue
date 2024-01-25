<template>
    <main class="board" id="board" ref="boardRef" :class="{'drawing': drawing, 'pointer-events-none': drawing && isMachineVisible}">
        <canvas class="canvas" id="three-canvas" ref="canvasRef"></canvas>	
        <Machine :left="leftGear" :right="rightGear" :hand="hand" :board="board" :color="color"  ref="machineRef" :class="{'invisible' : !isMachineVisible}" ></Machine>
        <div class="intro" :style="{
            color: introColor
        }">
            <div class="name">Harmonograph 3D</div>
            <div class="copywrite"><span>Copyright (C) 2024 -</span><span>Jamshed Hossan</span></div>
        </div>
    </main>
    <div class="setting">
        <div class="active-tools">
            <div class="flex gap-2 align-items-center flex-wrap justify-content-end">
                <Button class="p-button-xs" v-if="drawing" size="small" severity="warning" label="Pause" @click="stop()"  :disabled="controlingManually"></Button>
                <Button class="p-button-xs" v-else size="small" label="Draw" @click="start(); sidebarShow = false;"  :disabled="controlingManually"></Button>
                <Button class="p-button-xs" v-if="isMachineVisible" size="small" label="Hide Machine" severity="help" @click="machineVisibility" :disabled="controlingManually"></Button>
                <SplitButton v-else class="p-splitbutton-xs" severity="info" label="Show Machine" @click="machineVisibility" :model="machineVisibilityOptions" :disabled="controlingManually" />
                <SplitButton v-if="isDrawn && cameraControlsDirty && (!isMachineVisible || (isMachineVisible && !drawing))" class="p-splitbutton-xs" severity="secondary" label="Reset Position" @click="resetPosition" :model="resetPositionOptions" />
                
                <a href="https://github.com/jamshedhossan9/harmonograph-3d" target="_blank" v-tooltip.top="'Github'">
                    <Button class="p-button-xs" icon="pi pi-github" size="small" rounded severity="secondary" ></Button>
                </a>
                <Info></Info>
                <Button class="p-button-xs" :icon="sidebarShow ? 'pi pi-angle-right' : 'pi pi-wrench'"  size="small" rounded severity="secondary" @click="stop(); sidebarShow = true" v-tooltip.left="'Settings'"></Button>
            </div>
        </div>
    </div>
    <Sidebar v-model:visible="sidebarShow" header="Setting" @show="onSidebarShow" position="right" class="w-full md:w-30rem lg:w-30rem setting-sidebar">
        <div class="flex flex-column h-full">
            
            <div class="flex-grow-1 overflow-y-auto" ref="settingScroller">
                <Accordion :multiple="true" v-model:activeIndex="settingActiveIndex" class="p-accordion-sm p-accordion-tab-sticky">
                    <AccordionTab header="Left Motor">
                        <SettingGear v-model="leftGear" @update:modelValue="updatedGearValue" @update:position="updatedPosition"></SettingGear>

                    </AccordionTab>
                    <AccordionTab header="Right Motor">

                        <SettingGear v-model="rightGear" side="right" @update:modelValue="updatedGearValue" @update:position="updatedPosition"></SettingGear>
                    </AccordionTab>
                    <AccordionTab header="Others">
                        <SettingOther 
                            v-model="hand" 
                            v-model:backgroundGradient="backgroundGradient"
                            @update:backgroundGradient="updatedBackground"
                            v-model:accuracy="canvas.accuracy" 
                            v-model:depth="canvas.depth" 
                            v-model:depthDir="canvas.depthDir" 
                            :opacity="color.opacity" 
                            @update:opacity="setOpacity" 
                            :color="color" 
                            @update:color="setColor" 
                            @update:modelValue="updatedGearValue"
                            @update:position="updatedPosition" >
                        </SettingOther>
                    </AccordionTab>
                </Accordion>
            </div>
            <div class="flex-none mt-auto pt-2 flex gap-1 justify-content-between align-items-center flex-wrap sidebar-bottom-toolbar">
                <Button class="p-button-xs" v-if="drawing" size="small" severity="warning" label="Pause" @click="stop()"></Button>
                <Button class="p-button-xs" v-else size="small" label="Draw" @click="start(); sidebarShow = false;"></Button>
                <SplitButton v-if="isDrawn" class="p-splitbutton-xs" severity="success" label="Export" ref="exportBtnRef" @click="openExportOptions" :model="exportOptions" />
                <Button class="p-button-xs" v-if="!drawing" size="small" label="Clear" severity="danger" @click="clear()"></Button>
                <Presets @onSelect="setPreset" ></Presets>
                <Button class="p-button-xs" size="small" icon="pi pi-angle-right" outlined severity="secondary" @click="sidebarShow = false"></Button>
            </div>
        </div>
        
    </Sidebar>
    <Thanks ref="thanksRef"></Thanks>
    <a id="canvasimg" ref="canvasimgRef" style="position:absolute;top:10%;left:52%;display:none;" download>Download</a>
    <a ref="stlExportRef" style="position:absolute;top:10%;left:52%;display:none;" download>Download</a>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import Button from 'primevue/button';
import Sidebar from 'primevue/sidebar';
import SettingGear from '@/components/SettingGear.vue';
import SettingOther from '@/components/SettingOther.vue';
import Machine from '@/components/Machine.vue';
import Presets from '@/components/Presets.vue';
import Info from '@/components/Info.vue';
import type { SettingGearType, BoardType, CanvasType, HandType, ColorType, BackgroundGradient } from '@/types/Setting';
import helper from '@/helpers/helper';
import MyWorker from '@/helpers/worker?worker';
import * as THREE from 'three';
import CameraControls from 'camera-controls';
import { onKeyStroke } from '@vueuse/core';
import { GifWriter } from 'omggif';
import SplitButton from 'primevue/splitbutton';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Thanks from '@/components/Thanks.vue';
import { useScroll } from '@vueuse/core'

const isMounted = ref(false);
const sidebarShow = ref(false);
const settingActiveIndex = ref([0, 1, 2])
const onSidebarShow = () => {
    settingScrollerY.value = settingScrollerCurrentX.value;
}
const settingScroller = ref();
const settingScrollerCurrentX = ref(0);
const { y: settingScrollerY } = useScroll(settingScroller, { onScroll: () => {
    settingScrollerCurrentX.value = settingScrollerY.value;
} })

const thanksRef = ref();
const boardRef = ref();
const board = ref<BoardType>({
    size:{
        width:0, 
        height: 0,
        min: 0,
        max: 0,
    }
})
const canvasRef = ref()
const canvas = ref<CanvasType>({
    scale: 1,
    strokeWidth: 1,
    accuracy: 1,
    depth: 8,
    depthDir: 1,
    context: null,
    size: {
        width:0, 
        height: 0
    },
    pos: {
        x: 0,
        y: 0,
    },
    penPos: {
        x: 0, y: 0,
        oldx:0, oldy: 0,
    },
    startDeg:{
        0: {
            parent: 0,
            child: 0,
        },
        1: {
            parent: 0,
            child: 0,
        },
        degLogged: false,
    },
    startedPosition: 0,
})
const color = ref<ColorType>({
    start: "#000000",
    end: "#000000",
    size: 500,
    range: [],
    current: 0,
    opacity: .5,
})

const leftGear = ref<SettingGearType>({
    side: 'left',
    deg: 206,
    wallDistance: 21,
    parent: {
        dir: 1,
        speed: 239,
        deg: 0,
        size: 27,
    },
    child: {
        dir: -1,
        speed: 2,
        deg: 0,
        size: 60,
        conDeg: 0,
    },
});
const rightGear = ref<SettingGearType>({
    side: 'right',
    deg: 260,
    wallDistance: 0,
    parent: {
        dir: -1,
        speed: 182,
        deg: 0,
        size: 36,
    },
    child: {
        dir: 1,
        speed: 3,
        deg: 0,
        size: 80,
        conDeg: 0,
    },
});
const hand = ref<HandType>({
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
const gear = {
    0: leftGear,
    1: rightGear
};

const settingToCache = () => {
    // console.log(gear)
    var setting = {
        color:{
            start: color.value.start,
            end: color.value.end,
            opacity: color.value.opacity,
        },
        background:{
            color1: backgroundGradient.value.color1,
            color2: backgroundGradient.value.color2,
        },
        canvas:{
            accuracy: canvas.value.accuracy,
            depth: canvas.value.depth,
            depthDir: canvas.value.depthDir,
        },
        machine: {
            gear: {
                0: { // left
                    deg: gear[0].value.deg,
                    wallDistance: gear[0].value.wallDistance,
                    parent: {
                        dir: gear[0].value.parent.dir,
                        speed: gear[0].value.parent.speed,
                        size: gear[0].value.parent.size,
                    },
                    child: {
                        dir: gear[0].value.child.dir,
                        speed: gear[0].value.child.speed,
                        size: gear[0].value.child.size,
                        conDeg: gear[0].value.child.conDeg,
                    },
                },
                1: {
                    deg: gear[1].value.deg,
                    wallDistance: gear[1].value.wallDistance,
                    parent: {
                        dir: gear[1].value.parent.dir,
                        speed: gear[1].value.parent.speed,
                        size: gear[1].value.parent.size,
                    },
                    child: {
                        dir: gear[1].value.child.dir,
                        speed: gear[1].value.child.speed,
                        size: gear[1].value.child.size,
                        conDeg: gear[1].value.child.conDeg,
                    },
                },
            },
            hand: {
                arm: {
                    length: hand.value.arm.length,
                },
                forearm:{
                    length: hand.value.forearm.length,
                },
                palm:{
                    length: hand.value.palm.length,
                }
            },
        }
    };
    localStorage.setItem('harmonograph_3d_setting', JSON.stringify(setting));
    // console.log(localStorage)
}

const cacheToSetting = (setting?: any, isPreset: boolean = false) => {
    if(typeof setting === "undefined"){
        try{
            setting = JSON.parse(localStorage.getItem('harmonograph_3d_setting') ?? '');
        }
        catch(e){
            setting = null;
        }
    }
    if(setting){
        // console.log(setting)
        if(typeof setting?.machine?.gear?.[0]?.deg !== "undefined"){
            gear[0].value.deg = setting.machine.gear[0].deg;
        }
        if(typeof setting?.machine?.gear?.[0]?.child?.conDeg !== "undefined"){
            gear[0].value.child.conDeg = setting.machine.gear[0].child.conDeg;
        }
        if(typeof setting?.machine?.gear?.[0]?.wallDistance !== "undefined"){
            gear[0].value.wallDistance = setting.machine.gear[0].wallDistance;
        }
        if(typeof setting?.machine?.gear?.[0]?.parent?.dir !== "undefined"){
            gear[0].value.parent.dir = setting.machine.gear[0].parent.dir;
        }
        if(typeof setting?.machine?.gear?.[0]?.parent?.speed !== "undefined"){
            gear[0].value.parent.speed = setting.machine.gear[0].parent.speed;
        }
        if(typeof setting?.machine?.gear?.[0]?.parent?.size !== "undefined"){
            gear[0].value.parent.size = setting.machine.gear[0].parent.size;
        }
        if(typeof setting?.machine?.gear?.[0]?.child?.dir !== "undefined"){
            gear[0].value.child.dir = setting.machine.gear[0].child.dir;
        }
        if(typeof setting?.machine?.gear?.[0]?.child?.speed !== "undefined"){
            gear[0].value.child.speed = setting.machine.gear[0].child.speed;
        }
        if(typeof setting?.machine?.gear?.[0]?.child?.size !== "undefined"){
            gear[0].value.child.size = setting.machine.gear[0].child.size;
        }

        if(typeof setting?.machine?.gear?.[1]?.deg !== "undefined"){
            gear[1].value.deg = setting.machine.gear[1].deg;
        }
        if(typeof setting?.machine?.gear?.[1]?.child?.conDeg !== "undefined"){
            gear[1].value.child.conDeg = setting.machine.gear[1].child.conDeg;
        }
        if(typeof setting?.machine?.gear?.[1]?.wallDistance !== "undefined"){
            gear[1].value.wallDistance = setting.machine.gear[1].wallDistance;
        }
        if(typeof setting?.machine?.gear?.[1]?.parent?.dir !== "undefined"){
            gear[1].value.parent.dir = setting.machine.gear[1].parent.dir;
        }
        if(typeof setting?.machine?.gear?.[1]?.parent?.speed !== "undefined"){
            gear[1].value.parent.speed = setting.machine.gear[1].parent.speed;
        }
        if(typeof setting?.machine?.gear?.[1]?.parent?.size !== "undefined"){
            gear[1].value.parent.size = setting.machine.gear[1].parent.size;
        }
        if(typeof setting?.machine?.gear?.[1]?.child?.dir !== "undefined"){
            gear[1].value.child.dir = setting.machine.gear[1].child.dir;
        }
        if(typeof setting?.machine?.gear?.[1]?.child?.speed !== "undefined"){
            gear[1].value.child.speed = setting.machine.gear[1].child.speed;
        }
        if(typeof setting?.machine?.gear?.[1]?.child?.size !== "undefined"){
            gear[1].value.child.size = setting.machine.gear[1].child.size;
        }
        
        if(typeof setting?.machine?.hand?.arm?.length !== "undefined"){
            hand.value.arm.length = setting.machine.hand.arm.length;
        }
        if(typeof setting?.machine?.hand?.forearm?.length !== "undefined"){
            hand.value.forearm.length = setting.machine.hand.forearm.length;
        }
        if(typeof setting?.machine?.hand?.palm?.length !== "undefined"){
            hand.value.palm.length = setting.machine.hand.palm.length;
        }

        if(typeof setting?.canvas?.accuracy !== "undefined"){
            canvas.value.accuracy = setting.canvas.accuracy;
        }
        if(typeof setting?.canvas?.depth !== "undefined"){
            canvas.value.depth = setting.canvas.depth;
        }
        else{
            canvas.value.depth = 2;
        }
        if(typeof setting?.canvas?.depthDir !== "undefined"){
            canvas.value.depthDir = setting.canvas.depthDir;
        }
        else{
            canvas.value.depthDir = 1;
        }

        if(typeof setting?.color?.start !== "undefined"){
            color.value.start = setting.color.start;
        }
        if(typeof setting?.color?.end !== "undefined"){
            color.value.end = setting.color.end;
        }
        if(typeof setting?.color?.opacity !== "undefined"){
            color.value.opacity = setting.color.opacity;
        }
        else{
            color.value.opacity = .5;
        }

        if(typeof setting?.background?.color1 !== "undefined"){
            backgroundGradient.value.color1 = setting.background.color1;
        }
        else if(isPreset){
            backgroundGradient.value.color1 = backgroundGradientDefault.color1;
        }
        if(typeof setting?.background?.color2 !== "undefined"){ 
            backgroundGradient.value.color2 = setting.background.color2;
        }
        else if(isPreset){
            backgroundGradient.value.color2 = backgroundGradientDefault.color2;
        }
        if(isPreset){
            generateBackground();
        }
    }
}

const cacheToSettingOthers = () => {
    let setting: any = null;
    try{
        setting = JSON.parse(localStorage.getItem('harmonograph_3d_setting_others') ?? '');
    }
    catch(e){
        setting = null;
    }
    if(setting){
        if(typeof setting.enable_auto_rotate !== "undefined"){
            enableAutoRotate.value = setting.enable_auto_rotate;
        }
    }
}

const settingToCacheOthers = () => {
    let setting: any= {
        enable_auto_rotate: enableAutoRotate.value,
    }
    localStorage.setItem('harmonograph_3d_setting_others', JSON.stringify(setting));
}

const onUpdateSetting = () => {
    settingToCache();
}

const updatedGearValue = (a: any, b: any) => {
    logStartPosition(false);
    onUpdateSetting();
    machineRef.value.setMachineAndGear();
}

const updatedPosition = () => {
    threedPosHolder.positionChanged = true;
    threedPosHolder.startDraw = true;
}

const setBoard = () => {
    var width = window.innerWidth;
    var height = window.innerHeight;
    board.value.size.width = width;
    board.value.size.height = height;
    board.value.size.min = Math.min(width, height);
    board.value.size.max = Math.max(width, height);

    boardRef.value.style.left = `0px`;
    boardRef.value.style.width = `${board.value.size.width}px`;
    boardRef.value.style.height = `${board.value.size.height}px`;

    machineRef.value.machineGearCon.style.width = `${board.value.size.min}px`;

    canvas.value.size.width = board.value.size.width * canvas.value.scale;
    canvas.value.size.height = (board.value.size.height) * canvas.value.scale;

    canvasRef.value.width = canvas.value.size.width;
    canvasRef.value.height = canvas.value.size.height;

    canvas.value.pos = canvasRef.value.getBoundingClientRect();

}

const setColor = () => {
    onUpdateSetting()
    machineRef.value.setColor();
}

const setOpacity = (value: any) => {
    color.value.opacity = value;
    onUpdateSetting();
    if(material){
        // material.opacity = color.value.opacity;
    }
}

const worker = new MyWorker();
const drawing = ref(false);
const isDrawn = ref(false);
const cameraControlsDirty = ref(false);
var renderer: THREE.WebGLRenderer,
    clock: THREE.Clock,
    // camera: THREE.PerspectiveCamera,
    camera: THREE.OrthographicCamera,
    scene: THREE.Scene,
    cameraControls: CameraControls,
    geometry: THREE.BufferGeometry,
    material: THREE.LineBasicMaterial,
    line: THREE.Line,
    positionAttribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
    colorAttribute: THREE.BufferAttribute | THREE.InterleavedBufferAttribute,
    positions: Float32Array,
    colorMap: Float32Array,
    backgroundMesh: THREE.Mesh;

var frequency: number = 50,
    perspective: number = 1600,
    fov: number = 0,
    MAX_POINTS: number = 30000,
    currentPossition: number = 0,
    currentDepth: number = 0,
    depthInc: number = .2,
    threedPosHolderDefault: any = {
        old:{
            x:0,
            y:0,
            z:0,
        },
        new:{
            x:0,
            y:0,
            z:0,
        },
        max:{
            x:0,
            y:0,
            z:0,
        },
        min:{
            x:0,
            y:0,
            z:0,
        },
        middleZ: 0,
        currentZ:0,
        minZ:0,
        maxZ:0,
        firstDraw: false,
        startDraw: true,
        positionChanged: true,
    },
    threedPosHolder = { ...threedPosHolderDefault };

const setScene = () => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.value, alpha: true });
    // renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setClearColor( 0xffffff, 1 );
    renderer.setSize( canvas.value.size.width, canvas.value.size.height );
    renderer.shadowMap.enabled = true;
    // renderer.setAnimationLoop( render );

    clock = new THREE.Clock();

    fov = 180 * ( 2 * Math.atan( board.value.size.height / 2 / perspective ) ) / Math.PI
    // camera = new THREE.PerspectiveCamera( fov, board.value.size.width / board.value.size.height, 1, 30000 );
    // camera.position.set( 100, 100, perspective );
    
    camera = new THREE.OrthographicCamera( board.value.size.width / - 2, board.value.size.width / 2, board.value.size.height / 2, board.value.size.height / - 2, .1, 30000 );
    camera.position.set( 0, 0, perspective );
    // document.body.style.perspective = `${perspective}px`;

    scene = new THREE.Scene();
    // scene.background = new THREE.Color( 0xffffff );;

    generateBackground();
    scene.add(backgroundMesh)

    geometry = new THREE.BufferGeometry();
    positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
    colorMap = new Float32Array( MAX_POINTS * 4 ); // 3 vertices per point
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color', new THREE.BufferAttribute( colorMap, 4 ) );
    material = new THREE.LineBasicMaterial( { 
        // color: 0xff0000, 
        vertexColors: true,
        linewidth: 1,
        transparent: true,
        opacity: 1, //color.value.opacity,
        fog: false,
        depthWrite: false,
    } );
    
    line = new THREE.Line( geometry, material );
    line.castShadow = true;
    line.receiveShadow = true;
    scene.add( line );
    positionAttribute = line.geometry.getAttribute( 'position' );
    positionAttribute.setXYZ( 0, 0, 0, 0 );
    colorAttribute = line.geometry.getAttribute( 'color' );
    colorAttribute.setXYZW( 0, 0, 0, 0, 0 );
    
    geometry.setDrawRange( 0, 2);

    CameraControls.install({
        THREE: THREE
    });

    cameraControls = new CameraControls( camera, renderer.domElement );
    cameraControls.maxDistance = 30000;
    // cameraControls.dollyToCursor = true;
    // cameraControls.infinityDolly = true;
    // cameraControls.enableDamping = true;
    // cameraControls.smoothTime = 1;
    // cameraControls.dampingFactor = 1;

    cameraControls.addEventListener( 'control', function ( event ) {
        cameraControlsDirty.value = true;
    });
    cameraControls.addEventListener( 'controlstart', () => {
        controlingManually.value = true;
    } );
    cameraControls.addEventListener( 'controlend', () => {
        controlingManually.value = false;
    } );
    cameraControls.addEventListener( 'rest', function ( event ) {
        if(cameraControlsDirty.value){
            setControlCenterOfObject();
        }
    });


    threedPosHolder = { ...threedPosHolderDefault };
    threedPosHolder.firstDraw = true;

    // window.line = line
    // window.camera = camera
    // window.cameraControls = cameraControls

    
}

const backgroundGradientDefault: BackgroundGradient = {
    color1: '#ffffff',
    color2: '#d7dde0',
}

const backgroundGradient = ref<BackgroundGradient>({
    color1: backgroundGradientDefault.color1,
    color2: backgroundGradientDefault.color2,
});

const generateBackground = (colors?: BackgroundGradient) => {
    let color1: any;
    let color2: any;
    if(typeof colors !== "undefined"){
        color1 = helper.convertToRGB(colors.color1);
        color2 = helper.convertToRGB(colors.color2);
    }
    else{
        color1 = helper.convertToRGB(backgroundGradient.value.color1);
        color2 = helper.convertToRGB(backgroundGradient.value.color2);
    }
    
    // console.log(backgroundGradient.value, color1, color2, backgroundMesh)
    if(typeof backgroundMesh === "undefined"){
        let g = new THREE.PlaneGeometry(2, 2);
        let m = new THREE.ShaderMaterial({
            uniforms: {
                color1: { value: new THREE.Color(`rgb(${color1[0]},${color1[1]},${color1[2]})`)},
                color2: { value: new THREE.Color(`rgb(${color2[0]},${color2[1]},${color2[2]})`)},
                ratio: { value: board.value.size.width / board.value.size.height }
            },
            vertexShader: `varying vec2 vUv;
                void main(){
                    vUv = uv;
                    gl_Position = vec4(position, 1.);
                }`,
            fragmentShader: `varying vec2 vUv;
                uniform vec3 color1;
                uniform vec3 color2;
                uniform float ratio;
                void main(){
                    vec2 uv = (vUv - 0.5) * vec2(ratio, 1.);
                    gl_FragColor = vec4( mix( color1, color2, length(uv)), 1. );
                }`
        });
        // console.log(m)
        backgroundMesh = new THREE.Mesh(g, m);
        backgroundMesh.frustumCulled = false;
    }
    else{
        (backgroundMesh.material as THREE.ShaderMaterial).uniforms.color1.value = new THREE.Color(`rgb(${color1[0]},${color1[1]},${color1[2]})`);
        (backgroundMesh.material as THREE.ShaderMaterial).uniforms.color2.value = new THREE.Color(`rgb(${color2[0]},${color2[1]},${color2[2]})`);
    }
}
// window.generateBackground = generateBackground;

const updatedBackground = () => {
    onUpdateSetting();
    generateBackground();
}

const resetScene = () => {
    // camera.position.set( 0, 0, perspective );

    // geometry = new THREE.BufferGeometry();
    positions = new Float32Array( MAX_POINTS * 3 ); // 3 vertices per point
    colorMap = new Float32Array( MAX_POINTS * 4 ); // 3 vertices per point
    geometry.setAttribute( 'position', new THREE.BufferAttribute( positions, 3 ) );
    geometry.setAttribute( 'color', new THREE.BufferAttribute( colorMap, 4 ) );

    positionAttribute = line.geometry.getAttribute( 'position' );
    positionAttribute.setXYZ( 0, 0, 0, 0 );
    colorAttribute = line.geometry.getAttribute( 'color' );
    colorAttribute.setXYZW( 0, 0, 0, 0, 0 );
    currentPossition = 0;
    currentDepth = 0;

    geometry.setDrawRange( 0,  0);
    cameraControlsDirty.value = false;
    cameraControls.reset();
    
    threedPosHolder = { ...threedPosHolderDefault };
}

const setControlCenterOfObject = () => {
    let x = (threedPosHolder.max.x - (Math.abs(threedPosHolder.max.x - threedPosHolder.min.x) / 2));
    let y = (threedPosHolder.max.y - (Math.abs(threedPosHolder.max.y - threedPosHolder.min.y) / 2));
    let z = (threedPosHolder.max.z - (Math.abs(threedPosHolder.max.z - threedPosHolder.min.z) / 2));
    
    cameraControls.setOrbitPoint(x,y,z)
}

const checkCurrentPosition = () => {
    let gear0parentDeg = gear[0].value.parent.deg;
    let gear0childDeg = gear[0].value.child.deg;
    let gear1parentDeg = gear[1].value.parent.deg;
    let gear1childDeg = gear[1].value.child.deg;
    if(
        gear0parentDeg == canvas.value.startDeg[0].parent &&
        gear0childDeg == canvas.value.startDeg[0].child && 
        gear1parentDeg == canvas.value.startDeg[1].parent &&
        gear1childDeg == canvas.value.startDeg[1].child
    ){
        stop();
        return false;
    }
    return true;
}

const drawThree = () => {
    
    if(currentPossition >= MAX_POINTS){
        // console.log('Max points reached', MAX_POINTS)
        stop();
    }
    let x = threedPosHolder.new.x;
    let y = threedPosHolder.new.y;
    let z = threedPosHolder.new.z;
    const color3 = new THREE.Color(`rgb(${color.value.range[color.value.current][0]},${color.value.range[color.value.current][1]},${color.value.range[color.value.current][2]})`);
    let o = color.value.opacity;
    
    if(threedPosHolder.positionChanged){
        if(currentPossition > 1){
            o = 0;
            colorAttribute.setXYZW( currentPossition - 1, 0, 0, 0, o );
        }
        threedPosHolder.positionChanged = false;
    }
    colorAttribute.setXYZW( currentPossition, color3.r, color3.g, color3.b, o );
    positionAttribute.setXYZ( currentPossition, x, y, z );
    
    geometry.setDrawRange( 0,  currentPossition+1);
    geometry.computeBoundingSphere();
    if(isMachineVisible.value){
        cameraControls.moveTo(0,0, z, false);// = new THREE.Vector3(0,0, z);
    }
    currentPossition++;
    color.value.current++;
    if(color.value.current >= color.value.range.length){
        color.value.current = 0;
    }
    currentDepth += depthInc;
    if(currentPossition - 1 == canvas.value.startedPosition){
        logStartPosition(true);
    }
    if(currentPossition - 1 > canvas.value.startedPosition){
        return checkCurrentPosition();
    }
    
    return true;
}

const draw = () => {
    drawThree();
}

const turnMotor = (reset?: boolean) => {    
    if(typeof reset === "undefined"){
        reset = false;
    }
    // console.log('turnMotor');
    const calSpeed = (sec: number, dir: number) => {
        if(!sec){
            return 0;
        }
        return (360/(sec*1000)) * frequency * dir;
    }

    const roundDeg = (deg: number) => {
        if(reset){
            return 0;
        }
        deg = deg % 360;
        deg = helper.parseFloat(deg.toFixed(canvas.value.accuracy));
        if(deg === -0){
            deg = 0;
        }
        else if(deg === 360 || deg === -360){
            deg = 0;
        }
        return deg;
    }

    gear[0].value.parent.deg = roundDeg(gear[0].value.parent.deg + calSpeed(gear[0].value.parent.speed, gear[0].value.parent.dir));
    gear[0].value.child.deg = roundDeg(gear[0].value.child.deg + calSpeed(gear[0].value.child.speed, gear[0].value.child.dir));
    gear[1].value.parent.deg = roundDeg(gear[1].value.parent.deg + calSpeed(gear[1].value.parent.speed, gear[1].value.parent.dir));
    gear[1].value.child.deg = roundDeg(gear[1].value.child.deg + calSpeed(gear[1].value.child.speed, gear[1].value.child.dir));

    machineRef.value.leftRef.machine_gear_parent.style.transform = `rotate(${ gear[0].value.parent.deg }deg)`;
    machineRef.value.leftRef.machine_gear_child.style.transform = `rotate(${ gear[0].value.child.deg }deg)`;
    machineRef.value.rightRef.machine_gear_parent.style.transform = `rotate(${ gear[1].value.parent.deg }deg)`;
    machineRef.value.rightRef.machine_gear_child.style.transform = `rotate(${ gear[1].value.child.deg }deg)`;

}

const objectPosChange = () => {
    if(!gear[0].value.parent.speed && !gear[1].value.parent.speed && !gear[0].value.child.speed && !gear[1].value.child.speed){
        stop();
        return;
    }
    isDrawn.value = true;
    canvas.value.penPos.oldx = canvas.value.penPos.x;
    canvas.value.penPos.oldy = canvas.value.penPos.y;
    if(threedPosHolder.startDraw){
        threedPosHolder.old.x = (canvas.value.penPos.x - canvas.value.pos.x) - (board.value.size.width / 2);
        threedPosHolder.old.y = ((canvas.value.penPos.y - canvas.value.pos.y) - (board.value.size.height / 2)) * (-1);
        threedPosHolder.old.z = threedPosHolder.new.z;

        threedPosHolder.max.x = threedPosHolder.old.x;
        threedPosHolder.max.y = threedPosHolder.old.y;
        threedPosHolder.max.z = threedPosHolder.old.z;

        threedPosHolder.min.x = threedPosHolder.old.x;
        threedPosHolder.min.y = threedPosHolder.old.y;
        threedPosHolder.min.z = threedPosHolder.old.z;

        threedPosHolder.startDraw = false;
    }
    else{
        threedPosHolder.old.x = threedPosHolder.new.x;
        threedPosHolder.old.y = threedPosHolder.new.y;
        threedPosHolder.old.z = threedPosHolder.new.z;
    }
    turnMotor();
    machineRef.value.setMachine();
    var bound = machineRef.value.handRef.machine_hand_pen.getBoundingClientRect();
    canvas.value.penPos.x = bound.left;
    canvas.value.penPos.y = bound.top;
    threedPosHolder.new.x = (canvas.value.penPos.x - canvas.value.pos.x) - (board.value.size.width / 2);
    threedPosHolder.new.y = ((canvas.value.penPos.y - canvas.value.pos.y) - (board.value.size.height / 2)) * (-1);

    let x = threedPosHolder.old.x - threedPosHolder.new.x;
    let y = threedPosHolder.old.y - threedPosHolder.new.y;
    
    let z = 0;
    if(canvas.value.depthDir == 1){
        z = ((x+y)/2) * canvas.value.depth;
    }
    else if(canvas.value.depthDir == 2){
        z = canvas.value.depth > 0 ? threedPosHolder.old.z + (canvas.value.depth / 10) : 0;
    }

    threedPosHolder.new.z = z;

    threedPosHolder.max.x = Math.max(threedPosHolder.max.x, threedPosHolder.new.x);
    threedPosHolder.max.y = Math.max(threedPosHolder.max.y, threedPosHolder.new.y);
    threedPosHolder.max.z = Math.max(threedPosHolder.max.z, threedPosHolder.new.z);

    threedPosHolder.min.x = Math.min(threedPosHolder.min.x, threedPosHolder.new.x);
    threedPosHolder.min.y = Math.min(threedPosHolder.min.y, threedPosHolder.new.y);
    threedPosHolder.min.z = Math.min(threedPosHolder.min.z, threedPosHolder.new.z);

    let status = drawThree();	
    if(status && drawing.value){
        // turnMotor();
        // machineRef.value.setMachine();
    }
    
    if(drawing.value){
        // setTimeout(function(){
        //     if(drawing){
        //         objectPosChange();
        //     }
        // }, frequency)
        worker.postMessage({frequency: frequency})
    }
    
}

const enableAutoRotate = ref(false);
const controlingManually = ref(false);
const render = () => {

    autoRotateForGif();
    
    const delta = clock.getDelta();
    const hasControlsUpdated = cameraControls.update( delta );

    if ( enableAutoRotate.value && !controlingManually.value && !isMachineVisible.value) {
        setControlCenterOfObject();
        cameraControls.azimuthAngle += 10 * delta * THREE.MathUtils.DEG2RAD;
        cameraControlsDirty.value = true;
    }

    requestAnimationFrame( render );
    renderer.render( scene, camera );
    // if(!enableAutoRotate.value){    
    // }
    colorAttribute.needsUpdate = true;
    positionAttribute.needsUpdate = true;

}

const init = () => {
    cacheToSetting();
    setBoard(); 
    machineRef.value.setMachineAndGear();
    machineRef.value.setColor();
    setScene();
    hand.value.arm.bridge.column.initialHeight = hand.value.arm.bridge.column.height;
    render();
}

worker.addEventListener('message', function(e){
    if(drawing.value){
        objectPosChange();
    }
});

const logStartPosition = (a: boolean) => {
    if(a && !canvas.value.startDeg.degLogged){
        canvas.value.startDeg[0].parent = gear[0].value.parent.deg;
        canvas.value.startDeg[0].child = gear[0].value.child.deg;
        canvas.value.startDeg[1].parent = gear[1].value.parent.deg;
        canvas.value.startDeg[1].child = gear[1].value.child.deg;
    }
    canvas.value.startDeg.degLogged = a;
}

const canvasimgRef = ref();
const stlExportRef = ref();
const save = () => {
    renderer.setClearColor( 0xffffff, 0 );
    scene.remove(backgroundMesh);
    renderer.render( scene, camera );
    var dataURL = renderer.domElement.toDataURL('image/png');
    // console.log(canvasimgRef.value, dataURL)
    canvasimgRef.value.href = dataURL;
    canvasimgRef.value.download = 'pintograph.png';
    canvasimgRef.value.click();
    renderer.setClearColor( 0xffffff, 1 );
    scene.add(backgroundMesh);
    thanksRef.value.openPopup();
}
const saveJpeg = () => {
    renderer.setClearColor( 0xffffff, 1 );
    renderer.render( scene, camera );
    var dataURL = renderer.domElement.toDataURL('image/jpeg');
    // console.log(canvasimgRef.value, dataURL)
    canvasimgRef.value.href = dataURL;
    canvasimgRef.value.download = 'pintograph.jpeg';
    canvasimgRef.value.click();
    renderer.setClearColor( 0xffffff, 1 );
    thanksRef.value.openPopup();
}

const generatingGif = ref(false);
var gifDefault: any = {
    canvas: null,
    context: null,
    duration: 9,
    fps: 20,
    frames: 9 * 20,
    buffer: null,
    pixels: null,
    writer: null,
    degPerStep: Math.PI/90,
    currentSetp: 0,
    currentDeg: 0,
    generatedBuffer: null,
    zoomEnded: 1,
    isMachineVisible: false,
    needResize: false,
}
var gif = {...gifDefault};

const autoRotateForGif = () => {
	if ( generatingGif.value ) {
        const delta = clock.getDelta();
        const elapsed = clock.getElapsedTime();
        const updated = cameraControls.update( delta );

        gif.currentSetp++;
        gif.currentDeg = gif.degPerStep * gif.currentSetp;
		cameraControls.azimuthAngle += gif.degPerStep;
        generateGIF();
        if(gif.currentSetp >= gif.frames){
            generatingGif.value = false;
            cameraControls.azimuthAngle = 0;
            cameraControls.polarAngle = Math.PI/2;
            gif.generatedBuffer = gif.buffer.subarray( 0, gif.writer.end() )
            exportGif();
        }
	}
}

const triggerAutoRotateForGif = () => {
    if(!generatingGif.value){
        controlingManually.value = true;
        cameraControls.rotateTo(0, Math.PI/2, true).then(function(){
            cameraControls.azimuthAngle = 0;
            cameraControls.polarAngle = Math.PI/2;
            generatingGif.value = true;
            autoRotateForGif();
        })
    }
}

const exportGif = () => {
    const blob = new Blob( [ gif.generatedBuffer ], { type: 'image/gif' } );

    canvasimgRef.value.href = URL.createObjectURL( blob );
    canvasimgRef.value.download = 'pintograph.gif';
    canvasimgRef.value.click();
    controlingManually.value = false;
    if(gif.needResize){
        resizeRenderer();
    }
    generateBackground();
    isMachineVisible.value = gif.isMachineVisible;
    thanksRef.value.openPopup();
}

const reduceRatio = (width: number, height: number, max: number = 1500) => {
    // let max = 1500;
    let _width: number = width;
    let _height: number = height;
    let needResize: boolean = false;
    if(width > max || height > max){
        if(width > height){
            _width = max;
            _height = (max / width) * height;
        }
        else{
            _height = max;
            _width = (max / height) * width;
        }
        needResize = true;
    }
    return {
        width: _width,
        height: _height,
        needResize: needResize
    }
}

// window.reduceRatio = reduceRatio;

const resizeRenderer = (dimension?:{
    width: number,
    height: number
}) => {
    
    let width: number, height: number, zoom: number;
    if(typeof dimension !== "undefined"){
        width = dimension.width;
        height = dimension.height;
        gif.zoomEnded = camera.zoom;
        zoom = (camera.zoom/board.value.size.width) * width;
    }
    else{
        width = board.value.size.width;
        height = board.value.size.height;
        zoom = gif.zoomEnded;
    }

    camera.left = width / - 2;
    camera.right = width / 2;
    camera.top = height / 2;
    camera.bottom = height / - 2;

    camera.updateProjectionMatrix();
    cameraControls.zoomTo(zoom)
    // cameraControls.setViewport(0, 0, width / 2, height/ 2)

    renderer.setSize( width, height );
}

// window.resizeRenderer = resizeRenderer;

const saveGif = () => {
    // scene.remove(backgroundMesh);
    try{
        generateBackground({
            color1: backgroundGradient.value.color1,
            color2: backgroundGradient.value.color1,
        });
        gif = {...gifDefault};
        gif.canvas = document.createElement( 'canvas' );
        // document.body.appendChild(gif.canvas)
        let gifRatio = reduceRatio(canvas.value.size.width, canvas.value.size.height);
        // console.log(gifRatio);
        gif.needResize = gifRatio.needResize;
        if(gif.needResize){
            resizeRenderer(gifRatio)
        }
        
        gif.canvas.width = gifRatio.width;
        gif.canvas.height = gifRatio.height;

        gif.context = gif.canvas.getContext( '2d', { willReadFrequently: true } );
        // gif.context.imageSmoothingEnabled = false;
        // console.log(gif.canvas.width * gif.canvas.height * gif.frames * 5)
        gif.buffer = new Uint8Array( gif.canvas.width * gif.canvas.height * gif.frames * 5 );
        gif.pixels = new Uint8Array( gif.canvas.width * gif.canvas.height );
        gif.writer = new GifWriter( gif.buffer, gif.canvas.width, gif.canvas.height, { loop: 0 } );
        
        gif.current = 0;
        gif.isMachineVisible = isMachineVisible.value;
        isMachineVisible.value = false;
        triggerAutoRotateForGif();
    }
    catch(e: any){
        // console.log(e.message)
        alert(e.message)
    }
}


const generateGIF = () => {

    gif.context.clearRect(0, 0, gif.canvas.width, gif.canvas.height);
    renderer.render( scene, camera );
    gif.context.drawImage(renderer.domElement , 0, 0, gif.canvas.width, gif.canvas.height, 0, 0, gif.canvas.width, gif.canvas.height );
    const data = gif.context.getImageData( 0, 0, gif.canvas.width, gif.canvas.height ).data;
    const palette: any[] = [];

    for ( var j = 0, k = 0, jl = data.length; j < jl; j += 4, k ++ ) {

        const r = Math.floor( data[ j + 0 ] * 0.1 ) * 10;
        const g = Math.floor( data[ j + 1 ] * 0.1 ) * 10;
        const b = Math.floor( data[ j + 2 ] * 0.1 ) * 10;
        const color = r << 16 | g << 8 | b << 0;

        const index = palette.indexOf( color );

        if ( index === -1 ) {

            gif.pixels[ k ] = palette.length;
            palette.push( color );

        } else {

            gif.pixels[ k ] = index;

        }

    }

    // Force palette to be power of 2

    let powof2 = 1;
    while ( powof2 < palette.length ) powof2 <<= 1;
    palette.length = Math.min(powof2 , 256);


    const delay = (100 / gif.fps); // Delay in hundredths of a sec (100 = 1s)
    const options = { palette: new Uint32Array( palette ), delay: delay };
    gif.writer.addFrame( 0, 0, gif.canvas.width, gif.canvas.height, gif.pixels, options );

    gif.current ++; 

}

const exportBtnRef = ref();
const exportOptions = [
    {
        label: 'JPEG',
        command: () => {
            if(isDrawn.value){
                saveJpeg();
                sidebarShow.value = false;
            }
        }
    },
    {
        label: 'PNG',
        command: () => {
            if(isDrawn.value){
                save();
                sidebarShow.value = false;
            }
        }
    },
    {
        label: 'GIF',
        command: () => {
            if(isDrawn.value){
                saveGif();
                sidebarShow.value = false;
            }
        }
    },
];
const resetPositionOptions = [
    {
        label: 'Reset Zoom',
        command: () => {
            resetPositionZoom()
        }
    },
    {
        label: 'Reset Angle',
        command: () => {
            resetPositionAngle()
        }
    },
    {
        label: 'Move to Center',
        command: () => {
            resetPositionCenter()
        }
    },
];
const machineVisibilityOptionsList1Label = computed(() => {
    return enableAutoRotate.value ? 'Disable Auto Rotate' : 'Enable Auto Rotate'
})
const machineVisibilityOptionsList1Icon = computed(() => {
    return enableAutoRotate.value ? 'pi pi-times' : 'pi pi-check'
})
const machineVisibilityOptions = ref([
    {
        label: machineVisibilityOptionsList1Label,
        icon: machineVisibilityOptionsList1Icon,
        command: () => {
            enableAutoRotate.value = !enableAutoRotate.value;
            settingToCacheOthers();
        }
    },
]);

const openExportOptions = (e: any) => {
    exportBtnRef.value.onDropdownButtonClick();
}

const doClear = () => {
    // canvas.context.clearRect(0, 0, canvas.el.width, canvas.el.height);
    resetScene();
    machineRef.value.setColor();
    turnMotor(true);
    machineRef.value.setMachineAndGear();
    logStartPosition(false);
    hand.value.arm.bridge.column.initialHeight = hand.value.arm.bridge.column.height;
    isDrawn.value = false;
}

const clear = () => {
    if (confirm("Are you sure to clear the Board?") == true) {
        doClear();
    }
}

const start = () => {
    // console.log('start');
    const _start = () => {
        if(!drawing.value){
            // console.log('threedPosHolder.positionChanged', threedPosHolder.positionChanged, currentPossition)
            drawing.value = true;
            
            machineRef.value.setMachineAndGear();

            if(threedPosHolder.positionChanged){
                logStartPosition(false);
                canvas.value.startedPosition = currentPossition;
            }

            var bound = machineRef.value.handRef.machine_hand_pen.getBoundingClientRect();
            canvas.value.penPos.x = bound.left;
            canvas.value.penPos.y = bound.top;
            objectPosChange();
        }
    }

    if(!drawing.value){
        try{
            if(!isMachineVisible.value){
                _start();
            }
            else if(enableAutoRotate.value || cameraControlsDirty.value){
                cameraControlsDirty.value = false;
                cameraControls.reset(true)
                // cameraControls.reset(true).then(()=>{
                    // _start();
                    cameraControls.moveTo(0,0, threedPosHolder.old.z, true).then(()=>{
                        _start();
                    })
                // })
            }
            else{
                cameraControls.reset();
                cameraControls.moveTo(0,0, threedPosHolder.old.z);
                _start();
            }
        }
        catch(e){
            // console.log(e)
        }
    }
    
}

const resetPosition = () => {
    controlingManually.value = true;
    cameraControlsDirty.value = false;
    cameraControls.reset(true).then(function(){
        setControlCenterOfObject();
        controlingManually.value = false;
    })    
}

const resetPositionAngle = () => {
    controlingManually.value = true;
    cameraControls.azimuthAngle = cameraControls.azimuthAngle % (Math.PI * 2);
    cameraControls.rotateTo(0, Math.PI/2, true).then(function(){
        setControlCenterOfObject();
        controlingManually.value = false;
    })
}

const resetPositionZoom = () => {
    controlingManually.value = true;
    cameraControls.zoomTo(1, true).then(function(){
        setControlCenterOfObject();
        controlingManually.value = false;
    })
}

const resetPositionCenter = () => {
    controlingManually.value = true;
    cameraControls.setFocalOffset(0, 0, 0, true).then(function(){
        setControlCenterOfObject();
        controlingManually.value = false;
    })
}

const machineVisibility = () => {
    if(!isMachineVisible.value){
        if(drawing.value){
            stop();
            isMachineVisible.value = true;
            start();
        }
        else{
            isMachineVisible.value = true;
        }
    }
    else{
        isMachineVisible.value = false;
    }
}

const stop = () => {
    if(drawing.value){
        drawing.value = false;
        setControlCenterOfObject();
        // setMachineAndGear();
    }
}

const setPreset = (config: any) => {
    stop();
    isDrawn.value = false;
    resetScene();
    // canvas.context.clearRect(0, 0, canvas.el.width, canvas.el.height);
    logStartPosition(false);
    cacheToSetting(config, true);
    turnMotor(true);
    machineRef.value.setMachineAndGear();
    machineRef.value.setColor();
    hand.value.arm.bridge.column.initialHeight = hand.value.arm.bridge.column.height;

}

const stopByKeyboard = (e: KeyboardEvent) => {
    if(drawing.value){
        e.preventDefault();
    }
    stop();
}

onKeyStroke(" ", stopByKeyboard);
onKeyStroke("Spacebar", stopByKeyboard);

const machineRef = ref()
const isMachineVisible = ref(true);
onMounted(() => {
    isMounted.value = true;
    cacheToSettingOthers();
    init();
})

const introColor = computed(() => {
    let [r1, g1, b1] = helper.hexToRgb(backgroundGradient.value.color1);
    let [r2, g2, b2] = helper.hexToRgb(backgroundGradient.value.color2);
    let luma1 = 0.2126 * r1 + 0.7152 * g1 + 0.0722 * b1;
    let luma2 = 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
    return (luma1 < 128 || luma2 < 128) ? '#eeeeee' : '#111111';
})

</script>