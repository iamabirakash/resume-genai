// const mongoose = require("mongoose")

// async function connectToDB() {
//     try {
//         await mongoose.connect(process.env.MONGO_URI, {
//             family: 4   // ⭐ FORCE IPv4
//         })

//         console.log("Connected to Database")
//     } catch (error) {
//         console.error("Error connecting to Database:", error)
//     }
// }

// module.exports = connectToDB


const mongoose = require("mongoose")

async function connectToDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)

        console.log("Connected to Database")
    } catch (error) {
        console.error("Error connecting to Database:", error)
    }
    // console.log(process.env.MONGO_URI)
    // console.log("URI:", process.env.MONGO_URI)
}

module.exports = connectToDB