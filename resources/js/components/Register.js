import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Cookie from 'js-cookie';

function Register() {
    const [input, setInput] = useState({})

    const handleChange = e => {
        setInput({...input, [e.target.id]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-XSRF-Token': Cookie.get('XSRF-TOKEN')
            },
            body: JSON.stringify(input)
        })
        .then(res => {
            /* if(!res.ok){
                throw new Error
            } */
            console.log('1')
            console.log(res.json())
            return res.json()
        })
        .then(res => {
            console.log('ok')
            console.log(res)
        })
        .catch(e => {
            console.log('hiba')
            console.log(e)
        })
    }

    useEffect(()=> {
        fetch('/sanctum/csrf-cookie')
    }, [])

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6 col-lg-4">
                    <div className="card">
                        <div className="card-header">Regiszráció</div>

                        <form className="card-body" onSubmit={handleSubmit}>
                            <div className="row g-4">
                                <div className='col-12'>
                                    <label htmlFor="name" className="form-label">Név</label>
                                    <input type="text" id="name" className="form-control" onChange={e => handleChange(e)} value={input.name}/>
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="text" id="email" className="form-control" onChange={e => handleChange(e)} value={input.email}/>
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="password" className="form-label">Jelszó</label>
                                    <input type="text" id="password" className="form-control" onChange={e => handleChange(e)} />
                                </div>
                                <div className='col-12'>
                                    <label htmlFor="password_confirmation" className="form-label">Jelszó mégegyszer</label>
                                    <input type="text" id="password_confirmation" className="form-control" onChange={e => handleChange(e)} />
                                </div>
                                <div className='col-12 text-center'>
                                    <button className="btn btn-success">Küldés</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;

if (document.getElementById('root')) {
    ReactDOM.render(<Register />, document.getElementById('root'));
}
