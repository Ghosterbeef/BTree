import * as btree from "./btree"
import {addTest, delTest, searchTest, getAverage, addTestResults, delTestResults, searchTestResults} from "./test";

let Tree = btree.create(2, btree.numcmp)
let MyBTree = new Tree()

const Table = document.querySelector(".table")


const timeTo = document.querySelectorAll(".timeTo")

{
    document.querySelector(".insert-btn").addEventListener("click", addElement)
    document.querySelector("#insert-form").addEventListener("submit", function (e) {
        e.preventDefault();
        addElement(e);
    })

    document.querySelector(".delete-btn").addEventListener("click", deleteElement);
    document.querySelector("#delete-form").addEventListener("submit", function (e) {
        e.preventDefault();
        deleteElement(e)
    })

    document.querySelector(".search-btn").addEventListener("click", searchElement);
    document.querySelector("#search-form").addEventListener("submit", function (e) {
        e.preventDefault();
        searchElement(e)
    })

    document.querySelector(".reload-btn").addEventListener("click", reloadTable);
    document.querySelector(".tests").addEventListener("click", doTests);

    function addElement(e) {
        if (e.target.parentNode.childNodes[3].value && parseInt(e.target.parentNode.childNodes[3].value) !== NaN) {
            let s_time = performance.now()
            MyBTree.put(parseInt(e.target.parentNode.childNodes[3].value), `Это элемент с индексом ${e.target.parentNode.childNodes[3].value}`);
            s_time = performance.now() - s_time
            timeTo[0].textContent = `Время затраченное на добавление: ${s_time.toFixed(5)}`;
            e.target.parentNode.childNodes[3].value = "";
            tableClear()
            MyBTree.walk(null, null, tableDraw)
        }
    }

    function deleteElement(e) {
        if (e.target.parentNode.childNodes[3].value && parseInt(e.target.parentNode.childNodes[3].value) !== NaN) {
            let s_time = performance.now()
            MyBTree.del(parseInt(e.target.parentNode.childNodes[3].value));
            s_time = performance.now() - s_time
            timeTo[2].textContent = `Время затраченное на удаление: ${s_time.toFixed(5)}`;
            e.target.parentNode.childNodes[3].value = "";
            tableClear()
            MyBTree.walk(null, null, tableDraw)
        }
    }

    function searchElement(e) {
        if (e.target.parentNode.childNodes[3].value && parseInt(e.target.parentNode.childNodes[3].value) !== NaN) {
            console.clear();
            let s_time = performance.now()
            const founded = MyBTree.get(parseInt(e.target.parentNode.childNodes[3].value))
            s_time = performance.now() - s_time
            timeTo[1].textContent = `Время затраченное на поиск: ${s_time.toFixed(5)}`;
            tableClear()
            if (founded)
                tableDraw(parseInt(e.target.parentNode.childNodes[3].value), founded)
            else
                tableDraw(null, "Элемент отсутствует!")
            e.target.parentNode.childNodes[3].value = "";
        }
    }

    function reloadTable() {
        tableClear()
        MyBTree.walk(null, null, tableDraw)
    }
}

function doTests() {
    addTest(MyBTree, 100)
    searchTest(MyBTree, 100)
    //delTest(MyBTree, 1000)
    console.log("Среднее время на добавление элемента: " + getAverage(addTestResults))
    //console.log("Среднее время на удаление элемента: " + getAverage(delTestResults))
    console.log("Среднее время на поиск элемента: " + getAverage(searchTestResults))
    console.table(addTestResults);
    //console.table(delTestResults);
    console.table(searchTestResults);

    MyBTree = new Tree()
}

export function tableDraw(key, value) {
    Table.insertAdjacentHTML("beforeend", `<div class="table-element"><div class="key">${key}</div><div class="value">${value}</div></divtable-element>`)
    console.clear()
    MyBTree.print()
}

export function tableClear() {
    Table.innerHTML = ""
}