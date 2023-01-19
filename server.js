const app = require('./app');
const { connectDatabase } = require('./config/database');



/**Connect Database Function Call */

connectDatabase().then(()=>{
    app.listen(process.env.PORT, () => {
        console.log(`Server is connected on http://localhost:${process.env.PORT}`)
    })
})

