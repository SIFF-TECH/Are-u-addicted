import './About.css'

function About(){
     return(
        <>
        <div className='def'>
            <h1>About our website</h1>
            <h3 className='h33'>'Are you addicted' is a global support community for gamers and families with members from 95 countries.</h3>
        </div>
        <div className='second-part'>
             <h2>GAME QUITTERS IS FEATURED IN...</h2>
             <div className='flex-companys'>
                  <img src="/Photo/small-bbc.png" alt="" />
                  <img src="/Photo/small-vice.png" alt="" />
                  <img src="/Photo/small-forbes.png" alt="" />
                  <img src="/Photo/small-npr.png" alt="" />
                  <img src="/Photo/small-tedx.png" alt="" />
             </div>
              
        </div>
        <div className='secondandhalf-part'><img src="/Photo/pngegg.png" alt="" /></div>
        <div className='third-part'>
            <h1 className='text-sep'>Stop Gaming Issues For Good</h1>
            <h3 className='h333' >Our bespoke 12-week <spam className='spam1'>coaching programs</spam>  are designed to get gaming under control while thriving in life. We accept both individuals and families, including gamers currently in denial.</h3>
            <h3 className='h3333'>"The best decision I have made in my life, honestly." - David</h3>
            <button className='btn1'>Apply for coatching</button>
        </div>

        <div className='fourth-part'>
            <h1 className='text-sep'>How Are You Addicted started</h1>
            <div className='howitstarted'>
                <div className='div1-howitstarted'>
                    <h2 className='h22'>Cam Adair’s Story</h2>
                    <p>A talented hockey player, Cam’s life took a dramatic turn at the age of 11 when he began to experience intense bullying, leading him to drop-out of high school. While all of his friends were off to college, Cam was playing video games up to 16 hours a day. Struggling with depression he wrote a suicide note and it was this night when he made a commitment to change.</p><br />
                    <p>In 2011, Cam shared his story of gaming addiction online and began to hear from tens of thousands of other gamers who were also struggling. He realized he needed to do more to help others and launched Game Quitters, including the forum, YouTube channel and programs.</p><br />
                    <p>Named one of Canada's top 150 leaders in Mental Health, his work has since been published in Psychiatry Research, and featured in two TEDx talks, Forbes, BBC, the New York Times, NPR, CNN, and ABC 20/20, amongst others. His videos on YouTube have over three million views.</p><br />
                    <p>A highly sought after speaker and pioneer, he has spoken at the International Conference on Behavioral Addiction in Japan, Eton College in London, the May Chidiac Foundation in Lebanon, the Mental Health Commission of Canada, and the National Conference on Problem Gambling. He speaks regularly around the world at high schools, universities, parent education nights, and addiction conferences.</p>
                </div>
                <div>
                    <iframe className='iframe1' width="560" height="315" src="https://www.youtube.com/embed/1SCrsWDs5l0?si=mUNRi5ZPwW0vCN5h" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
                    <img className='img1' src="/Photo/cam-adair-about2.jpg" alt="" />
                </div>
            </div>
        </div>
                        

        <div className='fifth-part'>
                        <button className='btn2'>SPECIALISTS IN GAMING</button>
                        <h1 className='text-sep'>Stop Gaming Issues For Good</h1>
                        <div className='div-flex'>
                        <div className="column mb-mid">
                            <img src="/Photo/cam-adair-about4.png" alt="Cam Adair" width="150" height="150" class="alignleft"/>
                            <div className='titls'><button className='btn3'>RECOVERED GAMER</button><button className='btn3'>INTERNATIONAL SPEAKER</button></div>
                            <h3> CAM ADAIR </h3>
                            <p className='about-p'>Cam is the founder of Game Quitters. A former video game addict who played up to 16 hours a day, today he is widely hailed as a leading expert on video game addiction. He speaks regularly around the world to students, parents, and mental health professionals. In 2017, he was named one of Canada's Leaders in Mental Health.</p>
                            <p className="text-sec"> "A leader in the field of gaming addiction long before its official recognition." - Julie Hynes, National Council on Problem Gambling</p>
                        </div>
                        <div className="column mb-mid">
                        <img src="/Photo/squareElaine-Uskoski-1.png" alt="Elaine Uskoski" width="150" height="150" class="alignleft"/>
                        
                        <div className='titls'><button className='btn3'>MOM</button><button className='btn3'>Family coatch</button></div>
                        
                        <h3> ELAINE USKOSKI </h3>
                        <p className='about-p'>Elaine empowers families with the strategies needed to deal with their child’s compulsive behavior with video games. Her son overcame his video game addiction using her background in social service, health and wellness.</p>
                        <p className="text-sec"> "It was good to finally connect with someone who knows precisely what we’re living through and can give real advice and empathy." - Client</p>
                        </div>
                        </div>
        </div>

        <div className='sixth-part'>
        <h1 className='text-sep'>Support & Resources</h1>
         <p>We provide educational content on YouTube, inspiring success stories on our blog, and create a culture of encouragement on the Forum.</p>
        <div className='div' >
            <div>
                <img src="/Photo/cap.png" alt=""  />
                <h1>YouTube Videos</h1>
                <p className='about-p'>Watch our educational content on YouTube, which features over 300 videos on gaming addiction and internet culture.</p>
                <button>Watch Videos</button> 
            </div>
            <div>
                <img src="/Photo/cap.png" alt="" />
                <h1>Peer Forums</h1>
                <p className='about-p'>We offer free support communities for both gamers and parents. We also have a friendly Discord server.</p>
                         
            </div>
            <div>
                <img src="/Photo/cap.png" alt="" />
                <h1>Articles</h1>
                <p className='about-p'>Learn the latest research on gaming and social media addiction, staying safe online and tutorials to delete gaming accounts.</p>
                <button>Go to blogs</button>
            </div>
        </div>
        </div>

        <div className='seventh-part'>
        <h1 className='text-sep'>More Questions?</h1>
         <p className='about-p'>Need help or just want to send us a note? We love to hear directly from you.</p>
        <div className='div' >
            <div>
                <img src="/Photo/cap.png" alt="" />
                <h1>Contact Us</h1>
                <button>Contact Us</button> 
            </div>
            
            <div>
                <img src="/Photo/cap.png" alt="" />
                <h1>Media Kit</h1>
                <button>Media Kit</button>
            </div>
        </div>
        </div>
        

        </>
     )

    
}
export default About;