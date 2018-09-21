const args = ["start"];
const opts = { stdio: "inherit", cwd: "client", shell: true };
require("child_process").spawn("npm", args, opts);


//stdio - configure the pipes that are established between the parent and child process.
