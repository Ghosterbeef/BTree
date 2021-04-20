import BTree, {BTreeNode} from "./B-tree";


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
        left: 90
    };
    const width = svg_wrapper.clientWidth - 10 - margin.left - margin.right;
    const height = window.innerHeight - 150 - margin.top - margin.bottom;

    const treeMap = d3.tree().size([width, height]);
    const nodes = d3.hierarchy(treeData);

    const svg = d3.select(".svg-wrapper").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

    const g = svg.append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const link = g.selectAll(".link")
        .data(nodes.descendants().slice(1))
        .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", function (d) {
            const x = d.x + margin.left;
            const parentx = margin.left + d.parent.x;
            const y = this.margin.top - d.y;
            const parenty = margin.top - d.parent.y
            return `M${x},${y}L${parentx},${parenty}`
        })

}


function addElement(e) {
    if (e.target.parentNode.childNodes[3].value && parseInt(e.target.parentNode.childNodes[3].value) !== NaN) {
        MyBTree.insert(parseInt(e.target.parentNode.childNodes[3].value));
        e.target.parentNode.childNodes[3].value = "";
        console.clear();
        console.log(MyBTree.root.values);
        pageConstruct()
    }
}

function deleteElement(e) {
    if (e.target.parentNode.childNodes[3].value && parseInt(e.target.parentNode.childNodes[3].value) !== NaN) {
        MyBTree.delete(parseInt(e.target.parentNode.childNodes[3].value));
        e.target.parentNode.childNodes[3].value = "";
        console.clear();
        console.log(MyBTree.root.values);
        pageConstruct()
    }
}

function searchElement(e) {
    if (e.target.parentNode.childNodes[3].value && parseInt(e.target.parentNode.childNodes[3].value) !== NaN) {
        console.clear();
        console.log(MyBTree.searchValue(MyBTree.root, parseInt(e.target.parentNode.childNodes[3].value)))
        e.target.parentNode.childNodes[3].value = "";
    }
}

function pageConstruct() {
    const wrapper = document.querySelector(".svg-wrapper");
    wrapper.innerHTML = ""
    console.log(d3.hierarchy(JSON.parse(JSON.stringify(MyBTree.root, ['children', 'values']))))
    printObject(wrapper, d3.hierarchy(JSON.parse(JSON.stringify(MyBTree.root, ['children', 'values']))).data)

}

function printObject(wrapper, toPrint) {
    toPrint.values.forEach((value, i) => {
        if (i !== 0)
            wrapper.insertAdjacentHTML("beforeend", `,${value}`)
        else
            wrapper.insertAdjacentHTML("beforeend", `${value}`)
    })
    toPrint.children.forEach((child, i) => {
        if (i === 0) {
            wrapper.insertAdjacentHTML("beforeend", '<br>')
        } else {
            wrapper.insertAdjacentHTML("beforeend", `|`)
        }
        printObject(wrapper, child)
    })
}