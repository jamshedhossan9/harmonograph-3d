<template>
    <Button  class="p-button-xs" label="Presets" severity="info" size="small" @click="visible = true"></Button>
    <Dialog v-model:visible="visible" modal header="Presets" class="p-dialog-maximized preset-dialog">
        <div class="grid justify-content-center preset_drawings_container">
            <div class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2" v-for="item in presetImageUrls">
                <div class="preset_element" @click="onSelect(item.no)" :data-id="item.no">
                    <img class="w-full" :src="item.url" alt="">
                </div>
            </div>
        </div>
        <template #footer>
            <div class="flex w-full align-items-center">
                <div class="flex-grow-1 text-primary text-left">
                    Click "Draw" after selecting a Preset drawing. You can make any necessary changes to the inputs before using "Draw".
                </div>
                <div class="flex-none">
                    <Button label="Close" severity="secondary" size="small" @click="visible = false"></Button>
                </div>
            </div>
        </template>
    </Dialog>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch, reactive } from 'vue'
    import helper from '@/helpers/helper';
    import Button from 'primevue/button';
    import Dialog from 'primevue/dialog';

    const visible = ref(false);

    const presetConfig = ref<any>({});
    const presetOrder = [
        31, 32, 34, 33, 28, 27,
        1, 4, 29, 5, 30, 2, 3, 6, 7, 19, 18, 20, 15, 8, 9, 10,
        11, 12, 
        21, 22, 23, 24, 25, 26, 13, 14, 16, 17,
    ];
    const presetImageUrls = ref<any>([]);

    for(let item of presetOrder){
        let temp = new URL(`../assets/presets/preset${item}.png`, import.meta.url);
        presetImageUrls.value.push({
            no: item,
            url: temp.href
        })
    }

    const emit = defineEmits([
        'onSelect',
    ])

    const onSelect = (no: number) => {
        emit('onSelect', presetConfig.value[no]);
        visible.value = false;
    }

    const addToPresetConfig = (index: number, config: any) => {
        presetConfig.value[index] = config;
    }

    addToPresetConfig(1, {
        "color": {
            "start": "#d01516",
            "end": "#d01516",
            "opacity": 0.3
        },
        "canvas": {
            "accuracy": 1,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 315,
                    "wallDistance": 10,
                    "parent": {
                        "dir": 1,
                        "speed": 74,
                        "size": 15
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 69.5,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 171,
                    "wallDistance": 10,
                    "parent": {
                        "dir": -1,
                        "speed": 120,
                        "size": 30
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 44.5,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 36
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(2, {
        color:{
            start: '#d01516',
            end: '#d01516',
        },
        machine: {
            gear: {
                0: {
                    deg: 73,
                    wallDistance: 26,
                    parent: {
                        dir: 1,
                        speed: 74,
                        deg: 0,
                        size: 17,
                    },
                    child: {
                        dir: 1,
                        speed: 2,
                        deg: 0,
                        size: 52,
                        conDeg: 0,
                    },
                },
                1: {
                    deg: 64,
                    wallDistance: 30,
                    parent: {
                        dir: -1,
                        speed: 116,
                        deg: 0,
                        size: 17,
                    },
                    child: {
                        dir: -1,
                        speed: 2,
                        deg: 0,
                        size: 37.5,
                        conDeg: 0,
                    },
                },
            },
            hand: {
                arm: {
                    length: 21,
                },
                forearm:{
                    length: 10,
                },
                palm:{
                    length: 100,
                }
            },
        }
    });
    addToPresetConfig(3, presetConfig.value[2]);
    addToPresetConfig(4, {
        "color": {
            "start": "#000000",
            "end": "#000000",
            "opacity": 0.5
        },
        "canvas": {
            "accuracy": 1,
            "depth": 10,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 206,
                    "wallDistance": 15,
                    "parent": {
                        "dir": 1,
                        "speed": 239,
                        "size": 20
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 60,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 260,
                    "wallDistance": 15,
                    "parent": {
                        "dir": -1,
                        "speed": 182,
                        "size": 30
                    },
                    "child": {
                        "dir": 1,
                        "speed": 3,
                        "size": 80,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 30
                },
                "forearm": {
                    "length": 30
                },
                "palm": {
                    "length": 103
                }
            }
        }
    });
    addToPresetConfig(5, {
        "canvas": {
            "accuracy": 1
        },
        color:{
            start: '#000000',
            end: '#000000',
        },
        machine: {
            gear: {
                0: {
                    deg: 206,
                    wallDistance: 30,
                    parent: {
                        dir: -1,
                        speed: 239,
                        deg: 0,
                        size: 14,
                    },
                    child: {
                        dir: 1,
                        speed: 1,
                        deg: 0,
                        size: 80,
                        conDeg: 0,
                    },
                },
                1: {
                    deg: 260,
                    wallDistance: 36,
                    parent: {
                        dir: 1,
                        speed: 104,
                        deg: 0,
                        size: 22,
                    },
                    child: {
                        dir: -1,
                        speed: 1,
                        deg: 0,
                        size: 73.5,
                        conDeg: 0,
                    },
                },
            },
            hand: {
                arm: {
                    length: 30,
                },
                forearm:{
                    length: 30,
                },
                palm:{
                    length: 103,
                }
            },
        }
    });
    addToPresetConfig(6, {
        "canvas": {
            "accuracy": 6,
            "depth": 8,
        },
        "color": {
            "start": "#098b8d",
            "end": "#098b8d"
        },
        "machine": {
        "gear": {
            "0": {
            "deg": 29,
            "wallDistance": 25,
            "parent": {
                "dir": -1,
                "speed": 76,
                "size": 14.5
            },
            "child": {
                "dir": -1,
                "speed": 1,
                "size": 61,
                "conDeg": 170
            }
            },
            "1": {
            "deg": 177,
            "wallDistance": 31,
            "parent": {
                "dir": -1,
                "speed": 129,
                "size": 14
            },
            "child": {
                "dir": -1,
                "speed": 1,
                "size": 34,
                "conDeg": 80
            }
            }
        },
        "hand": {
            "arm": {
            "length": 5
            },
            "forearm": {
            "length": 10
            },
            "palm": {
            "length": 100
            }
        }
        }
    });
    addToPresetConfig(7, presetConfig.value[6]);
    addToPresetConfig(8, {
        "color": {
            "start": "#0f2870",
            "end": "#0f2870"
        },
        "canvas": {
            "accuracy": 2,
            "depth": 6,
            "depthDir": 1,
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 360,
                    "wallDistance": 25,
                    "parent": {
                        "dir": 1,
                        "speed": 36,
                        "size": 13.5
                    },
                    "child": {
                        "dir": 1,
                        "speed": 1,
                        "size": 42.5,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 99,
                    "wallDistance": 29,
                    "parent": {
                        "dir": -1,
                        "speed": 300,
                        "size": 14
                    },
                    "child": {
                        "dir": -1,
                        "speed": 1,
                        "size": 20,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(9, presetConfig.value[8]);
    addToPresetConfig(10, presetConfig.value[8]);
    addToPresetConfig(11, presetConfig.value[8]);
    addToPresetConfig(12, presetConfig.value[8]);
    addToPresetConfig(13, {
        "color": {
            "start": "#000000",
            "end": "#000000"
        },
        "canvas": {
            "accuracy": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 325,
                    "wallDistance": 25,
                    "parent": {
                        "dir": 1,
                        "speed": 177,
                        "size": 11
                    },
                    "child": {
                        "dir": 1,
                        "speed": 1,
                        "size": 61,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 199,
                    "wallDistance": 31,
                    "parent": {
                        "dir": -1,
                        "speed": 1,
                        "size": 11
                    },
                    "child": {
                        "dir": -1,
                        "speed": 3,
                        "size": 43,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 8
                },
                "forearm": {
                    "length": 31
                },
                "palm": {
                    "length": 127
                }
            }
        }
    });
    addToPresetConfig(14, presetConfig.value[13]);
    addToPresetConfig(15, {
        "color": {
            "start": "#d00101",
            "end": "#d00101"
        },
        "canvas": {
            "accuracy": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 226,
                    "wallDistance": 26,
                    "parent": {
                        "dir": -1,
                        "speed": 239,
                        "size": 10.5
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 47.5,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 240,
                    "wallDistance": 36,
                    "parent": {
                        "dir": 1,
                        "speed": 182,
                        "size": 6.5
                    },
                    "child": {
                        "dir": -1,
                        "speed": 3,
                        "size": 60,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 30
                },
                "forearm": {
                    "length": 43
                },
                "palm": {
                    "length": 130
                }
            }
        }
    });
    addToPresetConfig(16, {
        "color": {
            "start": "#000000",
            "end": "#000000"
        },
        "canvas": {
            "accuracy": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 325,
                    "wallDistance": 28,
                    "parent": {
                        "dir": 1,
                        "speed": 148,
                        "size": 12
                    },
                    "child": {
                        "dir": 1,
                        "speed": 1,
                        "size": 56,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 139,
                    "wallDistance": 39,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 11
                    },
                    "child": {
                        "dir": -1,
                        "speed": 3,
                        "size": 43,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 8
                },
                "forearm": {
                    "length": 50
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });

    addToPresetConfig(17, {
        "color": {
            "start": "#000000",
            "end": "#000000"
        },
        "canvas": {
            "accuracy": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 325,
                    "wallDistance": 28,
                    "parent": {
                        "dir": 1,
                        "speed": 165,
                        "size": 12
                    },
                    "child": {
                        "dir": 1,
                        "speed": 1,
                        "size": 56,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 139,
                    "wallDistance": 39,
                    "parent": {
                        "dir": -1,
                        "speed": 3,
                        "size": 11
                    },
                    "child": {
                        "dir": -1,
                        "speed": 3,
                        "size": 43,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 8
                },
                "forearm": {
                    "length": 50
                },
                "palm": {
                    "length": 130
                }
            }
        }
    });
    addToPresetConfig(18, {
        "color": {
            "start": "#f9539b",
            "end": "#f9539b",
            "opacity": 0.1
        },
        "canvas": {
            "accuracy": 4
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 168,
                    "wallDistance": 30,
                    "parent": {
                        "dir": 1,
                        "speed": 100,
                        "size": 12
                    },
                    "child": {
                        "dir": -1,
                        "speed": 0.2,
                        "size": 50,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 118,
                    "wallDistance": 30,
                    "parent": {
                        "dir": -1,
                        "speed": 160,
                        "size": 12
                    },
                    "child": {
                        "dir": -1,
                        "speed": 0.2,
                        "size": 50,
                        "conDeg": 52
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    })
    addToPresetConfig(19, {
        "color": {
            "start": "#6715cb",
            "end": "#6715cb",
            "opacity": .3,
        },
        "canvas": {
            "accuracy": 4
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 168,
                    "wallDistance": 30,
                    "parent": {
                        "dir": 1,
                        "speed": 100,
                        "size": 12
                    },
                    "child": {
                        "dir": -1,
                        "speed": 1,
                        "size": 50,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 118,
                    "wallDistance": 30,
                    "parent": {
                        "dir": -1,
                        "speed": 160,
                        "size": 12
                    },
                    "child": {
                        "dir": -1,
                        "speed": 1,
                        "size": 50,
                        "conDeg": 52
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    })
    addToPresetConfig(20, {
        "color": {
            "start": "#6715cb",
            "end": "#6715cb",
            "opacity": 0.3
        },
        "canvas": {
            "accuracy": 4
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 168,
                    "wallDistance": 30,
                    "parent": {
                        "dir": 1,
                        "speed": 200,
                        "size": 18
                    },
                    "child": {
                        "dir": -1,
                        "speed": 1.5,
                        "size": 45,
                        "conDeg": 11
                    }
                },
                "1": {
                    "deg": 116,
                    "wallDistance": 30,
                    "parent": {
                        "dir": -1,
                        "speed": 300,
                        "size": 18
                    },
                    "child": {
                        "dir": -1,
                        "speed": 1.5,
                        "size": 45,
                        "conDeg": 59
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(21, {
        "color": {
            "start": "#0781b6",
            "end": "#0781b6",
            "opacity": 0.3
        },
        "canvas": {
            "accuracy": 4
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 206,
                    "wallDistance": 30,
                    "parent": {
                        "dir": -1,
                        "speed": 146,
                        "size": 10.5
                    },
                    "child": {
                        "dir": 1,
                        "speed": 1.5,
                        "size": 60,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 61,
                    "wallDistance": 36,
                    "parent": {
                        "dir": 1,
                        "speed": 80,
                        "size": 14
                    },
                    "child": {
                        "dir": -1,
                        "speed": 1.5,
                        "size": 60,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 103
                }
            }
        }
    });
    addToPresetConfig(22, {
        "color": {
            "start": "#cb4c15",
            "end": "#cb4c15",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 4
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 37,
                    "parent": {
                        "dir": 1,
                        "speed": 270,
                        "size": 10
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                },
                "1": {
                    "deg": 119,
                    "wallDistance": 40,
                    "parent": {
                        "dir": -1,
                        "speed": 295,
                        "size": 10
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 50
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(23, {
        "color": {
            "start": "#e60505",
            "end": "#e60505",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 4
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 37,
                    "parent": {
                        "dir": 1,
                        "speed": 260,
                        "size": 10
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                },
                "1": {
                    "deg": 119,
                    "wallDistance": 40,
                    "parent": {
                        "dir": -1,
                        "speed": 295,
                        "size": 10
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 50
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(24, {
        "color": {
            "start": "#5e60ce",
            "end": "#5e60ce",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 6
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 37,
                    "parent": {
                        "dir": 1,
                        "speed": 250,
                        "size": 10
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                },
                "1": {
                    "deg": 119,
                    "wallDistance": 40,
                    "parent": {
                        "dir": -1,
                        "speed": 295,
                        "size": 10
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 50
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(25, {
        "color": {
            "start": "#8187dc",
            "end": "#8187dc",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 6
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 37,
                    "parent": {
                        "dir": 1,
                        "speed": 240,
                        "size": 10
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                },
                "1": {
                    "deg": 119,
                    "wallDistance": 40,
                    "parent": {
                        "dir": -1,
                        "speed": 295,
                        "size": 10
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 50
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(26, {
        "color": {
            "start": "#146782",
            "end": "#146782",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 6
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 37,
                    "parent": {
                        "dir": 1,
                        "speed": 150,
                        "size": 10
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                },
                "1": {
                    "deg": 119,
                    "wallDistance": 40,
                    "parent": {
                        "dir": -1,
                        "speed": 210,
                        "size": 10
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 50,
                        "conDeg": 2
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 50
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(27, {
        "color": {
            "start": "#ee6c4d",
            "end": "#ee6c4d",
            "opacity": 0.4
        },
        "canvas": {
            "accuracy": 1,
            "depth": 4,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 319,
                    "wallDistance": 10,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 28.5
                    },
                    "child": {
                        "dir": -1,
                        "speed": 6,
                        "size": 66.5,
                        "conDeg": 75
                    }
                },
                "1": {
                    "deg": 119,
                    "wallDistance": 10,
                    "parent": {
                        "dir": -1,
                        "speed": 1,
                        "size": 30
                    },
                    "child": {
                        "dir": 1,
                        "speed": 137,
                        "size": 71,
                        "conDeg": 75
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 14
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(28, {
        "color": {
            "start": "#be02f2",
            "end": "#f28202",
            "opacity": 0.3
        },
        "canvas": {
            "accuracy": 1,
            "depth": 1,
            "depthDir": 2
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 0,
                    "wallDistance": 30,
                    "parent": {
                        "dir": 1,
                        "speed": 0.5,
                        "size": 30
                    },
                    "child": {
                        "dir": 1,
                        "speed": 300,
                        "size": 70,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 0,
                    "wallDistance": 32,
                    "parent": {
                        "dir": 1,
                        "speed": 0.5,
                        "size": 30
                    },
                    "child": {
                        "dir": 1,
                        "speed": 131.7,
                        "size": 70,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(29, {
        "color": {
            "start": "#be02f2",
            "end": "#f28202",
            "opacity": 0.1
        },
        "canvas": {
            "accuracy": 2
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 0,
                    "wallDistance": 30,
                    "parent": {
                        "dir": 1,
                        "speed": 0.5,
                        "size": 18
                    },
                    "child": {
                        "dir": 1,
                        "speed": 300,
                        "size": 70,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 0,
                    "wallDistance": 32,
                    "parent": {
                        "dir": 1,
                        "speed": 0.5,
                        "size": 18
                    },
                    "child": {
                        "dir": 1,
                        "speed": 131.7,
                        "size": 70,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });

    addToPresetConfig(30, {
        "color": {
            "start": "#e65405",
            "end": "#f8a477",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 2,
            "depth": 2,
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 162,
                    "wallDistance": 30,
                    "parent": {
                        "dir": 1,
                        "speed": 1,
                        "size": 18
                    },
                    "child": {
                        "dir": -1,
                        "speed": 300,
                        "size": 51.5,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 14,
                    "wallDistance": 32,
                    "parent": {
                        "dir": 1,
                        "speed": 0.5,
                        "size": 18
                    },
                    "child": {
                        "dir": -1,
                        "speed": 261.3,
                        "size": 63.5,
                        "conDeg": 28
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(31, {
        "color": {
            "start": "#298bbc",
            "end": "#298bbc",
            "opacity": 1
        },
        "canvas": {
            "accuracy": 0,
            "depth": 1,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 0,
                    "wallDistance": 20,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 25
                    },
                    "child": {
                        "dir": -1,
                        "speed": 0.2,
                        "size": 35,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 0,
                    "wallDistance": 20,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 25
                    },
                    "child": {
                        "dir": -1,
                        "speed": 0.2,
                        "size": 35,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(32, {
        "color": {
            "start": "#f58114",
            "end": "#e90707",
            "opacity": 1
        },
        "canvas": {
            "accuracy": 1,
            "depth": 10,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 0,
                    "wallDistance": 10,
                    "parent": {
                        "dir": -1,
                        "speed": 30,
                        "size": 30
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 35,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 0,
                    "wallDistance": 10,
                    "parent": {
                        "dir": -1,
                        "speed": 30,
                        "size": 30
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 35,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(33, {
        "color": {
            "start": "#94bf1d",
            "end": "#d81399",
            "opacity": 0.8
        },
        "canvas": {
            "accuracy": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 0,
                    "wallDistance": 34,
                    "parent": {
                        "dir": 1,
                        "speed": 30,
                        "size": 14
                    },
                    "child": {
                        "dir": 1,
                        "speed": 1,
                        "size": 35,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 0,
                    "wallDistance": 40,
                    "parent": {
                        "dir": 1,
                        "speed": 30,
                        "size": 14
                    },
                    "child": {
                        "dir": 1,
                        "speed": 1,
                        "size": 35,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });
    addToPresetConfig(34, {
        "color": {
            "start": "#1ea6c8",
            "end": "#10b796",
            "opacity": 0.8
        },
        "canvas": {
            "accuracy": 0,
            "depth": 2,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 0,
                    "wallDistance": 10,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 30
                    },
                    "child": {
                        "dir": -1,
                        "speed": 0.4,
                        "size": 60,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 0,
                    "wallDistance": 10,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 30
                    },
                    "child": {
                        "dir": -1,
                        "speed": 0.4,
                        "size": 60,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 5
                },
                "forearm": {
                    "length": 10
                },
                "palm": {
                    "length": 100
                }
            }
        }
    });

</script>