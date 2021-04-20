import {tableDraw, tableClear} from "./app";


export let addTestResults = [], delTestResults = [], searchTestResults = []


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}


export function addTest(Tree, amount) {
    for (let i = 0; i < amount; i++) {
        let s_time = performance.now()
        Tree.put(getRandomInt(99999999), "Элемент с рандомным ключем")
        s_time = performance.now() - s_time
        addTestResults.push(s_time)
    }
}

export function delTest(Tree, amount) {
    for (let i = 0; i < amount; i++) {
        let s_time = performance.now()
        Tree.del(getRandomInt(1000))
        s_time = performance.now() - s_time
        delTestResults.push(s_time)
    }
}

export function searchTest(Tree, amount) {
    for (let i = 0; i < amount; i++) {
        const key = getRandomInt(1000)
        let s_time = performance.now()
        Tree.get(key)
        s_time = performance.now() - s_time
        searchTestResults.push(s_time)
    }
}

export function getAverage(element){
    let average=0;
    element.forEach(value => average+=value)
    average = average/element.length
    return average
}