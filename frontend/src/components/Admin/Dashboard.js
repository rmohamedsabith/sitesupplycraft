import React from "react";
import DashboardTile from "./DashboardTile";

const Dashboard = () => {
  return (
    <section className="container mt-2">
      <div className="row">
        <div style={{margin: '45px'}} className="col-md-4 mb-3">
          <DashboardTile
            categoryTitle={"Advertisements"}
            CategotyTotalCount={1780}
            graphData={[0, 10, 98, 45, 68, 159, 254, 65, 45, 36, 98, 45]}
          />
        </div>
        <div style={{margin: '45px'}} className="col-md-4 mb-3">
          <DashboardTile
            categoryTitle={"Customers"}
            CategotyTotalCount={521}
            graphData={[0, 35, 89, 45, 12, 69, 75, 12, 66, 57, 41, 57]}
          />
        </div>
        <div style={{margin: '45px'}} className="col-md-4 mb-3">
          <DashboardTile
            categoryTitle={"Product Owners"}
            CategotyTotalCount={120}
            graphData={[0, 2, 10, 9, 5, 7, 20, 32, 5, 12, 32, 34]}
          />
        </div>
        <div style={{margin: '45px'}} className="col-md-4 mb-3">
          <DashboardTile
            categoryTitle={"Job Seekers"}
            CategotyTotalCount={35}
            graphData={[0, 1, 2, 1, 4, 5, 6, 3, 9, 7, 4, 1]}
          />
        </div>

        <div style={{margin: '45px'}} className="col-md-4 mb-3">
          <DashboardTile
            categoryTitle={"Payments"}
            CategotyTotalCount={44}
            graphData={[0, 2, 8, 6, 4, 1, 8, 9, 9, 5, 2, 4]}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
