import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { userProfile } from '../../redux/_actions/authAction';
import Navebar from '../partials/Navebar';
import { Table } from 'react-bootstrap';

const Home = ({ history }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (auth.user) {
      const { username, email, phone } = auth.user;
      setUser({
        username,
        email,
        phone,
      });
      setUserFetch(true);
    }
    if (!usreFetch && !user.username) {
      dispatch(userProfile());
    }
  }, [auth.user]);

  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
  });
  const [usreFetch, setUserFetch] = useState(false);

  const { username, email, phone } = user;
  return (
    <>
      <Navebar />
      <div className="container main-box">
        <div className="row">
          <h1> Welcome To Home Page...!</h1>
          <Table responsive>
            <tbody>
              <tr>
                <th>User Name</th>
                <td>{username}</td>
              </tr>
              <tr>
                <th>Email Id</th>
                <td>{email}</td>
              </tr>
              <tr>
                <th>Phone No</th>
                <td>{phone}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Home;
