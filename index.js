{/* <label for="" class="todo_item">
<input type="checkbox" name="" id="">
<div>Teste de item 1</div>
<input type="button" value="X">
</label> */}

// let banco = [
//     {'tarefa': 'Estudar JS', 'status': ''},
//     {'tarefa': 'netflix', 'status': 'checked'},
//     {'tarefa': 'teste1', 'status': ''}
// ];

const getBanco = () => JSON.parse(localStorage.getItem ('todo_list')) ?? [];
const setBanco = (banco) => localStorage.setItem('todo_list', JSON.stringify(banco));

const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
    <input type="checkbox" ${status} data-indice=${indice}>
    <div>${tarefa}</div>
    <input type="button" value="X" data-indice=${indice}>
    `
    document.getElementById('todo_list').appendChild(item);
}

const limparTarefa = () => {
    const todo_list = document.getElementById('todo_list');
    while (todo_list.firstChild) {
        todo_list.removeChild(todo_list.lastChild)
    }

}

const atualizarTela = () => {
    limparTarefa();
    const banco = getBanco();
 banco.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const inserirItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter') {
        const banco = getBanco();
        banco.push({'tarefa': texto, 'status': ''});
        setBanco(banco);
        atualizarTela();
        evento.target.value = "";
    }
}

const removerItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizarTela();
}

const atualizarItem = (indice) => {
    const banco = getBanco();
    banco[indice].status = banco[indice].status === '' ? 'checked' : '';
    setBanco(banco);
    atualizarTela();
}

const clickItem = (evento) => {
const elemento = evento.target;
if (elemento.type === 'button') {
   const indice = elemento.dataset.indice;
    removerItem(indice)
} else if (elemento.type === 'checkbox') {
    const indice = elemento.dataset.indice;
    atualizarItem(indice)
}
}

document.getElementById('new_item').addEventListener('keypress', inserirItem);
document.getElementById('todo_list').addEventListener('click', clickItem);

atualizarTela()

