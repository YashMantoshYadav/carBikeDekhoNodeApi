const db = require('../database/db');



//find all Vehicle launch year
const FindAll = (req,res)=>{
    try {

    const sql = "select * from vehicle_launch_year";
    db.query(sql,(error,result)=>{

        if(error){
            return res.status(500).json({error: "Database error"})
        }

        if(result.length<1){
            return res.status(404).json({"error":"data not found"})
        }

        res.send(result)

    })

        
    } catch (error) {
        console.log(error)
        
    }
}

// Find Single
const singleFind = (req,res)=>{

    try {

        const id = req.body.id

        if (!id) {
            return res.status(404).json({ error: "ID is required in the request body" })
        }

        const sql = "select * from vehicle_launch_year where id=?";
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

    }

}


//insert new brand in list
const launchYearInsert = (req, res) => {
    try {

        const launchYear = req.body.year

        if (!launchYear) {
            return res.status(404).json({ error: "Year is the required in request body" });
        }

        //find duplicate data
        const selectSql = "select COUNT(*) AS count from vehicle_launch_year where year=?";
        db.query(selectSql, [launchYear], (error, result) => {

            if (error) {
                return res.status(500).json({ error: "database error" })
            }

            if (result[0].count > 0) {
                return res.status(409).json({ "message": "Data already Exist" })
            }


            //insert data in table
            const sql = "insert into vehicle_launch_year (year) values (?)";
            db.query(sql, [launchYear], (error, result) => {

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


const launchYearUpdate = (req, res) => {
    try {
        const id = req.body.id;
        const launchYear = req.body.year;
        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        if (!id || !launchYear) {
            return res.status(404).json({ error: "Id & Year is the required in request body" });
        }

        const isIdExist = "select COUNT(*) AS count from vehicle_launch_year where id=?";
        db.query(isIdExist, [id], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Database error" });
            }

            if (result[0].count === 0) {
                return res.status(404).json({ error: "id not found" });
            }

          
            const updateSql = "update vehicle_launch_year set year=?, updated_at=? where id=?";
            db.query(updateSql, [launchYear, currentDateTime, id], (error, result) => {
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


//delete vehicle launch year

const deleteLaunchYear = (req, res)=>{

    try {

        const id = req.body.id;
        if(!id){
            return res.status(500).json({error: "id is required in the request body"})
        }

        const isIdExist = "select COUNT(*) AS count from vehicle_launch_year where id=?";
        db.query(isIdExist,[id],(error,result)=>{
            if(error){
                return res.status(500).json({error:"Database error"})
            }

            if(result[0].count === 0){
                return res.status(404).json({"message":"Id not found"})
            }


            const deleteSql = "delete from vehicle_launch_year where id=?";
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




module.exports = {FindAll, singleFind, launchYearInsert, launchYearUpdate, deleteLaunchYear}