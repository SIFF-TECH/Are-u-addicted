import "./Setting.css";

export default function Setting() {
  return (
    <div className="Setting">
      <div className='Resum'>
        <img src="/Photo/prof.jpeg" alt="" />
        <h3>Mouhamed Bachir</h3>
        <p>Psychitrist</p>
      </div>
      <div>
        <span className="material-symbols-outlined">key</span>
        <input type="password" placeholder="Current Password" name="Change" />
      </div>
      <div>
        <span className="material-symbols-outlined">key</span>
        <input type="password" placeholder="New Password" name="Change" />
      </div>
      <div>
        <span className="material-symbols-outlined">key</span>
        <input type="password" placeholder="Confirm New Password" name="Change" />
      </div>

      <p className="orChang">Or</p>
      <div>
        <span className="material-symbols-outlined">mail</span>
        <input type="email" placeholder="New Email" name="Change" />
      </div>

      <button type="submit">Change</button>
    </div>
  );
}
