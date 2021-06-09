const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("./db/contacts.json");

// async function getContactsData() {
//   const data = await fs.readFile(contactsPath, "utf8");
//   const contacts = JSON.parse(data);
//   contacts;
//   //   console.table(contacts);
// }
// getContactsData();

const date = Date.now();
// console.log(date);

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (err) {
    console.error(err);
  }
}
// listContacts();

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const contactById = contacts.find(
      ({ id }) =>
        //    id.toString() === contactId;
        id === contactId
    );
    console.log("contactById:   ", contactById);
    return contactById;
  } catch (err) {
    console.error(err);
  }
}
// getContactById("10");
// getContactById(10);

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    console.log("data: ", data);
    console.log("contacts: ", contacts);

    const removeContactById = contacts.filter(({ id }) => {
      // console.log("id:  ", id);
      //    id.toString() === contactId;
      id !== contactId;
    });
    console.log("removeContactById: ", removeContactById);
    const contactsListAfterRemove = JSON.stringify(removeContactById);
    // await writeToJson(contactsList);
    const newFileContacts = await fs.writeFile(
      contactsPath,
      contactsListAfterRemove,
      "utf8"
    );
    console.log("newFileContacts:  ", newFileContacts);
    // :   ",       const newFileContacts = await fs.writeFile(contactsPath, contactsListAfterRemove, "utf8");
    // );
    //     return       const newFileContacts = await fs.writeFile(contactsPath, contactsListAfterRemove, "utf8");
    // ;
  } catch (err) {
    console.error(err);
  }
}
// removeContact("10");
removeContact(10);

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const emailC = contacts.map((el) => el.email);
    console.log("emailC:  ", emailC);

    if (!emailC.includes(email)) {
      const dataAddToContacts = { id: date, name, email, phone };
      contacts.push(dataAddToContacts);
      // console.log(contacts);
      newDataContacts = JSON.stringify(contacts);
      // newDataContacts = JSON.stringify(contacts);
      await fs.writeFile(contactsPath, newDataContacts);
    }
  } catch (err) {
    console.error(err);
  }
}

// listContacts();
// addContact("david", "email@gmail.com", "12345678");
// addContact("david", "email555@gmail.com", "12345678");
// removeContact(1623241047866);
// listContacts();

const arr = [
  { id: 123, score: 1 },
  { id: 124, score: 2 },
  { id: 125, score: 3 },
  { id: 126, score: 4 },
];
const filter = arr.filter(({ id }) => id !== 123);
console.log(filter);
