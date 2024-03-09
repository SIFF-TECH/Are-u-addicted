import Doc from "../../components/sideBar/DocProfile";
import "./Home.css";

function Home() {

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

  function reveal1() {
    var reveals = document.querySelectorAll(".Video");
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
  function reveal2() {
    var reveals = document.querySelectorAll(".Links");
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
  function reveal3() {
    var reveals = document.querySelectorAll(".expl");
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
  window.addEventListener("scroll", reveal);
  window.addEventListener("scroll", reveal1);
  window.addEventListener("scroll", reveal2);
  window.addEventListener("scroll", reveal3);

  return (
    <>
      <div>
        <main>
          <div className="SideBarContent" id="SideCon">
            <Doc  />
          </div>

          <section className="Welcome" id="1">
            <div>
              <h1>Are You Addicted</h1>
              <p>
                Online questionnaires help doctors assess video game addiction
                by gauging gaming habits, ensuring privacy, and enabling
                effective support.
              </p>
              <button type="Take">Take The Test</button>
            </div>
            
            <img src="./Photo/addicted.svg" alt="" />
          </section>

          <section className="ForWhat" id="2">
            <div className="expl">
              <h1>
                What is <strong>" Are You Addicted "</strong> ??
              </h1>
              <p>
                "Are You Addicted" offers users a straightforward way to
                self-assess their video game addiction. Users are presented with
                20 questions to answer with a simple "yes" or "no." This
                approach simplifies the process, making it easy for individuals
                to gauge their addiction risk and determine if they have a video
                game addiction issue or not. It's a quick and user-friendly
                method to assess one's gaming habits.
              </p>
            </div>
            <div>
              <img src="./Photo/Quest.png" alt="" />
            </div>
          </section>
          <section className="Cartes">
            <div className="TheComunity">
              <span class="material-symbols-outlined home-span ">reviews</span>
              <h3>Global Community</h3>
              <p>
                Join members in our community forums from over 95 countries.
                Meet like-minded people on the same journey as you.
              </p>
              <button>Join Now</button>
            </div>
            <div className="Solution">
              <span class="material-symbols-outlined home-span">emoji_objects</span>
              <h3>+60 Soulutions</h3>
              <p>
                In this free guide you will receive access to 60+ different
                ideas to replace gaming, avoid boredom, and build new habits.
              </p>
              <button type="Download">Download Now</button>
            </div>
            <div className="YotubeVideo">
              <span class="material-symbols-outlined home-span ">youtube_activity</span>
              <h3>Videos</h3>
              <p>
                Find answers to your most popular questions about video game
                addiction recovery for free on YouTube.
              </p>
              <button>Watch Now</button>
            </div>
          </section>
          <section className="Prac" id="Vid">
            <div className="Video">
              
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/oVK4PAwT9fc?si=zKazeCm4LLzyGSTh"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
              ></iframe>
            </div>
            <div className="Links">
              <div></div>
              <h2>Video Game Addiction Story</h2>
              <hr />
              <a href="https://youtu.be/Y4vl0s_l9MY?si=XMKG2ofrrN_09B9v">
                Video Game Addiction Documentery | Silent Addiction
              </a>
              <a href="https://youtu.be/qGTjtU4kfkM?si=I4HpBjbPKNoc1vV6">
                Viseo Game Addiction
              </a>
              <a href="https://youtu.be/WTdziAshzoE?si=Q-JHzQ0MWaf_JFsk">
                Gaming Addiction Cycle
              </a>
            </div>
            <span  class="material-symbols-outlined home-span">gamepad</span>
          </section>
          
        </main>
      </div>
    </>
  );
}

export default Home;
