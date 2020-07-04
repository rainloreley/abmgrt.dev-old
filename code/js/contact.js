var captchaToken = "";
var sendingMessage = false;

var form = $("form#contact-form");
var url =
  "https://script.google.com/macros/s/AKfycbzGj9nkF7mnSssVl2R4aNcP2H8R3H7EFsheIBzu5ci-1KWaD3M/exec";

$("#submit-form").on("click", function (e) {
  if (sendingMessage == false) {
    sendingMessage = true;
    e.preventDefault();
    var name = $("#formName").val();
    var email = $("#formEmail").val();
    var text = $("#formText").val();

    if (name != "" && email != "" && text != "") {
      $.ajax({
        type: "POST",
        url: "https://www.google.com/recaptcha/api/siteverify",
        data: {
          secret: "6Le0BaUZAAAAAAG4JJV4XHRMc-RwisFth4Bj3ilJ",
          response: captchaToken,
        },
        success: function (res) {
          if (res["success"] == true) {
            var jqxhr = $.ajax({
              url: url,
              method: "GET",
              dataType: "json",
              data: form.serializeObject(),
              success: function (res) {
                if (res["result"] == "success") {
                  Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Your message was sent successfully!",
                  });
                  setTimeout(function () {
                    location.reload();
                    sendingMessage = false;
                  }, 3000);
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oh no!",
                    text: "An error occurred, please try again",
                  });
                  sendingMessage = false;
                }
              },
            });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Please solve the Captcha before continuing",
            });
            sendingMessage = false;
          }
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please fill out all fields",
      });
      sendingMessage = false;
    }
  }
});

function captchaSubmit(token) {
  //alert(token);
  captchaToken = token;
}
