const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("./db/contacts.json");

const date = Date.now();

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.table(contacts);
  } catch (err) {
    console.error(err);
  }
}

async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const contactById = contacts.find(({ id }) => id === contactId);
    console.log("contactById:   ", contactById);
    return contactById;
  } catch (err) {
    console.error(err);
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const removeContactById = contacts.filter(({ id }) => id !== contactId);
    const contactsListAfterRemove = JSON.stringify(removeContactById);

    const newFileContacts = await fs.writeFile(
      contactsPath,
      contactsListAfterRemove,
      "utf8"
    );
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const emailC = contacts.map((el) => el.email);
    // console.log("emailC:  ", emailC);

    if (!emailC.includes(email)) {
      const dataAddToContacts = { id: date, name, email, phone };
      contacts.push(dataAddToContacts);
      // console.log(contacts);
      newDataContacts = JSON.stringify(contacts);
      await fs.writeFile(contactsPath, newDataContacts);
    }
  } catch (err) {
    console.error(err);
  }
}

// listContacts();
// addContact("david", "email@gmail.com", "12345678");
// addContact("david", "email555@gmail.com", "12345678");
// removeContact(1623275852074);
// listContacts();

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
