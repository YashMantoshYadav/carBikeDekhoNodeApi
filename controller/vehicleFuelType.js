const db = require('../database/db')



//get all fuel Type
const findAll = (req, res) => {
    try {

        const sql = "select * from vehicle_fuel_type";
        db.query(sql, (error, result) => {

            if (error) {
                return res.status(500).json({ error: "Database error" })
            }

            if (result.length < 1) {
                return res.status(404).json({ "error": "data not found" })
            }

            res.send(result)

        })


    } catch (error) {
        console.log(error)

    }
}



//get single data
const get_singleFuelType = (req,res)=>{

    try {

        const id = req.body.id

        if (!id) {
            return res.status(404).json({ error: "ID is required in the request body" })
        }

        const sql = "select * from vehicle_fuel_type where id=?";
        db.query(sql, [id], (error, result) => {

            console.log(result.length)

            if (error) {
                return res.status(500).json({ error: "database error" })
            }

            if (result.length === 0) {
                return res.status(404).json({ error: "Data not found" })
            }

            res.send(result)
        })


    } catch (error) {

        console.log(error)

    }
};


//Insert fuel type
const FuelTypeInsert = (req, res) => {
    try {

        const fuelType = req.body.fuel

        if (!fuelType) {
            return res.status(404).json({ error: "fuel is the required in request body" });
        }

        //find duplicate data
        const selectSql = "select COUNT(*) AS count from vehicle_fuel_type where fuel=?";
        db.query(selectSql, [fuelType], (error, result) => {

            if (error) {
                return res.status(500).json({ error: "database error" })
            }

            if (result[0].count > 0) {
                return res.status(409).json({ "message": "Data already Exist" })
            }


            //insert data in table
            const sql = "insert into vehicle_fuel_type (fuel) values (?)";
            db.query(sql, [fuelType], (error, result) => {

                if (error) {
                    return res.status(500).json({ error: "database error" })
                }

                if (result) {
                    return res.status(201).json({ "message": "Data inserted Successfully!" });
                }

            });

        });

    } catch (error) {

        console.log(error)
    }

};

//update fuel type
const fuelTypeUpdate = (req, res) => {
    try {
        const id = req.body.id;
        const fuelType = req.body.fuel;
        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        if (!id || !fuelType) {
            return res.status(404).json({ error: "Id & fuel Type is the required in request body" });
        }

        const isIdExist = "select COUNT(*) AS count from vehicle_fuel_type where id=?";
        db.query(isIdExist, [id], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Database error" });
            }

            if (result[0].count === 0) {
                return res.status(404).json({ error: "id not found" });
            }

          
            const updateSql = "update vehicle_fuel_type set fuel=?, updated_at=? where id=?";
            db.query(updateSql, [fuelType, currentDateTime, id], (error, result) => {
                if (error) {
                    return res.status(500).json({ error: "Database error" });
                }

                if (result) {
                    res.status(200).json({ "message": "Updated successfully!" });
                }
            });
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({ error: "Internal server error" }); // Handle unexpected errors
    }
};


//delete Fuel type
const deleteFuelType = (req, res)=>{

    try {

        const id = req.body.id;
        if(!id){
            return res.status(500).json({error: "id is required in the request body"})
        }

        const isIdExist = "select COUNT(*) AS count from vehicle_fuel_type where id=?";
        db.query(isIdExist,[id],(error,result)=>{
            if(error){
                return res.status(500).json({error:"Database error"})
            }

            if(result[0].count === 0){
                return res.status(404).json({"message":"Id not found"})
            }


            const deleteSql = "delete from vehicle_fuel_type where id=?";
            db.query(deleteSql,[id],(error,result)=>{

                if(error){
                    return res.status(500).json({error:"Database error"})
                }

                if(result){
                    res.status(200).json({"message":"Item deleted successfully!"})
                }

            })
        });

    } catch (error) {

        console.log(error)
        
    }

}




module.exports = { findAll, get_singleFuelType, FuelTypeInsert, fuelTypeUpdate, deleteFuelType }