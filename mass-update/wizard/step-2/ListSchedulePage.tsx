
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CurrentScheduleTable } from '../../../schedule/utils/ScheduleUtils';
import './ListSchedulePage.css';

const ListSchedulesPage = () => {
    const { weeklyScheduleList } = useSelector((state: any) => state.schedule);
    const [scheduleList, setState] = useState<Array<any>>([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [selectedStore, setSelectedStore] = useState(0);

    const handleChange = (e: any, storeId: any) => {
        setSelectedStore(storeId);
    }

    const toggleAccordion = (index: number) => {
        setActiveIndex(index);
    }

    useEffect(() => {
        setState(weeklyScheduleList);
    }, [weeklyScheduleList]);

    useEffect(() => {
        if (scheduleList.length) {
            scheduleList.forEach((row, index) => {
                CurrentScheduleTable({ result: row.result, parentId: "scheduleTable" + index, childId: "table-schedule" + index });
            });
        }
    }, [scheduleList]);


    return (
        <div>
            <div className="mupdate-status">
                <div className="leftcont">
                    <p className="text-title "><span>Store : </span><label
                        className="value text-primary">102</label></p>
                    <p className="text-title "><span>Vendor : </span><label className="value  text-primary">UNFI
                        Dry
                        -
                        2</label></p>
                    <p className="text-title "><span>Schedule : </span><label
                        className="value  text-primary">Thanksgiving -
                        2021</label></p>
                </div>
                <div className="rightcont">
                    <p className="text-title "><span>Effective Date : </span><label
                        className="value  text-primary">06/27/2021</label></p>
                    <p className="text-title "><span>End Date : </span><label
                        className="value text-primary">06/27/2021</label></p>
                </div>
            </div>
            <div className="">
                <div className="accordion" id="schedule-list">

                    {scheduleList.length === 0 && <h6 className="text-center mt-4 nodata-cont">No Data Available</h6>}
                    {scheduleList && scheduleList.map((row: any, index: number) => {
                        return (
                            <div className="accordion-item " id={"heading" + (index + 1)} key={index}>
                                <input className="chkbox-select me-5" type="checkbox" checked={selectedStore === row.storeId} onChange={(e) => handleChange(e, row.storeId)} />
                                <h2 className="accordion-header" id={"heading" + (index + 1)} onClick={() => toggleAccordion(index)}>
                                    <button className={(index === activeIndex) ? "accordion-button" : "accordion-button collapsed"} type="button" data-bs-toggle="collapse" data-bs-target={"#collapse" + (index + 1)} aria-expanded={(index === activeIndex) ? "true" : "false"} aria-controls={"collapse" + (index + 1)}>
                                        <span className="ms-5"><label className="acc-label">Store: </label> <label className="acc-value">{row.storeId}</label></span>
                                        <span className="ms-5"><label className="acc-label">Vendor: </label> <label className="acc-value">{row.vendor}</label></span>
                                    </button>
                                </h2>
                                <div id={"collapse" + (index + 1)} className={(index === activeIndex) ? "accordion-collapse collapse show" : "accordion-collapse collapse"} aria-labelledby={"heading" + (index + 1)} data-bs-parent="#schedule-list">
                                    <div className="accordion-body p-0">
                                        <div className="weekly-table-cont" id={"scheduleTable" + index}>
                                        </div>
                                    </div>
                                </div>
                            </div>)
                    })}

                </div>
            </div>

        </div>
    );
}

export { ListSchedulesPage };