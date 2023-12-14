import { useState } from "react";
import { useEffect } from "react";

export default function SignUpForm({setToken}){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState(null);
    const [errors, setErrors] = useState({});
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (Object.keys(errors).length === 0 && submitting) {
            signUp();
        }
    }, [errors]);

    const validateForm =() => {
        const errors =[]

        if (username.length >6){
            setError("Username must be 6 characters");
            
       }
         if (password.length >12){
               setError("Password must be 12 characters");
               
           }
           return errors
        
       

    }

    async function handleSubmit(event){
        event.preventDefault();
        setErrors(validateForm)
        setSubmitting(validateForm)
        console.log("Hello ");

       
        
        try{
            const response =await fetch(
                "https://fsa-jwt-practice.herokuapp.com/signup",
                {
                    method:"POST",
                    headers:{"Content-Type": "application/json"},
                    body: JSON.stringify({
                        username:{username},
                        password:{password}
                    })
                   
                })
                const result = await response.json();
                setToken(result.token)
                setUsername("")
                setPassword("")
                console.log(result)
                
        
        }catch (error){
        setError(error.message);
        }
    }
    

    return (
        <>
        <h2>Sign Up</h2>

    <form onSubmit={handleSubmit}> 
        <label>Username: 
      <input 
      value={username}
      onChange={(e) => 
        setUsername(e.target.value)
    } 
    required
    />
     </label>

     <label>
     Password:
      <input 
      type="password"
      value={password}
      onChange={(e) => 
        setPassword(e.target.value)
    }
    required
     />
     </label>

     <button>Submit</button>
    </form>

    {Object.keys(errors).length === 0 && submitting ? (
                    <span className="success">Successfully submitted </span>
                ) : null}

                {errors.username ? <p className="error">{errors.username}</p> : null}
                {errors.password ? <p className="error">{errors.password}</p> : null}
    </>
    );
}
