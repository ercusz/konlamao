<template>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
  <header class="mb-auto">

    <div>
      
      <nav class="navbar nav-masthead justify-content-center float-md-end navbar-expand-md navbar-dark">
        <div class="container-fluid">
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#"><h3 class="float-md-start mb-0" style="font-family:Taviraj; font-weight: bold;">คนละเมา🍺</h3></a>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <router-link to="/" active-link="active" class="nav-link" aria-current="page"
                  >Home</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/register" active-link="active" class="nav-link"
                  >Register</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/login" active-link="active" class="nav-link"
                  >Login</router-link
                >
              </li>
              <li class="nav-item">
                <router-link to="/about" active-link="active" class="nav-link" tabindex="-1"
                  >About</router-link
                >
              </li>  
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </header>

  <main class="px-3">
    <!-- Router view -->
    <div class="container pt-5 pb-5" >
      <router-view></router-view>
    </div>
  </main>

  <footer class="m-auto text-white-50">
    <p>created for educational purposes</p>
  </footer>
</div>
</template>


<script>
export default {
  data: () => ({
  })
};

</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Taviraj);

html {  
  height: 100%;
}
/*
 * Globals
 */

/* Custom default button */
.btn-secondary,
.btn-secondary:hover,
.btn-secondary:focus {
  color: #333;
  text-shadow: none; /* Prevent inheritance from `body` */
}


/*
 * Base structure
 */

body {
  height: 100%;
  text-shadow: 0 .05rem .1rem rgba(0, 0, 0, .5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, .5);
}

.cover-container {
  max-width: 72em;
}


/*
 * Header
 */

.nav-masthead .nav-link {
  padding: .25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, .5);
  background-color: transparent;
  border-bottom: .25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, .25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

a {
  color: inherit;
}

.router-link-exact-active{
  color: #fff;
  border-bottom-color: #fff;
}

.input-group, .input-group:focus, .input-group-text, .input-group-text:focus, input, input:focus{
  background-color: white;
  border-radius: .25rem;
}
</style>
