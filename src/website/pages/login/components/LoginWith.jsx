import "../style/LoginWith.css";

function LoginWith(props) {
  try {
    return (
      <>
        <div>
          <div className="bar-wrap">
            <span className="bar"></span>
            <p className="or">or</p>
            <span className="bar"></span>
          </div>
          <div className="sin-in-with">
            <a href="https://bytesed.com/laravel/qixer/google/redirect" className="sign-in-btn">
              <img src="https://bytesed.com/laravel/qixer/assets/frontend/img/static/google.png" alt="icon" />
              Sign in with Google
            </a>
            <a href="https://bytesed.com/laravel/qixer/facebook/redirect" className="sign-in-btn">
              <img src="https://bytesed.com/laravel/qixer/assets/frontend/img/static/facebook.png" alt="icon" />
              Sign in with Facebook
            </a>
          </div>
        </div>
      </>
    );
  } catch (err) {
    console.log(err);
  }
}

export default LoginWith;
