'use strict';

const PROTO_PATH = './employee.proto';
const PORT = 2022;
const grpc = require('@grpc/grpc-js');
const protoLoader = require("@grpc/proto-loader");
const {
    getByBadgeNumber,
    getAll,
    addPhoto,
    saveAll,
    save,
} = require("./functions");

// Create a package definition
const packageDef = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
});

const grpcObject = grpc.loadPackageDefinition(packageDef);
const employeePackage = grpcObject.employeePackage;

// Create a GRPC service
const server = new grpc.Server();

// Bind an insecure GRPC server to the the specified port.
server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    () => {
        console.log(`GRPC server running on port ${PORT}`);
        server.start();
    }
);

// Add the employee service to this server
server.addService(employeePackage.EmployeeService.service, {
    // Service funcions to be called on both clients and server end
    getByBadgeNumber,
    getAll,
    addPhoto,
    saveAll,
    save,
});