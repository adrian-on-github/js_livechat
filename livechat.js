"use strict";
class livechat {
  constructor(user_names, userName) {
    this.messages = [];
    this.user_names = user_names;
    this.userName = userName;
  }

  _html_generieren() {
    const container = document.createElement("div");
    container.setAttribute("class", "container");

    const box = document.createElement("div");
    box.setAttribute("class", "box");
    container.insertAdjacentElement("afterbegin", box);

    const chat = document.createElement("div");
    chat.setAttribute("class", "box-2");
    chat.setAttribute("id", "chat");

    const chatbox = document.createElement("div");
    chatbox.setAttribute("class", "chatbox");
    chat.appendChild(chatbox);

    const layout = document.createElement("div");
    layout.setAttribute("id", "chatLayout");
    chatbox.appendChild(layout);

    const users = document.createElement("div");
    users.setAttribute("id", "Users");

    const ol = document.createElement("ol");

    const all_usernames = document.createElement("p");
    all_usernames.textContent = this.user_names;
    ol.insertAdjacentElement("afterbegin", all_usernames);
    users.appendChild(ol);

    const form = document.createElement("form");
    const formLayout = document.createElement("div");
    formLayout.setAttribute("class", "formLayout");
    form.appendChild(formLayout);

    const submit = document.createElement("input");
    submit.setAttribute("class", "submit");
    submit.setAttribute("type", "submit");

    const input = document.createElement("input");
    input.setAttribute("class", "input");
    input.setAttribute("id", "chatinput");
    input.setAttribute("type", "text");
    input.setAttribute("minlength", "10");
    input.setAttribute("maxlength", "100");
    input.setAttribute("placeholder", "Tell everyone whats going on.");

    formLayout.insertAdjacentElement("afterbegin", input);
    formLayout.insertAdjacentElement("beforeend", submit);

    box.appendChild(chat);
    chat.insertAdjacentElement("beforeend", users);
    box.appendChild(form);

    form.addEventListener("submit", (message) => {
      message.preventDefault();

      if (input.value == "") {
        return;
      }

      this._nachricht_erstellen(input.value);
    });

    document
      .querySelector("body")
      .insertAdjacentElement("afterbegin", container);
    return container;
  }

  _nachricht_erstellen(message) {
    const timestamp = new Date();

    const userNachricht = document.createElement("div");
    userNachricht.setAttribute("class", "row");

    const userName_element = document.createElement("h1");
    const message_element = document.createElement("p");
    userName_element.setAttribute("class", "username");

    userName_element.textContent = this.userName;
    message_element.textContent = message;

    userNachricht.insertAdjacentElement("afterbegin", userName_element);
    userNachricht.insertAdjacentElement("beforeend", message_element);

    const messageObject = {
      name: this.userName,
      text: message,
      timestamp: timestamp,
    };

    this.messages.push(messageObject);

    this.messages.forEach((e) => {
      console.log(e.timestamp);
    });

    if (this.messages.length >= 5) {
      this.messages.sort((message_a, message_b) => {
        if (message_a.timestamp > message_b.timestamp) {
          return 1;
        } else if (message_a.timestamp < message_b.timestamp) {
          return -1;
        }
      });
      this.messages.splice(0, 2);
      this.anzeigen();
      console.log(this.messages);
    }

    const layout = document.querySelector("#chatLayout");
    layout.insertAdjacentElement("afterbegin", userNachricht);
  }

  anzeigen() {
    this._html_generieren();
  }
}
