import React, { useEffect } from "react";
import DashboardTile from "./DashboardTile";
import {useDispatch, useSelector} from 'react-redux'
import Loader from '../Loader'
import { getTotals, getTotals_per_month } from "../../actions/adminActions";
import { getMessagesList } from "../../actions/messagesAction";
import MetaData from "../Layouts/MetaData";

const Dashboard = () => {
  const dispatch=useDispatch()
  const {isLoading,Totals,datas,error}=useSelector((state)=>state.adminState)
  useEffect(()=>{
    dispatch(getTotals_per_month)
    dispatch(getTotals)
    //dispatch(getMessagesList)  
  },[])
    

const payments = datas?.payments ? Object.keys(datas.payments).map((key) => ({ key: key, value: datas.payments[key] })) : [];
const jobseekers = datas?.jobseekers ? Object.keys(datas.jobseekers).map((key) => ({ key: key, value: datas.jobseekers[key] })) : [];
const productOwners = datas?.productOwners ? Object.keys(datas.productOwners).map((key) => ({ key: key, value: datas.productOwners[key] })) : [];
const customers = datas?.customers ? Object.keys(datas.customers).map((key) => ({ key: key, value: datas.customers[key] })) : [];
const products = datas?.products ? Object.keys(datas.products).map((key) => ({ key: key, value: datas.products[key] })) : [];

  return (
    <>
   {
    isLoading?<Loader/>:
    <>
      <MetaData title={'Dashboard'}/>
    <section  className="container mt-2">
      
    <div style={{display: "flex", alignItems: "center", justifyContent: "center",marginTop:'10px'}} className="row">
          <center><u><h3>Monthly Item Counts and Totals for {new Date().getFullYear()}</h3></u></center>
      <div style={{margin: '45px'}} className="col-md-4 mb-3">
        <DashboardTile
          categoryTitle={"No of Advertisements"}
          CategotyTotalCount={Totals?.adsCount}
          graphData={products.map(item=>item.value)}
        />
      </div>
      <div style={{margin: '45px'}} className="col-md-4 mb-3">
        <DashboardTile
          categoryTitle={"No of Customers"}
          CategotyTotalCount={Totals?.cutomerCount}
          graphData={customers.map(item=>item.value)}
        />
      </div>
      <div style={{margin: '45px'}} className="col-md-4 mb-3">
        <DashboardTile
          categoryTitle={"No of Product Owners"}
          CategotyTotalCount={Totals?.productOwnerCount}
          graphData={productOwners.map(item=>item.value)}
        />
      </div>
      <div style={{margin: '45px'}} className="col-md-4 mb-3">
        <DashboardTile
          categoryTitle={"No of Job Seekers"}
          CategotyTotalCount={Totals?.jobSeekerCount}
          graphData={jobseekers.map(item=>item.value)}
        />
      </div>
      <div style={{margin: '45px'}} className="col-md-4 mb-3">
        <DashboardTile
          categoryTitle={"No of Payments"}
          CategotyTotalCount={Totals?.paymentCount}
          graphData={payments.map(item=>item.value)}
        />
      </div>
    </div>
  </section>
  </>
   }
   </>
  );
};

export default Dashboard;
