import React from "react";
import "../../index.css"

const Category = ({ ...props }) => {

    const listCategories = props.categories.map((category) =>
        <div >
            <div className="category-item">{category.name}</div>
            <hr className="line"></hr>
        </div>

    )

    return (
        <div className="home-category">
            <h5>CATEGORIES</h5>
            <div>
                {listCategories}
            </div>
        </div>
    );
}

export default Category;