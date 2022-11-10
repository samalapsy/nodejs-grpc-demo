const employees = require("./employees");

const getByBadgeNumber = (call, callback) => {
    const md = call.metadata.getMap();
    console.log(md);
    for (const i in md) {
        if (Object.hasOwnProperty.call(md, i)) {
            console.log(i, md[i]);
        }
    }
    const badgeNumber = call.request.badgeNumber;
    for (let i = 0; i < employees.length; i++) {
        const element = employees[i];
        if (element.badgeNumber === badgeNumber) {
            callback(null, {
                employee: element,
            });
            return;
        }
    }
};

const getAll = (call) => {
    employees.forEach((emp) => {
        call.write({
            employee: emp,
        });
    });
    call.end();
};

const addPhoto = (call, callback) => {
    const md = call.metadata.getMap();
    for (const i in md) {
        if (Object.hasOwnProperty.call(md, i)) {
            const element = md[i];
        }
    }

    let result = new Bufer(0);
    call.on("data", () => {
        result = Buffer.concat([result, data.data]);
        console.log(`Message Received with size ${data.data.length}`);
    });

    call.on("end", () => {
        callback(null, {
            isOk: true,
        });
        console.log(`Total file size size ${result.length} bytes`);
    });
};

const saveAll = (call) => {
    call.on("data", (emp) => {
        const { employee } = emp;
        employees.push(employee);
        call.write({ employee });
    });

    call.on("end", () => {
        console.log(employees)
            // Close Connection
        call.end();
    });
};

const save = () => {};

module.exports = {
    getByBadgeNumber,
    getAll,
    addPhoto,
    saveAll,
    save,
};