const db = require('../database/db');


//find all vechicle color
const findall = (req, res) => {
    try {
        const sql = "select * from vehicle_color";
        db.query(sql, (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Database Error" })
            }

            if (result.length < 1) {
                return res.status(404).json({ "message": "Item not found" })
            }

            res.send(result)
        })

    } catch (error) {

        console.log(error)
        return res.status(500).json({ "error": "Internal server Error" })

    }
}


//find single vehicle color
const singleFind = (req, res) => {

    try {

        const id = req.body.id;

        if(!id){
            return res.status(404).json({error:"id is the required in request body"})
        }

        const sql = "select * from vehicle_color where id=?";
        db.query(sql, [id], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Database Error" })
            }

            if (result.length < 1) {
                return res.status(404).json({ error: "Id not found" })
            }

            res.send(result)
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ "error": "Internal server Error" })

    }

}

// insert data

const insertColorType = (req,res)=>{
    try {

        const color = req.body.color;

        if(!color){
            return res.status(404).json({error: "color is the required in request body"})
        }
        const isColorExist = "select Count(*) as count from vehicle_color where color=?";
        db.query(isColorExist,[color],(error, result)=>{

            if(error){
                return res.status(500).json({error:"Database Error"})
            }

            if(result[0].count>0){
                return res.status(409).json({"message": "data already Exist"})
            }

            const insertColor = "insert into vehicle_color (color) values(?)";
            db.query(insertColor,[color],(error,result)=>{
                if(error){
                    return res.status(500).json({error:"Database error"})
                }

                if(result){
                    res.status(201).json({"message":"Data inserted Successfully!"})
                }
            })

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal server error"})
        
    }
};

//update color
const updateColor = (req,res)=>{
    try {

        const id = req.body.id
        const colortype = req.body.color;
        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

        if(!id || !colortype){
            return res.status(404).json({error:"Id & color is the required in request body "})
        }

        const isIdExist = "select Count(*) as count from vehicle_color where id=?";
        db.query(isIdExist,[id],(error, result)=>{
            if(error){
                return res.status(500).json({error: "Database error"});
            }

            if(result[0].count===0){
                return res.status(404).json({"message":"id not found"});
            }

            const updateColorType  = "update vehicle_color set color=?, updated_at=? where id=?";
            db.query(updateColorType,[colortype,currentDateTime,id],(error, result)=>{

                if(error){
                  
                    return res.status(500).json({error:"Database error"})
                }

                if(result){
                    res.status(201).json({"message":"Data updated successfully!"});
                }
            });

        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error: "Internal Server Error"})
        
    }
};


//delete color
const deleteColor = (req,res)=>{
    try {
        const id = req.body.id

        if(!id){
            return res.status(404).json({error:"id is the required field in request body"})
        }

        const isIdExist  = "select count(*) as count from vehicle_color where id=?";
        db.query(isIdExist,[id],(error, result)=>{
            if(error){
                return res.status(500).json({error:"Database Error"})
            }

            if(result[0].count === 0){
                return res.status(404).json({"message":"Id not found"});

            }

            const deleteColor = "delete from vehicle_color where id=?";
            db.query(deleteColor,[id],(error,result)=>{
                if(error){
       
                    return res.status(500).json({error:"Database Error"})
                }

                if(result){
                    res.status(201).json({"message":"Item Detleted successfully"})
                }
            })
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"})
        
    }
}





module.exports = { findall, singleFind, insertColorType, updateColor, deleteColor}