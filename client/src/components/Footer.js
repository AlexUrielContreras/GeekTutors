import React from 'react';


function Footer() {
    const footLink = [["Twitter", "https://twitter.com/TutorsGeek"], ["Linkedin", "https://www.linkedin.com/in/geek-tutor-8266a6240/"], ['Github', "https://github.com/MickieBurch/GeekTutors"], ['Facebook', "https://www.facebook.com/GeekTutors-100256876053624"]]

    function Array(link) {
        return <li className='border-end border-start' key={link[0]}><a href={link[1]} className='footer-a'>{link[0]}</a></li>
    }


    return (
        <footer className='fixed-bottom'>
        <div>
            <nav>
                <ul className='d-flex justify-content-center mt-5'>
                    {footLink.map(link => Array(link))}
                </ul>
            </nav>
         </div>
        <div className='d-flex justify-content-between mt-4'>
            <div className='ms-3'> Copyright &copy; GeekTutor 2022 - (we are not actually copyrighted. This is for demo purposes)</div>
            <div className='me-3'><a className='footer-a' href="https://www.flaticon.com/free-icons/nerd" title="nerd icons">Nerd icons created by Freepik - Flaticon</a></div>
        </div>
        </footer>
    )
};

export default Footer;