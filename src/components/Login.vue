<template>
  <div class="container mt-5 mb-5">
    <div class="row d-flex align-items-center justify-content-center">
      <div class="col-md-6">
        <div class="card px-5 py-5 text-white bg-dark">
          <span class="circle bg-danger bg-gradient"><font-awesome-icon :icon="['fas', 'check']" style="color: white"/></span>
          <h5 class="mt-3">
            ลงชื่อเข้าใช้
          </h5>
          <small class="mt-2 text-muted"
            >"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."</small
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

          <div class="form-check">
            <input
              class="form-check-input bg-danger text-gradient"
              type="checkbox"
              value=""
              id="flexCheckChecked"
            />
            <label class="form-check-label" for="flexCheckChecked">
              จดจำฉัน
            </label>
          </div>

          <button class="btn btn-dark mt-3 bg-danger signup">
            เข้าสู่ระบบ
          </button>

          <div class="text-center mt-3">
            <span>หรือลงชื่อเข้าใช้ด้วยโซเชียลมีเดีย</span>
          </div>

          <div class="d-flex justify-content-center mt-4">
            <span class="social"><font-awesome-icon :icon="['fab', 'google']" class="social-icon"/></span>
            <span class="social"><font-awesome-icon :icon="['fab', 'facebook']" class="social-icon"/></span>
            <span class="social"><font-awesome-icon :icon="['fab', 'twitter']" class="social-icon"/></span>
            <span class="social"><font-awesome-icon :icon="['fab', 'linkedin']" class="social-icon"/></span>
          </div>

          <div class="text-center mt-3">
            <span>ยังไม่มีบัญชี? </span>
            <a class="fw-bold text-decoration-none text-danger text-gradient" href="#Register">สมัครสมาชิก</a>
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
  },
  name: "App"
};
</script>

