class IdleTimer {
  constructor({ timeout, onTimeout, onExpired }) {
    this.timeout = timeout;
    this.onTimeout = onTimeout;

    const expiredTime = parseInt(sessionStorage.getItem("_expiredTime"), 10);
    this.startInterval();
    this.eventHandler = this.updateExpiredTime.bind(this);
    this.tracker();

    // const myFunction = () => {
    //   if (confirm("You will be logged out automatically in 1 minute")) {
    //     this.handleLogout();
    //   } else {
    //     tghis.updateExpiredTime();
    //     console.log("inside extend timer");
    //   }
    // };
    console.log(Date.now());
    console.log(expiredTime);
    console.log(expiredTime - Date.now());

    if (expiredTime > 0 && expiredTime - Date.now() <= 10000) {
      console.log(Date.now());
      console.log(expiredTime);
      console.log(expiredTime - Date.now());
      console.log("inside changeShowModal");
      // myFunction();
      // if (showModal !== true) setShowModal(true);
      // alert("You will be logged out automatically in 1 minute");
    }
  }

  startInterval() {
    this.updateExpiredTime();
    this.interval = setInterval(() => {
      const expiredTime = parseInt(sessionStorage.getItem("_expiredTime"), 10);

      if (expiredTime < Date.now()) {
        if (this.onTimeout) {
          this.onTimeout();
          this.cleanUp();
        }
      }
    }, 100);
  }
  // handleLogout = () => {
  //   sessionStorage.removeItem(ACCESS_TOKEN);
  //   sessionStorage.removeItem(_expiredTime);
  //   window.location.replace("/login");
  //   this.setState({
  //     authenticated: false,
  //     currentUser: null,
  //   });
  //   Alert.success("You're safely logged out!");
  // };

  updateExpiredTime = () => {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker);
    }
    this.timeoutTracker = setTimeout(() => {
      sessionStorage.setItem("_expiredTime", Date.now() + this.timeout * 1000);
    }, 300);
  };

  tracker() {
    window.addEventListener("mousemove", this.eventHandler);
    window.addEventListener("scroll", this.eventHandler);
    window.addEventListener("keydown", this.eventHandler);
  }

  cleanUp() {
    sessionStorage.removeItem("_expiredTime");
    clearInterval(this.interval);
    window.removeEventListener("mousemove", this.eventHandler);
    window.removeEventListener("scroll", this.eventHandler);
    window.removeEventListener("keydown", this.eventHandler);
  }
}
export default IdleTimer;
