import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../../redux/_actions/authAction';
import { Link } from 'react-router-dom';
import { setAlert } from '../../redux/_actions/alertAction';
import { CLEAR_ERRORS } from '../../redux/types';

const Register = ({ history }) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token') && auth.isAuthenticated)
      history.push('/login');

    if (auth.error === 'User already exists') {
      dispatch(setAlert(auth.error, 'danger'));
      dispatch({ type: CLEAR_ERRORS });
    }
    // eslint-disable-next-line
  }, [auth.isAuthenticated, auth.error]);

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    password2: '',
  });

  const { username, email, phone, password, password2 } = newUser;

  const onChange = (e) =>
    setNewUser({ ...newUser, [e.target.name]: e.target.value });

  const validateForm = () => {
    if (
      username === '' ||
      email === '' ||
      phone === '' ||
      password === '' ||
      password2 === ''
    ) {
      dispatch(setAlert('Please enter all the fields.', 'danger'));
      return false;
    }

    if (typeof email !== 'undefined') {
      //regular expression for email validation
      let emailPattern = new RegExp(
        /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
      );
      if (!emailPattern.test(email)) {
        dispatch(setAlert('Please enter a valid Email.', 'danger'));
        return false;
      }
    }

    if (typeof phone !== 'undefined') {
      //regular expression for Number Only validation
      if (!phone.match(/^[0-9]{1,10}$/)) {
        dispatch(setAlert('Please enter valid phone number.', 'danger'));
        return false;
      }
    }

    if (password !== 'undefined') {
      if (
        !password.match(
          /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
        )
      ) {
        dispatch(
          setAlert(
            'Password must have at least 8 characters and one letter, one number and one special symbol.',
            'danger'
          )
        );
        return false;
      }
    }

    if (typeof password2 !== 'undefined') {
      //regular expression for Number Only validation
      if (password2 !== password) {
        dispatch(
          setAlert('Password & Confirm Password Should Match.', 'danger')
        );
        return false;
      }
    }

    return true;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    var validate = await validateForm();
    if (validate) {
      console.log(validate);
      dispatch(register(newUser));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h3>
                Sign <span className="text-primary">Up</span>
              </h3>
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    className="form-control"
                    placeholder="Name"
                    onChange={onChange}
                    value={username}
                    name="username"
                    type="text"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Email address</label>
                  <input
                    className="form-control"
                    onChange={onChange}
                    value={email}
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    className="form-control"
                    onChange={onChange}
                    value={phone}
                    name="phone"
                    type="text"
                    placeholder="Enter Phone Number"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Password</label>
                  <input
                    className="form-control"
                    onChange={onChange}
                    value={password}
                    name="password"
                    type="password"
                    placeholder="Enter password"
                    autoComplete="off"
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    className="form-control"
                    onChange={onChange}
                    value={password2}
                    name="password2"
                    type="password"
                    placeholder="Enter password"
                    autoComplete="off"
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-block">
                  Sign Up
                </button>
              </form>
              <br />
              <p>
                Already have an account <Link to="/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
