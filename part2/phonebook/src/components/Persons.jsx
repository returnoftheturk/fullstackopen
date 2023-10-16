export const Persons = ({persons, nameFilter, handleDelete}) => {
    const personsToShow = nameFilter ? 
        persons.filter(person => person.name.toLowerCase() .includes(nameFilter.toLowerCase())) : 
        persons;
    
    return (
        <div>
            <ul>
                {personsToShow.map(person => (
                <li key={person.id}>
                    <div>
                        {person.name} {person.number} &nbsp;
                        <button onClick={() => handleDelete(person.id)}> Delete </button>
                    </div>
                </li>
                ))}
            </ul>
        </div>
    )
}