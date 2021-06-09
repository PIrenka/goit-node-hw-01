const path = require("path");
const fs = require("fs").promises;
const shortid = require("shortid");

const contactsPath = path.join("./db/contacts.json");

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

    const contactById = contacts.find(({ id }) => id.toString() === contactId);
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

    const removeContactList = contacts.filter(
      ({ id }) => id.toString() !== contactId
    );
    const contactsListAfterRemove = JSON.stringify(removeContactList);

    const newFileContacts = await fs.writeFile(
      contactsPath,
      contactsListAfterRemove,
      "utf8"
    );
    return console.table(removeContactList);
  } catch (err) {
    console.error(err);
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);

    const emailC = contacts.map((el) => el.email);

    if (!emailC.includes(email)) {
      const dataAddToContacts = { id: shortid.generate(), name, email, phone };
      contacts.push(dataAddToContacts);
      newDataContacts = JSON.stringify(contacts);
      await fs.writeFile(contactsPath, newDataContacts);
    }
    console.table(contacts);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
