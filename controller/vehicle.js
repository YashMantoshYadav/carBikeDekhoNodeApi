const db = require('../database/db');
const multer = require('multer');



//find all vehicle
const findAll = (req, res) => {
    try {

        const sql = "select * from vehicle";
        db.query(sql, (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Database error" });
            }

            if (result.length < 1) {
                return res.status(404).json({ error: "Data not found" });
            }

            res.json({"Status":"Success", data:result})

        })

    } catch (error) {

        console.log(error)
        res.status(500).json({ error: "Internal server error" })

    }
};


//get single vehicle list
const singleVehicleDetails = (req, res) => {

    try {

        const id = req.body.id;
        console.log("-----", id)
        if (!id) {
            return res.status(500).json({ error: "Id is the required field in request body" })
        }

        const isIdExist = "select * from vehicle where id=?";

        db.query(isIdExist, [id], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Id is not exist" })
            }

            if (result.length < 1) {
                return res.status(404).json({ "message": "Item not found" });

            }


            res.send(result)
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server issue" })

    }
};

//insert vehicle details
const insertVehicle = (req, res) => {

    try {

        const value = req.body

        const insertdata = "insert into vehicle (type,launch_year,brand,fuel_type,color,price,rating,description,image)values(?,?,?,?,?,?,?,?,?)";
        db.query(insertdata, [value.type, value.launch_year, value.brand, value.fuel_type, value.color, value.price, value.rating, value.description, value.image], (error, result) => {

            if (error) {
                return res.status(500).json({ error: "Database error" })
            }

            if (result) {
                res.status(201).json({ "message": "Data inserted successfully" })
            }

        })

    } catch (error) {

        console.log(error)
    }
}

//update vehicle details
const updateVehicle = (req, res) => {
    try {

        const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const { type, launch_year, brand, fuel_type, color, price, rating, description, image,id } = req.body
    
        if (!id) {
            return res.status(404).json({ error: "Id is the required field in request body" })
        }

        const sql = "update vehicle set type=?,launch_year=?,brand=?,fuel_type=?,color=?,price=?,rating=?,description=?,image=?,updated_at=? where id=?";
        db.query(sql, [type, launch_year, brand, fuel_type, color, price, rating, description, image, currentDateTime,id], (error, result) => {
            if (error) {
                return res.status(500).json({ error: "Database error" })
            }

            if (result) {
                res.status(201).json({ "message": "Item updated successfully!" });
            }
        })


    } catch (error) {

        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })

    }

};

//Delete Vehicle Detail

const vehicleDelete = (req,res)=>{
    try {

        const id = req.body.id;
        if(!id){
            return res.status(404).json({error:"Id is the required field in request body"});
        }

        const isIdExist = "select count(*) as count from vehicle where id=?";
        db.query(isIdExist,[id],(error,result)=>{
            if(error){
                return res.status(404).json({error:"Database error"})
            }

            if(result[0].count===0){
                return res.status(409).json({"message": "Id not found"})
            }

            const sql = "delete from vehicle where id=?";
            db.query(sql,[id],(error,result)=>{
                if(error){
                    return res.status(500).json({error: "Database error"})
                }

                if(result){
                    res.status(201).json({"message": "Item Deleted Successfully!"})
                }
            })


        })
        
    } catch (error) {

        console.log(error)
        res.status(500).json({error:"Internal server error"})
        
    }
}




//insert vehicle details using multer

// Configure multer to specify where to store uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Store uploaded images in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        // Generate a unique filename for each uploaded image
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Filter for file types - Allow only images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new Error('Only images are allowed!'), false);
    }
};

// Initialize multer with the configuration
const upload = multer({ storage: storage, fileFilter: fileFilter });

const uploadfileMulter = (req, res) => {
    try {
        upload.single('image')(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                // A multer error occurred
                return res.status(400).json({ error: err.message });
            } else if (err) {
                // Some other error occurred
                return res.status(500).json({ error: err.message });
            }

            // Image uploaded successfully, continue with your insertion logic
            const value = req.body;
            const imagePath = req.file.path; // Path to the uploaded image

            const insertdata = "INSERT INTO vehicle (type, launch_year, brand, fuel_type, color, price, rating, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            db.query(insertdata, [value.type, value.launch_year, value.brand, value.fuel_type, value.color, value.price, value.rating, value.description, imagePath], (error, result) => {
                if (error) {
                    return res.status(500).json({ error: "Database error" });
                }
                if (result) {
                    res.status(201).json({ "message": "Data inserted successfully" });
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Server error" });
    }
};










module.exports = { findAll, singleVehicleDetails, insertVehicle, updateVehicle, vehicleDelete, uploadfileMulter }