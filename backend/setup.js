import fs from 'node:fs'

try {
  // Check if database existsts and create it from dummy data
  fs.statSync('database.json')
} catch (error) {
  fs.copyFileSync('initialDatabase.json', 'database.json')
}
