import BTree from "./B-tree";

const canvas = document.querySelector('svg')

let MyBTree = new BTree()

console.log(MyBTree)
pageConstruct()


function pageConstruct() {
    d3.select("svg")
        .attr("width", function () {
            return window.innerWidth * 0.7
        })
        .attr("height", function () {
            return window.innerHeight * 0.45
        })
        .style("border", "1px solid black")
}