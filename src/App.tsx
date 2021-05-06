import React from 'react';
import {NavBar} from './components/NavBar'

function App() {
  return (
    <div className="App">
        <header>
            <NavBar/>
        </header>
        <main>
            <section id="gallery">
            </section>
            <section id="about">
                <h2>Who We Are</h2>
                <h3>Forget party planning. We specialize in the art of event reinvention.</h3>
                <p>At Eventify, we do more than just event planning or event management. We take a stuffy corporate meeting or conference and make it feel like the only event in town. Not only do we personally handle all logistics and organization, but we also seamlessly blend that with carefully thought-out event concepts that engage your clients and employees. A modern art affair, a carnival-themed seminar, a Latin nightclub reception – we’ve done them all. Because as a leading full-service destination management company (DMC), we don’t just create programs; we create experiences.</p>
                <p>At Eventify, “Built Around You” isn’t just a tagline. It’s our DNA.</p>
                <p>We have the talent, tools, and drive that you expect to turn your event into an unforgettable experience.</p>
            </section>
            <section id="events">
            </section>
            <section id="booking">
            </section>
            <section id="certifications">
            </section>
        </main>
        <footer>
            <div id="contacts">
                <div>
                    <img src="https://img.icons8.com/dusk/64/000000/christmas-star.png" alt="Eventify" className="logo"/>
                    <a href="#"><p>Eventify</p></a>
                    <div>
                        <p>Adress</p>
                        <p>Schedule</p>
                        <p>Phone and email</p>
                    </div>
                </div>
                <div className="quick-links">

                </div>
            </div>
            <div className="copyright">
                <p>Copyright © 2021 Eventify,  All rights reserved.</p>
                <p>Website by Kateryna Pryshchenko</p>
            </div>
        </footer>
    </div>
  );
}

export default App;
