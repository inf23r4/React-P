import React, { useState, useEffect } from 'react'
import getTodos from './GetTodos'
import "./styles.css"

const renderData = (todo) => {
    return(
        <ul>
            {todo.map((todo, index) =>{
                return <li key={index}>{todo.title}</li>
            })}
        </ul>
    );
};


function Pagination() {

    const [todo, setTodo] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsperPage] = useState(5);

    const [pageNumbersList, setPageNumbersList] = useState(5);
    const [maxPageNumbersList, setMaxPageNumbersList] = useState(5);
    const [minPageNumbersList, setMinPageNumbersList] = useState(0);

    const handleClick = (event)=>{
        setCurrentPage(Number(event.target.id))
    }
    const handleNextBtn =()=>{
        setCurrentPage(currentPage+1);
        if(currentPage +1 > maxPageNumbersList){
            setMaxPageNumbersList(maxPageNumbersList + pageNumbersList);
            setMinPageNumbersList(minPageNumbersList + pageNumbersList);
        }
    }
    const handlePrevBtn =()=>{
        setCurrentPage(currentPage-1);
        if((currentPage -1 )% pageNumbersList === 0){
            setMaxPageNumbersList(maxPageNumbersList - pageNumbersList);
            setMinPageNumbersList(minPageNumbersList - pageNumbersList);
        }
    }
    const nextPage = () =>{
        setCurrentPage(currentPage + pageNumbersList);
        setMaxPageNumbersList(maxPageNumbersList + pageNumbersList);
        setMinPageNumbersList(minPageNumbersList + pageNumbersList);
    };
    const prevPage = () =>{
        setCurrentPage(currentPage - pageNumbersList);
        setMaxPageNumbersList(maxPageNumbersList - pageNumbersList);
        setMinPageNumbersList(minPageNumbersList - pageNumbersList);
    };
    const handleLoadMore = ()=>{
        setItemsperPage(itemsPerPage + 5);
    };
    const pages = [];
    for (let i = 1; i <= Math.ceil(todo.length / itemsPerPage); i++){
        pages.push(i);
    }
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = todo.slice(indexOfFirstItem, indexOfLastItem)



    const renderPageNumbers = pages.map((number) =>{
        if(number < maxPageNumbersList+1 && number > minPageNumbersList){
            return (
                <li key ={number} id={number} onClick={handleClick}
                className={currentPage === number ? "active":null}>
                    {number}
                </li>
            );
        }else{
            return null
        }
    });

    const updateTodo = () => {
        getTodos()
            .then((newTodo)=>{
                setTodo(newTodo)
            })
    }
    useEffect(() => {
        updateTodo();
    }, []
    );
    

    let pageIncrementBtn = null;
    if(pages.length > maxPageNumbersList){
        pageIncrementBtn = <li onClick={nextPage}
        disabled={currentPage === pages[pages.length -1 ]? true : false}>&hellip;</li>
    }
    let pageDecrementBtn = null;
    if( minPageNumbersList >= 1){
        pageDecrementBtn = <li onClick={prevPage}
        disabled={currentPage === pages[0]? true : false}>&hellip;</li>
    }

    return (
        <>
            <h1>Todo App</h1><br/>
            {renderData(currentItems)}
            <ul className="pageNumbers">
                {pageDecrementBtn}
                <li>
                    <button onClick={handlePrevBtn} 
                    disabled={currentPage === pages[0]? true : false}>prev</button>
                </li>
                {renderPageNumbers}
                <li>
                    <button onClick={handleNextBtn}
                    disabled={currentPage === pages[pages.length -1 ]? true : false}>next</button>
                </li>
                {pageIncrementBtn}
                </ul>
                <button onClick={handleLoadMore} className="loadmore">Load More</button>
        </>
    )
}

export default Pagination;
