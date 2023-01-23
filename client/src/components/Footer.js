import { Container } from 'react-bootstrap';

function Footer() {
    const footLink = [["Twitter", "https://twitter.com/TutorsGeek"], ["Linkedin", "https://www.linkedin.com/in/geek-tutor-8266a6240/"], ['Github', "https://github.com/MickieBurch/GeekTutors"], ['Facebook', "https://www.facebook.com/GeekTutors-100256876053624"]]

    function Array(link) {
        return <li className='footer-links' key={link[0]}><a href={link[1]} className='footer-a'>{link[0]}</a></li>
    }

    return (
        <footer>
            <nav className='pt-2'>
                <ul className='d-flex justify-content-center'>
                    {footLink.map(link => Array(link))}
                </ul>
            </nav>
      
            <Container fluid className='p-1 text-center'>
                <span className='footer-div bold-text'> &copy; GeekTutor 2022 - (we are not actually copyrighted. This is for demo purposes)</span>
                <br />
                <span className='footer-div'><a className='footer-a' href="https://www.flaticon.com/free-icons/nerd" title="nerd icons">Nerd icons created by Freepik - Flaticon</a></span>
            </Container>
        </footer>
    )
};

export default Footer;