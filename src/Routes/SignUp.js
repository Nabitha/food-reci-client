import { useState } from "react";
import { useHistory } from "react-router";
import postData from "../Services/postData";

const SignUp = ({history}) => {

    const[otpScreenVisibility,setOtpScreenVisibility] = useState(false);
    const[errorText,setErrorText] = useState("");
    const[userData,setUserData] = useState({
        userName: "",
        name:"",
        email: "",
        phone : "",
        password: "",
        confirmPassword: ""
    });

    const {
        userName,
        name,
        email,
        phone,
        password,
        confirmPassword
    } = userData;


    if(localStorage.getItem("user")){
        history.push("/food-reci");
        return <></>;
    }

    const signup_call = (e) =>{
        e.preventDefault();
        setErrorText("");
        if(!userName ||
            !name ||
            !email ||
            !password ||
            !confirmPassword){
                setErrorText("Please fill all required fields");
                return;
        }
        if(password !== confirmPassword){
            setErrorText("Password deos not match the confirm password!");
            return;
        }
        postData("/signup",userData)
        .then(result=>{
            if(!result.status){
                setErrorText(result.data);
                return;
            }
            setOtpScreenVisibility(true);
        })

    }

    const on_change = (value,key)=>{
        setUserData((prev)=>(
            {
                ...prev,
                [key] : value
            }
        ))
    }

    return (
        <div className="login-section">
            <h1>Sign Up</h1>
            <form onSubmit={signup_call}>

                <div className="form-field">
                    <label>Name</label>
                    <input type="text"
                        placeholder="Name"
                        value={name}
                        onChange={e => {
                            on_change(e.target.value,"name")
                            }
                        }
                    />
                </div>

                <div className="form-field">
                    <label>User Name</label>
                    <input type="text"
                        placeholder="User Name"
                        value={userName}
                        onChange={e => {
                            on_change(e.target.value,"userName")
                            }
                        }
                    />
                </div>

                <div className="form-field">
                    <label>Email</label>
                    <input type="text"
                        placeholder="Email"
                        value={email}
                        onChange={e => {
                            on_change(e.target.value,"email")
                            }
                        }
                    />
                </div>

                <div className="form-field">
                    <label>Phone</label>
                    <input type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={e => {
                            on_change(e.target.value,"phone")
                            }
                        }
                    />
                </div>

                <div className="form-field">
                    <label>Password</label>
                    <input
                        type="password"
                        placeholder="Password" 
                        value={password}
                        onChange={e => {
                            on_change(e.target.value,"password")
                            }
                        }
                    />
                </div>

                <div className="form-field">
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        placeholder="Confirm Password" 
                        value={confirmPassword}
                        onChange={e => {
                            on_change(e.target.value,"confirmPassword")
                            }
                        }
                    />
                </div>
                



                <div className="form-error-text">{errorText}</div>
                <button type="submit">Sign Up</button>
            </form>           
            {otpScreenVisibility && <OtpWindow phone={phone}/>}
        </div>
    )
}


const OtpWindow = ({phone})=>{
    const history = useHistory();
    const [otp, setOtp] = useState("");
    const[errorText,setErrorText] = useState("");
    const submit_otp = (e)=>{
        e.preventDefault();
        setErrorText("");
        postData("/signup/otp-verification",{otp,phone})
        .then((responce)=>{
            if(!responce.status){
                setErrorText(responce.data);
                return;
            }
            history.push("/login");
        })

    }

    return(
        <div>
            <h1>OTP</h1>
            <form onSubmit={submit_otp}>
                <input
                value={otp}
                type="text"
                onChange={(e)=>{
                    setOtp(e.target.value)
                }}/>
                <button type="submit">Submit</button>
                <div className="form-error-text">{errorText}</div>
            </form>
        </div>
    )
}

export default SignUp
