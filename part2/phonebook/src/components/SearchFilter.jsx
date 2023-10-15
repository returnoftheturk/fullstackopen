export const SearchFilter = ({nameFilter, handleFilterChange}) => (
    <div>
        Filter shown with a &nbsp;
        <input value={nameFilter} onChange={handleFilterChange}/>
    </div>
);