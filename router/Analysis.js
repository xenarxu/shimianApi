const { set } = require('express/lib/application');
const {
    pool,
    router,
    Result
} = require('../connect')
const outjson = r => {
    const newdata = []
    r.forEach(data => {
        newdata.push(
            {
                ...data,
                properties: JSON.parse(data.properties),
                flavours: JSON.parse(data.flavours),
                meridians: JSON.parse(data.meridians),
                type: JSON.parse(data.type),
                sales: JSON.parse(data.sales)
            }
        )
    });
    return newdata
}
const outjsonp = r => {
    const newdata = []
    r.forEach(data => {
        newdata.push(
            {
                ...data,
                herbs: JSON.parse(data.herbs)
            }
        )
    });
    return newdata
}
const pSankeyData = (r, id) => {
    let prescription = {}
    const mdata = []
    const mlinks = []
    const pdata = []
    const plinks = []
    let herbs = []
    let meridians = []
    let flavours = []
    r.prescriptions.forEach(p => {
        if (p.id === id)
            prescription = p
    })

    prescription.herbs.forEach(h => {
        herbs.push(h.name)
    })
    herbs = r.herbs.filter(h => herbs.find(v => v === h.name))
    herbs.forEach(h => {
        mdata.push({
            name: h.name
        })
        pdata.push({
            name: h.name
        })
        h.meridians.forEach(m => {
            mlinks.push({
                source: h.name,
                target: m,
                value: 1
            })
        })
        h.flavours.forEach(m => {
            plinks.push({
                source: h.name,
                target: m,
                value: 1
            })
        })
        meridians = [...h.meridians, ...meridians]
        flavours = [...h.flavours, ...flavours]
    })
    new Set(meridians).forEach(m => {
        mdata.push({
            name: m
        })
    })
    new Set(flavours).forEach(f => {
        pdata.push({
            name: f
        })
    })
    return {
        flavour: { data: pdata, links: plinks },
        meridian: { data: mdata, links: mlinks }
    }

}
const propertySunyData = (r, id) => {
    let prescription = {}
    let herbs = []
    let newHerbs = []
    const data = [
        {
            name: "",
            itemStyle: {
                color: "#A2CD5A",
            },
            children: [
                {
                    name: "???",
                    itemStyle: {
                        color: "#A2CD5A",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "",
            itemStyle: {
                color: "DodgerBlue",
            },
            children: [
                {
                    name: "???",
                    itemStyle: {
                        color: "lightSkyBlue",
                    },
                    children: [

                    ],
                },
                {
                    name: "??????",
                    itemStyle: {
                        color: "skyBlue",
                    },
                    children: [

                    ],
                },
                {
                    name: "???",
                    itemStyle: {
                        color: "DeepSkyBlue",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "??????",
                    itemStyle: {
                        color: "#f47983",
                    },
                    children: [

                    ],
                },
                {
                    name: "???",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

                {
                    name: "???",
                    itemStyle: {
                        color: "#db5a6b",
                    },
                    children: [

                    ],
                },
            ],
        },
    ];
    r.prescriptions.forEach(p => {
        if (p.id === id)
            prescription = p
    })

    prescription.herbs.forEach(h => {
        herbs.push({ name: h.name, weight: h.weight })
    })
    herbs.forEach(h => {
        r.herbs.forEach((rh, index) => {
            if (rh.name === h.name)
                newHerbs.push({ ...h, ...rh })
        })
    })
    newHerbs.forEach(herb => {
        switch (herb.properties[0]) {
            case '???':
                data[0].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#A2CD5A",
                    },
                    value: herb.weight,

                })
                return;
            case '???':
                data[1].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "lightSkyBlue",
                    },
                    value: herb.weight,

                })
                return;
            case '??????':
                data[1].children[1].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "skyBlue",
                    },
                    value: herb.weight,

                })
                return;
            case '???':
                data[1].children[2].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "DeepSkyBlue",
                    },
                    value: herb.weight,

                })
                return;
            case '??????':
                data[2].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#f47983",
                    },
                    value: herb.weight,

                })
                return;
            case '???':
                data[2].children[1].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    value: herb.weight,

                })
                return;
            case '???':
                data[2].children[2].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#db5a6b",
                    },
                    value: herb.weight,

                })
                return;
        }
    })


    return data

}
const typeSunData = (r, id) => {
    let prescription = {}
    let herbs = []
    let newHerbs = []
    const data = [
        {
            name: "?????????",
            itemStyle: {
                color: "#6600ff",
            },
            children: [
                {
                    name: "????????????",
                    itemStyle: {
                        color: "#66ccff",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#6699ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#6666ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#6633ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#6600ff",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#00ff99",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00cc99",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#006699",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#003399",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#000099",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#66ff33",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#66cc33",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#669933",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "????????????",
            itemStyle: {
                color: "#EE7942",
            },
            children: [
                {
                    name: "??????????????????",
                    itemStyle: {
                        color: "#EE6A50",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#EE3B3B",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????????????????",
                    itemStyle: {
                        color: "#EE1289",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#969696",
            },
            children: [
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#919191",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#8F8F8F",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B8B83",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "???????????????",
            itemStyle: {
                color: "#00EEEE",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00FFFF",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00F5FF",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00E5EE",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "???????????????",
            itemStyle: {
                color: "#8B8970",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B8386",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B7D7B",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B7765",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B6914",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#ffff00",
            },
            children: [
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffff33",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffff66",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffff99",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffffcc",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#00EEEE",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00CED1",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#008B8B",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????????????????",
                    itemStyle: {
                        color: "#00688B",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#B4CDCD",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#B2DFEE",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#AEEEEE",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#f47983",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "???????????????",
            itemStyle: {
                color: "#8B6969",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B636C",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B5742",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "?????????????????????",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#7FFFD4",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#66CDAA",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#54FF9F",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "??????",
            itemStyle: {
                color: "#EDEDED",
            },
            children: [
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#EBEBEB",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#E0EEEE",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#E3E3E3",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#EAEAEA",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#E5E5E5",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#E0EEE0",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#DEDEDE",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

            ],
        },

    ]
    r.prescriptions.forEach(p => {
        if (p.id === id)
            prescription = p
    })

    prescription.herbs.forEach(h => {
        herbs.push({ name: h.name, weight: h.weight })
    })
    herbs.forEach(h => {
        r.herbs.forEach((rh, index) => {
            if (rh.name === h.name)
                newHerbs.push({ ...h, ...rh })
        })
    })
    newHerbs.forEach(herb => {
        data.forEach(T => {
            T.children.forEach(t => {
                if (t.name === herb.type[1])
                    t.children.push({
                        name: herb.name,
                        itemStyle: {
                            color: "transparent",
                        },
                        value: 1,

                    })
            })
        })
    })
    return data
}
const allSankeyData = r => {
    const mdata = []
    const mlinks = []
    const pdata = []
    const plinks = []
    let meridians = []
    let flavours = []
    r.forEach(h => {
        mdata.push({ name: h.name })
        pdata.push({ name: h.name })
        h.meridians.forEach(m => {
            mlinks.push({
                source: h.name,
                target: m,
                value: 1
            })
        })
        h.flavours.forEach(m => {
            plinks.push({
                source: h.name,
                target: m,
                value: 1
            })
        })
        flavours = [...h.flavours, ...flavours]
        meridians = [...h.meridians, ...meridians]
    })
    new Set(meridians).forEach(m => {
        mdata.push({
            name: m
        })
    })
    new Set(flavours).forEach(p => {
        pdata.push({
            name: p
        })
    })
    return {
        flavour: { data: pdata, links: plinks },
        meridian: { data: mdata, links: mlinks }
    }
}
const allSunData = r => {
    const data = [
        {
            name: "",
            itemStyle: {
                color: "#A2CD5A",
            },
            children: [
                {
                    name: "???",
                    itemStyle: {
                        color: "#A2CD5A",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "",
            itemStyle: {
                color: "DodgerBlue",
            },
            children: [
                {
                    name: "???",
                    itemStyle: {
                        color: "lightSkyBlue",
                    },
                    children: [

                    ],
                },
                {
                    name: "??????",
                    itemStyle: {
                        color: "skyBlue",
                    },
                    children: [

                    ],
                },
                {
                    name: "???",
                    itemStyle: {
                        color: "DeepSkyBlue",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "??????",
                    itemStyle: {
                        color: "#f47983",
                    },
                    children: [

                    ],
                },
                {
                    name: "???",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

                {
                    name: "???",
                    itemStyle: {
                        color: "#db5a6b",
                    },
                    children: [

                    ],
                },
            ],
        },
    ];
    r.forEach(herb => {
        switch (herb.properties[0]) {
            case '???':
                data[0].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#A2CD5A",
                    },
                    value: 1,

                })
                return;
            case '???':
                data[1].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "lightSkyBlue",
                    },
                    value: 1,

                })
                return;
            case '??????':
                data[1].children[1].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "skyBlue",
                    },
                    value: 1,

                })
                return;
            case '???':
                data[1].children[2].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "DeepSkyBlue",
                    },
                    value: 1,

                })
                return;
            case '??????':
                data[2].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#f47983",
                    },
                    value: 1,

                })
                return;
            case '???':
                data[2].children[1].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    value: 1,

                })
                return;
            case '???':
                data[2].children[2].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#db5a6b",
                    },
                    value: 1,

                })
                return;
        }
    })
    return data
}
const allTypeSunData = r => {
    const data = [
        {
            name: "?????????",
            itemStyle: {
                color: "#6600ff",
            },
            children: [
                {
                    name: "????????????",
                    itemStyle: {
                        color: "#66ccff",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#6699ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#6666ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#6633ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#6600ff",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#00ff99",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00cc99",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#006699",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#003399",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#000099",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#66ff33",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#66cc33",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#669933",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "????????????",
            itemStyle: {
                color: "#EE7942",
            },
            children: [
                {
                    name: "??????????????????",
                    itemStyle: {
                        color: "#EE6A50",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#EE3B3B",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????????????????",
                    itemStyle: {
                        color: "#EE1289",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#969696",
            },
            children: [
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#919191",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#8F8F8F",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B8B83",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "???????????????",
            itemStyle: {
                color: "#00EEEE",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00FFFF",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00F5FF",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00E5EE",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "???????????????",
            itemStyle: {
                color: "#8B8970",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B8386",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B7D7B",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B7765",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B6914",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#ffff00",
            },
            children: [
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffff33",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffff66",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffff99",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffffcc",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#00EEEE",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#00CED1",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#008B8B",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????????????????",
                    itemStyle: {
                        color: "#00688B",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#B4CDCD",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#B2DFEE",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#AEEEEE",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "?????????",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#f47983",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "???????????????",
            itemStyle: {
                color: "#8B6969",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B636C",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#8B5742",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "?????????????????????",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#7FFFD4",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#66CDAA",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#54FF9F",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "??????",
            itemStyle: {
                color: "#EDEDED",
            },
            children: [
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#EBEBEB",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#E0EEEE",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#E3E3E3",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#EAEAEA",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#E5E5E5",
                    },
                    children: [

                    ],
                },
                {
                    name: "?????????",
                    itemStyle: {
                        color: "#E0EEE0",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#DEDEDE",
                    },
                    children: [

                    ],
                },
                {
                    name: "???????????????",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

            ],
        },

    ]
    r.forEach(herb => {
        data.forEach(T => {
            T.children.forEach(t => {
                if (t.name === herb.type[1])
                    t.children.push({
                        name: herb.name,
                        itemStyle: {
                            color: "transparent",
                        },
                        value: 1,

                    })
            })
        })
    })
    return data
}
const phSankeyData = r => {
    let data = []
    let links = []
    r.forEach(p => {
        data.push(p.name)
        p.herbs.forEach(h => {
            data.push(h.name)
            links.push({
                source: p.name,
                target: h.name,
                value: 1
            })
        })
    })
    newdata = []
    new Set(data).forEach(d => {
        newdata.push({
            name:d
        })
    })
    return {
        data: newdata,
        links
    }
}
router.get('/getAllHerbsData', async (req, res) => {
    let herbs = []
    await pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM herbs", (e, r) => {
            if (e) {
                console.log(e)
            }
            herbs = JSON.parse(JSON.stringify(outjson(r)))
        })
        pool.releaseConnection(conn) // ??????????????????????????????????????????
    })
    await pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM prescriptions", (e, r) => {
            if (e) {
                console.log(e)
            }
            setTimeout(() => {
                res.json(new Result({
                    data: {
                        ...allSankeyData(herbs),
                        type: allTypeSunData(herbs),
                        property: allSunData(herbs),
                        herbs: phSankeyData(outjsonp(r))
                    }
                }))
            }, 5)

        })
        pool.releaseConnection(conn) // ??????????????????????????????????????????
    })
});
router.post('/getPercriptionsData', async (req, res) => {
    let herbs = []
    await pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM herbs", (e, r) => {
            if (e) {
                console.log(e)
            }
            herbs = JSON.parse(JSON.stringify(outjson(r)))
        })
        pool.releaseConnection(conn) // ??????????????????????????????????????????
    })
    await pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM prescriptions", (e, r) => {
            if (e) {
                console.log(e)
            }
            setTimeout(() => {
                res.json(new Result({
                    data: {
                        ...pSankeyData({
                            herbs,
                            prescriptions: outjsonp(r)
                        }, req.body.id),
                        property: propertySunyData({
                            herbs,
                            prescriptions: outjsonp(r)
                        }, req.body.id),
                        type: typeSunData({
                            herbs,
                            prescriptions: outjsonp(r)
                        }, req.body.id)
                    }
                }))
            }, 5)

        })
        pool.releaseConnection(conn) // ??????????????????????????????????????????
    })

});
module.exports = router;