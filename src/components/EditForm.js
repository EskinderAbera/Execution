import { Button } from "react-bootstrap"
import { useAPI } from "../contexts/KPIContext";
import { useState, useRef } from 'react';
import axios from "axios";
import { baseUrl, url } from "./Constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Months from "./months";

const EditForm = ({theEmployee}) => {
    const kpi_id = theEmployee.kpi_id
    const { updateKpi, month, actual, changeActual,changeMonth, setKpis, setLoading, base} = useAPI();
    const [kpi_name, setKpiName] = useState(theEmployee.kpi_name)
    const [perspective, setKpiPerspective] = useState(theEmployee.perspective)
    const [objective, setKpiObjective] = useState(theEmployee.objective)
    const [kpi_weight, setKpiWeight] = useState(theEmployee.kpi_weight)
    const [kpi_target, setKpiTarget] = useState(theEmployee.kpi_target)
    const [kpi_unit_measurement, setKpiUnit] = useState(theEmployee.kpi_unit_measurement)
    const january = useRef(theEmployee.January)
    var January = january.current
    const february = useRef(theEmployee.February)
    var February = february.current
    const march = useRef(theEmployee.March)
    var March = march.current
    const april = useRef(theEmployee.April)
    var April = april.current
    const may = useRef(theEmployee.May)
    var May = may.current
    const july = useRef(theEmployee.July)
    var July = july.current
    const august = useRef(theEmployee.August)
    var August = august.current
    const september = useRef(theEmployee.September)
    var September = september.current
    const october = useRef(theEmployee.October)
    var October = october.current
    const november = useRef(theEmployee.November)
    var November = november.current
    const december = useRef(theEmployee.December)
    var December = december.current
    const june = useRef(theEmployee.June)
    var June = june.current
    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    const handleError = (error) => {
        <div>
        {toast.warning(error)};
        <ToastContainer />
      </div>
    }
    
    const handleSuccess = (data) => {
        changeMonth("");
        // async function fetchData() {
            //     const { data } = await axios.get(
                //       `https://bsc-newapi.herokuapp.com/bsc/kpi/`
                //     );
                //     setKpis(data);
                //     setLoading(false);
                //   }
                //   fetchData();
        <div>
            {toast.info("You have edited KPI Successfully!")
            };
            <ToastContainer />
        </div>
    }
    
    const editKpi =  () => {
        if(month === "January"){
            var datas = {
                "January": actual,
            }
            // theEmployee.January = actual
            january.current = actual
            January = january.current
        }else if(month === "February"){
            datas = {
                "February": actual
            }
            february.current = actual
            February = february.current
        }else if(month === "March"){
            datas = {
                "March": actual
            }
            march.current = actual
            March = march.current
        }else if(month === "April"){
            datas = {
                "April":actual
            }
            april.current = actual
            April = april.current
        }else if(month === "May"){
            datas = {
                "May":actual
            }
            may.current = actual
            May = may.current
        }else if(month === "June"){
            datas = {
                "June":actual
            }
            
            
            june.current = actual
            June = june.current
        }else if(month === "July"){
            datas = {
                "July":actual
            }
            july.current = actual
            July = july.current
        }else if(month === "August"){
            datas = {
                "August":actual
            }
            august.current = actual
            August = august.current
        }else if(month === "September"){
            datas = {
                "September":actual
            }
            
            console.log(September)
        }else if(month === "October"){
            datas = {
                "October":actual
            }
            october.current = actual
            October = october.current
        }else if(month === "November"){
            datas = {
                "November":actual
            }
            november.current = actual
            November = november.current
        }else {
            datas = {
                "December":actual
            }
            december.current = actual
            December = december.current
        }

        let numberOfmonthsLeft = parseInt(theEmployee.numberOfmonthsLeft) - 1
        numberOfmonthsLeft = numberOfmonthsLeft.toString()
        
        const updatedKpi = { kpi_id, kpi_name, perspective, objective, kpi_weight, kpi_target, kpi_unit_measurement,January,February,March,April,May,June,July,August,September,October,November,December, numberOfmonthsLeft };
        axios
        .post(`${url}/${base}/add/actual/kpi/${theEmployee.kpi_name}/`, datas)
        .then((response) => {
            if (response.status === 200) {
                handleSuccess(response.data);
                updateKpi(theEmployee.kpi_id, updatedKpi)
                changeActual(0);
            }
        })
        .catch((error) => {
            handleError(error.response.data['Error']);
            changeActual(0);
          });
    }

    return (
        <div>
                        <Months theEmployee={theEmployee} monthName={months} monthSet={month}/>
                        <div className="form-group" style={{textAlign: "right"}}>
                        <button variant="success" type="submit" block="true" onClick={editKpi}>
                            Edit KPI
                        </button>
                    </div>
                    </div>
                       
    )

}
export default EditForm;