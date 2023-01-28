import React from 'react'
import Data from './Data'
import { useState } from 'react'
import axios from 'axios';
import carimage from '../img/m1.jpg'
import './main.css'
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

const Form = () => {
     
    
    
    const [price, setPrice] = useState()
    const url = `http://localhost:8000/car/predict/`
    const [data, setData] = useState({
        company: "",
        model: "",
        year: 0,
        fuel_type: "",
        kms_drive: '',
    })
    function changePrice(data) {
        setPrice(data)
    }
    function handle(e) {
        e.preventDefault()
        const updata = { ...data }
        updata[e.target.id] = e.target.value
        setData(updata)
        console.log(updata)

    }
    function submit(e) {
        // console.log('h')
        e.preventDefault();
        axios.post(url, {
            company: data.company,
            model: data.model,
            year: data.year,
            fuel_type: data.fuel_type,
            kms_drive: data.kms_drive,
            price: ''
        }).then(res => {
            changePrice(res.data.price)
            console.log(res.data)
        })
    }
    return (
        <section className="vh-100" style={{ backgroundColor: '#eee' }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div className="card text-black" style={{ borderRadius: '25px' }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                        <p className="text-center h1  mb-5 mx-1 mx-md-4 mt-4">Predict Price</p>

                                        <form className="mx-1 mx-md-4" onSubmit={(e) => submit(e)}>

                                            <div className="form-outline mb-4">
                                                <select value={data.company} id="company" onChange={(e) => handle(e)} className="form-select" aria-label="Default select example">
                                                    <option selected>Please select Car company</option>
                                                    {Data.map((val, id) => {
                                                        return (
                                                            <option key={id} value={val.company}>{val.company}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <select value={data.name} id="model" onChange={(e) => handle(e)} className="form-select" aria-label="Default select example">
                                                    <option selected>Please select Car Model</option>
                                                    {Data.map((val, id) => {
                                                        return (
                                                            <option key={id} val={val.name}>{val.name}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <select value={data.year} id="year" onChange={(e) => handle(e)} className="form-select" aria-label="Default select example">
                                                    <option selected>Please select Year of Purchase</option>
                                                    {Data.map((val, id) => {
                                                        return (
                                                            <option key={id} val={val.year}>{val.year}</option>
                                                        )
                                                    })}
                                                </select>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <select value={data.fuel_type} id="fuel_type" onChange={(e) => handle(e)} className="form-select" aria-label="Default select example">
                                                    <option selected>Please select Fuel type</option>
                                                    <option value="Petrol">Petrol</option>
                                                    <option value="Diesel">Diesel</option>
                                                </select>
                                            </div>

                                            <div className="form-outline mb-4">
                                                <input type="number" id="kms_drive" value={data.kms_drive} onChange={(e) => handle(e)} placeholder='Enter Number of Kms' className="form-control" />
                                            </div>
                                            <div className='form-outline mb-4'>
                                                {price}
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" className="btn btn-primary btn-lg">Check Price</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src={carimage}
                                            className="img-fluid" alt="Sample image" />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Form