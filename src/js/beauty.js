{
    buildBTreePopup()
    const BTreePopup = document.querySelector('header h1 span .popup');
    document.querySelector('#BTree__span').addEventListener('mouseover', btreePopup_show)
    document.querySelector('#BTree__span').addEventListener('mouseleave', btreePopup_hide)

    function buildBTreePopup() {
        document.querySelector('header h1 span').insertAdjacentHTML('beforeend', "<div class='popup'><p>Нет это не вэ-дерево. У нас тут все серьезно - Би-дерево, и это вовсе не значит, что у него биполярочка или оно бисексуал</p></div>")
    }

    function btreePopup_show() {
        BTreePopup.style.display = "block"
    }

    function btreePopup_hide() {
        BTreePopup.style.display = "none"
    }
}