const { json } = require("express");
const { User } = require("../models/userModel");

class apiFeatures{
    constructor(query,queryStr)
    {
        this.query=query,
        this.queryStr=queryStr,
        this.data=null
    }

    search()
    {
        let keyword=this.queryStr.keyword?{
            
                 $or:[
                    {name: { $regex: this.queryStr.keyword, $options: 'i' } },
                    {firstname:{$regex: this.queryStr.keyword, $options: 'i'}},
                    {lastname:{$regex: this.queryStr.keyword, $options: 'i'}}
                 ]
               
        }:{};

        this.query.find({...keyword})

        return this

    }

 async filter(value){
        const queryStrcpy={...this.queryStr}

        const removedFields=['keyword','page','limit','city','district']
       
            if (queryStrcpy['district']&&!queryStrcpy['city']) {
                const users= await User.find({'address.district':queryStrcpy['district']})
                value==='product'?queryStrcpy['owner'] = users.map(user=>user._id):this.data={district:queryStrcpy['district'],city:null};
            }
            if (queryStrcpy['city']&&queryStrcpy['district']) {
                const users= await User.find({'address.city':queryStrcpy['city'],'address.district':queryStrcpy['district']})
                value==='product'?queryStrcpy['owner'] = users.map(user=>user._id):this.data={district:queryStrcpy['district'],city:queryStrcpy['city']};
            }
        

        removedFields.forEach(field=>delete queryStrcpy[field])

        let queryStr=JSON.stringify(queryStrcpy)
        
        queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,match=>`$${match}`)// to add $ sign before lt,lte,gt,gte because it is a monogoDB syntax
        this.query.find(JSON.parse(queryStr))
        return this        
    }
    paginate(resultperpage)
    {
        const currentPage=Number(this.queryStr.page)||1
        const skip=resultperpage*(currentPage-1)

        this.query.limit(resultperpage).skip(skip)
        return this
    }
    


}
module.exports=apiFeatures