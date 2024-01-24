<template>
    <Button  class="p-button-xs- preset-btn-" raised size="small" label="Presets" severity="info"  @click="visible = true"></Button>
    <Dialog v-model:visible="visible" modal header="Presets" class="p-dialog-maximized preset-dialog">
        <div class="grid justify-content-center preset_drawings_container">
            <div class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2" v-for="item in presetImageUrls">
                <div class="preset_element" @click="onSelect(item.no)" :data-id="item.no">
                    <!-- <h3>{{ item.no }}</h3> -->
                    <img class="w-full" :src="item.url" :alt="`Harmonograph-${item.no}, Pintograph-${item.no}`">
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
    import { ref } from 'vue'
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
    const jpegImages = [ 13, 14, 16, 17 ];
    const presetImageUrls = ref<any>([]);

    for(let item of presetOrder){
        let temp = new URL(`../assets/presets/preset${item}.png`, import.meta.url);
        if(jpegImages.indexOf(item) !== -1){
            temp = new URL(`../assets/presets/preset${item}.jpeg`, import.meta.url);
        }
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

    // updated
    addToPresetConfig(1, {
        "color": {
            "start": "#d01516",
            "end": "#d01516",
            "opacity": 0.3
        },
        "canvas": {
            "accuracy": 6,
            "depth": 10,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 315,
                    "wallDistance": 26,
                    "parent": {
                        "dir": 1,
                        "speed": 74,
                        "size": 20
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
                    "wallDistance": 0,
                    "parent": {
                        "dir": -1,
                        "speed": 120,
                        "size": 38
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

    // updated
    addToPresetConfig(2, {
        "color": {
            "start": "#d01516",
            "end": "#d01516",
            "opacity": 0.5
        },
        "canvas": {
            "accuracy": 6,
            "depth": 10,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 73,
                    "wallDistance": 26,
                    "parent": {
                        "dir": 1,
                        "speed": 74,
                        "size": 30
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 52,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 64,
                    "wallDistance": 30,
                    "parent": {
                        "dir": -1,
                        "speed": 116,
                        "size": 30
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 37.5,
                        "conDeg": 0
                    }
                }
            },
            "hand": {
                "arm": {
                    "length": 21
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
    addToPresetConfig(3, presetConfig.value[2]);

    // updated
    addToPresetConfig(4, {
        "color": {
            "start": "#000000",
            "end": "#000000",
            "opacity": 0.5
        },
        "canvas": {
            "accuracy": 1,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 206,
                    "wallDistance": 21,
                    "parent": {
                        "dir": 1,
                        "speed": 239,
                        "size": 27
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
                    "wallDistance": 0,
                    "parent": {
                        "dir": -1,
                        "speed": 182,
                        "size": 36
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

    // updated
    addToPresetConfig(5, {
        "color": {
            "start": "#000000",
            "end": "#000000",
            "opacity": 0.5
        },
        "canvas": {
            "accuracy": 1,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 206,
                    "wallDistance": 29,
                    "parent": {
                        "dir": -1,
                        "speed": 239,
                        "size": 21.5
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 80,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 260,
                    "wallDistance": 12,
                    "parent": {
                        "dir": 1,
                        "speed": 104,
                        "size": 34
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 73.5,
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

    // updated
    addToPresetConfig(6, {
        "color": {
            "start": "#098b8d",
            "end": "#098b8d",
            "opacity": 0.5
        },
        "canvas": {
            "accuracy": 6,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 29,
                    "wallDistance": 5,
                    "parent": {
                        "dir": -1,
                        "speed": 76,
                        "size": 29
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
                    "wallDistance": 5,
                    "parent": {
                        "dir": -1,
                        "speed": 129,
                        "size": 28
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

    // updated
    addToPresetConfig(8, {
        "color": {
            "start": "#0f2870",
            "end": "#0f2870"
        },
        "canvas": {
            "accuracy": 2,
            "depth": 1,
            "depthDir": 2
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 360,
                    "wallDistance": 10,
                    "parent": {
                        "dir": 1,
                        "speed": 36,
                        "size": 27
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
                    "wallDistance": 10,
                    "parent": {
                        "dir": -1,
                        "speed": 300,
                        "size": 28
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

    // updated
    addToPresetConfig(12, {
        "color": {
            "start": "#19c9cc",
            "end": "#389ae0",
            "opacity": 0.3
        },
        "canvas": {
            "accuracy": 2,
            "depth": 1,
            "depthDir": 2
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 360,
                    "wallDistance": 10,
                    "parent": {
                        "dir": 1,
                        "speed": 36,
                        "size": 27
                    },
                    "child": {
                        "dir": 1,
                        "speed": 0.2,
                        "size": 42.5,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 99,
                    "wallDistance": 10,
                    "parent": {
                        "dir": -1,
                        "speed": 300,
                        "size": 28
                    },
                    "child": {
                        "dir": -1,
                        "speed": 0.2,
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

    // updated
    addToPresetConfig(13, {
        "color": {
            "start": "#ffffff",
            "end": "#ffffff",
            "opacity": 0.5
        },
        "background": {
            "color1": "#776a95",
            "color2": "#0e1443"
        },
        "canvas": {
            "accuracy": 1,
            "depth": 4,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 325,
                    "wallDistance": 5,
                    "parent": {
                        "dir": 1,
                        "speed": 177,
                        "size": 25
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
                    "wallDistance": 5,
                    "parent": {
                        "dir": -1,
                        "speed": 1,
                        "size": 25
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

    // updated
    addToPresetConfig(14, {
        "color": {
            "start": "#ffffff",
            "end": "#ffffff",
            "opacity": 0.5
        },
        "background": {
            "color1": "#6e9687",
            "color2": "#05331f"
        },
        "canvas": {
            "accuracy": 1,
            "depth": 4,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 325,
                    "wallDistance": 5,
                    "parent": {
                        "dir": 1,
                        "speed": 177,
                        "size": 25
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
                    "wallDistance": 5,
                    "parent": {
                        "dir": -1,
                        "speed": 1,
                        "size": 25
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

    // updated
    addToPresetConfig(15, {
        "color": {
            "start": "#d00101",
            "end": "#d00101",
            "opacity": 0.5
        },
        "canvas": {
            "accuracy": 1,
            "depth": 12,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 226,
                    "wallDistance": 1,
                    "parent": {
                        "dir": -1,
                        "speed": 239,
                        "size": 21
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
                    "wallDistance": 25,
                    "parent": {
                        "dir": 1,
                        "speed": 182,
                        "size": 13
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
                    "length": 5
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

    // updated
    addToPresetConfig(16, {
        "color": {
            "start": "#ffffff",
            "end": "#ffffff",
            "opacity": 1
        },
        "background": {
            "color1": "#909292",
            "color2": "#000000"
        },
        "canvas": {
            "accuracy": 1,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 36,
                    "wallDistance": 8,
                    "parent": {
                        "dir": 1,
                        "speed": 80,
                        "size": 40
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 60,
                        "conDeg": 181
                    }
                },
                "1": {
                    "deg": 0,
                    "wallDistance": 8,
                    "parent": {
                        "dir": -1,
                        "speed": 300,
                        "size": 40
                    },
                    "child": {
                        "dir": 1,
                        "speed": 2,
                        "size": 60,
                        "conDeg": 199
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

    // updated
    addToPresetConfig(17, {
        "color": {
            "start": "#fbe7cb",
            "end": "#fbe7cb",
            "opacity": 1
        },
        "background": {
            "color1": "#a39595",
            "color2": "#8b2323"
        },
        "canvas": {
            "accuracy": 1,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 36,
                    "wallDistance": 8,
                    "parent": {
                        "dir": 1,
                        "speed": 250,
                        "size": 40
                    },
                    "child": {
                        "dir": -1,
                        "speed": 2,
                        "size": 60,
                        "conDeg": 181
                    }
                },
                "1": {
                    "deg": 80,
                    "wallDistance": 8,
                    "parent": {
                        "dir": -1,
                        "speed": 250,
                        "size": 40
                    },
                    "child": {
                        "dir": 1,
                        "speed": 3,
                        "size": 60,
                        "conDeg": 70
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

    addToPresetConfig(18, {
        "color": {
            "start": "#f9539b",
            "end": "#f9539b",
            "opacity": 0.1
        },
        "canvas": {
            "accuracy": 4,
            "depth": 1,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 168,
                    "wallDistance": 10,
                    "parent": {
                        "dir": 1,
                        "speed": 100,
                        "size": 25
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
                    "wallDistance": 9,
                    "parent": {
                        "dir": -1,
                        "speed": 160,
                        "size": 25
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

    // updated
    addToPresetConfig(19, {
        "color": {
            "start": "#6715cb",
            "end": "#6715cb",
            "opacity": 0.3
        },
        "canvas": {
            "accuracy": 4,
            "depth": 6,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 168,
                    "wallDistance": 10,
                    "parent": {
                        "dir": 1,
                        "speed": 100,
                        "size": 25
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
                    "wallDistance": 10,
                    "parent": {
                        "dir": -1,
                        "speed": 160,
                        "size": 25.5
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

    // updated
    addToPresetConfig(20, {
        "color": {
            "start": "#6715cb",
            "end": "#6715cb",
            "opacity": 0.3
        },
        "canvas": {
            "accuracy": 4,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 168,
                    "wallDistance": 12,
                    "parent": {
                        "dir": 1,
                        "speed": 200,
                        "size": 34
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
                    "wallDistance": 12,
                    "parent": {
                        "dir": -1,
                        "speed": 300,
                        "size": 34
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

    // updated
    addToPresetConfig(21, {
        "color": {
            "start": "#0781b6",
            "end": "#0781b6",
            "opacity": 0.3
        },
        "canvas": {
            "accuracy": 4,
            "depth": 6,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 206,
                    "wallDistance": 13,
                    "parent": {
                        "dir": -1,
                        "speed": 146,
                        "size": 21
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
                    "wallDistance": 13,
                    "parent": {
                        "dir": 1,
                        "speed": 80,
                        "size": 28
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

    // updated
    addToPresetConfig(22, {
        "color": {
            "start": "#cb4c15",
            "end": "#cb4c15",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 4,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 27,
                    "parent": {
                        "dir": 1,
                        "speed": 270,
                        "size": 25
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
                    "wallDistance": 11,
                    "parent": {
                        "dir": -1,
                        "speed": 295,
                        "size": 25
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

    // updated
    addToPresetConfig(23, {
        "color": {
            "start": "#e60505",
            "end": "#e60505",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 4,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 27,
                    "parent": {
                        "dir": 1,
                        "speed": 260,
                        "size": 25
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
                    "wallDistance": 11,
                    "parent": {
                        "dir": -1,
                        "speed": 295,
                        "size": 25
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

    // updated
    addToPresetConfig(24, {
        "color": {
            "start": "#5e60ce",
            "end": "#5e60ce",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 6,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 27,
                    "parent": {
                        "dir": 1,
                        "speed": 250,
                        "size": 25
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
                    "wallDistance": 11,
                    "parent": {
                        "dir": -1,
                        "speed": 295,
                        "size": 25
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

    // updated
    addToPresetConfig(25, {
        "color": {
            "start": "#8187dc",
            "end": "#8187dc",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 6,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 27,
                    "parent": {
                        "dir": 1,
                        "speed": 240,
                        "size": 25
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
                    "wallDistance": 11,
                    "parent": {
                        "dir": -1,
                        "speed": 295,
                        "size": 25
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

    // updated
    addToPresetConfig(26, {
        "color": {
            "start": "#146782",
            "end": "#146782",
            "opacity": 0.2
        },
        "canvas": {
            "accuracy": 6,
            "depth": 8,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 184,
                    "wallDistance": 27,
                    "parent": {
                        "dir": 1,
                        "speed": 150,
                        "size": 25
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
                    "wallDistance": 11,
                    "parent": {
                        "dir": -1,
                        "speed": 210,
                        "size": 25
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

    // updated
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

    // updated
    addToPresetConfig(28, {
        "color": {
            "start": "#be02f2",
            "end": "#f28202",
            "opacity": 0.1
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

    // updated
    addToPresetConfig(29, {
        "color": {
            "start": "#be02f2",
            "end": "#f28202",
            "opacity": 0.1
        },
        "canvas": {
            "accuracy": 2,
            "depth": 2,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 0,
                    "wallDistance": 15,
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
                    "wallDistance": 15,
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

    // updated
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

    // updated
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
                    "wallDistance": 6,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 40
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
                    "wallDistance": 6,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 40
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

    // updated
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

    // updated
    addToPresetConfig(33, {
        "color": {
            "start": "#94bf1d",
            "end": "#d81399",
            "opacity": 1
        },
        "canvas": {
            "accuracy": 1,
            "depth": 6,
            "depthDir": 1
        },
        "machine": {
            "gear": {
                "0": {
                    "deg": 0,
                    "wallDistance": 15,
                    "parent": {
                        "dir": 1,
                        "speed": 60,
                        "size": 30
                    },
                    "child": {
                        "dir": 1,
                        "speed": 1.5,
                        "size": 32,
                        "conDeg": 0
                    }
                },
                "1": {
                    "deg": 0,
                    "wallDistance": 15,
                    "parent": {
                        "dir": 1,
                        "speed": 60,
                        "size": 30
                    },
                    "child": {
                        "dir": 1,
                        "speed": 1.5,
                        "size": 32,
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
                    "length": 112
                }
            }
        }
    });

    //updated
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
                    "wallDistance": 6,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 40
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
                    "wallDistance": 6,
                    "parent": {
                        "dir": 1,
                        "speed": 3,
                        "size": 40
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

    /*
    8 new:
        {
            "color": {
                "start": "#14b38e",
                "end": "#1058a1",
                "opacity": 0.4
            },
            "canvas": {
                "accuracy": 2,
                "depth": 1,
                "depthDir": 2
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
                            "speed": 0.3,
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
                            "speed": 0.3,
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
        }


        16 new
        {
            "color": {
                "start": "#000000",
                "end": "#000000",
                "opacity": 0.5
            },
            "canvas": {
                "accuracy": 1,
                "depth": 8,
                "depthDir": 1
            },
            "machine": {
                "gear": {
                    "0": {
                        "deg": 0,
                        "wallDistance": 20,
                        "parent": {
                            "dir": -1,
                            "speed": 146,
                            "size": 26
                        },
                        "child": {
                            "dir": 1,
                            "speed": 3,
                            "size": 50,
                            "conDeg": 0
                        }
                    },
                    "1": {
                        "deg": 90,
                        "wallDistance": 20,
                        "parent": {
                            "dir": 1,
                            "speed": 146,
                            "size": 26
                        },
                        "child": {
                            "dir": 1,
                            "speed": 3,
                            "size": 50,
                            "conDeg": 0
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
                        "length": 130
                    }
                }
            }
        }
    */

</script>