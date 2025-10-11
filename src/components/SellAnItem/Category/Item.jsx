import PropTypes from 'prop-types';

const CategoryItem = ({ categoryName }) => {
    return (
        <div className="position-relative">
            <div>
                <img src="/bidwars-logo-sm.png" alt="category" className="img-fluid w-100" />
            </div>

            <div className="position-absolute top-0 start-0 bottom-0 end-0 bg-dark opacity-75 rounded"></div>

            <div className="position-absolute top-50 start-50 translate-middle">
                <p className="text-white fw-bold live-auction-text text-capitalize" data-testid={`category-name-${categoryName}`}>{ categoryName }</p>
            </div>
        </div>
    );
}

CategoryItem.propTypes = {
    categoryName: PropTypes.string.isRequired,
};

export default CategoryItem;
