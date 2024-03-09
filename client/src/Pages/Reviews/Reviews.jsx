import './Reviews.css'
import React from "react";
import data from "./data/data"
import Card from "./Reviewscard"
import DocCard from './DoctorsCard';
import doctors from './data/doctors';
import QuieRev from './QuizRev';
import RevImg from './data/RevImg';




function Reviews() {
    function reveal() {
        var reveals = document.querySelectorAll(".Cartes");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            var elementVisible = 150;
            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add("active");
            } else {
                reveals[i].classList.remove("active");
            }
        }
    }
    const ReviewsQuiz = RevImg.map(item => {
        return (
            <QuieRev
                key={item.id}
                img={item.img}
            />
        )
    })

    const Reviewscards = data.map(item => {
        return (
            <Card
                key={item.id}
                title={item.title}
                rating={item.rating}
                description={item.description}
            />
        )
    })
    const DocCards = doctors.map(item => {
        return (
            <DocCard
                key={item.id}
                name={item.name}
                spiciality={item.spiciality}

            />
        )
    })

    return (
        <>

            <main className='Reviews'>

                <section className='IntroToReviews'>
                    <div>
                        <h1>Are You Addicted Reviewrs</h1>
                        <p>Check out reviews directly from our clients.</p>
                        <a href="#Reviews"> See Reviews </a>
                    </div>
                    <div><img src="./Photo/Reviews.png" alt="" /></div>


                </section>
                <section className='SolRev'>
                    <h2>See Some Of Our Usere Reviews</h2>
                    <p>We Give More Than 60 Solution To Quit Game Addition See Them from <a href="">here</a></p>
                    <h1>Client Results</h1>
                    <div className='ReviewsImg'>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                        <div><img src="" alt="" /></div>
                    </div>
                    <div className='Background'><img src="./Photo/Sol.jpg" alt="" /></div>

                </section>
                <section className='QuizRev'>

                    <div className='Background'><img src="./Photo/Qcm.png" alt="" /></div>
                    <div className='QuiZRevBody'>

                        <h2>Quiz Reviews</h2>
                        <p>If You Want To Take The Quiz Click <a href="">here</a></p>
                        <h1>Client Results</h1>

                        <div className='ReviewsImg'>
                            {ReviewsQuiz}
                        </div>


                    </div>


                </section>
                <section className='DoctorRev'>
                    <h2>Our Doctors</h2>
                    <p>Give Us You Reviews Or Contact Our Doctor Here </p>

                    <div className="Title"><h1>DocTors</h1>
                        <hr /></div>

                    <div className='DoctorCards'>
                        {DocCards}
                    </div>


                </section>
                <section className='ydkomfih'>
                    {Reviewscards}
                    <div className='AddReview'>
                        <ion-icon name="chatbox-ellipses"></ion-icon><input type="text" placeholder='Add Comment' /><ion-icon name="paper-plane"></ion-icon>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Reviews;