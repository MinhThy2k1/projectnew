const myForm = document.querySelector("#my-form");
const inputEmail = document.querySelector("#input-email");
const inputPassword = document.querySelector("#input-password");
const register = document.querySelector("#text-sign");
const formValues = JSON.parse(localStorage.getItem("formValues")) || [];
myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = inputEmail.value;
  const password = inputPassword.value;
  const matchingformValues = formValues.map((formValue) => {
    return {
      email: formValue.email,
      password: formValue.password,
      test: formValue.test,
    };
  });

  console.log("test: ", formValues);

  if (email === "" || password === "") {
    FuiToast.error("Vui lòng điền đầy đủ thông tin");
  } else {
    const emailExitst = formValues.some((value) => value.email === email);
    const passwordExits = formValues.some(
      (value) => value.password === password
    );

    if (emailExitst && passwordExits) {
      FuiToast.success("Login thành công !!!!");
      setTimeout(() => {
        window.location.href = "./homepage.html";
      }, 2000);
      localStorage.setItem("isLoggin", true);
      localStorage.setItem("cartUser", []);
      myForm.reset();
    } else {
      if (!emailExitst)
        FuiToast.error("Tài khoản không tồn tại trên hệ thống!!!");

      if (emailExitst && !passwordExits)
        FuiToast.error("Mật khẩu không đúng! Vui lòng thử lại.");
    }
  }
});
register.addEventListener("click", (e) => {
  e.preventDefault;
  setTimeout(() => {
    window.location.href = "register.html";
  }, 2000);
});
