<template>
  <div class="wrapper" style="background-color: #414141;">
    <!-- Nav bar -->
    <nav
      class="navbar navbar-expand-lg sticky-top navbar-dark bg-dark shadow-lg p-3"
    >
      <div class="container-fluid ">
        <router-link
          to="/"
          class="navbar-brand mt-3"
          style="font-family:Taviraj; margin-left:20px;"
        >
          <h3 class="text-gradient" style="color:#ff0000;">konlamao🍺</h3>
          <figcaption class="blockquote-footer text-light">
            ค น ล ะ เ ม า
          </figcaption>
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo02"
          aria-controls="navbarTogglerDemo02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link active" aria-current="page"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/register" class="nav-link"
                >Register</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link" tabindex="-1"
                >About</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <!-- Router view -->
    <div class="container pt-5 pb-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
@import url(https://fonts.googleapis.com/css?family=Taviraj);
html {
  background-color: #414141;
}
</style>
