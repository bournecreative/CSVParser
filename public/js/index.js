const csvParser = {
  init() {
    this.uploadForm = document.getElementById("formLoader");
    if (!this.uploadForm) {
      return;
    }
    this.uploadInput = this.uploadForm.querySelector(".upload-input");
    this.discardButton = this.uploadForm.querySelector(".discard");
    this.attachment = document.querySelector(".attachment");
    this.messageWindow = document.querySelector(".upload-response");

    this.discardButton.addEventListener(
      "click",
      this.handleDiscard.bind(this),
      false
    );

    this.uploadInput.addEventListener(
      "change",
      this.handleChange.bind(this),
      false
    );
    this.uploadForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.clearResponseMessages();
      this.sendFiles();
    });
  },
  handleChange(e) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.target.files[0];
    if (file) {
      this.generateAttachment(file);
    }
  },
  handleDiscard() {
    this.discardAttachment();
  },
  async sendFiles() {
    const payload = this.uploadInput.files;
    const formData = new FormData();
    formData.append(payload.item(0)?.name, payload.item(0));

    const response = await fetch("/upload", {
      method: "POST",
      body: formData,
    });

    const json = await response?.json();

    if (json?.status === "error") {
      this.generateErrorEle(json?.status, json?.message);
    } else {
      this.generateResponse(json?.message);
    }
  },
  generateAttachment(payload) {
    const container = document.createElement("div");
    const textContainer = document.createElement("div");
    const icon = document.createElement("span");
    const title = document.createElement("h3");
    const detail = document.createElement("span");
    container.setAttribute("class", "attachment-msg");
    icon.setAttribute("class", "icon");
    detail.textContent = `${payload}`;
    title.textContent = "Upload Completed";
    this.attachment.appendChild(container);
    container.appendChild(icon);
    container.appendChild(textContainer);
    textContainer.appendChild(title);
    textContainer.appendChild(detail);
  },
  generateErrorEle(status, message) {
    const container = document.createElement("div");
    const title = document.createElement("span");
    const detail = document.createElement("p");
    container.setAttribute("class", "upload-response-error");
    title.textContent = status;
    detail.textContent = message;
    this.messageWindow.appendChild(container);
    container.appendChild(title);
    container.appendChild(detail);
  },
  generateResponse(message) {
    const container = document.createElement("div");
    container.setAttribute("class", "upload-response-content");
    const code = document.createElement("code");
    this.messageWindow.appendChild(container);
    code.textContent = JSON.stringify(message, null, 2);
    container.appendChild(code);
  },
  discardAttachment() {
    const attachmentChild = this.attachment.firstChild;
    if (attachmentChild) {
      this.attachment.removeChild(attachmentChild);
    }
  },
  clearResponseMessages() {
    const responseChild = this.messageWindow.firstChild;
    if (responseChild) {
      this.messageWindow.removeChild(responseChild);
    }
  },
};
window.onload = () => {
  csvParser.init();
};
