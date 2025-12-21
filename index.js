const PORT = process.env.PORT;

if (!PORT) {
  console.error("PORT not found");
  process.exit(1);
}

