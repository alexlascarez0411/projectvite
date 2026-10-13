import data from "./data.json";

console.log("Hello, world!");
console.log(data.mensaje);

const userlist = document.querySelector("#user");

data.users.forEach((user) => {
  console.log(user.name);
  const li = document.createElement("li");
  li.textContent = user.name;
  userlist?.append(li);
});