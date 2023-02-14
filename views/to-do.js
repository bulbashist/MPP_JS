const elems = document.querySelectorAll(".task");

elems.forEach((elem) => {
  elem.style.backgroundColor =
    elem.dataset.status == 0
      ? "red"
      : elem.dataset.status == 1
      ? "yellow"
      : "green";
});

const downloadBtns = document.querySelectorAll(".dload-file");

downloadBtns.forEach(async (btn) => {
  const id = btn.dataset.id;
  const res = await fetch(`http://localhost:3000/tasks/${id}`);

  if (res.ok) {
    const data = await res.blob();
    const file = new Blob([data], { type: "application/pdf" });
    btn.href = window.URL.createObjectURL(file);
  }
});

const editBtns = document.querySelectorAll(".status-container");
const deleteBtns = document.querySelectorAll(".delete-btn");

editBtns.forEach((btn) => {
  btn.addEventListener("click", async (e) => {
    if (e.target.name.includes("status")) {
      const id = btn.dataset.id;
      await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: e.target.value,
        }),
      });
      window.location.reload();
    }
  });
});

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", async () => {
    const id = btn.dataset.id;
    await fetch(`http://localhost:3000/tasks/${id}`, { method: "DELETE" });
    window.location.reload();
  });
});
