import "./Footer.css"

const Footer = () => {
    return (
        <footer>
            <div className="AreYouAddicted">
                <img src="./Photo/logo.jpg" alt="" />
                <p>
                    Are You Addicted is an educational resource. If you need medical
                    support, please go to psychologist, emergency services, or a
                    crisis line immediately.
                </p>
                <div>
                    <p>
                        &copy; Are You Addicted . <a href="">Member Login </a>.
                        <a href="">See Rewiews </a>.<a href="">Take The Test </a>
                    </p>
                </div>
                <div className="Social">
                    <ion-icon name="logo-facebook"></ion-icon>
                    <ion-icon name="logo-instagram"></ion-icon>
                    <ion-icon name="logo-google"></ion-icon>
                </div>
            </div>
            <div className="FooterList">
                <h3>Are You Addicted</h3>
                <a href="">Take Our Quiz</a>
                <a href="">Reviews</a>
                <a href="">Log In</a>
            </div>
            <div className="FooterList">
                <h3>Resources</h3>
                <a href="">Article</a>
                <a href="">Videos</a>
                <a href="">Podcast</a>
                <a href="">Hobbies</a>
            </div>
            <div className="FooterList">
                <h3>Connect</h3>
                <a href="">Project Chef</a>
                <a href="">Our Team</a>
                <a href="">About Us</a>
                <a href="">Contact Us</a>
            </div>
        </footer>
    )
}

export default Footer