import userService, { User } from "./services/user-service";
import useUsers from "./hooks/useUsers";

const App = () => {
    const { users, errors, isloading, setErros, setUsers }= useUsers()

  const deleteUser = (user: User) => {
     const originalUsers = [...users]
     setUsers(users.filter(u => u.id !== user.id));

      userService.delete(user.id)
      .catch((err) => {
         setErros(err.message)
         setUsers(originalUsers)
      })
  };

  const addUsers = () => {
     const originalUsers = [...users]
     const newUser = {id: 0, name: 'David'};
     setUsers([newUser, ...users])

     userService.create(newUser)
      .catch((err) => {
        setErros(err.message);
        setUsers(originalUsers)
      })    
  };

  const updateUser = (user: User) => {
     const originalUsers = [...users]
     const updateUser = {...user, name: user.name + '!'};
     setUsers(users.map( u => u.id === user.id ? updateUser : u))

     userService.update(updateUser)
      .catch((err) => {
        setErros(err.message)
        setUsers(originalUsers)
      })
  }
  return (
    <>
      {errors && <p className="text-danger">{errors}</p>}
      {isloading && <div className="spinner-border"></div>}
      <button className="btn btn-primary mb-3" onClick={addUsers}>Add</button>
      <ul className="list-group">
        {users.map((user) => (
          <li className="list-group-item d-flex justify-content-between" key={user.id}>
            {user.name}
            <div>
              <button className="btn btn-outline-secondary mx-1" onClick={() => updateUser(user)}>Update</button>
              <button className="btn btn-outline-danger" onClick={() =>deleteUser(user)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
};

export default App;
