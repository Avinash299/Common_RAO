import { DateTimePicker, DropDown, Select, StaticOptionsPage } from "../../components";
import './ScheduleSearchPage.css';
import { ScheduleSearchResultPage } from "./ScheduleSearchResult";
import { useEffect, useState } from 'react';
import SeacrhArrowImg from '../../assets/images/ic_search_arrow.svg';
import FilterImg from '../../assets/images/ic_filters.svg';
import { OrderDays } from "../../constants";
import { useDispatch, useSelector } from "react-redux";
import { generateKey, TimeArray } from "../../hoc";
import { initialState, VendorInterface } from "./ScheduleSearchInterfaces";
import { vendorStoreActions } from '../../actions/vendor-store.actions';
import { holidayActions } from '../../actions/holiday.actions';

const ScheduleSearchPage = () => {
    const { store, vendor, holiday } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const intervalList= TimeArray();
    const vendorList: VendorInterface[] = vendor.vendorList;
    const majorDeptList: any = vendor.majorDeptList;
    const minorDeptList: any = vendor.minorDeptList;
    const sourceList: any = vendor.sourceList;
    const scheduleList: any = holiday.result;
    const districtList: any = store.districtList;
    const districtStores: any = store.districtStores;
    const weekDays = OrderDays;

    const [effectiveDateRange, setEffectiveDateRange] = useState([null, null]);
    const [effectiveStartDate, effectiveEndDate] = effectiveDateRange;
    const [endDateRange, setEndDateRange] = useState([null, null]);
    const [endStartDate, endEndDate] = endDateRange;
    const [state, setState] = useState(initialState);
    const [showAdvFilter, setAdvFilter] = useState(false);
    const [storeList, setStoreList] = useState([]);

    useEffect(() => {
        dispatch(vendorStoreActions.getMajorDept());
        dispatch(vendorStoreActions.getDistrictList());
        dispatch(vendorStoreActions.getStoreList());
        dispatch(holidayActions.getHolidayList('search'));
        dispatch(vendorStoreActions.getMinorDept());
        dispatch(vendorStoreActions.getSourceList());
        dispatch(vendorStoreActions.getVendorList());

    }, [dispatch]);

    useEffect(()=>{
        setStoreList(store.storeList);
    },[store.storeList]);

    useEffect(()=>{
        setStoreList(districtStores);
    },[districtStores]);

    const handleChange = (e: any, key: string) => {
        setState(state => ({ ...state, [key]: e }));
        if(key === 'district'){
            dispatch(vendorStoreActions.getStoresByDistrict(e.district));
        }
    }

    return (
        <div>
            <div className="intra-cont">
                <div className="headding-cont">
                    <h2>Search Filter</h2>
                    <p className="hsuptext mb-0">Search Filter</p>
                </div>
                <StaticOptionsPage />
            </div>
            <div className="round-cont mb-3 min-h200">

                <div className="search-form-cont p-3">
                    <div className="container mx-auto form-width" >

                        <div className="row g-3 mx-auto align-items-end">
                            <div className="col">
                                <label className="form-label">Schedule <span>*</span></label>
                                <DropDown key={generateKey()} id="scheduleId" options={scheduleList} label="namedSchedule" name="holidayId" value={state.namedSchedule} onChange={(e: any) => handleChange(e, 'namedSchedule')}></DropDown>
                            </div>
                            <div className="col">
                                <label className="form-label">Major Department <span>*</span></label>
                                <DropDown key={generateKey()} id="majorDepartment" options={majorDeptList} label="majorDepartment" name="majorDepartment" value={state.majorDepartment} onChange={(e: any) => handleChange(e, 'majorDepartment')}></DropDown>
                            </div>
                            <div className="col sebg rounded-start ps-3">
                                <label className="form-label">District <span>*</span></label>
                                <DropDown key={generateKey()} id="district" options={districtList} label="district" name="district" value={state.district} onChange={(e: any) => handleChange(e, 'district')}></DropDown>

                            </div>
                            <div className="col  text-center sebg orcont"><div className="or-sap">(OR)</div></div>
                            <div className="col sebg rounded-end  pe-3">
                                <label className="form-label">Store <span>*</span></label>
                                <DropDown key={generateKey()} id="storeId" options={storeList} label="storeId" name="storeId" value={state.storeId} onChange={(e: any) => handleChange(e, 'storeId')}></DropDown>
                            </div>
                            <div className="col mb-3 text-center">
                                <div className={showAdvFilter ? "arrow-cont arrow-color":"arrow-cont"} onClick={()=>setAdvFilter(!showAdvFilter)} ><img src={SeacrhArrowImg} alt="" width="14" id="adv-filter"/></div>
                            </div>
                        </div>

                        {showAdvFilter && <div className="row g-3 mx-auto align-items-end justify-content-start">
                            <div className="col-12 "><div className="advfilters"><img src={FilterImg} alt="adv-fliter" />Advanced Filters</div></div>

                            <div className="col-3">
                                <label className="form-label">Source</label>
                                <DropDown key={generateKey()} id="source" options={sourceList} label="source" name="source" value={state.source} onChange={(e: any) => handleChange(e, 'source')}></DropDown>
                            </div>
                            <div className="col-3">
                                <label className="form-label">Minor Department</label>
                                <DropDown key={generateKey()} id="minorDepartment" options={minorDeptList} label="minorDepartment" name="minorDepartment" value={state.minorDepartment} onChange={(e: any) => handleChange(e, 'minorDepartment')}></DropDown>
                            </div>
                            <div className="col-3">
                                <label className="form-label">Vendor</label>
                                <DropDown key={generateKey()} id="vendorId" options={vendorList} label="vendor" name="vendorId" value={state.vendorId} onChange={(e: any) => handleChange(e, 'vendorId')}></DropDown>
                            </div>

                            <div className="col-3">
                                <label className="form-label">Order Day</label>
                                <Select name="orderDay" label="key" labelValue="value" defaultLabel="Select" items={weekDays} value={state.orderDay} onChange={(e: any) => handleChange(e.target.value, 'orderDay')} />
                            </div>


                            <div className="col-3">
                                <label className="form-label">Order cutoff time</label>
                                <DropDown key={generateKey()}  id="orderCutoffTime" options={intervalList} label="value" name="orderCutoffTime" value={state.orderCutoffTime ? {value:state.orderCutoffTime}:""} onChange={(e: any) => handleChange(e.value, 'orderCutoffTime')}></DropDown>
                            </div>
                            <div className="col-3">
                                <label className="form-label">Delivery day</label>
                                <Select name="deliveryDay" key={generateKey()} label="key" labelValue="value" defaultLabel="Select" items={weekDays} value={state.deliveryDay} onChange={(e: any) => handleChange(e.target.value, 'deliveryDay')} />

                            </div>
                            <div className="col-3">
                                <label className="form-label">Delivery window begin</label>
                                <DropDown key={generateKey()} id="deliveryWindowBegin" options={intervalList} label="value" name="deliveryWindowBegin" value={state.deliveryWindowBegin ? {value:state.deliveryWindowBegin}:""} onChange={(e: any) => handleChange(e.value, 'deliveryWindowBegin')} />
                            </div>
                            <div className="col-3">
                                <label className="form-label">Delivery window end</label>
                                <DropDown key={generateKey()} id="deliveryWindowEnd" options={intervalList} name="deliveryWindowEnd" label="value" value={state.deliveryWindowEnd ? {value:state.deliveryWindowEnd}:""} onChange={(e: any) => handleChange(e.value, 'deliveryWindowEnd')} />
                            </div>
                            <div className="col-3">
                                <label className="form-label">Effective date range</label>
                                <DateTimePicker
                                    id="effectiveDate"
                                    dateFormat="MM/dd/yyyy"
                                    className="form-control date-range-ctrl mb-0"
                                    autoComplete="off"
                                    placeholderText="Select Range"
                                    startDate={effectiveStartDate}
                                    endDate={effectiveEndDate}
                                    onChange={(update: any) => {
                                        setEffectiveDateRange(update);
                                    }}
                                    onKeyDown={(e: any) => e.preventDefault()}
                                    selectsRange={true}
                                />
                            </div>
                            <div className="col-3">
                                <label className="form-label">End date range</label>
                                <DateTimePicker
                                    id="endDate"
                                    dateFormat="MM/dd/yyyy"
                                    className="form-control date-range-ctrl mb-0"
                                    autoComplete="off"
                                    placeholderText="Select Range"
                                    onKeyDown={(e: any) => e.preventDefault()}
                                    startDate={endStartDate}
                                    endDate={endEndDate}
                                    onChange={(update: any) => {
                                        setEndDateRange(update);
                                    }}
                                    selectsRange={true}
                                />
                            </div>

                        </div>
                        }
                    </div>

                    <div className="btn-cont text-center mt-4 pt-4">
                        <button className="btn btn-primary">Search</button>
                    </div>
                </div>

            </div>
            <ScheduleSearchResultPage />
        </div>
    )


}
export { ScheduleSearchPage };