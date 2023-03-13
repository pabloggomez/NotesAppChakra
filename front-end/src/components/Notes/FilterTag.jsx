import { useEffect, useState } from 'react';
import { getTags } from '../../services/noteServices';

export const FilterTag = ({ setSelectedTag }) => {
  const [tags, setTags] = useState([]);

  const handleCategoryChange = e => {
    setSelectedTag(e.target.value);
  };

  useEffect(() => {
    getTags().then(tags => setTags(tags));
  }, []);

  return (
    <div className="filter-container">
      <div>Filter by Category:</div>
      <div>
        <select onChange={handleCategoryChange}>
          <option tag="All">All</option>
          {tags.map(tag => (
            <option key={tag.tag} tag={tag.tag}>
              {tag.tag}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
