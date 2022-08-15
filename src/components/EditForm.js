import { useAPI } from "../contexts/KPIContext";
import { useState, useRef } from 'react';
import axios from "axios";
import { url } from "./Constants";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Months from "./months";
import { Spinner, Button } from "react-bootstrap";

const EditForm = ({theEmployee}) => {
    const kpi_id = theEmployee.kpi_id
    const [load, setLoad] = useState(false)

    const { updateKpi, month, actual, changeActual,changeMonth, setKpis, setLoading, base, department} = useAPI();
    const [kpi_name, setKpiName] = useState(theEmployee.kpi_name)
    const [perspective, setKpiPerspective] = useState(theEmployee.perspective)
    const [objective, setKpiObjective] = useState(theEmployee.objective)
    const [kpi_weight, setKpiWeight] = useState(theEmployee.kpi_weight)
    const [kpi_target, setKpiTarget] = useState(theEmployee.kpi_target)
    const [kpi_unit_measurement, setKpiUnit] = useState(theEmployee.kpi_unit_measurement)
    let perspective_name = theEmployee.perspective_name
    let objective_name = theEmployee.objective_name
    // const [January, setJanuary] = useState(theEmployee.January)
    // const [February, setFebruary] = useState(theEmployee.February)
    // const [March, setMarch] = useState(theEmployee.March)
    // const [April, setApril] = useState(theEmployee.April)
    // const [May, setMay] = useState(theEmployee.May)
    // const [June, setJune] = useState(theEmployee.June)
    // const [July, setJuly] = useState(theEmployee.July)
    // const [August, setAugust] = useState(theEmployee.August)
    // const [September, setSeptember] = useState(theEmployee.September)
    // const [October, setOctober] = useState(theEmployee.October)
    // const [November, setNovember] = useState(theEmployee.November)
    // const [December, setDecember] = useState(theEmployee.December)
    
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
        <div>
            {toast.info("You have edited KPI Successfully!")
            };
            <ToastContainer />
        </div>
    }
    
    const editKpi =  () => {
        setLoad(true)
        if(month === "January"){
            var datas = {
                "January": actual,
            }
            // theEmployee.January = actual
            january.current = actual
            January = january.current
            // setJanuary(actual)
        }else if(month === "February"){
            datas = {
                "February": actual
            }
            february.current = actual
            February = february.current
            // setFebruary(actual)
        }else if(month === "March"){
            datas = {
                "March": actual
            }
            march.current = actual
            March = march.current
            // setMarch(actual)
        }else if(month === "April"){
            datas = {
                "April":actual
            }
            april.current = actual
            April = april.current
            // setApril(actual)
        }else if(month === "May"){
            datas = {
                "May":actual
            }
            may.current = actual
            May = may.current
            // setMay(actual)
        }else if(month === "June"){
            datas = {
                "June":actual
            }          
            june.current = actual
            June = june.current
            // setJune(actual)
        }else if(month === "July"){
            datas = {
                "July":actual
            }
            july.current = actual
            July = july.current
            // setJuly(actual)
        }else if(month === "August"){
            datas = {
                "August":actual
            }
            august.current = actual
            August = august.current
            // setAugust(actual)
        }else if(month === "September"){
            datas = {
                "September":actual
            }
            
            september.current = actual
            September = september.current
            // setSeptember(actual)
        }else if(month === "October"){
            datas = {
                "October":actual
            }
            october.current = actual
            October = october.current
            // setOctober(actual)
        }else if(month === "November"){
            datas = {
                "November":actual
            }
            november.current = actual
            November = november.current
            // setNovember(actual)
        }else {
            datas = {
                "December":actual
            }
            december.current = actual
            December = december.current
            // setDecember(actual)
        }

        let numberOfmonthsLeft = parseInt(theEmployee.numberOfmonthsLeft) - 1
        numberOfmonthsLeft = numberOfmonthsLeft.toString()
        
        const updatedKpi = { kpi_id, kpi_name, perspective, objective, kpi_weight, kpi_target, kpi_unit_measurement,January,February,March,April,May,June,July,August,September,October,November,December, numberOfmonthsLeft, perspective_name, objective_name };
        axios
        .post(`https://pms-apis.herokuapp.com/bsc/add/kpi/${theEmployee.kpi_id}/`, datas)
        .then((response) => {
            if (response.status === 200) {
                handleSuccess(response.data);
                updateKpi(theEmployee.kpi_id, updatedKpi)
                changeActual(0);
            }
        })
        .catch((error) => {
            handleError(error.response.data['Error']);
            setLoad(false)
            changeActual(0);
        });
    }

    return (
        <div>
            <Months theEmployee={theEmployee} monthName={months} monthSet={month}/>
            <div className="form-group" style={{textAlign: "right"}}>

            {load ? 
                (
                  <Spinner
                    style={{ marginBottom: 27 }}
                    animation="border"
                    variant="primary"
                  /> 
                )
                :
                <Button disabled={load ? true : false} onClick={editKpi}>
                    Edit KPI
                </Button>
            }
            </div>
        </div>                      

    )

}
export default EditForm;