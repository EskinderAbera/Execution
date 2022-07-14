import { useState, useEffect} from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm'
import DetailForm from './DetailForm';
import { useAPI } from "../contexts/KPIContext";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const KPI = ({kpi}) => {
    const [show, setShow] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const showDetail = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);
    const {deleteKpi,numberofMonthsLeft,changeNumberofMonthsLeft} = useAPI();


    const handleDelete = (kpi_id) => {
            {deleteKpi(kpi_id)}
        <div>
            {toast.info("You have deleted KPI Successfully!")};
            <ToastContainer />
        </div>
    }
    

    useEffect(() => {
        handleClose()
        // changeNumberofMonthsLeft(kpi.kpi_months_left);
    }, [kpi])

    return (
    <>
        <td>{kpi.perspective}</td>
        <td>{kpi.objective}</td>
        <td>{kpi.kpi_name}</td>
        <td>{kpi.kpi_weight}</td>
        <td>{ kpi.kpi_unit_measurement === "Percentage" ? kpi.kpi_target.toFixed(2) : kpi.kpi_target }</td>
        <td>
            <div style={{display:"flex", flexDirection:"row" }}>

            {/* <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                    Detail
                    </Tooltip>
                }>
                <button onClick={showDetail} className="btn  btn-act row" data-toggle="modal"><i className="material-symbols-outlined">visibility</i></button>
            </OverlayTrigger> */}

            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        Edit
                    </Tooltip>
                }>
                <button onClick={handleShow}  className="btn text-warning btn-act row" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`} >
                        <span style={{color:'orange'}}>months left </span>
                    </Tooltip>
                }>
                <button className="btn  btn-act row" style={{color:"black", marginLeft: '10px'}} data-toggle="modal">{kpi.numberOfmonthsLeft}</button>
            </OverlayTrigger>
            
            </div>
            
        </td>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    Edit KPI
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <EditForm theEmployee={kpi} />
            </Modal.Body>
            <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close Button
                    </Button>
            </Modal.Footer>
        </Modal>

        <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header>
            <Modal.Title>
                {kpi.kpi_name}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DetailForm theEmployee={kpi} />
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal>
    </>
     
    )
}
export default KPI;
