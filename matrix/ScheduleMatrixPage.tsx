import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DropDown } from "../../components";
import { MatrixHeading, MtxSubHeading } from "../../constants";
import { generateKey } from "../../hoc";
import { searchMatrixActions } from '../../actions/search-matrix.actions';
import { filterMatrixList } from "./MatrixUtil";

const ScheduleMatrixPage = (props: any) => {
    const { storeId, district } = props;
    const { matrixResult } = useSelector((state: any) => state.searchMatrix);
    const [deptList, setDeptList] = useState<Array<any>>([])
    const [state, setState] = useState({ dept: { majorDepartment: "All Departments" } });
    const [filterResult, setFilterResult] = useState<Array<any>>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (storeId) {
            dispatch(searchMatrixActions.getMatrixResult(storeId, district));
        }
    }, [dispatch, storeId, district]);

    useEffect(() => {
        const depts = matrixResult.map(function (el: any) { return { majorDepartment: el.department }; });
        depts.unshift({ majorDepartment: "All Departments" });
        setDeptList(depts);
        setFilterResult(matrixResult);
    }, [matrixResult]);

    const handleChange = (e: any, key: string) => {
        setState(state => ({ ...state, [key]: e }));
        setFilterResult(filterMatrixList(matrixResult, e.majorDepartment));
    }

    const groupItems = function (arr: any, key: string) {
        let list = arr.reduce(function (rv: any, x: any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
        return list;
    };

    return (
        <div>
            <div className="title-sec">
                <p className="text-title-filter m-0">Date: {moment().format('LL')}</p>
                <div className="title-right margin-btm">
                    <span className="text-title-filter">Department Filter : </span>
                    <DropDown key={generateKey()} id="majorDepartment" options={deptList} label="majorDepartment" value={state.dept} onChange={(e: any) => handleChange(e, 'dept')}></DropDown>
                </div>
            </div>
            <div className="container-fluid pb-3" id="matrixTable">
                <div className="print-table" id="matrixDiv">
                    <table className="table table-bordered" id='matrix-tbl'>
                        <thead>
                            <tr className="orderday" key={generateKey()}>
                                {MatrixHeading.map((head, index) => {
                                    return (<th scope="col" key={generateKey()} colSpan={index === 0 ? 1 : 2}>{head}</th>)
                                })}
                            </tr>
                            <tr className="order-head" key={generateKey()}>
                                <td key={generateKey()}>Department / Vendor</td>
                                {MtxSubHeading.map((elm: any) => {
                                    return (<td key={generateKey()}>{elm}</td>)
                                })}
                            </tr>
                        </thead>
                        {filterResult.map((item: any) => {
                            return (
                                <tbody key={generateKey()}>
                                    <tr key={generateKey()} className="deparment-row">
                                        <td colSpan={15} key={generateKey()}>{item.department}</td>
                                    </tr>
                                    {
                                        Object.keys(groupItems(item.list, 'vendor')).map((key: any) => {
                                            return (
                                                groupItems(item.list, 'vendor')[key].map((data: any) => {
                                                    return (
                                                        <tr key={generateKey()} className="product">
                                                            <td key={generateKey()} width="120px">{data.vendor}</td>

                                                            <td key={generateKey()} width="50px">{data.orderDay === 'Sunday' ? data.orderCutoff : ""}</td>
                                                            <td key={generateKey()} width="75px">{data.orderDay === 'Sunday' ? data.delivery : ""}</td>

                                                            <td key={generateKey()} width="50px">{data.orderDay === 'Monday' ? data.orderCutoff : ""}</td>
                                                            <td key={generateKey()} width="75px">{data.orderDay === 'Monday' ? data.delivery : ""}</td>

                                                            <td key={generateKey()} width="50px">{data.orderDay === 'Tuesday' ? data.orderCutoff : ""}</td>
                                                            <td key={generateKey()} width="75px">{data.orderDay === 'Tuesday' ? data.delivery : ""}</td>

                                                            <td key={generateKey()} width="50px">{data.orderDay === 'Wednesday' ? data.orderCutoff : ""}</td>
                                                            <td key={generateKey()} width="75px">{data.orderDay === 'Wednesday' ? data.delivery : ""}</td>

                                                            <td key={generateKey()} width="50px">{data.orderDay === 'Thursday' ? data.orderCutoff : ""}</td>
                                                            <td key={generateKey()} width="75px">{data.orderDay === 'Thursday' ? data.delivery : ""}</td>

                                                            <td key={generateKey()} width="50px">{data.orderDay === 'Friday' ? data.orderCutoff : ""}</td>
                                                            <td key={generateKey()} width="75px">{data.orderDay === 'Friday' ? data.delivery : ""}</td>

                                                            <td key={generateKey()} width="50px">{data.orderDay === 'Saturday' ? data.orderCutoff : ""}</td>
                                                            <td key={generateKey()} width="75px">{data.orderDay === 'Saturday' ? data.delivery : ""}</td>

                                                        </tr>
                                                    )
                                                })

                                            )
                                        })}
                                </tbody>

                            )
                        })}
                    </table>
                </div>
            </div>
        </div>
    )
}

export { ScheduleMatrixPage };


