import { Pagination, Select } from "../../../components";
import { HistoryTableHeading } from "../../../constants";
import './ScheduleHistoryPage.css';
import { useState, useEffect } from 'react';
import { getYearList } from "../../../hoc";
import { useDispatch, useSelector } from 'react-redux';
import { scheduleActions } from "../../../actions";

const ScheduleHistoryPage = (props:any) => {
    const currYear= new Date().getFullYear();
    const {history} = useSelector((state:any)=>state.schedule);
    const storeId = props.store.storeId;
    const vendorId = props.vendor.vendorId;
    const headings: Array<any> = HistoryTableHeading;
    const [historyList, setHistoryList] = useState([]);
    const [selectedYear, setYear] = useState(currYear);
    const [totalPages, setTotalPages] = useState(0);
    const yearList: any = getYearList();
    const dispatch= useDispatch();
    let paginate={pageNo:0,limit:10,year:currYear};
    useEffect(()=>{
        dispatch(scheduleActions.getScheduleHistory({pageNo:0,limit:10,year:currYear},storeId,vendorId));
    },[dispatch,storeId,vendorId,currYear]);

    useEffect(() => {
        let totalPages= history.length ? history[0].totalPages:0;
        setTotalPages(totalPages);
        setHistoryList(history);
    }, [history]);

    const onPageChange = (e: any) => {
        const {selected}=e;
        paginate={pageNo:selected,limit:10,year:currYear}
        dispatch(scheduleActions.getScheduleHistory(paginate,storeId,vendorId));
    }

    const onChangeYear = (e: any) => {
        const value = e.target.value;
        setYear(value);
        paginate.year=value;
        dispatch(scheduleActions.getScheduleHistory(paginate,storeId,vendorId));
    }

    return (
        <div className="round-cont">
            <div className="title-sec">
                <h3 className="m-0">History</h3>

                <div className="d-inline-block">
                    <div className="label">
                        <label>History</label>
                    </div>
                    <Select name="year" label="value" defaultLabel="Select Year" labelValue="value" items={yearList} value={selectedYear} onChange={onChangeYear} />
                </div>
            </div>
            <div className="history-cont p-3">
                <table className="table maint-table">
                    <thead className="table-dark">
                        <tr>
                            {headings.map((col: any, index: number) => { return <th scope="col" key={index}>{col}</th> })}
                        </tr>
                    </thead>
                    <tbody>
                        {historyList.length === 0 && <tr><td colSpan={9}><h6 className="text-center m-3">No Data Available</h6></td></tr>}
                        {historyList.map((row: any, index: number) => {
                           return (
                                <tr key={index}>
                                    <td> {row.modifiedBy}</td>
                                    <td> {row.scheduleType}</td>
                                    <td> {row.modifiedDate}</td>
                                    <td> {row.modifiedTime}</td>
                                    <td> {row.orderDay}</td>
                                    <td> {row.fieldName}</td>
                                    <td> {row.changedFrom}</td>
                                    <td> {row.changedTo}</td>
                                </tr>
                            )}) 
                           }   
                    </tbody>
                </table>
                <div className="pagination-cont mt-2">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                            <Pagination pageCount={totalPages} handlePageClick={onPageChange} />
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export { ScheduleHistoryPage };