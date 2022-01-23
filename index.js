const {
    app,
    pool,
    Result
} = require('./connect')
const Herb = require('./router/Herb') 
const Prescription = require('./router/Prescription')
const Analysis = require('./router/Analysis')
app.all('*', (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200); 
    } else {
        next();
    }
})
app.all('/', (req, res) => {
    pool.getConnection((err, conn) => {
        res.json({
            type: 'test'
        })
        pool.releaseConnection(conn) // 释放连接池，等待别的连接使用
    })
})
app.use('/herb', Herb)
app.use('/prescription',Prescription)
app.use('/analysis',Analysis)
app.listen(3000, () => {
    console.log('服务启动')
})