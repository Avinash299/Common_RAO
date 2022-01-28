import { useState } from "react";
import { DropDown, StaticOptionsPage } from "../../components";
import { generateKey } from "../../hoc";
import { ScheduleMatrixPage } from "./ScheduleMatrixPage";

const MatrixHomePage = () => {
    const storeList: any = [];
    const vendorList: any = [];
    const [state, setState] = useState({ storeId: "", district: "" });

    const handleChange = (e: any, key: string) => {
        setState(state => ({ ...state, [key]: e }));
    }

    return (
        <div className="tab-content">
            <div className="headding-cont">
                <h2>Raley's Stores</h2>
                <p>Review store activity</p>
            </div>
            <div className="intra-cont">
                <div className="form-cont">
                    <div className="d-inline-block me-3">
                        <label className="form-label">District</label>
                        <DropDown key={generateKey()} id="district" options={vendorList} label="district" value={state.district} onChange={(e:any)=>handleChange(e,'district')}></DropDown>
                    </div>
                    <div className="d-inline-block">
                        <label className="form-label">Store</label>
                        <DropDown key={generateKey()} id="storeId" options={storeList} label="storeId" value={state.storeId} onChange={(e:any)=>handleChange(e,'storeId')}></DropDown>
                    </div>

                </div>
                <StaticOptionsPage />
            </div>
            <div className="round-cont">
                <div className="schdule-tabs">
                    <nav className="schdule-nav">
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <button className="nav-link active" id="nav-1-tab" data-bs-toggle="tab"
                                data-bs-target="#nav-1" type="button" role="tab" aria-controls="nav-1"
                                aria-selected="true">Master Schedule Matrix</button>
                            <button className="nav-link" id="nav-2-tab" data-bs-toggle="tab" data-bs-target="#nav-2"
                                type="button" role="tab" aria-controls="nav-2" aria-selected="false">Holiday Schedule Matrix</button>
                        </div>
                    </nav>
                </div>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-1" role="tabpanel" aria-labelledby="nav-1-tab">
                          <ScheduleMatrixPage/>
                    </div>
                    <div className="tab-pane fade" id="nav-2" role="tabpanel" aria-labelledby="nav-2-tab">
                        ...coming soon
                    </div>
                </div>
            </div>
        </div>

    )

}

export { MatrixHomePage };