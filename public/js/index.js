(function () {
  window.onload = () => {
    const form = document.getElementById("formLoader");
    const inputLoader = document.getElementById("uploader");
    const discardButton = document.querySelector(".discard");
    const attachment = document.querySelector(".attachment");
    const responseEle = document.querySelector(".upload-response");

    function handleChange(e) {
      event.preventDefault();
      event.stopPropagation();
      if (e.target.files[0]) {
        generateAttachment();
      }
    }

    const handleDiscard = () => {
      discardAttachment();
    };

    const sendFiles = async () => {
      const myFile = inputLoader.files;
      const formData = new FormData();
      formData.append(myFile.item(0)?.name, myFile.item(0));

      const response = await fetch("http://localhost:3000/upload", {
        method: "POST",
        body: formData,
      });

      const json = await response?.json();

      if (json?.status === "error") {
        generateErrorEle(json?.status, json?.message);
      } else {
        generateResponse(json?.message);
      }
    };

    function generateAttachment() {
      const container = document.createElement("div");
      const textContainer = document.createElement("div");
      const icon = document.createElement("span");
      const title = document.createElement("h3");
      const detail = document.createElement("span");
      container.setAttribute("class", "attachment-msg");
      icon.setAttribute("class", "icon");
      detail.textContent = `${inputLoader.files[0].name}`;
      title.textContent = "Upload Completed";
      attachment.appendChild(container);
      container.appendChild(icon);
      container.appendChild(textContainer);
      textContainer.appendChild(title);
      textContainer.appendChild(detail);
    }

    function generateErrorEle(status, message) {
      const container = document.createElement("div");
      const title = document.createElement("span");
      const detail = document.createElement("p");
      container.setAttribute("class", "upload-response-error");
      title.textContent = status;
      detail.textContent = message;
      responseEle.appendChild(container);
      container.appendChild(title);
      container.appendChild(detail);
    }

    function generateResponse(message) {
      const container = document.createElement("div");
      container.setAttribute("class", "upload-response-content");
      const code = document.createElement("code");
      responseEle.appendChild(container);
      code.textContent = JSON.stringify(message, null, 2);
      container.appendChild(code);
    }

    function discardAttachment() {
      const target = document.querySelector(".attachment-msg");
      if (target) {
        attachment.removeChild(target);
      }
    }

    function discardErrorResponse() {
      const target = responseEle.firstChild;
      if (target) {
        responseEle.removeChild(target);
      }
    }

    inputLoader.addEventListener("change", handleChange);
    discardButton.addEventListener("click", handleDiscard);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      discardErrorResponse();
      sendFiles();
    });
  };
})();
