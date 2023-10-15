export const Persons = ({persons, nameFilter}) => {
    const personsToShow = nameFilter ? 
        persons.filter(person => person.name.toLowerCase() .includes(nameFilter.toLowerCase())) : 
        persons;
    
    return (
        <div>
            <ul>
                {personsToShow.map(person => (
                <li key={person.id}>
                    {person.name} {person.phoneNumber}
                </li>
                ))}
            </ul>
        </div>
    )
}