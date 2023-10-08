const child_process = require("node:child_process");
const events = require("node:events");

class Analyzer extends events.EventEmitter {
  constructor() {
    super();
    this.process = null;
    this._last_sent_event = null;
    // this.createProcess();
  }

  getLastEvent() {
    return this._last_sent_event;
  }

  destroy() {
    if (this.process) {
      // this.process.kill();
      this.process.stdin.write('{"cmd":"exit"}\n');
    }
  }

  plot() {
    // return console.log("NOT AVILABLE ON SERVER SIDE ANALYZER");
    if (this.process) {
      this.process.stdin.write('{"cmd":"plot"}\n');
    }
  }

  requestParamaters() {
    if (this.process) {
      this.process.stdin.write('{"cmd":"paramaters"}\n');
    }
  }

  createProcess(start_date, end_date, probe) {
    if (this.process) {
      this.process.kill();
      this.process = null;
    }

    let args = [];

    if (start_date) {
      args.push("--start_date");
      args.push(start_date);
    }
    if (end_date) {
      args.push("--end_date");
      args.push(end_date);
    }
    if (probe) {
      args.push("--probe");
      args.push(probe);
    }

    this.process = child_process.spawn("py", ["./analyzer/main.py", ...args]);

    this.process.on("spawn", () => {
      this.emit("packet", {
        event: "spawn",
        data: "Process spawned",
      });
    });

    this.process.on("error", (err) => {
      console.log(err.message);
      this.emit("packet", {
        event: "error",
        // error: err.message,
        data: "There was an error with the process.",
      });
    });

    this.process.on("exit", (code, signal) => {
      console.log(`Process exited with code ${code} and signal ${signal}`);
      this.emit("exit");

      if (code !== null) {
        this.emit("packet", {
          event: "exit",
          data: code,
        });
      }

      this.process = null;
    });

    this.process.stdout.on("data", (data) => {
      let msgs = data
        .toString("utf-8")
        .split("\n")
        .filter((msg) => !!msg);

      for (let msg of msgs) {
        let packet;
        try {
          packet = JSON.parse(msg.trim());
        } catch {
          // return;
        }
        console.log("msg: ", msg.trim(), !!packet);

        if (packet?.data?.event === "finished") {
          this._last_sent_event = packet;
        }

        this.emit("packet", {
          event: "message",
          data: packet,
        });
      }
    });
  }
}

module.exports = Analyzer;
