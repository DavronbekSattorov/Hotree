import React, { useEffect, useState } from 'react';
import { IState as Props} from '../App';
import categories from '../data/categories.json';
import employees from '../data/employees.json';



interface IProps {
    event: Props['event']
    setEvent: React.Dispatch<React.SetStateAction<Props['event']>>
    setFormFilled: React.Dispatch<React.SetStateAction<boolean>>
}

interface Category {
    id: number,
    name: string
}

interface Employee {
    id: number
    name: string
    lastname: string
}


const Form: React.FC<IProps> = ({event, setEvent, setFormFilled}) => {

    const [categoriesList, setCategories] = useState<Category[]>(categories);
    const [employeesList, setEmployee] = useState<Employee[]>(employees);
    const [errorMessage, setErrorMessage] = useState('');
    const [charCount, setCharCount] = useState(0);
    const [eamilCheck, setEmailCheck] = useState(/^[^ ]+@[^ ]+\.[a-z]{2,3}$/);
    const [hide, setHide] = useState('hide');


    const [input, setInput] = useState({
        title: '',
        description: '',
        category_id: '',
        paid_event: false,
        event_fee: '',
        reward: '',
        date: '', // format: YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
        time:'',
        duration: '', // in seconds
        email: '',
        id: ''
        
    })

    
    const handleOnChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>):void => {

        if(e.target.name === 'description' && e.target.value.length <= 140) {
            setCharCount(e.target.value.length)
            setInput({
                ...input,
                [e.target.name] : e.target.value
            })
        } else if(!(e.target.name === 'description')) {
            if(e.target.name === 'email') {
                e.target.value.match(eamilCheck) ? setHide('hide') : setHide('');
            }
            setInput({
                ...input,
                [e.target.name] : e.target.value
            })
        }
    }


    const handleClick = ():void => {
        
        if(
            !input.title ||
            !input.description ||
            !input.category_id ||
            !input.date ||
            !input.time

           
        ) { 
            setErrorMessage('emptyInput');
            setInput({
                title: input.title,
                description: input.description,
                category_id: input.category_id,
                paid_event: input.paid_event,
                event_fee: input.event_fee,
                reward: input.reward,
                date: input.date, // format: YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
                time: input.time,
                duration: input.duration, // in seconds
                email: input.email,
                id: input.id
                
            })
        }
        else {
            setErrorMessage('')
            setEvent([
                ...event,
                {
                    title: input.title,
                    description: input.description,
                    category_id: parseInt(input.category_id),
                    paid_event:Boolean(input.paid_event),
                    event_fee: parseInt(input.event_fee),
                    reward: parseInt(input.reward) ,
                    date: input.date + 'T' + input.time, // format: YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
                    duration: parseInt(input.duration) , // in seconds
                    coordinator: {
                        email: input.email,
                        id: input.id
                    }
                }
            ])
            setInput({
                title: '',
                description: '',
                category_id: '',
                paid_event: false,
                event_fee: '',
                reward: '',
                date: '', // format: YYYY-MM-DDTHH:mm (example: 2018-01-19T15:15)
                time:'',
                duration: '', // in seconds
                email: '',
                id: '3'
                
            })

            setFormFilled(true);
        }  
    }

    
    return(
        <div className="form-container">
            
            <div className="box">
                <p className="title">About</p>
                <div className= {`input-box ${input.title === '' && errorMessage}`}>
                    <label htmlFor="">TITLE <span className='required'>*</span></label>
                    <input 
                        className="input-special" 
                        type="text" 
                        placeholder="Make it short and clear"
                        name='title'
                        value={input.title}
                        onChange={handleOnChange}
                    />

                    {
                        errorMessage && input.title === '' && <div className='errorMessage'>Title can not be empty</div>
                    }
                    
                </div>
                <div className={`input-box ${ input.description === '' && errorMessage}`}>
                    <label htmlFor="">DESCRIPTION <span className='required'>*</span></label>
                    <textarea  
                        name="description" 
                        id=""  
                        rows={5} 
                        placeholder='Write about your event, be creative'
                        value={input.description}
                        onChange={handleOnChange}
                        
                    > </textarea>
                    <div className='tips'>
                        <p>Max length 140 characters</p>
                        <p>{charCount}/140</p>
                    </div>
                    {
                        errorMessage && input.description === '' && <div className='errorMessage'>Description can not be empty</div>
                    }
                </div>
                <div className="input-box">
                    <label htmlFor="">CATEGORY</label>
                    <select className="input-special" name="category_id"  onChange={handleOnChange}   value={input.category_id}>
                         <option disabled defaultValue = {'dsa'} value="" >Select category (skills, interests, locations)</option> 
                        {
                          categoriesList.map(cat =>  <option value={cat.id} key={cat.id}>{cat.name}</option> )
                        }
                    </select>
                    <div className='tips'>
                        <p>Describes topic and people whoshould be interested in this event</p>
                        
                    </div>
                </div>
                <div className="input-box">
                    <label htmlFor="">PAYMENT</label>
                
                    <input type="radio" name='paid_event' onChange={handleOnChange} value='' />
                    <label htmlFor="" className="radio-label"  >Free event</label>

                    <input type="radio" name='paid_event'  onChange={handleOnChange} value='true'/>
                    <label htmlFor="" className="radio-label">Paid event</label>
                    {
                        Boolean(input.paid_event) && <><input type="number" name='event_fee' value={input.event_fee} className="number-input" placeholder='Fee' onChange={handleOnChange} /> <span>$</span></>
                    }
                    
                </div>

                <div className="input-box">
                    <label htmlFor="">REWARD</label>
                    <input 
                        className="number-input"
                        type="number" 
                        placeholder="Number"
                        name='reward'
                        value={input.reward}
                        onChange={handleOnChange}
                    />
                    <span>reward points for attendance</span>
                </div>
            </div>

            <div className="box">
                <p className="title">Coordinator</p>
                <div className={`input-box ${input.id === '' && errorMessage}`}>
                    <label htmlFor="">RESPONSIBLE <span className='required'>*</span></label>
                    <select className="input-special" name="id" onChange={handleOnChange} value={input.id}  >
                        {
                          employeesList.map(emp =>  <option value={emp.id} key={emp.id} >{emp.name } {emp.lastname}</option> )
                        }
                    </select>

                    {
                        errorMessage && input.id === '' && <div className='errorMessage'>Responsible can not be empty</div>
                    }
                </div>
                <div className="input-box">
                    <label htmlFor="">EMAIL</label>
                    <input 
                        className="input-special" 
                        type="email" 
                        placeholder="Email"
                        name='email'
                        value={input.email}
                        onChange={handleOnChange}
                    />
                    <div className={`emailCheck ${hide}`}>
                        <p>Please type valid email</p>
                    </div>
                </div>
            </div>

            <div className="box">
                <p className="title">When</p>
                <div className={`input-box ${input.date === '' &&  errorMessage}`}>
                    <label htmlFor="" >STARTS ON <span className='required'>*</span></label>
                    <input type="date" className="time" name='date' onChange={handleOnChange}  value={input.date}/>
                    <span className="at">at</span>
                    <input type="time" className="time" name='time' onChange={handleOnChange} value={input.time} max = {'12:00'} min={'00:00'} required/>
                    <span className="at"></span>

                    <input type="radio" onChange={handleOnChange} name = 'T'/>
                    <label htmlFor="" className="radio-label" style={{paddingTop: '4px'}} >AM</label>

                    <input type="radio"  onChange={handleOnChange} name = 'T'/>
                    <label htmlFor="" className="radio-label" style={{paddingTop: '4px'}}>PM</label>

                    {
                        errorMessage && input.date === ''  && <div className='errorMessage'>Starts on can not be empty</div>
                    }
                </div>
                <div className="input-box">
                    <label htmlFor="">DURATION</label>
                    <input
                        className="number-input" 
                        type="number" 
                        placeholder="Number"
                        name='duration'
                        value={input.duration}
                        onChange={handleOnChange}
                    />
                    <span>hour</span>
                </div>
            </div>
            <div className="publish">
                <button onClick={handleClick}>PUBLISH EVENT</button>
            </div>
        

        </div>
    )
}

export default Form;