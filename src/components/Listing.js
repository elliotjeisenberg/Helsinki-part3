import React from 'react'

const Person = (props) => {
  return (<>
    <div>Name:{props.name} Number:{props.number}</div> <button onClick={() => props.handleDelete(props.id, props.name)}>delete</button>
  </>)
}


const Listing = ({people, handleDelete}) => {
    const list = people.map(person => {
        return <Person handleDelete={handleDelete} name={person.name} number={person.number} id={person.id} key={person.id} />
    } )
  return (
    <div>
        {list}
    </div>
  )
}

export default Listing;