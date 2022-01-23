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
                    name: "平",
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
                    name: "凉",
                    itemStyle: {
                        color: "lightSkyBlue",
                    },
                    children: [

                    ],
                },
                {
                    name: "微寒",
                    itemStyle: {
                        color: "skyBlue",
                    },
                    children: [

                    ],
                },
                {
                    name: "寒",
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
                    name: "微温",
                    itemStyle: {
                        color: "#f47983",
                    },
                    children: [

                    ],
                },
                {
                    name: "温",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

                {
                    name: "热",
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
            case '平':
                data[0].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#A2CD5A",
                    },
                    value: herb.weight,

                })
                return;
            case '凉':
                data[1].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "lightSkyBlue",
                    },
                    value: herb.weight,

                })
                return;
            case '微寒':
                data[1].children[1].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "skyBlue",
                    },
                    value: herb.weight,

                })
                return;
            case '寒':
                data[1].children[2].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "DeepSkyBlue",
                    },
                    value: herb.weight,

                })
                return;
            case '微温':
                data[2].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#f47983",
                    },
                    value: herb.weight,

                })
                return;
            case '温':
                data[2].children[1].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    value: herb.weight,

                })
                return;
            case '热':
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
            name: "清热药",
            itemStyle: {
                color: "#6600ff",
            },
            children: [
                {
                    name: "清虚热药",
                    itemStyle: {
                        color: "#66ccff",
                    },
                    children: [

                    ],
                },
                {
                    name: "清热解毒药",
                    itemStyle: {
                        color: "#6699ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "清热泻火药",
                    itemStyle: {
                        color: "#6666ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "清热凉血药",
                    itemStyle: {
                        color: "#6633ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "清热燥湿药",
                    itemStyle: {
                        color: "#6600ff",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "止血药",
            itemStyle: {
                color: "#00ff99",
            },
            children: [
                {
                    name: "温经止血药",
                    itemStyle: {
                        color: "#00cc99",
                    },
                    children: [

                    ],
                },
                {
                    name: "收敛止血药",
                    itemStyle: {
                        color: "#006699",
                    },
                    children: [

                    ],
                },
                {
                    name: "凉血止血药",
                    itemStyle: {
                        color: "#003399",
                    },
                    children: [

                    ],
                },
                {
                    name: "化瘀止血药",
                    itemStyle: {
                        color: "#000099",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "解表药",
            itemStyle: {
                color: "#66ff33",
            },
            children: [
                {
                    name: "辛温解表药",
                    itemStyle: {
                        color: "#66cc33",
                    },
                    children: [

                    ],
                },
                {
                    name: "辛凉解表药",
                    itemStyle: {
                        color: "#669933",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "祛风湿药",
            itemStyle: {
                color: "#EE7942",
            },
            children: [
                {
                    name: "祛风湿散寒药",
                    itemStyle: {
                        color: "#EE6A50",
                    },
                    children: [

                    ],
                },
                {
                    name: "祛风湿清热",
                    itemStyle: {
                        color: "#EE3B3B",
                    },
                    children: [

                    ],
                },
                {
                    name: "祛风湿强筋骨药",
                    itemStyle: {
                        color: "#EE1289",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "泻下药",
            itemStyle: {
                color: "#969696",
            },
            children: [
                {
                    name: "攻下药",
                    itemStyle: {
                        color: "#919191",
                    },
                    children: [

                    ],
                },
                {
                    name: "润下药",
                    itemStyle: {
                        color: "#8F8F8F",
                    },
                    children: [

                    ],
                },
                {
                    name: "峻下逐水药",
                    itemStyle: {
                        color: "#8B8B83",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "利水渗湿药",
            itemStyle: {
                color: "#00EEEE",
            },
            children: [
                {
                    name: "利水消肿药",
                    itemStyle: {
                        color: "#00FFFF",
                    },
                    children: [

                    ],
                },
                {
                    name: "利尿通淋药",
                    itemStyle: {
                        color: "#00F5FF",
                    },
                    children: [

                    ],
                },
                {
                    name: "利湿退黄药",
                    itemStyle: {
                        color: "#00E5EE",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "活血化瘀药",
            itemStyle: {
                color: "#8B8970",
            },
            children: [
                {
                    name: "活血止痛药",
                    itemStyle: {
                        color: "#8B8386",
                    },
                    children: [

                    ],
                },
                {
                    name: "活血调经药",
                    itemStyle: {
                        color: "#8B7D7B",
                    },
                    children: [

                    ],
                },
                {
                    name: "活血疗伤药",
                    itemStyle: {
                        color: "#8B7765",
                    },
                    children: [

                    ],
                },
                {
                    name: "破血消癥药",
                    itemStyle: {
                        color: "#8B6914",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "补虚药",
            itemStyle: {
                color: "#ffff00",
            },
            children: [
                {
                    name: "补气药",
                    itemStyle: {
                        color: "#ffff33",
                    },
                    children: [

                    ],
                },
                {
                    name: "补阳药",
                    itemStyle: {
                        color: "#ffff66",
                    },
                    children: [

                    ],
                },
                {
                    name: "补血药",
                    itemStyle: {
                        color: "#ffff99",
                    },
                    children: [

                    ],
                },
                {
                    name: "补阴药",
                    itemStyle: {
                        color: "#ffffcc",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "收涩药",
            itemStyle: {
                color: "#00EEEE",
            },
            children: [
                {
                    name: "固表止汗药",
                    itemStyle: {
                        color: "#00CED1",
                    },
                    children: [

                    ],
                },
                {
                    name: "敛肺涩肠药",
                    itemStyle: {
                        color: "#008B8B",
                    },
                    children: [

                    ],
                },
                {
                    name: "固精缩尿止带药",
                    itemStyle: {
                        color: "#00688B",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "安神药",
            itemStyle: {
                color: "#B4CDCD",
            },
            children: [
                {
                    name: "重镇安神药",
                    itemStyle: {
                        color: "#B2DFEE",
                    },
                    children: [

                    ],
                },
                {
                    name: "养心安神药",
                    itemStyle: {
                        color: "#AEEEEE",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "安神药",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "重镇安神药",
                    itemStyle: {
                        color: "#f47983",
                    },
                    children: [

                    ],
                },
                {
                    name: "养心安神药",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "平肝息风药",
            itemStyle: {
                color: "#8B6969",
            },
            children: [
                {
                    name: "平抑肝阳药",
                    itemStyle: {
                        color: "#8B636C",
                    },
                    children: [

                    ],
                },
                {
                    name: "息风止痉药",
                    itemStyle: {
                        color: "#8B5742",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "化痰止咳平喘药",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "温化寒痰药",
                    itemStyle: {
                        color: "#7FFFD4",
                    },
                    children: [

                    ],
                },
                {
                    name: "清化热痰药",
                    itemStyle: {
                        color: "#66CDAA",
                    },
                    children: [

                    ],
                },
                {
                    name: "止咳平喘药",
                    itemStyle: {
                        color: "#54FF9F",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "其他",
            itemStyle: {
                color: "#EDEDED",
            },
            children: [
                {
                    name: "化湿药",
                    itemStyle: {
                        color: "#EBEBEB",
                    },
                    children: [

                    ],
                },
                {
                    name: "温里药",
                    itemStyle: {
                        color: "#E0EEEE",
                    },
                    children: [

                    ],
                },
                {
                    name: "理气药",
                    itemStyle: {
                        color: "#E3E3E3",
                    },
                    children: [

                    ],
                },
                {
                    name: "驱虫药",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },
                {
                    name: "消食药",
                    itemStyle: {
                        color: "#EAEAEA",
                    },
                    children: [

                    ],
                },
                {
                    name: "开窍药",
                    itemStyle: {
                        color: "#E5E5E5",
                    },
                    children: [

                    ],
                },
                {
                    name: "涌吐药",
                    itemStyle: {
                        color: "#E0EEE0",
                    },
                    children: [

                    ],
                },
                {
                    name: "杀虫止痒药",
                    itemStyle: {
                        color: "#DEDEDE",
                    },
                    children: [

                    ],
                },
                {
                    name: "拔毒生肌药",
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
                    name: "平",
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
                    name: "凉",
                    itemStyle: {
                        color: "lightSkyBlue",
                    },
                    children: [

                    ],
                },
                {
                    name: "微寒",
                    itemStyle: {
                        color: "skyBlue",
                    },
                    children: [

                    ],
                },
                {
                    name: "寒",
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
                    name: "微温",
                    itemStyle: {
                        color: "#f47983",
                    },
                    children: [

                    ],
                },
                {
                    name: "温",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

                {
                    name: "热",
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
            case '平':
                data[0].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#A2CD5A",
                    },
                    value: 1,

                })
                return;
            case '凉':
                data[1].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "lightSkyBlue",
                    },
                    value: 1,

                })
                return;
            case '微寒':
                data[1].children[1].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "skyBlue",
                    },
                    value: 1,

                })
                return;
            case '寒':
                data[1].children[2].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "DeepSkyBlue",
                    },
                    value: 1,

                })
                return;
            case '微温':
                data[2].children[0].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#f47983",
                    },
                    value: 1,

                })
                return;
            case '温':
                data[2].children[1].children.push({

                    name: herb.name,
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    value: 1,

                })
                return;
            case '热':
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
            name: "清热药",
            itemStyle: {
                color: "#6600ff",
            },
            children: [
                {
                    name: "清虚热药",
                    itemStyle: {
                        color: "#66ccff",
                    },
                    children: [

                    ],
                },
                {
                    name: "清热解毒药",
                    itemStyle: {
                        color: "#6699ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "清热泻火药",
                    itemStyle: {
                        color: "#6666ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "清热凉血药",
                    itemStyle: {
                        color: "#6633ff",
                    },
                    children: [

                    ],
                },
                {
                    name: "清热燥湿药",
                    itemStyle: {
                        color: "#6600ff",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "止血药",
            itemStyle: {
                color: "#00ff99",
            },
            children: [
                {
                    name: "温经止血药",
                    itemStyle: {
                        color: "#00cc99",
                    },
                    children: [

                    ],
                },
                {
                    name: "收敛止血药",
                    itemStyle: {
                        color: "#006699",
                    },
                    children: [

                    ],
                },
                {
                    name: "凉血止血药",
                    itemStyle: {
                        color: "#003399",
                    },
                    children: [

                    ],
                },
                {
                    name: "化瘀止血药",
                    itemStyle: {
                        color: "#000099",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "解表药",
            itemStyle: {
                color: "#66ff33",
            },
            children: [
                {
                    name: "辛温解表药",
                    itemStyle: {
                        color: "#66cc33",
                    },
                    children: [

                    ],
                },
                {
                    name: "辛凉解表药",
                    itemStyle: {
                        color: "#669933",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "祛风湿药",
            itemStyle: {
                color: "#EE7942",
            },
            children: [
                {
                    name: "祛风湿散寒药",
                    itemStyle: {
                        color: "#EE6A50",
                    },
                    children: [

                    ],
                },
                {
                    name: "祛风湿清热",
                    itemStyle: {
                        color: "#EE3B3B",
                    },
                    children: [

                    ],
                },
                {
                    name: "祛风湿强筋骨药",
                    itemStyle: {
                        color: "#EE1289",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "泻下药",
            itemStyle: {
                color: "#969696",
            },
            children: [
                {
                    name: "攻下药",
                    itemStyle: {
                        color: "#919191",
                    },
                    children: [

                    ],
                },
                {
                    name: "润下药",
                    itemStyle: {
                        color: "#8F8F8F",
                    },
                    children: [

                    ],
                },
                {
                    name: "峻下逐水药",
                    itemStyle: {
                        color: "#8B8B83",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "利水渗湿药",
            itemStyle: {
                color: "#00EEEE",
            },
            children: [
                {
                    name: "利水消肿药",
                    itemStyle: {
                        color: "#00FFFF",
                    },
                    children: [

                    ],
                },
                {
                    name: "利尿通淋药",
                    itemStyle: {
                        color: "#00F5FF",
                    },
                    children: [

                    ],
                },
                {
                    name: "利湿退黄药",
                    itemStyle: {
                        color: "#00E5EE",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "活血化瘀药",
            itemStyle: {
                color: "#8B8970",
            },
            children: [
                {
                    name: "活血止痛药",
                    itemStyle: {
                        color: "#8B8386",
                    },
                    children: [

                    ],
                },
                {
                    name: "活血调经药",
                    itemStyle: {
                        color: "#8B7D7B",
                    },
                    children: [

                    ],
                },
                {
                    name: "活血疗伤药",
                    itemStyle: {
                        color: "#8B7765",
                    },
                    children: [

                    ],
                },
                {
                    name: "破血消癥药",
                    itemStyle: {
                        color: "#8B6914",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "补虚药",
            itemStyle: {
                color: "#ffff00",
            },
            children: [
                {
                    name: "补气药",
                    itemStyle: {
                        color: "#ffff33",
                    },
                    children: [

                    ],
                },
                {
                    name: "补阳药",
                    itemStyle: {
                        color: "#ffff66",
                    },
                    children: [

                    ],
                },
                {
                    name: "补血药",
                    itemStyle: {
                        color: "#ffff99",
                    },
                    children: [

                    ],
                },
                {
                    name: "补阴药",
                    itemStyle: {
                        color: "#ffffcc",
                    },
                    children: [

                    ],
                },
            ],
        },
        {
            name: "收涩药",
            itemStyle: {
                color: "#00EEEE",
            },
            children: [
                {
                    name: "固表止汗药",
                    itemStyle: {
                        color: "#00CED1",
                    },
                    children: [

                    ],
                },
                {
                    name: "敛肺涩肠药",
                    itemStyle: {
                        color: "#008B8B",
                    },
                    children: [

                    ],
                },
                {
                    name: "固精缩尿止带药",
                    itemStyle: {
                        color: "#00688B",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "安神药",
            itemStyle: {
                color: "#B4CDCD",
            },
            children: [
                {
                    name: "重镇安神药",
                    itemStyle: {
                        color: "#B2DFEE",
                    },
                    children: [

                    ],
                },
                {
                    name: "养心安神药",
                    itemStyle: {
                        color: "#AEEEEE",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "安神药",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "重镇安神药",
                    itemStyle: {
                        color: "#f47983",
                    },
                    children: [

                    ],
                },
                {
                    name: "养心安神药",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "平肝息风药",
            itemStyle: {
                color: "#8B6969",
            },
            children: [
                {
                    name: "平抑肝阳药",
                    itemStyle: {
                        color: "#8B636C",
                    },
                    children: [

                    ],
                },
                {
                    name: "息风止痉药",
                    itemStyle: {
                        color: "#8B5742",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "化痰止咳平喘药",
            itemStyle: {
                color: "#c93756",
            },
            children: [
                {
                    name: "温化寒痰药",
                    itemStyle: {
                        color: "#7FFFD4",
                    },
                    children: [

                    ],
                },
                {
                    name: "清化热痰药",
                    itemStyle: {
                        color: "#66CDAA",
                    },
                    children: [

                    ],
                },
                {
                    name: "止咳平喘药",
                    itemStyle: {
                        color: "#54FF9F",
                    },
                    children: [

                    ],
                },

            ],
        },
        {
            name: "其他",
            itemStyle: {
                color: "#EDEDED",
            },
            children: [
                {
                    name: "化湿药",
                    itemStyle: {
                        color: "#EBEBEB",
                    },
                    children: [

                    ],
                },
                {
                    name: "温里药",
                    itemStyle: {
                        color: "#E0EEEE",
                    },
                    children: [

                    ],
                },
                {
                    name: "理气药",
                    itemStyle: {
                        color: "#E3E3E3",
                    },
                    children: [

                    ],
                },
                {
                    name: "驱虫药",
                    itemStyle: {
                        color: "#ffb3a7",
                    },
                    children: [

                    ],
                },
                {
                    name: "消食药",
                    itemStyle: {
                        color: "#EAEAEA",
                    },
                    children: [

                    ],
                },
                {
                    name: "开窍药",
                    itemStyle: {
                        color: "#E5E5E5",
                    },
                    children: [

                    ],
                },
                {
                    name: "涌吐药",
                    itemStyle: {
                        color: "#E0EEE0",
                    },
                    children: [

                    ],
                },
                {
                    name: "杀虫止痒药",
                    itemStyle: {
                        color: "#DEDEDE",
                    },
                    children: [

                    ],
                },
                {
                    name: "拔毒生肌药",
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
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
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
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
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
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
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
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })

});
module.exports = router;