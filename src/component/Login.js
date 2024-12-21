import React, { useState, useEffect, useRef } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios";
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";
import Product from "./Product";
import image_manit from '../assets/image_manit.jpg'

const Login = () => {
    const [user, setuser] = useState([])
    const navigate = useNavigate();
    const { control, register, handleSubmit, setValue, getValues, clearErrors, formState: { errors } } = useForm({
        //defaultValues: state,
    });
    const toast = useRef(null);

    const handleRegistration = async (data, e) => {
        await axios.get("http://localhost:8082/api/Document/GetUsers", {
            params: { Id: 0 }
        })
            .then(response => {
                setuser(response.data.users);
                setValue("res", response.data.users)
            })
            .catch(e => console.error("Error fetching documents:", e));

        let res = getValues("res")
        let NotregisteredUser = res.filter(r => (r.EmailId != data.EmailId) && (r.Password != data.Password))
        let registeredUser = res.filter(r => (r.EmailId == data.EmailId) && (r.Password == data.Password))
        let wrongEmailId = res.filter(r => (r.EmailId != data.EmailId) && (r.Password == data.Password))
        let wrongPassword = res.filter(r => (r.EmailId == data.EmailId) && (r.Password != data.Password))

        if (registeredUser.length > 0) {
            toast.current.show({ severity: "success", summary: "Logged In", detail: "Logged In Successfully", life: 3000, });
            navigate("/Product");
        }
        else if (wrongEmailId.length > 0) {
            toast.current.show({ severity: "error", summary: "Wrong Email", detail: "Wrong Email", life: 3000, });
        }
        else if (wrongPassword.length > 0) {
            toast.current.show({ severity: "error", summary: "wrong Password", detail: "wrongPassword", life: 3000, });

        }
        else if (NotregisteredUser.length > 0) {
            toast.current.show({ severity: "error", summary: "Failed", detail: "User is not Registered", life: 3000, });
        }
        else {
            toast.current.show({ severity: "error", summary: "Failed", detail: "User is not Registered", life: 3000, });
        }
    }

    return (
        <>
            <Toast ref={toast} position="top-center" className="p-toast" />
            <div className='row'>
                <div className="col-lg-6">
                    <img src={image_manit} alt='kk'></img>
                </div>
                <div className="col-lg-6">
                    <form onSubmit={handleSubmit(handleRegistration)}>
                        <h2 style={{ textAlign: 'center' }}>Login</h2>
                        <div className="mb-3">
                            <label className="form-label" htmlFor="EmailId">Email Id</label>
                            <input type="text" id="EmailId" className="form-control" maxLength={50} {...register('EmailId', { required: 'EmailId is required' })} />
                            {errors.EmailId && <p style={{ color: 'red' }}>{errors.EmailId.message}</p>}
                        </div>

                        <div className="mb-3">
                            <label className="form-label" htmlFor="Password"> Password</label>
                            <input type="password" id="Password" className="form-control" maxLength={50} {...register('Password', { required: 'Password is required' })} />
                            {errors.Password && <p style={{ color: 'red' }}>{errors.Password.message}</p>}
                        </div>

                        {/* <div className="mb-3">
                    <label className="form-label" htmlFor="remember"> Remember Me</label>
                    <input type="checkbox" id="remember" className="form-check-input" {...register('remember')} />
                </div> */}

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}> Login </button>
                            {/* <button type="button" className="cancelbtn" style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f44336', color: '#fff' }} > New User </button> */}
                            <a href='/Register'>New User</a>
                            <a href='/ForgetPassword'>Forgot Password</a>
                        </div>


                    </form>
                </div>
            </div>
        </>
    )
}

export default Login;