const {
    pool,
    router,
    Result
} = require('../connect')
const outjson = r =>{
    const newdata = []
    r.forEach(data => {
        newdata.push(
            {
               ...data,
               herbs:JSON.parse(data.herbs)
            }
        )
    });
    return newdata
}
router.post('/addPrescription', (req, res) => {
    pool.getConnection((err, conn) => {
        prescription = req.body
        /**/
        conn.query("INSERT INTO `prescriptions`( `name`, `herbs`, `usage`, `effection`, `book`) VALUES (?,?,?,?,?) ",
         [prescription.name,JSON.stringify(prescription.herbs),prescription.usage,prescription.effection,
           prescription.book]
         , (e, r) => {
             if(e)
             console.log(e)
            res.json(new Result({
                data: r
            }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.post('/deletePrescription', (req, res) => {
    pool.getConnection((err, conn) => {
        prescription = req.body
        /**/
        conn.query("DELETE FROM `prescriptions` WHERE id =? ",
         [prescription.id]
         , (e, r) => {
             if(e)
             console.log(e)
            res.json(new Result({
                data: r
            }))
        })

        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.post('/updatePrescription', (req, res) => {
    pool.getConnection((err, conn) => {
        prescription = req.body
        /**/
        conn.query("UPDATE `prescriptions` SET `name`=?,`herbs`=?,`usage`=?,`effection`=?,`book`=? WHERE id = ? ",
        [prescription.name,JSON.stringify(prescription.herbs),prescription.usage,prescription.effection,
            prescription.book,prescription.id]
         , (e, r) => {
             if(e)
             console.log(e)
            res.json(new Result({
                data: r
            }))
        })

        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
router.get('/getPrescriptions', (req, res) => {
    pool.getConnection((err, conn) => {
        conn.query("SELECT * FROM prescriptions", (e, r) => {
            if (e) console.log(e)
            res.json(new Result({
                data: outjson(r)
            }))
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})


module.exports = router;