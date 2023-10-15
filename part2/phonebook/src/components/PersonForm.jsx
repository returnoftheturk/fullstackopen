export const PersonForm = ({newName, newNumber, handleNameChange, handleNumberChange, handleSubmit}) => (
    <form>
        <div>
            Name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
            Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
            <button type="submit" onClick={handleSubmit}>add</button>
        </div>
    </form>
)