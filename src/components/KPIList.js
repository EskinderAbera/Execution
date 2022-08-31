import React, { useState, useEffect } from "react";
import KPI from "./KPI"
import Pagination from './Pagination';
import { useAPI } from "../contexts/KPIContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import coop from '../resources/images/coop.png'
import { injectStyle } from "react-toastify/dist/inject-style";
import './KPIList.css'
import { useNavigate } from "react-router-dom";

if (typeof window !== "undefined") {
    injectStyle();
  }

const KPIList = () => {
    const { kpis } = useAPI();
	const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const navigate = useNavigate()

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(6)
    const [searchTerm, setSearchTerm] = useState('');

    const filteringkpis = kpis.filter(kpi => kpi.kpi_weight > '0');

    const [filteredKpis, setFilteredKpis] = useState(filteringkpis);
    
    useEffect(() => {
        handleClose();
    }, [kpis])

    useEffect(() => {
        
        const newkpis = filteringkpis.filter(kpi =>
          kpi.kpi_name
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
        );
        setFilteredKpis(newkpis);
        
        return (
            handleClose()
        )
      }, [searchTerm, kpis]);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredKpis.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNum = Math.ceil(filteredKpis.length / employeesPerPage);

    return (
        <>
        <header style={{marginTop: '20px', marginLeft: '0px'}}>
            <div className="container">
              <div className="logo" onClick={() => navigate('/landing')}>
                <img src={coop} alt="Logo" height="100" width="100"/>
              </div>
            </div>
        </header>
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="row g-3 align-items-center"> 
                        <div className="col-auto">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Search by kpi..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-5"></div>
                    <div className="table-title">
				        <div className="row">
					        <div className="col-sm-6">
						        <h2>Edit <b>KPIs</b></h2>
					        </div>
				        </div>
			        </div>

                    <ToastContainer />
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th>Perspective</th>
                                <th>Objective</th>
                                <th>KPI Name</th>
                                <th>KPI Weight</th>
                                <th>KPI Target</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                
                                filteredKpis.length === kpis.length ? currentEmployees.filter((kpi, index) => kpi.kpi_weight > '0').
                                    map((kpi, index) => (
                                        <tr key={kpi.kpi_id} >
                                            <KPI kpi={kpi} />
                                        </tr>
                                    )) :
                                    filteredKpis.filter((kpi, index) => kpi.kpi_weight > '0').
                                    map((kpi, index) => (
                                        <tr key={kpi.kpi_id} >
                                            <KPI kpi={kpi} />
                                        </tr>
                                    ))
                            }
                        </tbody>
                    </table>

                    <Pagination pages = {totalPagesNum}
                        setCurrentPage={setCurrentPage}
                        currentEmployees ={currentEmployees}
                        kpis = {filteredKpis} 
                    />

                </div>
            </div>
        </div>
        </>
    
    )
}
export default KPIList;