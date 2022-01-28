import { DropDown } from "../../../../components";
import { generateKey } from "../../../../hoc";
import { useState } from 'react';
import './SelectSchedulesPage.css';

const SelectSchedulesPage = (props: any) => {
    const [state, setState] = useState({ schedule: "", district: "" });

    const handleChange = (e: any, key: string) => {
        setState(state => ({ ...state, [key]: e }));
    }

    return (
        <div className="round-cont">
            <div className="intra-cont p-3">
                <div className="form-cont">
                    <div className="d-inline-block me-5">
                        <label className="form-label">Schedule<span>*</span></label>
                        <DropDown key={generateKey()} id="schedule" options={[]} label="schedule" value={state.schedule} onChange={(e: any) => handleChange(e, 'schedule')}></DropDown>
                    </div>
                    <div className="d-inline-block">
                        <label className="form-label">District (Optional)</label>
                        <DropDown key={generateKey()} id="district" options={[]} label="district" value={state.district} onChange={(e: any) => handleChange(e, 'district')}></DropDown>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-6">

                </div>
                <div className="col-6">

                </div>
            </div>
            <div className="btn-cont text-center mt-3 pt-4">
                <button type="button" className="btn btn-primary" id="search-btn" onClick={() => props.onSearch(1)} disabled={false}>Search</button>
            </div>
        </div>
    );
}

export { SelectSchedulesPage };