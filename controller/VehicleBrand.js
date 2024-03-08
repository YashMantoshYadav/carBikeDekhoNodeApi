const db = require('../database/db')



//get all list of Brand name
const BrandFindAll = (req, res) => {
    try {
        const sql = "select * from vehicle_brand";
        db.query(sql, (error, result) => {

            if (error) {
                return res.status(500).json({ error: "Database error" })
            }

            if (result.lenght === 0) {
                return res.status(404).json({ error: "Data not found" })
            }

            res.send(result)
        })



    } catch (error) {

        console.log(error)

    }
}


//get single entry of brand from list
const singleFind = (req, res) => {

    try {

        const id = req.body.id

        if (!id) {
            return res.status(404).json({ error: "ID is required in the request body" })
        }

        const sql = "select * from vehicle_brand where id=?";
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
const brandInsert = (req, res) => {
    try {

        const brandName = req.body.brand.trim()

        if (!brandName) {
            return res.status(404).json({ error: "Brand is the required in request body" });
        }

        //find duplicate data
        const selectSql = "select COUNT(*) AS count from vehicle_brand where brand=?";
        db.query(selectSql, [brandName], (error, result) => {

            if (error) {
                return res.status(500).json({ error: "database error" })
            }

            if (result[0].count > 0) {
                return res.status(409).json({ "message": "Data already Exist" })
            }


            //insert data in table
            const sql = "insert into vehicle_brand (brand) values (?)";
            db.query(sql, [brandName], (error, result) => {

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

}

//Update Existing Brand name

const brandNameUpdate = (req, res) => {
    try {
        const id = req.body.id;
        const brandName = req.body.brand;
        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        if (!id || !brandName) {
            return res.status(404).json({ error: "Id & Brand Name is the required in request body" });
        }

        const isIdExist = "select COUNT(*) AS count from vehicle_brand where id=?";
        db.query(isIdExist, [id], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Database error" });
            }

            if (result[0].count === 0) {
                return res.status(404).json({ error: "id not found" });
            }

            const trimBrandname = brandName.trim();
            const updateSql = "update vehicle_brand set brand=?, updated_at=? where id=?";
            db.query(updateSql, [trimBrandname, currentDateTime, id], (error, result) => {
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


const deleteBrand = (req, res)=>{

    try {

        const id = req.body.id;
        if(!id){
            return res.status(500).json({error: "id is required in the request body"})
        }

        const isIdExist = "select COUNT(*) AS count from vehicle_brand where id=?";
        db.query(isIdExist,[id],(error,result)=>{
            if(error){
                return res.status(500).json({error:"Database error"})
            }

            if(result[0].count === 0){
                return res.status(404).json({"message":"Id not found"})
            }


            const deleteSql = "delete from vehicle_brand where id=?";
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
        
    }

}



module.exports = { BrandFindAll, singleFind, brandInsert, brandNameUpdate, deleteBrand }