const db = require('../database/db')


//get all list
const allList = async (req, res) => {
    try {

        const sql = `select * from vehicle_type`;
        db.query(sql, (error, result) => {

            if (error) {
                console.log("database error")
                return res.status(500).json({ error: 'Database error' })
            }

            if (result.length === 0) {
                console.log("data not found")
                return res.status(404).json({ error: 'Data not found' })
            }



            res.send(result);
        })
    } catch (error) {
        console.log(error)

    }
}


//get single data
const singleData = async (req, res) => {

    try {

        if (!req.body || !req.body.id) {
            return res.status(400).json({ error: 'ID is required in the request body' });
        }
        // var id = req.params.id;
        var id = req.body.id;
        const sql = 'select * from vehicle_type where id=?'
        db.query(sql, [id], (error, result) => {

           

            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            if (result.length === 0) {
                return res.status(404).json({ error: 'Data not found' });
            }

            res.send(result)
        })

    } catch (error) {
        console.log(error)

    }

}

//insert data into table
const insertData = (req, res) => {

    try {
        var vehicleType = req.body.type;
        console.log(vehicleType)

        if (!vehicleType) {
            return res.status(400).json({ error: 'Missing required fields' });
        }


        const sql = "insert into vehicle_type (type) VALUES(?)"
        db.query(sql, [vehicleType], (error, result) => {
            if (error) {
                console.error('Database error:', error);
                return res.status(500).json({ error: 'Database error' });
            }

            if (result) {
                res.status(201).json({ "message": "Data Inserted" })
            }
        })
    } catch (error) {

        console.log(error)

    }

}


//update data
const updateData = (req, res) => {

    try {
        const vehicleType = req.body
        console.log(vehicleType)
        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        if (!vehicleType.type || !vehicleType.id) {
            return res.status(400).json({ error: "Missing Required Field" });
        }

        // Check if the id exists
        const isidExist = "SELECT COUNT(*) AS count FROM vehicle_type WHERE id = ?";
        db.query(isidExist, [vehicleType.id], (error, result) => {
            if (error) {
                return res.status(500).json({ error: 'Database error' });
            }

            if (result[0].count === 0) {
                return res.status(400).json({ error: "id not exist" })
            }



            //update type
            const sql = "update vehicle_type SET type=?, updated_at=? where id=?";
            db.query(sql, [vehicleType.type, currentDateTime, vehicleType.id], (error, result) => {
                console.log(result)


                if (error) {
                    return res.status(500).json({ error: "Database Error" })
                }

                if (result) {
                    res.status(201).json({ "message": "Data updated Successfully" })
                }
            });
        });


    } catch (error) {
        console.log(error)

    }

}



//delete Data

const deleteData = (req, res) => {

    try {

        const id = req.body.id;
        isIdExist = " select * from vehicle_type where id=?";
        db.query(isIdExist, [id], (error, result) => {

            if (error) {
                return res.status(500).json({ error: "database error" })
            }

            if (result.length < 1) {
                return res.status(400).json({ error: "Id not exist" })
            }



            const deleteData = "delete from vehicle_type where id=?";
            db.query(deleteData, [id], (error, result) => {

                if (error) {

                    return res.status(500).json({ error: "database Error" })
                }

                if(result){
                    return res.status(201).json({"message":"Deleted Successfully"})
                }

            })
        })

    } catch (error) {

    }

}




module.exports = { allList, singleData, insertData, updateData, deleteData }