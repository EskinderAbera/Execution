import { useState, useEffect} from 'react';
import { Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import EditForm from './EditForm'

const KPI = ({kpi}) => {
    const [show, setShow] = useState(false)
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    useEffect(() => {
        handleClose()
    }, [kpi])

    return (
    <>
        <td>{kpi.perspective}</td>
        <td>{kpi.objective}</td>
        <td>{kpi.kpi_name}</td>
        <td>{kpi.kpi_weight}</td>
        <td>{kpi.kpi_target}</td>
        {kpi.kpi_unit_measurement != "Percentage" ? <td>{Math.round(kpi.actual_aggregate, 2)}</td> : <td>{parseFloat(kpi.actual_aggregate).toLocaleString(undefined, { maximumFractionDigits: 2 })}</td> }
        <td>
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        Edit
                    </Tooltip>
                }>
                <button onClick={handleShow}  className="btn text-warning btn-act" data-toggle="modal"><i className="material-icons">&#xE254;</i></button>
                </OverlayTrigger>
            <OverlayTrigger
                overlay={
                    <Tooltip id={`tooltip-top`}>
                        Delete
                    </Tooltip>
                } className="row">
                <button className="btn text-danger btn-act" data-toggle="modal"><i className="material-icons">&#xE872;</i></button>
            </OverlayTrigger>
        </td>
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
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
    </>
     
    )
}
export default KPI;
