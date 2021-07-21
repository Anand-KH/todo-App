import React, { useEffect, useState } from 'react';

const getTodoLits=()=>{
    let lists = localStorage.getItem('Todo_list');

    if(lists){
        return JSON.parse(localStorage.getItem('Todo_list'));
    }
}

function TodoApp() {

    const [inputList, setInputList] = useState("");
    const [items, setItems] = useState(getTodoLits());
    const [editbtn, setEditbtn] = useState(true);
    const [editlist, setEditlist] = useState(null);

    const addItems = (e) => {
        e.preventDefault();
        if(!inputList){
            alert("plz type the list you want to add");
        }
        else if(inputList && !editbtn){
            setItems(
                items.map((elem)=>{
                    if(elem.id === editlist){
                        return {...elem, name:inputList}
                    }
                    return elem;
                })
            )
            setEditbtn(true);
            setInputList('');
            setEditlist(null);
        }
        else{
            const allInputData = { id:new Date().getTime().toString(), name:inputList}
            setItems([...items, allInputData]);
            setInputList('');
        }
    };

    const editItem = (id) => {
        let EditItems = items.find((elem)=>{
            return elem.id === id;
        });
        setEditbtn(false);
        setInputList(EditItems.name);
        setEditlist(id);
    }

    const deleteItem = (index) => {
        const deleteitm = items.filter((elem)=>{
            return index !== elem.id;
        });
        setItems(deleteitm);
    };

    const removeAll=()=>{
        setItems([]);
    }

    useEffect(() => {
        localStorage.setItem('Todo_list', JSON.stringify(items));
    }, [items]);

    return (
        <div>
            <div className="container d-flex justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={addItems}>
                            <div className="row mx-lg-1">
                                <div className="col-lg-9 col-sm-12 col-12 mt-0">
                                    <div className="form-group">
                                        <input type="text" id="items" className="form-control" value={inputList} onChange={(e)=>setInputList(e.target.value)} placeholder="Add Items"/>
                                    </div>
                                </div>
                                <div className="col-lg-3 col-sm-12 col-12 mt-0">
                                    {
                                        editbtn ? <button type="submit" className="btn btn-sm btn-round btn-secondary ml-0" title="Add Item"><i className="fa fa-plus"></i></button> :
                                        <button type="submit" className="btn btn-sm btn-round btn-secondary ml-0" title="Update Item"><i className="fa fa-edit fa-x"></i></button>
                                    }
                                </div>
                                
                            </div>
                        </form>

                        {/*----Remove button-------*/}
                        
                        <div className="row">
                            <div className="col-10 pl-5">List of Items</div>
                                <div className="col-2">
                                <div className="text-left mt-0 mb-3">
                                    <p  title="Remove All"><i className="fas fa-times remove_all" onClick={removeAll}></i></p>
                                </div>
                            </div>
                        </div>
                        
                        {/*------List of Items------*/}
                        <div className="row py-2 m-0">
                            {
                                items.map((curelem, ind)=>{
                                    return(
                                        <ul className="lists list-group" key={curelem.id}>
                                            <p className=" text-left">{curelem.name}</p>
                                            <i className=" py-2 fas fa-edit icon_touch_edit fa-x text-success" title="Edit Item" onClick={()=> editItem(curelem.id)}></i>
                                            <i className=" py-2 fas fa-trash-alt icon_touch fa-x text-danger" title="Delete Item" onClick={()=> deleteItem(curelem.id)}></i>
                                        </ul>
                                    )
                                })
                            }
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TodoApp;
