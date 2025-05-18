import React, { useCallback, useState, useEffect } from 'react'
import DomPurify from 'dompurify'

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [errors, setErrors] = useState({})
  const [isFormValid, setIsFormValid] = useState(false)
  const [submittedData, setSubmittedData] = useState(null)
  const [showPassword, setShowPassword] = useState(false)

  const sanitize = (value) => DomPurify.sanitize(value)

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: sanitize(value.trim())
    }))
  }


  const validateForm = useCallback(() => {
    let isvalid = true;
    const newError = {};

    if (!formData.name) {
      newError.name = 'Name is Required';
      isvalid = false;
    }


    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email) {
      newError.email = 'Email is Required';
      isvalid = false;
    } else if (!emailPattern.test(formData.email)) {
      newError.email = 'Email should be correct';
      isvalid = false;
    }


    const passwordPattern = /(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])/;
    if (!formData.password) {
      newError.password = 'Password is Required';
      isvalid = false;
    } else if (!passwordPattern.test(formData.password)) {
      newError.password = 'Password should contain at least one uppercase letter, one digit, and one special character (!@#$%&)';
      isvalid = false;
    }

    setErrors(newError);
    setIsFormValid(isvalid);
  }, [formData]);


  useEffect(() => {
    validateForm()
  }, [formData, validateForm])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isFormValid) {
      setSubmittedData(formData)
      setFormData({ name: "", email: "", password: "" })
    }
  }

  return (
    <div className='bg-gray-500 h-screen'>
      <div className='flex flex-col justify-center items-center bg-gray-300 min-h-screen'>
        <h2 className='text-4xl font-bold '>Registration Form</h2>
        <form className='flex flex-col items-center border-2 border-black text-2xl mt-4 w-[500px] h-auto' onSubmit={handleSubmit}>
          <input className='text-3xl font-bold w-full mt-4 h-[50px]' required type='text' name='name' placeholder='Enter Name' value={formData.name} onChange={handlechange} />
          {errors.name ? <div className='text-red-700 font-bold'>{errors.name}</div> : null}
          <input className='text-3xl font-bold w-full mt-4 h-[50px]' type='email' required name='email' placeholder='Enter email' value={formData.email} onChange={handlechange} />
          {errors.email ? <div className='text-red-700 font-bold'>{errors.email}</div> : null}
          <input className='text-3xl font-bold w-full mt-4 h-[50px]' name='password' required type={showPassword ? "text" : "password"} placeholder='Enter Password' value={formData.password} onChange={handlechange} />
          {errors.password ? <div className='text-red-700 font-bold'>{errors.password}</div> : null}
          <button className='bg-green-700 w-[150px] h-[50px] rounded-4xl font-bold mt-9 cursor-pointer mb-4' type='submit'>Submit</button>
          {submittedData && (<div className='mt-4 flex flex-col items-center' >
            <div className='text-orange-500 font-bold mb-4'>Success🚀</div>
            <div className='font-bold '>Name : {submittedData.name}</div>
            <div className='font-bold '>Email : {submittedData.email}</div>
            <div className='font-bold mb-4' >Password : {submittedData.password}</div>
          </div>)}
        </form>

      </div>
    </div>
  )
}

export default App