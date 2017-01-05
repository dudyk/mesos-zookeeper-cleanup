"use strict";
var zookeeper = require("node-zookeeper-client");

var zkClient = zookeeper.createClient("master.mesos:2181");
console.log("Going to delete framework " + process.env.FRAMEWORK_NAME + " from zookeeper in 60 seconds, kill the task to abort");
zkClient.once("connected", function () {
    setTimeout(function () {
        zkClient.remove("/dcos-service-" + process.env.FRAMEWORK_NAME + "/framework-id", -1, function (error) {
            if (error) {
                console.log(JSON.stringify(error));
                process.exit(1);
            }
            console.log("Deleted successfully");
            setTimeout(function () {
                process.exit(0);
            }, 600000);
        });
        zkClient.getChildren("/dcos-service-" + process.env.FRAMEWORK_NAME + "/tasks", function (error, children, stat) {
            if (children) {
                children.forEach(function (taskId) {
                    zkClient.remove("/dcos-service-" + process.env.FRAMEWORK_NAME + "/tasks/" + taskId, function (error) {
                        if (error) {
                            console.log("Error deleting task ID " + taskId + " from zookeeper");
                        } else {
                            console.log("Deleted task " + taskId + " from zookeeper");
                        }
                    });
                });
            }
        });
    }, 60000);
});
zkClient.connect();
