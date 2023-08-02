import React from 'react';
import "./dashboard.scss";
import Widget from '../components/widget/widget';
import Chart from '../components/chart/Chart';
import Featured from '../components/featured/Featured';
import Table from '../components/table/Table';

 
const Dashboard = () => {
    return (
        <>
        <div className="headings"><h1> QuickView </h1></div>
          <div className="widgets">
            <div className="bestSeller"> <Widget type="BestSeller"/></div>
            <div className="lowStock"><Widget type="lowstock"/></div>
            <div className="inStock"><Widget type="instock"/></div>
            <div className="outOrder"><Widget type="out"/></div>
          </div>
          <div className="headings"><h1> Sales<t>&nbsp;</t>Insight </h1></div>
          <div className="charts">
            <Featured/>
            <Chart/>
          </div>
          <div className="listContainer">
            <div className="listTilte">Latest transactions</div>
            <Table/>
          </div>
       </>
       
    );
};
 
export default Dashboard;



