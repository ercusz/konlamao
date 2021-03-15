<template>
  <div class="container mt-5 mb-5">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-md-6">
        <div class="card px-5 py-5">
          <span class="circle"><i class="fa fa-check"></i></span>
          <h5 class="mt-3">
            Join over 10000<br />
            drunkers from around the kku
          </h5>
          <small class="mt-2 text-muted"
            >มาร่วมเมาไปกับเรา เมาแม่งซอดแจ้งไปเลย</small
          >

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"
              ><font-awesome-icon :icon="['fas', 'user']"
            /></span>
            <input
              type="text"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"
              ><font-awesome-icon :icon="['fas', 'envelope']"
            /></span>
            <input
              type="text"
              class="form-control"
              placeholder="Email"
              aria-label="Email"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"
              ><font-awesome-icon :icon="['fas', 'lock']"
            /></span>
            <input
              type="text"
              class="form-control"
              placeholder="Password"
              aria-label="Password"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="input-group mb-3">
            <span class="input-group-text" id="basic-addon1"
              ><font-awesome-icon :icon="['fas', 'lock']"
            /></span>
            <input
              type="text"
              class="form-control"
              placeholder="Confirm Password"
              aria-label="Confirm Password"
              aria-describedby="basic-addon1"
            />
          </div>

          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckChecked"
              checked
            />
            <label class="form-check-label" for="flexCheckChecked">
              I agree all the statements
            </label>
          </div>
          <button class="btn btn-primary mt-4 signup">
            Start drunking now
          </button>
          <div class="text-center mt-3">
            <span>Or continue with these social profile</span>
          </div>
          <div class="d-flex justify-content-center mt-4">
            <span class="social"><i class="fa fa-google"></i></span>
            <span class="social"><i class="fa fa-facebook"></i></span>
            <span class="social"><i class="fa fa-twitter"></i></span>
            <span class="social"><i class="fa fa-linkedin"></i></span>
          </div>
          <div class="text-center mt-4">
            <span>Already a member?</span>
            <a href="#" class="text-decoration-none">Login</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800&display=swap");

body {
  background-color: #535fe6;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
}

.height {
  height: 100vh;
}

.card {
  border: none;
  padding: 20px;
  background-color: #1c1e21;
  color: black;
}

.circle {
  height: 20px;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #5855e7;
  color: black;
  font-size: 10px;
  border-radius: 50%;
}

.input-group {
  position: relative;
  margin-bottom: 10px;
  margin-top: 10px;
}

.input-group i {
  position: absolute;
  font-size: 18px;
  top: 15px;
  left: 10px;
}

.form-control {
  background-color: #1c1e21;
  text-indent: 24px;
  font-size: 15px;
}

.form-control:focus {
  background-color: #25272a;
  box-shadow: none;
  color: black;
  border-color: #4f63e7;
}

.form-check-label {
  margin-top: 2px;
  font-size: 14px;
}

.signup {
  height: 50px;
  font-size: 14px;
}

.social {
  height: 50px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #eee;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
}

.social:hover {
  background-color: #0d6efd;
  border-color: #0d6efd;
}
</style>
