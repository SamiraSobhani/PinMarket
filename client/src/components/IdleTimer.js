class IdleTimer {
  constructor({ timeout, onTimeout, onExpired }) {
    this.timeout = timeout;
    this.onTimeout = onTimeout;

    const expiredTime = parseInt(sessionStorage.getItem("_expiredTime"), 10);
    if (expiredTime > 0 && expiredTime < Date.now()) {
      onExpired();
      return;
    }
    this.eventHandler = this.updateExpiredTime.bind(this);
    this.tracker();
    this.startInterval();
  }

  startInterval() {
    this.updateExpiredTime();
    this.interval = setInterval(() => {
      const expiredTime = parseInt(sessionStorage.getItem("_expiredTime"), 10);
      console.log(expiredTime - Date.now());
      if (expiredTime - Date.now() <= 1000) {
        window.alert("You will be logged out automatically in 1 minute");

      }
      if (expiredTime < Date.now()) {
        if (this.onTimeout) {
          this.onTimeout();
          this.cleanUp();
        }
      }
    }, 1000);
  }
  handleLogout = () => {
    sessionStorage.removeItem(ACCESS_TOKEN);
    window.location.replace("/login");
    this.setState({
      authenticated: false,
      currentUser: null,
    });
    Alert.success("You're safely logged out!");
  };

  updateExpiredTime() {
    if (this.timeoutTracker) {
      clearTimeout(this.timeoutTracker);
    }
    this.timeoutTracker = setTimeout(() => {
      sessionStorage.setItem("_expiredTime", Date.now() + this.timeout * 1000);
    }, 300);
  }

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
