
import { useState, useEffect } from "react";
import userService, { User } from "../services/user-service";
import { CanceledError } from "axios";


const useUsers = () => {
      const [users, setUsers] = useState<User[]>([]);
      const [errors, setErros] = useState("");
      const [isloading, setLoading] = useState(false);

      useEffect(() => {
        // just before calling the server we set setLoading to true to show the loader
        // when done loading the server we should set it back to flase to hide the loader
        setLoading(true);
        const { request, cancel } = userService.getAll<User>();
        request.then((res) => {
          setUsers(res.data);
          setLoading(false);
        });
        request.catch((err) => {
          if (err instanceof CanceledError) return;
          setErros(err.message);
          setLoading(false);
        });

        return () => cancel();
      }, []);

      return { users, errors, isloading, setErros, setUsers}
}

export default useUsers