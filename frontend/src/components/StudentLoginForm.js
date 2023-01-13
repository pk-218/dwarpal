import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useForm } from "react-hook-form";

const StudentLoginForm = () => {
    const [userData, setUserData] = useState({
        reg_id: '',
        email: ''
    })

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    console.log(errors)

    function preventNonNumericalInput(e) {
        e = e || window.event;
        var charCode = (typeof e.which == "undefined") ? e.keyCode : e.which;
        var charStr = String.fromCharCode(charCode);

        if (!charStr.match(/^[0-9]+$/))
            e.preventDefault();
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(userData)
    }

    return (
        <>
            <div className='container'>
                <div className='login-container'>
                    <div className='form-container'>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Registration ID</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Registration Id"
                                    {...register("regId", {
                                        required: 'This is required.', minLength: {
                                            value: 9,
                                            message: 'The registration id should be 9 digits.'
                                        }, maxLength: {
                                            value: 9,
                                            message: 'The registration id should be 9 digits.'
                                        },
                                        pattern: /[0-9]*/
                                    })}
                                    value={userData.reg_id}
                                    onChange={(e) => setUserData({ ...userData, reg_id: e.target.value })}
                                    onKeyPress={e => preventNonNumericalInput(e)}
                                    required />
                                <Form.Text className="text-muted">
                                    {errors.regId?.message}
                                </Form.Text>
                                <div className="invalid-feedback">
                                    {errors.regId?.message}
                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>VJTI Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="VJTI Email Address"
                                    {...register("email", {
                                        required: 'This is required.',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._]+_[a-z][0-9]+@[a-z]{2,4}\.vjti\.ac\.in$/,
                                            message: 'Please enter a valid VJTI email address!'
                                        }
                                    })}
                                    value={userData.email}
                                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                    required />
                                <Form.Text className="text-muted">
                                    {errors.email?.message}
                                </Form.Text>
                            </Form.Group>

                            <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)} className='form-button'>
                                Submit
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default StudentLoginForm