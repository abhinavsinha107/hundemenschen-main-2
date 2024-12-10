import { Database } from '@/db/database';
import { Contact, InsertContact } from '@/db/schema';
import { create } from 'zustand';

interface ContactStore {
  primaryContact: Contact | null;
  secondaryContact: Contact | null;

  setPrimaryContact: (contact: Contact | null) => Promise<void>;
  setSecondaryContact: (contact: Contact | null) => Promise<void>;

  createPrimaryContact: (insertContact: InsertContact) => Promise<void>;
  createSecondaryContact: (insertContact: InsertContact) => Promise<void>;

  deletePrimaryContact: () => Promise<void>;
  deleteSecondaryContact: () => Promise<void>;
}

const useContactStore = create<ContactStore>((set, get) => ({
  primaryContact: null,
  secondaryContact: null,

  setPrimaryContact: async (contact: Contact | null) => {
    if (contact) {
      await Database.updateContact(contact.id, contact);
    }
    set({ primaryContact: contact });
  },

  setSecondaryContact: async (contact: Contact | null) => {
    if (contact) {
      await Database.updateContact(contact.id, contact);
    }
    set({ secondaryContact: contact });
  },

  createPrimaryContact: async (insertContact: InsertContact) => {
    const store = get();
    if (store.primaryContact) {
      throw new Error('Primary contact already exists');
    }
    await Database.createPrimaryContact(insertContact);
    const dbContact = await Database.getPrimaryContact();
    if (!dbContact) {
      throw new Error('Primary contact not found after creation');
    }
    set({ primaryContact: dbContact });
  },

  createSecondaryContact: async (insertContact: InsertContact) => {
    const store = get();
    if (store.secondaryContact) {
      throw new Error('Secondary contact already exists');
    }
    await Database.createSecondaryContact(insertContact);
    const dbContact = await Database.getSecondaryContact();
    if (!dbContact) {
      throw new Error('Secondary contact not found after creation');
    }
    set({ secondaryContact: dbContact });
  },

  deletePrimaryContact: async () => {
    const store = get();
    if (!store.primaryContact) {
      throw new Error('No primary contact to delete');
    }
    await Database.deleteContact(store.primaryContact.id);
    set({ primaryContact: null });
  },

  deleteSecondaryContact: async () => {
    const store = get();
    if (!store.secondaryContact) {
      throw new Error('No secondary contact to delete');
    }
    await Database.deleteContact(store.secondaryContact.id);
    set({ secondaryContact: null });
  },
}));

export default useContactStore;
