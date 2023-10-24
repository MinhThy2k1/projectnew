function handleRegister() {
  window.location.href = "register.html";
}
document.addEventListener("DOMContentLoaded", function () {
  Validator({
    form: "#form-2",
    formGroupSelector: ".form-group",
    errorSelector: ".form-message",
    onSubmit: function (data) {
      console.log("data in login: ", data);
      let listUsers = JSON.parse(localStorage.getItem("listUsers")) || [];

      // Kiểm tra xem email và password đã được điền vào form
      if (data.email == "" || data.password == "") {
        alert("Vui lòng điền đầy đủ email và password.");
        return; // Ngăn form được gửi nếu thông tin không đủ
      }
      let checkUser = listUsers.find((user) => {
        return user.email === data.email;
      });
      let checkPass = listUsers.some((user) => {
        return user.password === data.password;
      });

      if (checkUser && checkPass) {
        showSuccessLoginToast();
        localStorage.setItem("checkLogin", checkUser.idUser);
        function goToHomePage() {
          window.location.href = "./homepage.html";
        }
        setTimeout(goToHomePage, 2000);
      } else if (!isEmail(data.email)) {
        alert(`Email không đúng định dạng`);
      } else if (!checkUser) {
        alert(`email không tồn tại trên hệ thống`);
      } else if (checkUser && !checkPass) {
        alert(`Sai password`);
      }
    },
  });
});
function isEmail(email) {
  // Sử dụng biểu thức chính quy để kiểm tra định dạng email
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}
