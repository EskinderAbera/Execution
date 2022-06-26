import React, { useState, useEffect } from "react";
import { Modal, Button, Alert} from 'react-bootstrap';
import KPI from "./KPI"
import Pagination from './Pagination';
import { useAPI } from "../contexts/KPIContext";


const KPIList = () => {
    const { kpis } = useAPI();
    const [loading, setLoading] = useState(false)

    const [showAlert, setShowAlert] = useState(false);
	const [show, setShow] = useState(false);

	const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage] = useState(2)

    const handleShowAlert = () => {
        setShowAlert(true);
        setTimeout(()=> {
            setShowAlert(false);
        }, 2000)
    }
    useEffect(() => {
        handleClose();

        return () => {
            handleShowAlert();
        }
    }, [kpis])

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = kpis.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPagesNum = Math.ceil(kpis.length / employeesPerPage);

    return (
        <>
        <div className="table-title">
				<div className="row">
					<div className="col-sm-6">
						<h2>Edit <b>KPIs</b></h2>
					</div>
				</div>
			</div>

            <Alert show={showAlert} variant="success">
                KPI Added Succefully!
            </Alert>
        <table className="table table-striped table-hover">
        <thead>
            <tr>
                <th>Perspective</th>
                <th>Objective</th>
                <th>KPI Name</th>
                <th>KPI Weight</th>
                <th>KPI Target</th>
                <th>Actual Aggregate</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
                {
                   
                    currentEmployees.map(kpi => (
                        <tr key={kpi.kpi_id}>
                            <KPI kpi={kpi}/>
                        </tr>
                    ))
                }
        </tbody>
        </table>

        <Pagination pages = {totalPagesNum}
                setCurrentPage={setCurrentPage}
                currentEmployees ={currentEmployees}
                kpis = {kpis} />
        </>
    )
}
export default KPIList;