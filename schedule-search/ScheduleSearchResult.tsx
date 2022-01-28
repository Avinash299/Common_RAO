import { Pagination } from "../../components";
import { ScheduleSearchHeading } from "../../constants";
import { useState, useEffect } from 'react';

const ScheduleSearchResultPage = () => {
    const headings = ScheduleSearchHeading;
    const [result,setState]=useState([]);
    useEffect(()=>{
        setState([]);
    },[]);

    const handlePageChange=(e:any)=>{
        let {selected}=e;
        selected= selected+1;
        return result.slice((selected-1) * 10, (selected) * 10);
    }
    return (
        <div className="round-cont mb-3">
            <div className="maintenance-cont p-3">

                <div className="">
                    <table className="table maint-table">
                        <thead className="table-dark">
                            <tr>
                                {headings.map((col:any,index:number)=> {return <th scope="col" key={index}>{col}</th>})}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>District 1</td>
                                <td>103</td>
                                <td>Bakery</td>
                                <td>UNFI Dry-2</td>
                                <td>Sunday</td>
                                <td>01:00 </td>
                                <td>Tuesday</td>
                                <td>04:00 </td>
                                <td>06:00 </td>
                                <td>6/13/2021 </td>
                                <td>6/19/2021 </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="pagination-cont mt-4">
                    <nav aria-label="Page navigation example">
                        <ul className="pagination justify-content-end">
                          <Pagination pageCount={60} handlePageClick={handlePageChange}/>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )


}
export { ScheduleSearchResultPage };