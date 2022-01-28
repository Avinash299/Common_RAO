import { CloneDragDropPage } from "./CloneDragDropPage";

const CloneSchedulePage = () => {

    return (
        <div className="round-cont">
            <h5 className="p-3 text-secondary">Clone schedule to Store & Vendor</h5>
            <div className="clonedrag-cont">
                <CloneDragDropPage />
            </div>
        </div>
    )
}

export { CloneSchedulePage };