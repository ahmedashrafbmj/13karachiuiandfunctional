///booking add data
const areaModel  = require('../Model/areaSchema');

const authareadata = (req, res)=>{
    
    

    let areapostCreate = new areaModel({

        areaName: req.body.areaName, 
        userEmail: req.body.userEmail,
        hotelname: req.body.hotelname,


    })
    
    areapostCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "Area Data Successfully"})

        console.log(areapostCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "Area Data Not Successfully"})
    })

}


// //getsingleuserid

// const getcatid = async(req, res)=>{
//     try {
//         console.log(req.params);
//         const {id} = req.params;

//         const userindividual = await categoryModel.findById({_id:id});
//         console.log(userindividual);
//         res.status(201).json(userindividual)

//     } catch (error) {
//         res.status(422).json(error);
//     }
// }


// // delete cat
// const deletecat = async(req,res)=>{
//     try {
//         const {id} = req.params;

//         const deletsignupuser = await categoryModel.findByIdAndDelete({_id:id})
//         console.log(deletsignupuser);
//         res.status(201).json(deletsignupuser);

//     } catch (error) {
//         res.status(422).json(error);
//     }
// }



// // update user data

// const catupdate = async(req,res)=>{
//     try {
//         const {id} = req.params;

//         const updateduser = await categoryModel.findByIdAndUpdate(id,req.body,{
//             new:true
//         });

//         console.log(updateduser);
//         res.status(201).json(updateduser);

//     } catch (error) {
//         res.status(422).json(error);
//     }
// }


//get all area data

const getallarea = async(req, res)=>{
    const allgetarea = await areaModel.find();
    res.json(allgetarea);

}



module.exports = {authareadata, getallarea}