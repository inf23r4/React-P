const getTodos = async ()=> {
    const url = "https://jsonplaceholder.typicode.com/todos";
    const res = await fetch(url);
    const todo = await res.json();

    return todo;
};
export default getTodos;