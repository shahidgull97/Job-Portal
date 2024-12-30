document.addEventListener("DOMContentLoaded", function () {
  function deleteProduct(id) {
    const result = confirm("Are you sure you want to delete this item");

    if (result) {
      fetch("/delete/" + id, {
        method: "GET",
      }).then((res) => {
        if (res.ok) {
          window.location.href = "/jobs";
        }
      });
    }
  }
  window.deleteProduct = deleteProduct;
});

function updateProduct(id) {
  const result = confirm("Are you sure you want to update this item");

  // if (result) {
  //   fetch("/delete/" + id, {
  //     method: "GET",
  //   }).then((res) => {
  //     if (res.ok) {
  //       window.location.href = "/jobs";
  //     }
  //   });
  // }
}

function sendAlert() {
  alert("Job submited successfully, you can check your email");
}
