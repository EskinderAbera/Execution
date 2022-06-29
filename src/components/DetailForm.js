const DetailForm = ({theEmployee}) => {
    return (
    <div id="addKPI">
        <div className="form-group">
            <label>KPI Name</label>
            <h4>{theEmployee.kpi_name}</h4>
        </div><br/>
        <div className="form-group">
            <label>Perspective</label>
            <h4>{theEmployee.perspective}</h4>
        </div>
        <div className="form-group"><br/>
            <label>KPI Objective</label>
            <h4>{theEmployee.objective}</h4>
        </div>
        <div className="form-group"><br/>
            <label>KPI Weight</label>
            <h4>{theEmployee.kpi_weight}</h4>
        </div>
        <div className="form-group"><br/>
            <label>KPI Target</label>
            <h4>{theEmployee.kpi_target}</h4>
        </div>
        <div className="form-group"><br/>
            <label>KPI Aggregate</label>
            <h4>{theEmployee.aggregate}</h4>
        </div>
    </div>
    )
}
export default DetailForm;