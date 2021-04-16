import BTree, {BTreeNode} from "./B-tree";


document.querySelector(".insert-btn").addEventListener("click", addElement)
document.querySelector("#insert-form").addEventListener("submit", function (e) {
    e.preventDefault()
})
const canvas = document.querySelector('svg')

let MyBTree = new BTree(2)
MyBTree.root = new BTreeNode(true);


let JSON_string = JSON.stringify(MyBTree.root, ['children', 'values']);


let JSON_BTree = JSON.parse(JSON_string)

console.log(JSON_BTree)

let hierarchy = d3.hierarchy(JSON_BTree)

console.log(hierarchy)

//drawTree()


function drawTree() {
    d3.select("svg").remove();
    let treeData;
    if (!MyBTree.root)
        return;
    treeData = JSON.parse(JSON.stringify(MyBTree.root, ['children', 'values']));
    const svg_wrapper = document.querySelector(".svg-wrapper");
    const margin = {
        top: 40,
        right: 90,
        bottom: 50,
        left:90
    };
    const width = svg_wrapper.clientWidth -10 - margin.left - margin.right;
    const height = window.innerHeight -150 - margin.top - margin.bottom;

    const treeMap = d3.tree().size([width,height]);
    const nodes = d3.hierarchy(treeData);

    const svg = d3.select(".svg-wrapper").append("svg")
        .attr("width", width+margin.left+margin.right)
        .attr("height",height+margin.top+margin.bottom);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const link = g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter()
        .append("path")
        .attr("class", "link")

}


function addElement(e) {
    MyBTree.insert(parseInt(e.target.value))
    console.log(MyBTree)
}

function pageConstruct() {
    const wrapper = document.querySelector(".wrapper");
}