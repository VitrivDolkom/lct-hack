import "./style.scss"

const Pagination = ({ quantity, currentPage, perPage, changeCurPage }) => {

    let pages = [];
    for (let i = 1; i <= Math.ceil(quantity / perPage); i++) {
        pages.push(i);
    }


    return (
        <ul className="pag">
            {
                pages.map(el => {
                    return <li key={el}
                        onClick={() => changeCurPage(el)}
                        className={el == currentPage ? "active" : ""}>{el}</li>
                })
            }
        </ul>
    );
}

export default Pagination;