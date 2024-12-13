import Database from "better-sqlite3";
import bcrypt from 'bcrypt';

const db = new Database("ChefSecretRecipe.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS ht_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      profile_picture TEXT DEFAULT 'user1_profile.jpg',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS recipes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      ingredients TEXT NOT NULL,
      instructions TEXT NOT NULL,
      user_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES ht_users(id)
  );
`);

// Hash the password before inserting the user
const insertUser = db.prepare(`
  INSERT OR IGNORE INTO ht_users (username, password, email)
  VALUES (?, ?, ?)
`);

const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Create a new user with hashed password
const createUser = async () => {
  try {
    const hashedPassword = await hashPassword("password123");
    insertUser.run("johndoe", hashedPassword, "johndoe@example.com");
    console.log("User johndoe inserted successfully!");

    // Now insert recipes (after user is created)
    const insertRecipe = db.prepare(`
      INSERT INTO recipes (title, description, image, ingredients, instructions, user_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const userStmt = db.prepare("SELECT id FROM ht_users WHERE username = ?");
    const user = userStmt.get("johndoe");
    const userId = user ? user.id : null;

    if (userId) {
        // Recipe 1: Desi Karak Chai
        insertRecipe.run(
            "Desi Karak Chai",
            "A strong and flavorful tea perfect for any time of day.",
            "depth-7-frame-0@2x.png",
            "Tea leaves\r\nMilk\r\nWater\r\nSugar\r\nCardamom",
            "1. Boil water and add tea leaves.\r\n2. Add sugar and cardamom.\r\n3. Add milk and simmer for 5 minutes.\r\n4. Strain and serve hot.",
            userId
        );

        // Recipe 2: Chocolate Chip Cookies
        insertRecipe.run(
            "Chocolate Chip Cookies",
            "Classic cookies loaded with chocolate chips for a delightful treat.",
            "depth-7-frame-0-1@2x.png",
            "All-purpose flour\r\nButter\r\nSugar\r\nEggs\r\nVanilla extract\r\nChocolate chips",
            "1. Preheat oven to 350°F (175°C).\r\n2. Cream together butter and sugar.\r\n3. Add eggs and vanilla extract.\r\n4. Mix in flour and fold in chocolate chips.\r\n5. Drop spoonfuls onto a baking sheet and bake for 10-12 minutes.",
            userId
        );

        // Recipe 3: Butter Chicken
        insertRecipe.run(
            "Butter Chicken",
            "A rich and creamy tomato-based curry with tender chicken pieces.",
            "depth-7-frame-0-2@2x.png",
            "Chicken\r\nTomatoes\r\nCream\r\nButter\r\nSpices\r\nOnions",
            "1. Marinate chicken with spices and yogurt.\r\n2. Cook onions, tomatoes, and spices in butter.\r\n3. Add chicken and cook until tender.\r\n4. Stir in cream and simmer for 10 minutes.",
            userId
        );

        // Recipe 4: Pasta Basta
        insertRecipe.run(
            "Pasta Basta",
            "A quick and easy pasta dish with a tangy tomato sauce.",
            "depth-7-frame-0-3@2x.png",
            "Pasta\r\nTomato sauce\r\nGarlic\r\nOlive oil\r\nBasil\r\nParmesan cheese",
            "1. Cook pasta according to package instructions.\r\n2. Sauté garlic in olive oil.\r\n3. Add tomato sauce and basil, simmer for 5 minutes.\r\n4. Toss pasta with the sauce and top with Parmesan cheese.",
            userId
        );

        console.log("Recipes inserted successfully!");
    } else {
        console.error("Error: User not found.");
    }
  } catch (error) {
    console.error("Error inserting user or recipes: ", error);
  }
};

// Call the function to create the user and insert the recipes
createUser();
