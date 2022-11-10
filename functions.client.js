const grpc = require("@grpc/grpc-js");
const fs = require('fs');

const sendMetadata = (client) => {
    const md = new grpc.Metadata;
    md.add('username', 'newUser');
    md.add('pasword', 'newUse123456');

    client.getByBadgeNumber({}, md, () => {});
};

const getByBadgeNumber = (client) => {
    client.getByBadgeNumber({ badgeNumber: 100072 }, (err, res) => {
        if (err) {
            return console.log("Error", err);
        }
        console.log(`Response`, res.employee || {});
    });
};

const getAll = (client) => {
    const call = client.getAll({});
    call.on('data', (data) => {
        console.log(data.employee);
    });
};

const addPhoto = (client) => {
    const md = new grpc.Metadata.getMap();
    md.add('badgeNumber', '23232');

    const call = client.addPhoto(md, (err, res) => {
        console.log(res);
    });

    const stream = fs.createReadStream('');
    stream.on("data", (chunk) => {
        call.write({ data: chunk });
    });

    stream.on('end', () => {
        console.log('Photo Stream Ended');
        call.end();
    })
};

const saveAll = (client) => {
    const employee = [{
            id: 8,
            firstName: "New",
            lastName: "Ola",
            badgeNumber: "14004",
            department: "Security",
        },
        {
            id: 20,
            firstName: "Jide",
            lastName: "Jamal",
            badgeNumber: "4002",
            department: "Kitchen",
        },
    ];

    const call = client.saveAll();
    call.on("data", (emp) => {
        // Save Data to DB
        console.log(emp);
    });

    employee.forEach((emp) => {
        call.write({ employee: emp });
    });

    // Close Connection
    call.end();
};

const save = () => {};

module.exports = {
    sendMetadata,
    getByBadgeNumber,
    getAll,
    addPhoto,
    saveAll,
    save,
};