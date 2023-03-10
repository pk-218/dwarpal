import { NodeSSH } from "node-ssh";
import generatePassword from "../utils/createPassword.js";
import { db } from "../utils/sqlConfig.js";
const ssh = new NodeSSH();

const VM_CONFIG = {
  host: process.env.VM_IP,
  username: process.env.VM_USER,
  password: process.env.VM_PASSWORD,
};

const memory_usage_per_user =
  'select u.username, (SUM(total_size) * 10e-7) as total_mem_usage from users as u left join processes as p on (u.uid = p.uid) where (u.username like "%\\_b%" escape "\\") group by u.uid;';
const all_users =
  'select * from users where username like "%\\_b%" escape "\\";';
const logged_in_users =
  'select * from logged_in_users where user like "%\\_b%" escape "\\";';

const createUser = (req, res) => {
  const id = req.body.id;
  const username = req.body.email.split("@")[0];
  const password = generatePassword();
  const expireOn = "2023-01-30";

  ssh.connect(VM_CONFIG).then(function () {
    ssh
      .execCommand(
        `./scripts/create-user.sh ${username} ${password} ${expireOn} ${id}`,
        { cwd: "./" }
      )
      .then(function (result) {
        ssh.dispose();
        res.send("successful");
      });
  });
};

const deleteUser = (req, res) => {
  const username = req.body.username;
  ssh
    .connect(VM_CONFIG)
    .then(() => {
      ssh.execCommand(`userdel ${username}`, { cwd: "./" }).then((res) => {
        ssh.dispose();
        res.send("Access revoked as user has been deleted from the VM");
      });
    })
    .finally(() => {
      db.user.update(
        { username: "", expirationDate: "" },
        { where: { username: username } }
      );
    });
};

const getStats = (req,res) => {
  var stats = []
  ssh.connect(VM_CONFIG).then(function () {
    ssh.execCommand(
        `./osqueryd -S --disable_events=false --enable_bpf_events=true --enable_bpf_file_events=true --allow_unsafe=true '${all_users}' --json;`,
        { cwd: "./" }
      )
      .then(function (result) {
        stats.push(result.stdout)
        ssh.execCommand(
          `./osqueryd -S --disable_events=false --enable_bpf_events=true --enable_bpf_file_events=true --allow_unsafe=true '${memory_usage_per_user}' --json;`,
          { cwd: "./" }
        )
        .then(function (result) {
          stats.push(result.stdout)
          ssh.execCommand(
            `./osqueryd -S --disable_events=false --enable_bpf_events=true --enable_bpf_file_events=true --allow_unsafe=true '${logged_in_users}' --json;`,
            { cwd: "./" }
          )
          .then(function (result) {
            stats.push(result.stdout)
            ssh.dispose();
            res.send(stats);
          });

        });

      });
  }, function(error) {
    console.log("Something's wrong")
    console.log(error)
  });
}

export default {
  createUser,
  deleteUser,
  getStats
};
