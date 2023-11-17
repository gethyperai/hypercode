const { Hyper } = require('hypercode');
const dotenv = require('dotenv');

dotenv.config();

const hyper = new Hyper(process.env.HYPER_API_KEY);

async function main() {
  const { data, error } = await hyper.types.integer(
    "What's the square root of 16?",
  );

  if (data) {
    console.log(data); // 4
  } else {
    console.log(error);
  }
}

main();
