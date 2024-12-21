import React, { useState, useRef } from 'react'
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import axios from "axios";
import Vallidations from './Vallidations';
import { IsNumberKey, IsAlphabetKey, IsAlphabetNumber, IsEmail, IsNumberDecimalKey } from './Vallidations';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

const Register = () => {
    const navigate = useNavigate();
    const toast = useRef(null);

    const validationSchema = Yup.object().shape({
        Username: Yup.string()
            .required('Username is required')
            .min(6, 'Username must be at least 6 characters')
            .max(50, 'Username cannot be greater than 50 characters'),

        Role: Yup.string()
            .required('Role is required'),

        EmailId: Yup.string()
            .required('Email is required')
            .email('Invalid email address')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                'Invalid email format'
            ),
        Password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
            )
    });

    const { control, register, handleSubmit, setValue, getValues, clearErrors, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    });

    const handleRegistration = async (data, e) => {
        const param = {
            "action": "I",
            "id": 0,
            "username": data.Username,
            "emailId": data.EmailId,
            "role": data.Role,
            "password": data.Password
        }

        await axios({ url: "http://localhost:8082/api/Document/IUDUserRegistration", method: "POST", data: param, })
            .then(response => {
                response = response;

                if (response.data < 0) {
                    toast.current.show({ severity: "error", summary: "Failed", detail: "Email Id is Already Registered", life: 1000, });
                }
                else {
                    setValue("username", "")
                    setValue("emailId", "")
                    setValue("role", "")
                    setValue("password", "")
                    toast.current.show({ severity: "success", summary: "Registered", detail: "Email Id Registered Successfully", life: 1000, });
                    setTimeout(() => {
                        navigate("/Login");
                    }, 3000);

                }

            })
            .catch(e => {
                console.error("Error adding data:", e);
            });
    }

    const handleCancel = () => {
        navigate("/Login");
    }
    return (
        <>
            <Toast ref={toast} position="top-center" className="p-toast" />
            <form onSubmit={handleSubmit(handleRegistration)}>
                <h2 style={{ textAlign: 'center' }}>Register</h2>
                <div className="mb-3">
                    <label className="form-label" htmlFor="Username">Username</label>
                    <input type="text" id="Username" className="form-control" maxLength={50} onKeyPress={IsAlphabetKey} {...register('Username')} />
                    {errors.Username && <p style={{ color: 'red' }}>{errors.Username.message}</p>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="EmailId">Email Id</label>
                    <input type="text" id="EmailId" className="form-control" maxLength={50} onKeyPress={IsEmail} {...register('EmailId')} />
                    {errors.EmailId && <p style={{ color: 'red' }}>{errors.EmailId.message}</p>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="Role">Role</label>
                    <select className="form-select" name="Role" id="Role"  {...register('Role')}>
                        <option value="">--Select Role--</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                    </select>
                    {errors.Role && <p style={{ color: 'red' }}>{errors.Role.message}</p>}
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="Password"> Password</label>
                    <input type="password" id="Password" className="form-control" maxLength={50} {...register('Password')} />
                    {errors.Password && <p style={{ color: 'red' }}>{errors.Password.message}</p>}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <button type="submit" style={{ padding: '10px 20px', cursor: 'pointer' }}> Register </button>
                    <button type="button" className="cancelbtn" style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#f44336', color: '#fff' }} onClick={handleCancel}> Cancel </button>
                </div>
            </form>
        </>
    )
}

export default Register;