const express = require("express");
const router = express.Router();
const connection = require("../db/dbconnect");

router.get("/allplayers", (req, resp) => {
  connection.query("select * from players", (err, data, fields) => {
    if (err) {
      resp.status(500).send("Data not Found!!!" + JSON.stringify(err));
    } else {
      resp.send(data);
    }
  });
});

router.get("/allplayers/players/:pid", (req, resp) => {
  connection.query(
    "select * from players where pid=?",
    [req.params.pid],
    (err,data) => {
      if (err) {
        resp
          .status(500)
          .send(
            "invalid players ID please Enter valid ID" + JSON.stringify(err)
          );
      } else {
        resp.send(data[0]);
      }
    }
  );
});

router.post("/allplayers/players", (req, resp) => {
  var pid = req.body.pid;
  var pname = req.body.pname;
  var sal = req.body.sal;
  console.log(pid+pname+sal);
  connection.query(
    "insert into players values(?,?,?)",
    [pid, pname, sal],
    (err, result) => {
      if (err) {
        resp
          .status(500)
          .send(
            "Data not inserted into respective player" + JSON.stringify(err)
          );
      } else {
        if (result.affectedRows > 0) {
          resp.send("{'msg':'data inserted sucessfull'}");
        } else {
          resp.send("{'msg':'not inserted'}");
        }
      }
    }
  );
});

router.put("/allplayers/players/:pid", (req, resp) => {
  var pid = req.body.pid;
  var pname = req.body.pname;
  var sal = req.body.sal;
  connection.query(
    "update players set pname = ?,psalary = ? where pid = ? ",
    [pname, sal, pid],
    (err, result) => {
      if (err) {
        resp.status(500).send("bad luck data not update"+JSON.stringify( err));
      } else {
        if (result.affectedRows > 0) {
          resp.send('{"msg":"Player profile is successfull update"}');
        } else {
          resp.send('{"msg":"sorry to say that profile did not updated"}');
        }
      }
    }
  );
});

router.delete("/allplayers/players/:pid", (req, resp) => {
  connection.query(
    "delete from players where pid = ? ",
    [req.params.pid],
    (err, result) => {
      if (err) {
        resp.status(500).send("player ID is invalid please enter a valid ID"+JSON.stringify(err));
      } else {
        if (result.affectedRows > 0) {
          resp.send('{"msg":"player profile is successfully deleted"}');
        } else {
          resp.status(500).send('{"msg":"players profile is not deleted"}');
        }
      }
    }
  );
});

module.exports = router;
