type SettingGearType = {
    side?: string, // 'left, right'
    deg: number,
    wallDistance: number,
    parent: {
        dir: 1 | -1, // positive 1, negative -1
        speed: number,
        deg: number,
        size: number, //percent of board
    },
    child: {
        dir: 1 | -1, // positive 1, negative -1
        speed: number,
        deg: number,
        size: number, //percent of parent
        conDeg: number,
    },
};

type BoardType = {
    size:{
        width: number, 
        height: number,
        min: number,
        max: number,
    }
}

type CanvasType = {
    scale: number,
    strokeWidth: number,
    accuracy: number,
    depth: number,
    depthDir: number,
    context: any,
    size: {
        width: number, 
        height: number
    },
    pos: {
        x: number,
        y: number,
    },
    penPos: {
        x: number, y: number,
        oldx: number, oldy: number,
    },
    startDeg:{
        0: {
            parent: number,
            child: number,
        },
        1: {
            parent: number,
            child: number,
        },
        degLogged: boolean,
    },
    startedPosition: number,
}

type HandType = {
    arm: {
        length: number, // percent of board
        px: number,
        bridge: {
            column: {
                height: number,
                initialHeight: number,
            }
        },
    },
    forearm:{
        length: number, // percent of arm
        px: number,
    },
    palm:{
        length: number, // percent of forearm
        px: number,
    },
}

type ColorType = {
    start: any,
    end: any,
    size: number,
    range: any[],
    current: number,
    opacity: number,
}

export type { SettingGearType, BoardType, CanvasType, ColorType, HandType }