# Welcome to "Hundemenschen" 👋

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## Database

### Making changes to the database schema

1. Change the model in `./database/models.ts`
2. Run the following command to generate the new database schema

   ```bash
   npx drizzle-kit generate
   ```

### Interacting with the database

We use [Drizzle](https://orm.drizzle.team/docs/connect-expo-sqlite) to interact directly with the database (`./db/database.ts`).

### Zustand Store

We use [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction) for state management in our application. The store is defined in `./stores/dogStore.ts`. It manages the state of the current dog, providing functions to set, create, and delete a dog. Here's a brief overview of the store's functionality:

- **State:**

  - `dog`: Represents the current dog object or `null` if no dog is set.

- **Actions:**
  - `setDog(dog: Dog | null)`: Sets the current dog in the state.
  - `createNewDog(insertDog: InsertDog)`: Asynchronously creates a new dog in the database and updates the state with the newly created dog.
  - `deleteDog()`: Asynchronously deletes the current dog from the database and sets the state to `null`.

To ensure the reactivity of the data, code should never directly communicate with `./db/database.ts`. Instead, all interactions with the database should be done through the Zustand store. This approach maintains a consistent and reactive state throughout the application.

### Example: Accessing the Store in a ReactNavtive Component

Here's a simple example of how you can access the Zustand store in a ReactNative component:

```tsx
import useDogStore from '@/stores/dogStore';

import Text from '@/components/Text';
import { View, Button } from 'react-native';

const DogComponent = () => {
  const { dog, deleteDog } = useDogStore();

  return (
    <View>
      <Text>{dog?.name}</Text>
      <Button title="Delete Dog" onPress={() => deleteDog()} />
    </View>
  );
};
```

### Database Schema

The database includes the following main tables:

- `dogs`: Stores basic information about dogs
- `contacts`: Stores contact information for owners and secondary contacts
- `medical_info`: Stores medical information about dogs
- `vet`: Stores veterinarian information
- `diagnosis`: Stores diagnosis records
- `checkup`: Stores checkup sessions
- `checkup_answers`: Stores individual answers from checkup sessions

### Checkup System

The application includes a checkup system that allows users to:

1. Complete a questionnaire about their dog's health
2. Record answers and notes for each question
3. Track critical health indicators
4. Store the checkup history in the database

Each checkup is stored with:

- A timestamp
- Reference to the dog
- Collection of answers including:
  - The original question
  - Selected answer
  - Optional notes
  - Critical status flag
