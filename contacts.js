const path = require("path");
const fs = require("fs").promises;

const contactsPath = path.join("./db/contacts.json");

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

    // console.log("data: ", data);
    // console.log("contacts: ", contacts);

    // console.log("contactId: ", contactId);

    const removeContactById = contacts.filter(({ id }) => id !== contactId);
    // console.log("removeContactById: ", removeContactById);
    const contactsListAfterRemove = JSON.stringify(removeContactById);

    // console.log("contactsListAfterRemove:  ", contactsListAfterRemove);

    // await writeToJson(contactsListAfterRemove);

    const newFileContacts = await fs.writeFile(
      contactsPath,
      contactsListAfterRemove,
      "utf8"
    );
    // console.log("newFileContacts:  ", newFileContacts);
  } catch (err) {
    console.error(err);
  }
}
// removeContact("10");
// removeContact(10);

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
