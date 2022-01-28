import { useState } from "react";
import { DropDown } from "../../components";
import { generateKey } from "../../hoc";

const ScheduleMatrixPage = () => {
    const deptList: any = [];
    const [state, setState] = useState({ dept: "" });

    const handleChange = (e: any, key: string) => {
        setState(state => ({ ...state, [key]: e }));
    }
    return (
        <div>
            <div className="title-sec">
                <h5 className="m-0">Date: {"Jan 16 2021"}</h5>
                <div className="title-right align-items-center">
                    <h5 className="me-3">Department Filter:</h5> <DropDown key={generateKey()} id="dept" options={deptList} label="dept" value={state.dept} onChange={(e: any) => handleChange(e, 'dept')}></DropDown>
                </div>
            </div>
            <div className="weekly-table-cont" id="scheduleTable">

            </div>
        </div>
    )
}

export { ScheduleMatrixPage };