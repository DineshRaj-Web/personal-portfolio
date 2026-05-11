# Admin Authentication & SQL Injection Safety Guide

## 1. Prisma Admin Model

We've created a secure `Admin` model in `prisma/schema.prisma`:

```prisma
model Admin {
  id       Int    @id @default(autoincrement())
  username String @unique
  password String
}
```

## 2. Creating an Admin User Securely

Run the script to create an admin:
```bash
node createAdmin.js
```

This script:
- Uses `bcryptjs` to hash passwords
- NEVER stores plain text passwords
- Uses Prisma's safe query methods

## 3. SQL Injection Explained

### ❌ UN-SAFE: Raw SQL with String Concatenation
```javascript
// DANGEROUS - Never do this!
const username = req.body.username;
const query = "SELECT * FROM Admin WHERE username = '" + username + "'";
// If username = "admin' OR '1'='1", this becomes:
// SELECT * FROM Admin WHERE username = 'admin' OR '1'='1'
// This returns ALL admins!
```

### ✅ SAFE: Prisma ORM Methods
```javascript
// SAFE - Prisma handles parameterization automatically
const username = req.body.username;
const admin = await prisma.admin.findUnique({
  where: { username: username }
});
```

## 4. Why Prisma is Safe

Prisma automatically uses **parameterized queries** (prepared statements) under the hood. This means:
- User input is treated as DATA, not as executable SQL code
- Even if a malicious user inputs something like `admin' OR '1'='1`, it's just treated as a string value
- No SQL injection possible with normal Prisma usage

## 5. Safe vs Unsafe Examples

### ✅ Safe Prisma Queries
```javascript
// Create - Safe
await prisma.admin.create({
  data: { username: "admin", password: hashedPassword }
});

// Read - Safe
await prisma.admin.findUnique({
  where: { username: userInput }
});

// Update - Safe
await prisma.admin.update({
  where: { id: userId },
  data: { password: newHashedPassword }
});

// Delete - Safe
await prisma.admin.delete({
  where: { id: userId }
});
```

### ⚠️ Raw Query Safety
```javascript
// ❌ UNSAFE: $queryRawUnsafe with string concatenation
await prisma.$queryRawUnsafe(
  "SELECT * FROM Admin WHERE username = '" + username + "'"
);

// ✅ SAFE: $queryRaw with template literals
await prisma.$queryRaw`
  SELECT * FROM Admin WHERE username = ${username}
`;
```

## 6. Best Practices Checklist

✅ **Always hash passwords** with bcrypt (or similar) before storing
✅ **Never store plain text passwords**
✅ **Use Prisma ORM methods** instead of raw SQL whenever possible
✅ **Validate and sanitize user input**
✅ **Never trust data from the frontend**
✅ **Use unique constraints** on fields like username
✅ **Use HTTPS** in production
✅ **Implement rate limiting** for login attempts
✅ **Regularly rotate passwords** and API keys
✅ **Avoid $queryRawUnsafe** unless absolutely necessary
✅ **If using raw SQL, always use parameterized queries**

## 7. Example Login Endpoint (Safe)

Here's what a secure login endpoint might look like:

```javascript
const bcrypt = require('bcryptjs');

app.post("/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // SAFE: Prisma parameterized query
    const admin = await prisma.admin.findUnique({
      where: { username: username }
    });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
```
