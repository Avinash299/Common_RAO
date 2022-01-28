import { useState } from 'react';
import { defaultWizard, headingList } from '../utils/DefaultState';
import './MassUpdateHomePage.css';
import { SelectSchedulesPage } from './step-1/SelectSchedulesPage';
import { ListSchedulesPage } from './step-2/ListSchedulePage';

const MassUpdateHomePage = () => {
    const [state, setState] = useState(defaultWizard);
    const [heading, setHeading] = useState(0);

    const onTabChange = (index:number) => {
        let arr = state.filter((row,idx)=>{
            if(index === idx){
                row.active=true;
                row.visited=true;
            }else{
                row.active=false;
            }
            return row;
        });
        setState(arr);
        setHeading(index); 
    };

    const getDynamicClass=(index:number)=>{
        if(state[index].active && state[index].visited){
            return "nav-link visited active";
        }else if(!state[index].active && state[index].visited){
            return "nav-link visited";
        }else{
            return "nav-link";
        }
    }


    return (
        <div>
            <div className="headding-cont">
                <h2>{headingList[heading]}</h2>
                <p className="hsuptext">Mass Update for existing schedules</p>
            </div>
            <div className="wizard-cont">
                <div className="wizard-nav-cont">
                    <ul className="nav nav-pills mb-3 wizardul" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation" onClick={()=>onTabChange(0)}>
                            <button className={getDynamicClass(0)} id="pills-massupdate-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-massupdate" type="button" role="tab"
                                aria-controls="pills-massupdate" aria-selected="true">
                                <span className="line"></span><span className="bullet"></span>Mass
                                update</button>
                        </li>

                        <li className="nav-item" role="presentation" onClick={()=>onTabChange(1)}>
                            <button className={getDynamicClass(1)} id="pills-Reference-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-Reference" type="button" role="tab"
                                aria-controls="pills-Reference" aria-selected="false">
                                <span className="line"></span><span className="bullet"></span>
                                Reference</button>
                        </li>
                        <li className="nav-item" role="presentation" onClick={()=>onTabChange(2)}>
                            <button className={getDynamicClass(2)} id="pills-tobe-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-tobe" type="button" role="tab" aria-controls="pills-tobe"
                                aria-selected="false">
                                <span className="line"></span> <span className="bullet"></span> To Be
                            </button>
                        </li>
                        <li className="nav-item" role="presentation" onClick={()=>onTabChange(3)}>
                            <button className={getDynamicClass(3)} id="pills-preview-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-preview" type="button" role="tab"
                                aria-controls="pills-preview" aria-selected="false">
                                <span className="line"></span> <span className="bullet"></span>Preview
                            </button>
                        </li>

                        {/* <li className="nav-item" role="presentation" onClick={()=>onTabChange(4)}>
                            <button className={getDynamicClass(4)} id="pills-updated-tab" data-bs-toggle="pill"
                                data-bs-target="#pills-updated" type="button" role="tab"
                                aria-controls="pills-updated" aria-selected="false">
                                <span className="line"></span> <span className="bullet"></span>Updated
                            </button>
                        </li> */}
                    </ul>
                </div>
                <div className="tab-content" id="pills-tabContent">
                    <div className={state[0].active ? "tab-pane fade show active":"tab-pane fade"} id="pills-massupdate" role="tabpanel"
                        aria-labelledby="pills-massupdate-tab">
                         <SelectSchedulesPage onSearch={()=>onTabChange(1)}/>
                    </div>
                    <div className={state[1].active ? "tab-pane fade show active":"tab-pane fade"} id="pills-Reference" role="tabpanel"
                        aria-labelledby="pills-Reference-tab">
                       <ListSchedulesPage/>
                        </div>
                    <div className={state[2].active ? "tab-pane fade show active":"tab-pane fade"} id="pills-tobe" role="tabpanel" aria-labelledby="pills-tobe-tab">
                        3</div>
                    <div className={state[3].active ? "tab-pane fade show active":"tab-pane fade"} id="pills-preview" role="tabpanel"
                        aria-labelledby="pills-preview-tab">
                        4</div>
                    {/* <div className="tab-pane fade" id="pills-updated" role="tabpanel"
                        aria-labelledby="pills-updated-tab">
                        5</div> */}
                </div>
            </div>
        </div>

    );
}

export { MassUpdateHomePage };