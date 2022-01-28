import { useState } from "react";
import './DragDrop.css';

const CloneDragDropPage = () => {
    const [state, setState] = useState({
        cloneList: [{ id: 1, name: "Task1" }, { id: 2, name: "task2" }],
        selectedList: [], draggedItem: {}
    });

    const [selectedItem,setSelectedItem]= useState(-1);

    // Format the draggable item
    const dragStartTodo = (event: any) => {
        let data: any = document.getElementById(event.target.id);
        data.classList.add("on-drag");
    }

    // Reset the draggable item format back to normal
    const dragEndTodo = (event: any) => {
        let data: any = document.getElementById(event.target.id);
        data.classList.remove("on-drag");
    }

    const onDragCompleted = (event: any, todo: any) => {
        event.preventDefault();
        setState(state => ({
            ...state,
            draggedItem: todo
        }));
    };

    const onDragOverCompleted = (event: any) => {
        event.preventDefault();
    };

    const onDragTodo = (event: any, todo: any) => {
        event.preventDefault();
        setState(state => ({
            ...state,
            draggedItem: todo
        }));
    };

    const onDragOverTodo = (event: any) => {
        event.preventDefault();
    };
    // When dropping a todo to completed
    const onDropCompleted = (event: any) => {
        const { cloneList, selectedList } = state;
        const draggedItem: any = state.draggedItem;
        // Ignore if task is dropped in the same box
        var found = selectedList.filter(
            (task: any) => task.id === draggedItem.id
        );

        if (found.length > 0) {
            return;
        }
        const arr: any = [...selectedList, draggedItem];
        setState({
            ...state,
            selectedList: arr,
            cloneList: cloneList.filter((task: any) => task.id !== draggedItem.id),
            draggedItem: {}
        });
    };

    const onDropTodo = (event: any) => {
        const { cloneList, selectedList } = state;
        const draggedItem: any = state.draggedItem;
        // Ignore if task is dropped in the same box
        var found = cloneList.filter((todo: any) => todo.id === draggedItem.id);
        if (found.length > 0) {
            return;
        }

        setState(state => ({
            ...state,
            cloneList: [...cloneList, draggedItem],
            selectedList: selectedList.filter((todo: any) => todo.id !== draggedItem.id),
            draggedItem: {}
        }));
    };

    const handleChange = (row: any, key: string) => {
        const { cloneList, selectedList } = state;
        if (key === 'cloneList') {
            setState(state => ({
                ...state,
                cloneList: cloneList.filter((todo: any) => todo.id !== row.id),
            }));
        } else {
            setState(state => ({
                ...state,
                cloneList: [...cloneList, row],
                selectedList: selectedList.filter((todo: any) => todo.id !== row.id)
            }));
        }
    }

    const onClickItem=(id:any)=>{
        setSelectedItem(id);
    }

    const moveItem=(select:boolean)=>{
        const {cloneList,selectedList}= state;
        if(select){
            let data:any = selectedList.find((todo: any) => todo.id === selectedItem);
            if(data){
                setState(state => ({
                    ...state,
                    selectedList: selectedList.filter((todo: any) => todo.id !== selectedItem),
                    cloneList: [...cloneList,data],
                }));
            }
           
        }else{
            let data = cloneList.find((todo: any) => todo.id === selectedItem);
            const arr: any = [...selectedList, data];
            if(data){
                setState(state => ({
                    ...state,
                    selectedList: arr,
                    cloneList: cloneList.filter((todo: any) => todo.id !== selectedItem),
                }));
            }
           
        }
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div
                    className="col-3 px-3 "
                    onDrop={event => onDropTodo(event)}
                    onDragOver={event => onDragOverTodo(event)}>
                    <label className="form-label">Select for Clone ({state.cloneList.length})</label>
                    <div className="todos form-control scroll-cont">
                        {state.cloneList.map((todo: any) => (
                            <div
                                className={todo.id === selectedItem ? "item selected":"item"}
                                id={todo.id}
                                key={todo.id}
                                onClick={()=>onClickItem(todo.id)}
                                draggable
                                onDragStart={(e) => dragStartTodo(e)}
                                onDragEnd={(e) => dragEndTodo(e)}
                                onDrag={event => onDragTodo(event, todo)}
                              >
                                {todo.name}
                                <span className="clsbtn" onClick={() => handleChange(todo, 'cloneList')}>&#10006;</span>

                            </div>
                        ))}
                    </div>
                </div>
                <div className="col-1 px-0 arrow-sign" draggable="false">
                    <div className="arrow mb-3" onClick={()=>{moveItem(true)}}>&lt;</div>
                    <div className="arrow" onClick={()=>{moveItem(false)}}>&gt;</div>
                </div>
                <div
                    onDrop={event => onDropCompleted(event)}
                    onDragOver={event => onDragOverCompleted(event)}
                    className="col-3 px-3 ">

                    <label className="form-label">Selected for Clone ({state.selectedList.length})</label>
                    <div className=" done form-control  scroll-cont">
                        {state.selectedList.map((task: any, index) => (
                            <div
                                className={task.id === selectedItem ? "item selected":"item"}
                                key={task.id}
                                id={task.id}
                                draggable
                                onClick={()=>onClickItem(task.id)}
                                onDragStart={(e) => dragStartTodo(e)}
                                onDragEnd={(e) => dragEndTodo(e)}
                                onDrag={event => onDragCompleted(event, task)}>
                                {task.name}
                                <span className="clsbtn" onClick={() => handleChange(task, 'SelectedList')}>&#10006;</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}

export { CloneDragDropPage };