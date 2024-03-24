import { useEffect } from 'react';

function Login() {

    document.title = "Login";

    // dont ask an already logged in user to login over and over again
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            document.location = "/";
        }
    }, []);

    return (
        <section className='login-page-wrapper page'>
            <div className='login-page'>
                <header>
                    <h1>Login Page</h1>
                </header>
                <p className='message'></p>
                <div className='form-holder'>
                    <form action="#" className='login' onSubmit={loginHandler}>
                        <label htmlFor="email">Email</label>
                        <br />
                        <input type="email" name='Email' id='email' required />
                        <br />
                        <label htmlFor="password">Password</label>
                        <br />
                        <input type="password" name='Password' id='password' required />
                        <br />
                        <input type="checkbox" name='Remember' id='remember' />
                        <label htmlFor="remember">Remember Password?</label>
                        <br />
                        <br />
                        <input type="submit" value="Login" className='login btn' />
                    </form>
                </div>
                <div className='my-5'>
                    <span>Or </span>
                    <a href="/register">Register</a>
                </div>
            </div>
        </section>
    );
    async function loginHandler(e) {
        e.preventDefault();
        const form_ = e.target, submitter = document.querySelector("input.login");

        const formData = new FormData(form_, submitter), dataToSend = {};

        for (const [key, value] of formData) {
            dataToSend[key] = value;
        }

        if (dataToSend.Remember === "on") {
            dataToSend.Remember = true;
        }

        console.log("login data before send: ", dataToSend);
        const response = await fetch("api/securewebsite/login", {
            method: "POST",
            credentials: "include",
            body: JSON.stringify(dataToSend),
            headers: {
                "content-type": "Application/json",
                "Accept": "application/json"
            }
        });

        const data = await response.json();

        if (response.ok) {
            localStorage.setItem("user", dataToSend.Email);
            document.location = "/";
        }

        const messageEl = document.querySelector(".message");
        if (data.message) {
            messageEl.innerHTML = data.message;
        } else {
            messageEl.innerHTML = "Something went wrong, please try again";
        }

        console.log("login error: ", data);
    }
}

export default Login;