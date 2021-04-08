<template>
  <div class="cover-container d-flex w-100 h-100 p-3 mx-auto flex-column">
    <header class="mb-auto">
      <div>
        <nav
          class="navbar nav-masthead justify-content-center float-md-end navbar-expand-md navbar-dark"
        >
          <div class="container-fluid">
            <button
              class="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarTogglerDemo03"
              aria-controls="navbarTogglerDemo03"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
            <a class="navbar-brand" href="#"
              ><h3
                class="float-md-start mb-0"
                style="font-family:Taviraj; font-weight: bold;"
              >
                คนละเมา🍺
              </h3></a
            >
            <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item" v-if="this.user != null">
                  <router-link
                    to="/"
                    active-link="active"
                    class="nav-link"
                    aria-current="page"
                    >Home</router-link
                  >
                </li>
                <li class="nav-item" v-if="this.user == null">
                  <router-link
                    to="/register"
                    active-link="active"
                    class="nav-link"
                    >Register</router-link
                  >
                </li>
                <li class="nav-item" v-if="this.user == null">
                  <router-link to="/login" active-link="active" class="nav-link"
                    >Login</router-link
                  >
                </li>
                <li class="nav-item" v-if="this.user != null">
                  <router-link
                    to="/reservation"
                    active-link="active"
                    class="nav-link"
                    >จองทันที</router-link
                  >
                </li>
                <li class="nav-item" v-if="this.user != null">
                  <div class="dropdown">
                    <button
                      class="btn nav-link dropdown-toggle shadow-lg"
                      id="dropdownMenu2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style="border-style:none;"
                    >
                      <span class="userCircle bg-danger bg-gradient">
                        {{ getFirstChar() }}
                      </span>
                      {{ this.username }}
                    </button>
                    <ul
                      v-if="this.user != null"
                      class="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                      aria-labelledby="dropdownMenu2"
                    >
                      <li v-if="this.isAdmin">
                        <button class="dropdown-item" type="button">
                          <router-link
                            to="/admin"
                            class="text-danger"
                            style="text-decoration:none; font-weight:bold"
                            >ระบบจัดการข้อมูล</router-link
                          >
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          <router-link
                            to="/history"
                            style="text-decoration:none; color:white; font-weight:bold"
                            >ประวัติการจอง</router-link
                          >
                        </button>
                      </li>
                      <li>
                        <button
                          class="dropdown-item"
                          type="button"
                          @click="logOut()"
                        >
                          ออกจากระบบ
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>

    <main class="px-3">
      <!-- Router view -->
      <div class="container pt-5 pb-5">
        <router-view :username="username" :isAdmin="isAdmin"></router-view>
      </div>
    </main>

    <footer class="m-auto text-white-50">
      <p>created for educational purposes</p>
    </footer>
  </div>
</template>

<script>
import firebase from "firebase";
import { db } from "./main";

export default {
  data() {
    return {
      user: null,
      username: null,
      isAdmin: false
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.getUsername();
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/login");
          });
        });
    },
    getUsername() {
      if (this.user != null) {
        db.collection("users")
          .doc(this.user.uid)
          .get()
          .then(doc => {
            if (doc.exists) {
              this.username = doc.data().username;
              this.isAdmin = doc.data().isAdmin;
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          })
          .catch(error => {
            console.log("Error getting document:", error);
          });
      }
    },
    getFirstChar() {
      if (this.username != null && typeof this.username !== "undefined") {
        return this.username.substring(0, 1);
      }
    }
  }
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
  text-shadow: 0 0.05rem 0.1rem rgba(0, 0, 0, 0.5);
  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.5);
}

.cover-container {
  max-width: 72em;
}

/*
 * Header
 */

.nav-masthead .nav-link {
  padding: 0.25rem 0;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.5);
  background-color: transparent;
  border-bottom: 0.25rem solid transparent;
}

.nav-masthead .nav-link:hover,
.nav-masthead .nav-link:focus {
  border-bottom-color: rgba(255, 255, 255, 0.25);
}

.nav-masthead .nav-link + .nav-link {
  margin-left: 1rem;
}

a {
  color: inherit;
}

.router-link-exact-active {
  color: #fff;
  border-bottom-color: #fff;
}

.input-group,
.input-group:focus,
.input-group-text,
.input-group-text:focus,
input,
input:focus {
  background-color: white;
  border-radius: 0.25rem;
}

.userCircle {
  height: 20px;
  width: 20px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  border-radius: 50%;
}
</style>
