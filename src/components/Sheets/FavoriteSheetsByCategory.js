import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { capitalizeFirstLetter } from '../../utils/stringUtils';

function FavoriteSheetsByCategory({ sheetList }) {
  const sheetsByCategory = {}; // Dictionary

  sheetList.forEach((sheet) => {
    sheet.categories.forEach((category) => {
      // If category already exists in dictionary
      if (Array.isArray(sheetsByCategory[category.label])) {
        // Add sheet to category sheet list
        sheetsByCategory[category.label].push(sheet);
      }
      else {
        // Add category entry to the dictionary with the sheet
        sheetsByCategory[category.label] = [sheet];
      }
    });
  });

  // JSX elements generated by the for loop
  const outputJsx = [];

  // Loop through the sorted categories
  const sortedCategoryNames = Object.keys(sheetsByCategory).sort();
  sortedCategoryNames.forEach((categoryName) => {
    // Add category title as <h2> element
    outputJsx.push(
      <h2 key={`category-${categoryName}`}>
        {capitalizeFirstLetter(categoryName)}
      </h2>,
    );

    // Add sheet titles as <li> elements
    const liElements = [];
    sheetsByCategory[categoryName].forEach((sheet) => {
      liElements.push(
        <li key={`category-${categoryName}-sheet-${sheet.title}`}>
          <Link to={`/fiches/${sheet.id}`}>{capitalizeFirstLetter(sheet.title)}</Link>
        </li>,
      );
    });
    outputJsx.push(<ul key={`category-${categoryName}-list`}>{liElements}</ul>);
  });

  return outputJsx;
}

FavoriteSheetsByCategory.propTypes = {
  sheetList: PropTypes.array.isRequired,
};

export default FavoriteSheetsByCategory;