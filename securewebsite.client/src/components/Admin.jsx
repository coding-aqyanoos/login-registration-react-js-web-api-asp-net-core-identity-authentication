import { useEffect, useState } from 'react';

function Admin() {

    document.title = "Admin";
    const [partners, setPartners] = useState([]);

    useEffect(() => {

        fetch("api/SecureWebsite/admin", {
            method: "GET",
            credentials: "include"
        }).then(response => response.json()).then(data => {
            setPartners(data.trustedPartners);
            console.log("trustedPartners: ", data.trustedPartners);
        }).catch(error => {
            console.log("Error home page: ", error);
        });
    }, []);
    return (
        <section className='admin-page page'>
            <header>
                <h1>Admin page</h1>
            </header>
            <section>
                {
                    partners ?
                        <div>
                            <div>Our trusted partners are:</div>
                            <ol>
                                {partners.map((partner, i) => <li key={i}>{partner}</li>)}
                            </ol>
                        </div>
                        :
                        <div className='waiting-page'>
                            <div>Waiting...</div>
                        </div>
                }
            </section>
        </section>
    );
}

export default Admin;