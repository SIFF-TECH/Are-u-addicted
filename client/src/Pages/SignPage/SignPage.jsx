import { useState } from "react";
import "./SignPage.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import AlertMessage from "../../components/Alert";
import { loginFailure, loginStart, loginSuccess } from "../../redux/userRedux";

function SignPage() {
  const [user, setUser] = useState({});
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");
  const [open, setOpen] = useState(false);
  const [doctorID, setDoctorID] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    e.preventDefault();
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = (e) => {
    e.preventDefault();

    dispatch(loginStart());

    try {
      newRequest.post("/auth/login", user).then((res) => {
        dispatch(loginSuccess(res.data));
        navigate("/profile");
      }).catch((err) => {
        if (err.response.status === 404) {
          dispatch(loginFailure())
          setMessage("User not found!");
          setType("error");
          setOpen(true);
        }
        if (err.response.status === 400) {
          dispatch(loginFailure())
          setMessage("Wrong username or password!");
          setType("error");
          setOpen(true);
        }
        if (err.response.status === 406) {
          dispatch(loginFailure())
          setMessage("Your account is not confirmet yet!");
          setType("error");
          setOpen(true);
        }

      })

    } catch (err) {
      dispatch(loginFailure())
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    newRequest.post("/auth/register/user", user).then((res) => {
      if (res.status === 201) {
        newRequest.post("/auth/register/patient", res.data).then(() => {
          setMessage("User created successfully! Please login again");
          setType("success");
          setOpen(true);
          setTimeout(() => {

            transAll();
          }, [2000])
        })
      }
    }).catch((err) => {
      if (err.response.status === 409) {
        setMessage("User already exist!");
        setType("error");
        setOpen(true);
      }
    })
  }

  const handleSubmitDoctor = (e) => {
    e.preventDefault()
    newRequest.post("/auth/register/user", user).then((res) => {
      if (res.status === 201) {
        setDoctorID(res.data.ID_user);
        setUser({});
        trans();
      }
    }).catch((err) => {
      if (err.response.status === 409) {
        setMessage("User already exist!");
        setType("error");
        setOpen(true);
      }
    })
  }
  

  const handleSubmitDoctorInfo = (e) => {
    e.preventDefault()
    newRequest.post("/auth/register/medecin", { ID_user: doctorID, speciality: user?.speciality, other_info: user?.other_info }).then(() => {  
      setMessage("Doctor created successfully! Please wait to confirme your account!");
          setType("success");
          setOpen(true);
          setTimeout(() => {

            transAll();
          }, [2000])
    }).catch((err) => {
      console.log(err)
    })
  }



  function transTo(From, To) {
    From.classList.remove("active");
    To.classList.add("active");
  }
  function transAll() {
    var Log = document.getElementById("Log");
    var Sign = document.getElementById("Sign");
    var Account = document.getElementById("Account");
    var LogRes = document.getElementById("LogRes");
    var SignRes = document.getElementById("SignRes");

    if (Log.classList.contains("active")) {
      transTo(Log, Sign);
      Account.style.height = "430px";
    } else {
      if (Sign.classList.contains("active")) {
        transTo(Sign, Log);
        Account.style.height = "410px";
      }
    }

    if (LogRes.classList.contains("active")) {
      transTo(LogRes, SignRes);
    } else {
      if (SignRes.classList.contains("active")) {
        transTo(SignRes, LogRes);
      }
    }
  }
  function toSignRes() {
    var SignRes = document.getElementById("SignRes");
    var IntroRes = document.getElementById("IntroRes");
    transTo(IntroRes, SignRes);
  }
  function toLogRes() {
    var LogRes = document.getElementById("LogRes");
    var IntroRes = document.getElementById("IntroRes");
    transTo(IntroRes, LogRes);
  }

  function toInro() {
    var SignRes = document.getElementById("SignRes");
    var LogRes = document.getElementById("LogRes");
    var IntroRes = document.getElementById("IntroRes");

    if (LogRes.classList.contains("active")) {
      transTo(LogRes, IntroRes);
    } else {
      if (SignRes.classList.contains("active")) {
        transTo(SignRes, IntroRes);
      }
    }
  }

  function addChake(Name) {
    Name.classList.add("Chake");
    setTimeout(() => {
      Name.classList.remove("Chake");
    }, 1500);
  }

  function trans() {
    var Last = document.getElementById("Last");
    var Next = document.getElementById("next");
    var Chose = document.getElementById("Chose");
    var First = document.getElementById("First");
    var Back = document.getElementById("Back");
    var Doc = document.getElementById("Doctors");

    var FirstName = document.getElementById("FirstName");
    var LastName = document.getElementById("LastName");
    var Email = document.getElementById("Email");
    var Password = document.getElementById("Password");
    var ConPassword = document.getElementById("ConPassword");
    Next.type = "button";
    Next.value = "next";

    if (FirstName.value.trim() == "") {
      addChake(FirstName);
    } else {
      if (LastName.value.trim() == "") {
        addChake(LastName);
      } else {
        if (Last.classList.contains("active")) {
          if (
            Email.value.trim() == "" ||
            Email.value.includes("@gmail.com") == false
          ) {
            addChake(Email);
          } else {
            if (Password.value.trim() == "") {
              addChake(Password);
            } else {
              if (ConPassword.value.trim() == "") {
                addChake(ConPassword);
              } else {
                Next.classList.remove("active");
                Chose.classList.add("active");
                Last.classList.remove("active");
                Doc.classList.remove("active");
              }
            }
          }
        } else {
          if (Chose.classList.contains("active")) {
            Chose.classList.remove("active");
            Doc.classList.add("active");
            Next.classList.add("active");
            Next.type = "submit";
            Next.value = "Sign In";
          } else {
            First.classList.remove("active");
            Last.classList.add("active");
            Back.classList.add("active");
          }
        }
      }
    }
    var Last2 = document.getElementById("Last2");

    var Chose2 = document.getElementById("Chose2");
    var First2 = document.getElementById("First2");

    var Doc2 = document.getElementById("Doctors2");

    var FirstRes = document.getElementById("FirstNameRes");
    var LastRes = document.getElementById("LastNameRes");
    var InMailRes = document.getElementById("InMailRes");
    var InPassRes = document.getElementById("InPassRes");
    var InCoPassRes = document.getElementById("InCoPassRes");

    if (FirstRes.value.trim() == "") {
      addChake(FirstRes);
    } else {
      if (LastRes.value.trim() == "") {
        addChake(LastRes);
      } else {
        if (Last2.classList.contains("active")) {
          if (
            InMailRes.value.trim() == "" ||
            InMailRes.value.includes("@gmail.com") == false
          ) {
            addChake(InMailRes);
          } else {
            if (InPassRes.value.trim() == "") {
              addChake(InPassRes);
            } else {
              if (InCoPassRes.value.trim() == "") {
                addChake(InCoPassRes);
              } else {
                Chose2.classList.add("active");
                Last2.classList.remove("active");
                Doc2.classList.remove("active");
              }
            }
          }
        } else {
          if (Chose2.classList.contains("active")) {
            Chose2.classList.remove("active");
            Doc2.classList.add("active");
          } else {
            First2.classList.remove("active");
            Last2.classList.add("active");
          }
        }
      }
    }
  }

  function noTrans() {
    var Last = document.getElementById("Last");
    var Next = document.getElementById("next");
    var Chose = document.getElementById("Chose");
    var First = document.getElementById("First");
    var Back = document.getElementById("Back");
    var Doc = document.getElementById("Doctors");

    First.classList.add("active");
    Last.classList.remove("active");
    Back.classList.remove("active");
    Next.classList.add("active");
    Chose.classList.remove("active");
    Doc.classList.remove("active");
    Next.type = "button";
    Next.value = "next";

    var Last2 = document.getElementById("Last2");

    var Chose2 = document.getElementById("Chose2");
    var First2 = document.getElementById("First2");

    var Doc2 = document.getElementById("Doctors2");
    First2.classList.add("active");
    Last2.classList.remove("active");

    Chose2.classList.remove("active");
    Doc2.classList.remove("active");
  }

  function Up(Inputname, name) {
    if (Inputname.value.trim() !== "") {
      name.classList.add("active");
    } else {
      name.classList.remove("active");
    }
  }
  function LabelUp() {
    var em = document.getElementById("Email2");
    var Pas = document.getElementById("Password23");
    var Iem = document.getElementById("inputEm");
    var InputPas = document.getElementById("InputPass");
    var Lfirst = document.getElementById("Lfirst");
    var Llast = document.getElementById("Llast");
    var FirstRes = document.getElementById("FirstNameRes");
    var LastRes = document.getElementById("LastNameRes");
    var InDateRes = document.getElementById("InDateRes");
    var InMailRes = document.getElementById("InMailRes");
    var InPassRes = document.getElementById("InPassRes");
    var InCoPassRes = document.getElementById("InCoPassRes");

    var DateRes = document.getElementById("DateRes");

    var MailRes = document.getElementById("MailRes");

    var PassRes = document.getElementById("PassRes");

    var CoPassRes = document.getElementById("CoPassRes");

    var Spe = document.getElementById("Spe");
    var Num = document.getElementById("Num");
    var InSpe = document.getElementById("InSpe");
    var InNum = document.getElementById("InNum");

    Up(Iem, em);
    Up(InputPas, Pas);
    Up(FirstRes, Lfirst);
    Up(LastRes, Llast);
    Up(InDateRes, DateRes);
    Up(InMailRes, MailRes);
    Up(InPassRes, PassRes);
    Up(InCoPassRes, CoPassRes);
    Up(InSpe, Spe);
    Up(InNum, Num);
  }

  return (
    <>
      <div className="ALL">
        <AlertMessage open={open} setOpen={setOpen} message={message} type={type} />
        <main className="Account LogSide LogSideRes" id="Account">
          <section className="LogSign">
            <div className="Sign" id="Sign">
              <h1>Sign In</h1>
              <div className="SocialAccount">
                <ion-icon name="logo-facebook"></ion-icon>
                <ion-icon name="logo-google"></ion-icon>
              </div>
              <div className="Inputs">
                <div className="Person">
                  <div className="FirstInput active" id="First">
                    <div>
                      <span className="material-symbols-outlined icon-span">person</span>
                      <input
                        type="text"
                        id="FirstName"
                        name="first_name"
                        placeholder="First Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <span className="material-symbols-outlined icon-span">person</span>
                      <input
                        type="text"
                        id="LastName"
                        name="last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <span className="material-symbols-outlined icon-span">
                        calendar_month
                      </span>
                      <input type="date" name="birth_date" onChange={handleChange} />
                    </div>
                    <div id="Buttons">
                      <button

                        id="next"
                        name="next"
                        onClick={trans}

                        className="active"
                      >Next</button>
                      <button type="Back" id="Back" onClick={noTrans}>
                        {" "}
                        Back
                      </button>
                    </div>
                  </div>

                  <div className="LastInput" id="Last">
                    <div>
                      <span className="material-symbols-outlined icon-span">mail</span>
                      <input type="email" id="Email" placeholder="Email" name="email" onChange={handleChange} />
                    </div>
                    <div>
                      <span className="material-symbols-outlined icon-span">vpn_key</span>
                      <input
                        id="Password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                      />
                    </div>
                    <div>
                      <span className="material-symbols-outlined icon-span">vpn_key</span>
                      <input
                        id="ConPassword"
                        type="password"
                        name="conpassword"
                        placeholder="Confirm Your Password"
                      />
                    </div>
                    <div id="Buttons">
                      <button

                        id="next"
                        name="next"
                        onClick={trans}

                        className="active"
                      >Next</button>
                      <button type="Back" id="Back" onClick={noTrans}>
                        {" "}
                        Back
                      </button>
                    </div>
                  </div>

                  <div className="Choose" id="Chose">
                    <button type="submit" className="Gamer" onClick={handleSubmit}>
                      <img src="./Photo/gamer.png" alt="" />
                      <p>Gamer</p>
                    </button>
                    <button type="" className="Doc" onClick={handleSubmitDoctor}>
                      <img src="./Photo/doctor.png" alt="" />
                      <p>Doctor</p>
                    </button>
                  </div>

                  <div className="Doctor" id="Doctors">
                    <div>
                      <span className="material-symbols-outlined icon-span">
                        business_center
                      </span>
                      <input type="text" placeholder="Speciality" name="speciality" onChange={handleChange} />
                    </div>
                    <div>
                      <span className="material-symbols-outlined icon-span">award_star</span>
                      <input
                        type="number"
                        max={30}
                        min={1}
                        placeholder="Years Of Experience"
                        name="experiences"
                        onChange={handleChange}
                      />
                    </div>
                    <div id="Buttons">
                      <input
                        type="submit"
                        id="next"
                        value={"Submit"}
                        className="active"
                        onClick={handleSubmitDoctorInfo}
                      ></input>
                      <button type="Back" id="Back" onClick={noTrans}>
                        {" "}
                        Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <p>
                You Already Have Account!! <a onClick={transAll}>Log In</a>
              </p>

            </div>

            <div className="Log active" id="Log">
              <h1>Log In</h1>
              <div className="SocialAccount">
                <ion-icon name="logo-facebook"></ion-icon>
                <ion-icon name="logo-google"></ion-icon>
              </div>
              <div className="FirstInputLog">
                <div>
                  <span className="material-symbols-outlined icon-span">mail</span>
                  <input
                    name="email"
                    type="email"
                    id="Email"
                    placeholder="Email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <span className="material-symbols-outlined icon-span">vpn_key</span>
                  <input
                    name="password"
                    id="Password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <a>Forget Your Password??</a>
              <button type="submit" onClick={handleClick}>
                Log In
              </button>
              <p>
                You dont have an account?? <a onClick={transAll}>Sign In</a>
              </p>
            </div>
          </section>
        </main>
        <main className="Rev">
          <section className="LogSignRes" id="LogSideRes">
            <div className="IntroPage active" id="IntroRes">
              <img src="./Photo/logo2.png" alt="" />
              <div className="Texts">
                <h1>Sign Up</h1>
                <p>Continue With Mail</p>
              </div>
              <div className="Buttons">
                <button type="Mail">
                  <span className="material-symbols-outlined icon-span">mail</span> Continue
                  With Mail
                </button>
                <button name="normal" onClick={toSignRes}>
                  Sign Up
                </button>
                <button name="normal" onClick={toLogRes}>
                  Log In
                </button>
              </div>
            </div>
            <div className="LogPageRev" id="LogRes">
              <div id="Shape"></div>
              <h1>Login</h1>
              <div className="LogElement">
                <div>
                  <img src="./Photo/logo.jpg" alt="" />
                </div>

                <div className="LogInputs">
                  <div>
                    <span className="material-symbols-outlined icon-span">mail</span>
                    <label htmlFor="" id="Email2">
                      Email
                    </label>
                    <input type="text" id="inputEm" onInput={LabelUp} />
                  </div>
                  <div>
                    <span className="material-symbols-outlined icon-span">key</span>
                    <label htmlFor="" id="Password23">
                      Password
                    </label>
                    <input
                      type="password"
                      name=""
                      id="InputPass"
                      onInput={LabelUp}
                    />
                  </div>
                  <button type="submit"> Login</button>
                  <button name="Back" onClick={toInro}>
                    Back
                  </button>
                  <p>
                    You Dont Have An Account ??{" "}
                    <a onClick={transAll}>Sign Up</a>{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="SignPageRev" id="SignRes">
              <div id="Shape"></div>
              <h1>Sign</h1>
              <div className="LogElement">
                <div>
                  <img src="./Photo/logo.jpg" alt="" />
                </div>

                <div className="SignInputs">
                  <div className="FirstInput active" id="First2">
                    <div>
                      <span className="material-symbols-outlined icon-span">person</span>
                      <label htmlFor="" id="Lfirst">
                        First Name
                      </label>
                      <input type="text" id="FirstNameRes" onInput={LabelUp} />
                    </div>
                    <div>
                      <span className="material-symbols-outlined">person</span>
                      <label htmlFor="" id="Llast">
                        Last Name
                      </label>
                      <input type="text" id="LastNameRes" onInput={LabelUp} />
                    </div>
                    <div>
                      <span className="material-symbols-outlined">
                        calendar_month
                      </span>
                      <label htmlFor="" id="DateRes">
                        Brth Day
                      </label>
                      <input type="date" id="InDateRes" onInput={LabelUp} />
                    </div>
                    <div className="But">
                      <button type="Revnext" onClick={trans}>
                        Next
                      </button>{" "}
                      <button type="RevBack" onClick={toInro}>
                        Back
                      </button>
                    </div>
                  </div>
                  <div className="LastInput" id="Last2">
                    <div>
                      <span className="material-symbols-outlined">mail</span>
                      <label htmlFor="" id="MailRes">
                        Name
                      </label>
                      <input type="text" onInput={LabelUp} id="InMailRes" />
                    </div>
                    <div>
                      <span className="material-symbols-outlined">key</span>
                      <label htmlFor="" id="PassRes">
                        Name
                      </label>
                      <input type="text" onInput={LabelUp} id="InPassRes" />
                    </div>
                    <div>
                      <span className="material-symbols-outlined">key</span>
                      <label htmlFor="" id="CoPassRes">
                        Name
                      </label>
                      <input type="text" onInput={LabelUp} id="InCoPassRes" />
                    </div>
                    <div className="But">
                      <button type="Revnext" onClick={trans}>
                        Next
                      </button>
                      <button type="RevBack" onClick={noTrans}>
                        Back
                      </button>
                    </div>
                  </div>
                  <div className="Choose" id="Chose2">
                    <button type="submit" className="Gamer">
                      <img src="./Photo/gamer.png" alt="" />
                      <p>Patient</p>
                    </button>
                    <button type="" onClick={trans} className="Doc">
                      <img src="./Photo/doctor.png" alt="" />
                      <p>Doctor</p>
                    </button>
                  </div>
                  <div className="Doctor" id="Doctors2">
                    <div>
                      <span className="material-symbols-outlined">
                        business_center
                      </span>
                      <label htmlFor="" id="Spe">
                        Speciality
                      </label>
                      <input type="text" id="InSpe" onInput={LabelUp} />
                    </div>
                    <div>
                      <span className="material-symbols-outlined">award_star</span>
                      <label htmlFor="" id="Num">
                        Years Of Experience
                      </label>
                      <input
                        type="number"
                        max={30}
                        min={1}
                        onInput={LabelUp}
                        id="InNum"
                      />
                    </div>
                    <div className="But">
                      <button type="submit">Submit</button>{" "}
                      <button name="Back" onClick={noTrans}>
                        Back
                      </button>
                    </div>
                  </div>
                </div>
                <p>
                  Do you have an account ?? <a onClick={transAll}>Log In</a>{" "}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>

    </>
  );
}

export default SignPage;
