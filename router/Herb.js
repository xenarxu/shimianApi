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
const count = r => {
    const newdata = []
    r.forEach((data) => {
        const totalSales = []
        JSON.parse(data.sales).forEach(sales => {
            totalSales.push(data.price * sales)
        })
        newdata.push({
            name: data.name,
            totalSales: totalSales

        })
    })
    return newdata
}
const tableCount = r => {
    const newdata = []
    r.forEach((data) => {
        let totalSales = 0
        JSON.parse(data.sales).forEach(sales => {
            totalSales += data.price * sales
        })
        newdata.push({
            name: data.name,
            price: data.price,
            todaySales: JSON.parse(data.sales)[0],
            totalSales: totalSales,
        })
    })
    return newdata
}
const meridiansTable = r => {
    let mt = [{ name: '心', value: 0 }, { name: '肝', value: 0 }, { name: '脾', value: 0 }, { name: '肺', value: 0 }, { name: '肾', value: 0 },
    { name: '胃', value: 0 }, { name: '胆', value: 0 }, { name: '大肠', value: 0 }, { name: '小肠', value: 0 }, { name: '膀胱', value: 0 }, { name: '心包', value: 0 }, { name: '三焦', value: 0 },
    ]
    r.forEach(herb => {
        JSON.parse(herb.meridians).forEach(meridian => {
            switch (meridian) {
                case '心':
                    {
                        mt[0].value++;
                        break
                    }
                case '肝':
                    {
                        mt[1].value++;
                        break
                    }
                case '脾':
                    {
                        mt[2].value++;
                        break
                    }
                case '肺':
                    {
                        mt[3].value++;
                        break
                    }
                case '肾':
                    {
                        mt[4].value++;
                        break
                    }
                case '胃':
                    {
                        mt[5].value++;
                        break
                    }
                case '胆':
                    {
                        mt[6].value++;
                        break
                    }
                case '大肠':
                    {
                        mt[7].value++;
                        break
                    } case '小肠':
                    {
                        mt[8].value++;
                        break
                    }
                case '膀胱':
                    {
                        mt[9].value++;
                        break
                    }
                case '心包':
                    {
                        mt[10].value++;
                        break
                    }
                case '三焦':
                    {
                        mt[11].value++;
                        break
                    }
            }
        })
    })
    mt = mt.filter(m => m.value != 0)
    mt.sort(function (a, b) { return b.value - a.value });
    return mt
}
const typeTable = r => {
    let mt = [{ name: '清热药', value: 0 }, { name: '止血药', value: 0 }, { name: '解表药', value: 0 }, { name: '祛风湿药', value: 0 }, { name: '泻下药', value: 0 },
    { name: '利水渗湿药', value: 0 }, { name: '活血化瘀药', value: 0 }, { name: '补虚药', value: 0 },
    { name: '收涩药', value: 0 }, { name: '安神药', value: 0 }, { name: '平肝息风药', value: 0 },
    { name: '化痰止咳平喘药', value: 0 }, { name: '其他', value: 0 },
    ]
    r.forEach(herb => {
        switch (JSON.parse(herb.type)[0]) {
            case '清热药':
                {
                    mt[0].value++;
                    break
                }

            case '止血药':
                {
                    mt[1].value++;
                    break
                }
            case '解表药':
                {
                    mt[2].value++;
                    break
                }
            case '祛风湿药':
                {
                    mt[3].value++;
                    break
                }
            case '泻下药':
                {
                    mt[4].value++;
                    break
                }
            case '利水渗湿药':
                {
                    mt[5].value++;
                    break
                }
            case '活血化瘀药':
                {
                    mt[6].value++;
                    break
                }
            case '补虚药':
                {
                    mt[7].value++;
                    break
                }
            case '收涩药':
                {
                    mt[8].value++;
                    break
                }
            case '安神药':
                {
                    mt[9].value++;
                    break
                }
            case '平肝息风药':
                {
                    mt[10].value++;
                    break
                }
            case '化痰止咳平喘药':
                {
                    mt[11].value++;
                    break
                }
            case '其他':
                {
                    mt[12].value++;
                    break
                }

        }
    })

    mt = mt.filter(m => m.value != 0)
    mt.sort(function (a, b) { return b.value - a.value });
    return mt
}
function radomPrice() {
    return Math.random() * (100 - 20) + 20
}
function randomSales() {
    let array = []
    for (let index = 0; index < 7; index++) {
        array[index] = array[index] = parseInt(Math.random() * 100)
    }
    return array
}

router.get('/getHerbs', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM herbs", (e, r) => {
            if (e) {
                console.log(e)
            }
            res.json(new Result({
                data: outjson(r)
            }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.get('/getSales', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM herbs", (e, r) => {
            if (e) {
                console.log(e)
            }
            res.json(new Result({
                data: count(r)
            }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.get('/getTable', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM herbs", (e, r) => {
            if (e) {
                console.log(e)
            }
            res.json(new Result({
                data: tableCount(r)
            }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.get('/getMeridiansTable', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM herbs", (e, r) => {
            if (e) {
                console.log(e)
            }
            res.json(new Result({
                data: meridiansTable(r)
            }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.get('/getTypeTable', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM herbs", (e, r) => {
            if (e) {
                console.log(e)
            }
            res.json(new Result({
                data: typeTable(r)
            }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.post('/addHerb', (req, res) => {
    pool.getConnection((err, conn) => {
        herbs = req.body
        /**/
        conn.query("INSERT INTO `herbs`( `name`, `properties`, `flavours`, `meridians`, `type`, `description`, `picturelink`, `price`, `sales`) VALUES (?,?,?,?,?,?,?,?,?) ",
            [herbs.name, JSON.stringify(herbs.properties), JSON.stringify(herbs.flavours), JSON.stringify(herbs.meridians),
            JSON.stringify(herbs.type), herbs.description, herbs.picturelink, radomPrice(), JSON.stringify(randomSales())]
            , (e, r) => {
                if (e)
                    console.log(e)
                res.json(new Result({
                    data: r
                }))
            })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.post('/deleteHerb', (req, res) => {
    pool.getConnection((err, conn) => {
        herb = req.body
        /**/
        conn.query("DELETE FROM `herbs` WHERE id =? ",
            [herb.id]
            , (e, r) => {
                if (e)
                    console.log(e)
                res.json(new Result({
                    data: r
                }))
            })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.post('/updateHerb', (req, res) => {
    pool.getConnection((err, conn) => {
        herbs = req.body
        /**/
        conn.query("UPDATE `herbs` SET`name`=?,`properties`=?,`flavours`=?,`meridians`=?,`type`=?,`description`=?,`picturelink`=?,`price`=?,`sales`=? WHERE id = ? ",
            [herbs.name, JSON.stringify(herbs.properties), JSON.stringify(herbs.flavours), JSON.stringify(herbs.meridians),
            JSON.stringify(herbs.type), herbs.description, herbs.picturelink, herbs.price, JSON.stringify(herbs.sales), herbs.id]
            , (e, r) => {
                if (e)
                    console.log(e)
                res.json(new Result({
                    data: r
                }))
            })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
module.exports = router;