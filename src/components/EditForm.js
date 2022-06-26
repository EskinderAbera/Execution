import { Button } from "react-bootstrap"
import { useAPI } from "../contexts/KPIContext";
import { useState } from 'react';
import axios from "axios";
import { url } from "./Constants";


const EditForm = ({theEmployee}) => {
    const kpi_id = theEmployee.kpi_id
    const [isDisabled, setIsDisabled] = useState(true)
    const [January, setJanuary] = useState("0")
    const [February, setFebruary] = useState("0")
    const [March, setMarch] = useState("0")
    const [April, setApril] = useState("0")
    const [May, setMay] = useState("0")
    const [June, setJune] = useState("0")
    const [July, setJuly] = useState("0")
    const [August, setAugust] = useState("0")
    const [September, setSeptember] = useState("0")
    const [October, setOctober] = useState("0")
    const [November, setNovember] = useState("0")
    const [December, setDecember] = useState("0")

    const { updateKpi } = useAPI();
    const updatedKpi = {kpi_id, January, February, March, April, May, June, July, August, September, October, November, December};

    const editKPI = async () => {     
        var datas = {
            "January": January,
            "February" : February,
            "March" : March,
            "April" : April,
            "May": May,
            "June" : June,
            "July" : July,
            "August" : August,
            "September" : September,
            "October" : October,
            "November" : November,
            "December" : December
        }
        axios
        .post(`${url}/add/actual/kpi/${theEmployee.kpi_name}/`, datas)
        .then((response) => {
            if (response.status === 200) {
                updateKpi(kpi_id, updatedKpi)
            }
        })
        .catch((error) => {
            alert(error.response.data['Error']);
          });
    } 

    const handleSubmit = (e) => {
        e.preventDefault();
        editKPI();
    }

    return (
        <div id="addKPI">
				<form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>KPI NAME</label>
                        <input id="kpi"
                                type="text" 
                                className="form-control" 
                                name="kpi_name" 
                                // value={theEmployee.kpi_name} 
                                disabled
                                />
                    </div>
                    <div className="form-group">
                        <label>January</label>
                        <input id="kpi"
                                type="text" 
                                className="form-control" 
                                name="January" 
                                // value={January}
                                onChange = {(e) => setJanuary(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>February</label>
                        <input id="kpi" 
                                type="text" 
                                className="form-control" 
                                name="February" 
                                // value={February}
                                onChange = {(e) => setFebruary(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>March</label>
                        <input id="kpi" 
                                type="text" 
                                className="form-control" 
                                name="March" 
                                // value={March}
                                onChange = {(e) => setMarch(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>April</label>
                        <input id="kpi"
                                type="text" 
                                className="form-control" 
                                name="April" 
                                // value={April}
                                onChange = {(e) => setApril(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>May</label>
                        <input id="kpi"
                                type="text" 
                                className="form-control" 
                                name="May" 
                                // value={May}
                                onChange = {(e) => setMay(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>June</label>
                        <input id="kpi"
                                type="text" 
                                className="form-control" 
                                name="June" 
                                // value={June}
                                onChange = {(e) => setJune(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>July</label>
                        <input id="kpi" 
                                type="text" 
                                className="form-control" 
                                name="July" 
                                // value={July}
                                onChange = {(e) => setJuly(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>August</label>
                        <input id="kpi" 
                                type="text" 
                                className="form-control" 
                                name="August" 
                                // value={August}
                                onChange = {(e) => setAugust(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>September</label>
                        <input id="kpi" 
                                type="text" 
                                className="form-control" 
                                name="September" 
                                // value={September}
                                onChange = {(e) => setSeptember(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>October</label>
                        <input id="kpi" 
                                type="text" 
                                className="form-control" 
                                name="October" 
                                // value={October}
                                onChange = {(e) => setOctober(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>November</label>
                        <input id="kpi" 
                                type="text" 
                                className="form-control" 
                                name="November" 
                                // value={November}
                                onChange = {(e) => setNovember(e.target.value)}
                                />
                    </div>
                    <div className="form-group">
                        <label>December</label>
                        <input id="kpi" 
                                type="text" 
                                className="form-control" 
                                name="December" 
                                // value={December}
                                onChange = {(e) => setDecember(e.target.value)}
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