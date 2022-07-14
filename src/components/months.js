
import React from "react";
import { useAPI } from "../contexts/KPIContext";

function Months (props){
    const {actual, changeActual, changeMonth,month, changeNumberofMonthsLeft} = useAPI();
    var arr = props.monthName;
    for(var i =0; i<arr.length; i++){
        if(props.theEmployee[arr[i]] >'0'){
            
            arr.splice(i,1);
            i=-1;
            
        }
    } 
    
    return     <div id="addKPI">
                    <div className="form-group">
                        <h4>{props.theEmployee.kpi_name}</h4>
                    </div>
                    <div>
                        <label>Month</label><br/>
                        <select id="month" onChange={(e) => changeMonth(e.target.value)}> 
                        <option defaultValue>Select</option>
                        {
        arr.map((item) => (
            
                        <option key={item}>{item}</option>
                        )
        )
                    }
                    </select>
                        </div>
                    <div className="form-group">
                        <label>Enter Actual Value</label>
                        <input id="actual" 
                               required
                               type="text" 
                               className="form-control"
                               name="actual"
                               value={actual}
                               onChange = {(e) => changeActual(e.target.value)}
                        /> 
                    </div>
                   
			</div>
            
        
  
    
    
    
}
export default Months