const { default: mongoose } = require("mongoose");

function connect(connectionLink) {
  mongoose.connect(connectionLink);
  mongoose.connection.on("error", (err) => console.log(err));
  mongoose.connection.on("connected", () =>
    console.log("connected successfully")
  );
}

module.exports = { connect };
