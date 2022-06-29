import { Button } from "react-bootstrap"
import { useAPI } from "../contexts/KPIContext";
import { useState } from 'react';
import axios from "axios";
import { url } from "./Constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditForm = ({theEmployee}) => {
    const kpi_id = theEmployee.kpi_id
    const [actual, setActual] = useState("")
    const [month, setMonth] = useState("")
    const [kpi_name, setKpiName] = useState(theEmployee.kpi_name)
    const [perspective, setKpiPerspective] = useState(theEmployee.perspective)
    const [objective, setKpiObjective] = useState(theEmployee.objective)
    const [kpi_weight, setKpiWeight] = useState(theEmployee.kpi_weight)
    const [kpi_target, setKpiTarget] = useState(theEmployee.kpi_target)
    const [kpi_unit_measurement, setKpiUnit] = useState(theEmployee.kpi_unit_measurement)

    const { updateKpi } = useAPI();
    const updatedKpi = { kpi_id, kpi_name, perspective, objective, kpi_weight, kpi_target, kpi_unit_measurement};


    const handleError = (error) => {
        <div>
        {toast.warning(error)};
        <ToastContainer />
      </div>
    }

    const handleSuccess = (data) => {
        <div>
            {toast.info("You have edited KPI Successfully!")};
            <ToastContainer />
        </div>
    }
    
    const editKpi =  () => {
        if(month === "January"){
            var datas = {
                "January": actual,
            }
            theEmployee.January = actual
        }else if(month === "February"){
            datas = {
                "February": actual
            }
        }else if(month === "March"){
            datas = {
                "March": actual
            }
        }else if(month === "April"){
            datas = {
                "April":actual
            }
        }else if(month === "May"){
            datas = {
                "May":actual
            }
        }else if(month === "June"){
            datas = {
                "June":actual
            }
        }else if(month === "July"){
            datas = {
                "July":actual
            }
        }else if(month === "August"){
            datas = {
                "August":actual
            }
        }else if(month === "September"){
            datas = {
                "September":actual
            }
        }else if(month === "October"){
            datas = {
                "October":actual
            }
        }else if(month === "November"){
            datas = {
                "November":actual
            }
        }else {
            datas = {
                "December":actual
            }
        }
        
        axios
        .post(`${url}/add/actual/kpi/${theEmployee.kpi_name}/`, datas)
        // .post(`${baseURL}/add/actual/kpi/zubla/`, datas)
        .then((response) => {
            if (response.status === 200) {
                handleSuccess(response.data);
                updateKpi(theEmployee.kpi_id, updatedKpi)
            }
        })
        .catch((error) => {
            handleError(error.response.data['Error']);
          });
    }
        
        const handleSubmit = (e) => {
        e.preventDefault();
        editKpi();
    }

    function getOptions() {
        
        if(theEmployee.January > "0"){
            return (
            document.getElementById("month").innerHTML = 
                "<option>----</option>"+
                "<option >February</option>"+
                "<option >March</option>"+
                "<option >April</option>"+
                "<option >May</option>"+
                "<option >June</option>"+
                "<option >July</option>"+
                "<option >August</option>"+
                "<option >September</option>"+
                "<option >October</option>"+
                "<option >November</option>"+
                "<option >December</option>"
            )
          
        } else if (theEmployee.February > 0) {
            return (
            document.getElementById("month").innerHTML = 
            "<option>----</option>"+
            "<option >March</option>"+
            "<option >April</option>"+
            "<option >May</option>"+
            "<option >June</option>"+
            "<option >July</option>"+
            "<option >August</option>"+
            "<option >September</option>"+
            "<option >October</option>"+
            "<option >November</option>"+
            "<option >December</option>"
            )
        } else if (theEmployee.March > 0) {
            return (
            document.getElementById("month").innerHTML = 
            "<option>----</option>"+
            "<option >April</option>"+
            "<option >May</option>"+
            "<option >June</option>"+
            "<option >July</option>"+
            "<option >August</option>"+
            "<option >September</option>"+
            "<option >October</option>"+
            "<option >November</option>"+
            "<option >December</option>"
            )
        } else if(theEmployee.April > 0) {
            return (
            document.getElementById("month").innerHTML = 
            "<option>----</option>"+
            "<option >May</option>"+
            "<option >June</option>"+
            "<option >July</option>"+
            "<option >August</option>"+
            "<option >September</option>"+
            "<option >October</option>"+
            "<option >November</option>"+
            "<option >December</option>"
            )
        } else if (theEmployee.May > 0) {
            return (
            document.getElementById("month").innerHTML = 
            "<option>----</option>"+
            "<option >June</option>"+
            "<option >July</option>"+
            "<option >August</option>"+
            "<option >September</option>"+
            "<option >October</option>"+
            "<option >November</option>"+
            "<option >December</option>"
            )
        } else if(theEmployee.June > 0) {
            return (
            document.getElementById("month").innerHTML = 
            "<option>----</option>"+
            "<option >July</option>"+
            "<option >August</option>"+
            "<option >September</option>"+
            "<option >October</option>"+
            "<option >November</option>"+
            "<option >December</option>"
            )
        } else if(theEmployee.July > 0) {
            return(
            document.getElementById("month").innerHTML = 
            "<option>----</option>"+
            "<option >August</option>"+
            "<option >September</option>"+
            "<option >October</option>"+
            "<option >November</option>"+
            "<option >December</option>"
            )
        } else if(theEmployee.August > 0) {
            return(
            document.getElementById("month").innerHTML = 
            "<option>----</option>"+
            "<option >September</option>"+
            "<option >October</option>"+
            "<option >November</option>"+
            "<option >December</option>"
            )
        } else if(theEmployee.September > 0) {
            return (
            document.getElementById("month").innerHTML = 
            "<option>----</option>"+
            "<option >October</option>"+
            "<option >November</option>"+
            "<option >December</option>"
            )
        } else if(theEmployee.October > 0) {
            return(
            document.getElementById("month").innerHTML = 
            "<option>----</option>"+
            "<option >November</option>"+
            "<option >December</option>"
            )
        } else if(theEmployee.November > 0) {
            return(
            "<option>----</option>"+
            "<option >December</option>"
            )
        } else {
            return (
            document.getElementById("month").innerHTML =
            "<option>----</option>"+
            "<option value='January'>January</option>"+
            "<option value='February'>February</option>"+
            "<option value='March'>March</option>"+
            "<option value='April'>April</option>"+
            "<option value='May'>May</option>"+
            "<option value='June'>June</option>"+
            "<option value='July'>July</option>"+
            "<option value='August'>August</option>"+
            "<option value='September'>September</option>"+
            "<option value='October'>October</option>"+
            "<option value='November'>November</option>"+
            "<option value='December'>December</option>"
            )
        }
        
    }

    return (
        <div id="addKPI">
				<form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <h2>{theEmployee.kpi_name}</h2>
                    </div>
                        <label>Month</label><br/>
                        <select id="month"  onFocus = {() => getOptions()} onChange={(e) => setMonth(e.target.value)}>
                            <option>------</option>
                        </select>
                    <div className="form-group">
                        <label>Enter Actual Value</label>
                        <input id="actual" 
                               required
                               type="text" 
                               className="form-control"
                               name="actual"
                               value={actual}
                               onChange = {(e) => setActual(e.target.value)}
                        /> 
                    </div>
                    <div className="form-group" style={{textAlign: "right"}}>
                        <Button variant="success" type="submit" block="true">
                            Edit KPI
                        </Button>
                    </div>
						
				</form>
			</div>
    )

}
export default EditForm;