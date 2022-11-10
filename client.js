'use strict';

const PROTO_PATH = "./employee.proto";
const PORT = 2022;
const process = require('process');
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const {
    sendMetadata,
    getByBadgeNumber,
    getAll,
    saveAll,
} = require("./functions.client");
const packageDef = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});
const grpcObject = grpc.loadPackageDefinition(packageDef);
const employeePackage = grpcObject.employeePackage;
const client = new employeePackage.EmployeeService(
    `0.0.0.0:${PORT}`,
    grpc.credentials.createInsecure()
);

// Get options passed from terminal
const option = parseInt(process.argv[2], 10);

switch (option) {
    case 1:
        return sendMetadata(client);
    case 2:
        return getByBadgeNumber(client);
    case 3:
        return getAll(client);
    case 4:
        return addPhoto(client);
    case 5:
        return saveAll(client);
    default:
        break;
}