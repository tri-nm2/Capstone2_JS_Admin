class IndexValidation {
  message1 = "*This field is required.";

  isValidForm() {
    let isValid = true;
    isValid &= this.isEmtyName();
    isValid &= this.isEmtyPrice();
    isValid &= this.isEmtyScreen();
    isValid &= this.isEmtyBackCamera();
    isValid &= this.isEmtyFrontCamera();
    isValid &= this.isEmtyImage();

    return isValid;
  }

  isEmtyName() {
    const name = document.getElementById("txtName").value;
    if (!name) {
      this.showMessage(this.message1, "nameErrorMessage");
      return false;
    }
    this.clearMessage("nameErrorMessage");
    return true;
  }

  isEmtyPrice() {
    const price = document.getElementById("txtPrice").value;
    if (!price) {
      this.showMessage(this.message1, "priceErrorMessage");
      return false;
    }
    this.clearMessage("priceErrorMessage");
    return true;
  }

  isEmtyScreen() {
    const screen = document.getElementById("txtScreen").value;
    if (!screen) {
      this.showMessage(this.message1, "screenErrorMessage");
      return false;
    }
    this.clearMessage("screenErrorMessage");
    return true;
  }

  isEmtyBackCamera() {
    const backCamera = document.getElementById("txtBackCamera").value;
    if (!backCamera) {
      this.showMessage(this.message1, "backCameraErrorMessage");
      return false;
    }
    this.clearMessage("backCameraErrorMessage");
    return true;
  }

  isEmtyFrontCamera() {
    const frontCamera = document.getElementById("txtFrontCamera").value;
    if (!frontCamera) {
      this.showMessage(this.message1, "frontCameraErrorMessage");
      return false;
    }
    this.clearMessage("frontCameraErrorMessage");
    return true;
  }

  isEmtyImage() {
    const image = document.getElementById("txtImage").value;
    if (!image) {
      this.showMessage(this.message1, "imageErrorMessage");
      return false;
    }
    this.clearMessage("imageErrorMessage");
    return true;
  }

  showMessage(message, locationID) {
    document.getElementById(locationID).innerHTML = this.message1;
    let location = document.getElementById(locationID);
    if (!location.classList.contains("d-block")) {
      location.classList.add("d-block");
    }
  }

  clearMessage(locationID) {
    let location = document.getElementById(locationID);
    if (location.classList.contains("d-block")) {
      location.classList.remove("d-block");
    }
  }
}
