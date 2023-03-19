class AuthenticationService {
    registerSuccessfulLoginUser(username) {
      sessionStorage.setItem("authenticatedUser", username);
      sessionStorage.setItem("role", "user");
    }

    registerSuccessfulLoginAdmin(username) {
      sessionStorage.setItem("authenticatedUser", username);
      sessionStorage.setItem("role", "admin");
    }
  
    logout() {
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload(false);
    }
  
    isUserLoggedIn() {
      let role = sessionStorage.getItem("role");
      if (role !== "user") {
        return false;
      } else {
        return true;
      }
    }

    isAdminLoggedIn() {
      let role = sessionStorage.getItem("role");
      if (role !== "admin") {
        return false;
      }
      else {
        return true;
      }
    }
  
    getLoggedInUser() {
      let username = sessionStorage.getItem("authenticatedUser");
      if (username == null) {
        return "";
      } else {
        return username;
      }
    }
  
    setUpToken(jwtToken) {
      localStorage.setItem("token", jwtToken);
    }
  }
  
  export default new AuthenticationService();