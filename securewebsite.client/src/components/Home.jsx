import { useEffect, useState } from 'react';

function Home() {

    document.title = "Welcome";
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        const user = localStorage.getItem("user");
        fetch("api/SecureWebsite/home/" + user, {
            method: "GET",
            credentials: "include"
        }).then(response => response.json()).then(data => {
            setUserInfo(data.userInfo);
            console.log("user info: ", data.userInfo);
        }).catch(error => {
            console.log("Error home page: ", error);
        });
    }, []);
    return (
        <section className='page'>
            <header>
                <h1>Welcome to your page</h1>
            </header>
            {
                userInfo ?
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Created Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{userInfo.name}</td>
                                    <td>{userInfo.email}</td>
                                    <td>{userInfo.createdDate ? userInfo.createdDate.split("T")[0] : ""}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div> :
                    <div className='warning'>
                        <div>Access Denied!!!</div>
                    </div>
            }
        </section>
    );
}

export default Home;