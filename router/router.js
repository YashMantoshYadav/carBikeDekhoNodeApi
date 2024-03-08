const express = require('express')
const router = express.Router()
const controller = require('../controller/VehicleType');
const BrandController = require('../controller/VehicleBrand');
const LaunchyearController = require('../controller/vehicleLaunchYear');
const FuelController = require('../controller/vehicleFuelType');
const ColorController = require('../controller/vehicleColor')
const VehicleController = require('../controller/vehicle')


//Vehicle Type all api Endpoing
router.get('/list',controller.allList);
router.post('/single',controller.singleData);
router.post('/addtype',controller.insertData);
router.patch('/updateType',controller.updateData);
router.delete('/deleteData',controller.deleteData);


//Vehicle Brand all api Endpoint
router.get('/braLlist',BrandController.BrandFindAll);
router.post('/singleBrand',BrandController.singleFind);
router.post('/addBrand',BrandController.brandInsert);
router.patch('/updateBrand', BrandController.brandNameUpdate);
router.delete('/deleteBrand',BrandController.deleteBrand);


//Vehicle Launch Year all api Endpoint
router.get("/yearList",LaunchyearController.FindAll);
router.post('/singleLaunchYear',LaunchyearController.singleFind);
router.post('/addYear',LaunchyearController.launchYearInsert);
router.patch('/updateLaunchYear',LaunchyearController.launchYearUpdate);
router.delete('/deleteLaunchYear',LaunchyearController.deleteLaunchYear)


//Vehicle Fuel Type all api Endpoint
router.get('/fuelList',FuelController.findAll);
router.post('/singleFuelType', FuelController.get_singleFuelType);
router.post('/addFuel', FuelController.FuelTypeInsert);
router.patch('/updateFuel', FuelController.fuelTypeUpdate);
router.delete('/deleteFuelType', FuelController.deleteFuelType)


//Vehicle color all api Endpoint
router.get('/colorList',ColorController.findall);
router.post('/colorSingleFind',ColorController.singleFind);
router.post('/addColor',ColorController.insertColorType);
router.patch('/updateColor',ColorController.updateColor);
router.delete('/deleteColor',ColorController.deleteColor);


//vehicle all apii for client side
router.get('/vehicleList',VehicleController.findAll);
router.post('/singleVehicleDetails',VehicleController.singleVehicleDetails);
router.post('/insertVehicle',VehicleController.insertVehicle);
// router.post('/upload',VehicleController.uploadfileMulter)
router.patch('/updateVehicle',VehicleController.updateVehicle);
router.delete('/deleteVehicle',VehicleController.vehicleDelete)




module.exports = router