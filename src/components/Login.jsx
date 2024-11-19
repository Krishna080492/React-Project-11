import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

function Login() {
  let [user, setUser] = useState({});
  let [data, setData] = useState([]); //getdata
  let [editId, setEditId] = useState(""); //update

  let handleInput = (e) => {
    let { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value })); //or
    // setUser({ ...user, [name]: value });
  };

  useEffect(() => {
    getUser();
  }, [setUser]);

  // getdata
  let getUser = async () => {
    try {
      let res = await getDocs(collection(db, "users"));
      console.log(res);
      let getAllUser = res.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(getAllUser);
      setData(getAllUser);
    } catch (error) {
      console.log(error);
    }
  };

  // delete data
  let handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      getUser();
    } catch (error) {
      console.log(error);
    }
  };

  // edit data
  let handleEdit =  (user) => {
    setUser(user);
    setEditId(user.id);
  };

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId == "") {
        await addDoc(collection(db, "users"), user);
        console.log("User added successfully..");
      } else {
        await updateDoc(doc(db, "users", editId), {
          email: user.email,
          password: user.password,
        });
        console.log("User updated successfully.");
        setEditId("");
      }
    } catch (error) {
      console.log(error);
    }
    setUser({});
    getUser();
  };
  return (
    <>
      <div className="container">
        <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email Id:
            </label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={user.email || ""}
              onChange={handleInput}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={user.password || ""}
              onChange={handleInput}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        {/* get User */}
        <h3 className="text-center mt-5">
          <u>User Details</u>
        </h3>
        <table className="table table-striped table-hover text-center w-75 mx-auto">
          <thead>
            <tr>
              <th>Email Id</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button
                      className="btn btn-danger mx-3"
                      onClick={() => handleDelete(user.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => handleEdit(user)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Login;
