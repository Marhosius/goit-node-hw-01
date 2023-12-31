import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

export const getContactById = async (id) => {
    const contacts = await listContacts();
    const contact = contacts.find(item => item.id === id);
    return contact || null;
}


export const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

export const removeContact = async (id) => {
    const contacts = await listContacts();
    const ind = contacts.findIndex(item => item.id === id);

    if (ind === -1) { return null; }

    const [deletedContact] = contacts.splice(ind, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return deletedContact;
}

export default {
    listContacts,
    getContactById,
    removeContact,
    addContact,
}